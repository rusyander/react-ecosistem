import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './FilterItems.module.scss';
import { Input, ListBox, VStack, classNames } from 'Modules/UiKit';
import {
  getAttrValuesM,
  getTreePartDataSprM,
} from '../../../../shared/globalApi/globalApi';
import { $api } from 'shared/api/api';
import { TreeViewInModal } from '../TreeViewInModal/TreeViewInModal';

interface FilterItemsProps {
  className?: string;
  data: any;
  onChange: any;
  modalTitle?: string;
}

export const FilterItems = memo((props: FilterItemsProps) => {
  const { className, data, onChange } = props;
  const [getAttrValues, { data: dropdownDatas }] = getAttrValuesM();

  const { t } = useTranslation();

  // for BETWEEN
  const [between1, setBetween1] = useState('');
  const [between2, setBetween2] = useState('');
  const [betweenIndex, setBetweenIndex] = useState('');
  const [dropdawnValue, setDropdawnValue] = useState([]);
  const normalizedValuesBetween = [between1, between2];
  useEffect(() => {
    onChange(betweenIndex, normalizedValuesBetween);
  }, [between1, between2]);

  //--------- For dropdown data

  const getDropdawnData = useCallback(() => {
    data?.forEach((item: any) => {
      if (item.displayType === 'L') {
        getAttrValues(item?.attrCode);
      }
    });
  }, [data, getAttrValues]);

  useEffect(() => {
    getDropdawnData();
  }, []);

  // ---------------------------------------------------------- For tree data

  const [getTreePartDataSpr, { data: getTreePartData }] = getTreePartDataSprM();

  const [selectTree, setSelectTree] = useState<any>('');
  const [treeData, setTreeData]: any = useState([]);
  const [selectedTreeDataFildId, setSelectedTreeDataFildId] = useState<any>('');

  const sendTreeDataFirst = useCallback(() => {
    getTreePartDataSpr('-1');
    if (treeData === undefined || treeData.length === 0) {
      setTreeData(getTreePartData?.data);
    }
  }, [getTreePartData?.data, getTreePartDataSpr, treeData]);
  // console.log(treeData);
  // console.log(getTreePartData?.data);

  useEffect(() => {
    sendTreeDataFirst();
  }, []);
  const [loadingTree, setLoadingTree] = useState(false);

  const updateTreeDataFunction = useCallback((id: number, newFields: any) => {
    const findAndAddData = (data: any) => {
      if (data.organizationId === id) {
        const updatedData = { ...data, children: newFields };
        if (newFields.childCount > 0) {
          updatedData.children = [
            // ...(data.children || []),
            ...(data.children || []),
            ...newFields.children,
          ];
        }

        return { ...updatedData, ...newFields };
        // return { ...updatedData };
      } else if (data.children && data.children.length > 0) {
        return { ...data, children: data.children.map(findAndAddData) };
      }
      return data;
    };

    setTimeout(() => {
      setTreeData((prevTreeData: any) => prevTreeData.map(findAndAddData));
    }, 0);
  }, []);

  const fetchDataFromBackend = useCallback(
    async (id: number) => {
      try {
        setLoadingTree(true);
        const newFields = await $api.post('/api/os/org/getTreePartDataSpr', id);
        if (newFields.data) {
          updateTreeDataFunction(id, newFields?.data?.data);
          setLoadingTree(false);
        }
      } catch (error) {
        console.error('Error fetching data from the backend:', error);
      }
    },
    [updateTreeDataFunction]
  );

  const handleItemClick = useCallback(
    (id: number) => {
      setSelectedTreeDataFildId((prev: any) => {
        const uniqueID = [...new Set(prev)];
        return [...uniqueID, id];
      });
      if (!selectedTreeDataFildId.includes(id)) {
        fetchDataFromBackend(id);
      }
    },
    [fetchDataFromBackend, selectedTreeDataFildId]
  );

  // console.log('selectedTreeDataFildId', selectedTreeDataFildId);

  return (
    <div className={classNames(cls.coreUsersFilter, {}, [className])}>
      {data?.map((inputs: any, index: any) => {
        return (
          <VStack key={index} className={cls.inputFilds}>
            {inputs.displayType === 'F' &&
              inputs.condition !== 'BETWEEN' &&
              inputs.dataType !== 4 && (
                <Input
                  onChange={(value) => onChange(index, value)}
                  value={inputs.value}
                  isLabel
                  label={t(inputs.colName)}
                  className={cls.input}
                  placeholder={t(inputs.colName)}
                  requered={inputs.required}
                />
              )}

            {inputs.displayType === 'F' && inputs.condition === 'BETWEEN' && (
              <VStack>
                <Input
                  onChange={(value) => setBetween1(value)}
                  onClick={() => setBetweenIndex(index)}
                  value={between1}
                  isLabel
                  label={t(inputs.colName)}
                  className={cls.input}
                  placeholder={t(inputs.colName)}
                  requered={inputs.required}
                />
                <Input
                  onChange={(value) => setBetween2(value)}
                  onClick={() => setBetweenIndex(index)}
                  value={between2}
                  isLabel
                  label={t(inputs.colName)}
                  className={cls.input}
                  placeholder={t(inputs.colName)}
                  requered={inputs.required}
                />
              </VStack>
            )}
            {inputs.displayType === 'L' && (
              <VStack className={cls.input}>
                <label htmlFor="">
                  {t(inputs.colName)}{' '}
                  {inputs.required && <sup className={cls.required}>*</sup>}
                </label>
                <ListBox
                  defaultValue={t(inputs.colName)}
                  onChange={(value) => {
                    setDropdawnValue(value);
                    onChange(index, value.code);
                  }}
                  value={dropdawnValue}
                  // items={options || []}
                  items={dropdownDatas?.data[inputs?.attrCode] || []}
                />
              </VStack>
            )}

            {inputs.displayType === 'FB' && (
              <VStack className={cls.input}>
                <label htmlFor="">
                  {t(inputs.colName)}{' '}
                  {inputs.required && <sup className={cls.required}>*</sup>}
                </label>
                <TreeViewInModal
                  data={treeData}
                  selectTreeItems={(value: any) => setSelectTree(value)}
                  placeholder={t(inputs.colName)}
                  valueData={inputs.value}
                  index={index}
                  onChange={onChange}
                  updateTreeData={handleItemClick}
                  sendTreeDataFirst={sendTreeDataFirst}
                  loadingTree={loadingTree}
                  modalTitle={props.modalTitle}
                />
              </VStack>
            )}
          </VStack>
        );
      })}
    </div>
  );
});
