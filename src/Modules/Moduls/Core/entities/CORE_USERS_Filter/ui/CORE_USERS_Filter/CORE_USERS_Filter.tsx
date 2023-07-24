import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CORE_USERS_Filter.module.scss';
import { Input, ListBox, VStack, classNames } from 'Modules/UiKit';
import { getAttrValuesM } from '../../../../shared/globalApi/globalApi';
import { TreeViewInModal } from '../../../TreeViewInModal';

const dataTree = [
  {
    organizationId: 1,
    organizationCode: 'main',
    name: 'Головная организация',
    iconCode: null,
    childCount: 2,
    parentOrganizationId: null,
  },
  {
    organizationId: 47,
    organizationCode: 'main_ten',
    name: 'Головная организация 10',
    iconCode: null,
    // childCount: 4,
    parentOrganizationId: null,
  },
  {
    organizationId: 33,
    organizationCode: 'main_second',
    name: 'Головная организация 2',
    iconCode: null,
    childCount: 2,
    parentOrganizationId: null,
  },
  {
    organizationId: 34,
    organizationCode: 'main_third',
    name: 'Головная организация 3',
    iconCode: null,
    childCount: 2,
    parentOrganizationId: null,
  },
  {
    organizationId: 40,
    organizationCode: 'main_four',
    name: 'Головная организация 4',
    iconCode: null,
    childCount: 2,
    parentOrganizationId: null,
  },
  {
    organizationId: 41,
    organizationCode: 'main_five',
    name: 'Головная организация 5',
    iconCode: null,
    childCount: 2,
    parentOrganizationId: null,
  },
  {
    organizationId: 42,
    organizationCode: 'main_six',
    name: 'Головная организация 6',
    iconCode: null,
    childCount: 2,
    parentOrganizationId: null,
  },
  {
    organizationId: 43,
    organizationCode: 'main_seven',
    name: 'Головная организация 7',
    iconCode: null,
    childCount: 2,
    parentOrganizationId: null,
  },
  {
    organizationId: 44,
    organizationCode: 'main_eight',
    name: 'Головная организация 8',
    iconCode: null,
    childCount: 3,
    parentOrganizationId: null,
  },
  {
    organizationId: 46,
    organizationCode: 'main_nine',
    name: 'Головная организация 9',
    iconCode: null,
    childCount: 2,
    parentOrganizationId: null,
  },
];

const newDatas = [
  {
    organizationId: 111,
    organizationCode: 'main_ten',
    name: 'Головная организация 101',
    iconCode: null,
    childCount: 4,
    parentOrganizationId: null,
  },
  {
    organizationId: 112,
    organizationCode: 'main_second',
    name: 'Головная организация 23',
    iconCode: null,
    childCount: 2,
    parentOrganizationId: null,
  },
];

interface CORE_USERS_FilterProps {
  className?: string;
  data: any;
  onChange: any;
}

export const CORE_USERS_Filter = memo((props: CORE_USERS_FilterProps) => {
  const { className, data, onChange } = props;
  const [getAttrValues, { data: dropdownDatas }] = getAttrValuesM();
  const { t } = useTranslation('core');

  // for BETWEEN
  const [between1, setBetween1] = useState('');
  const [between2, setBetween2] = useState('');
  const [betweenIndex, setBetweenIndex] = useState('');
  const [dropdawnValue, setDropdawnValue] = useState([]);
  const normalizedValuesBetween = [between1, between2];
  useEffect(() => {
    onChange(betweenIndex, normalizedValuesBetween);
  }, [between1, between2]);
  //---------

  const getDropdawnData = () => {
    data?.forEach((item: any) => {
      if (item.displayType === 'L') {
        getAttrValues(item?.attrCode);
      }
    });
  };

  useEffect(() => {
    getDropdawnData();
  }, []);

  // tree data -----
  const [selectTree, setSelectTree] = useState<any>('');
  const [initialDataTree, setInitialDataTree] = useState<any>(dataTree);
  const [treeData, setTreeData] = useState<any>(dataTree);

  const updateTreeData = (id: any) => {
    // console.log('id', id);

    const newData = treeData.map((item: any) => {
      console.log('item.organizationId', item.organizationId);
      if (item.organizationId === id) {
        if (item.childCount > 0) {
          return {
            ...item,
            children: newDatas,
          };
        }
      }
      return item;
    });
    // console.log('newData---------------', newData);

    // setTreeData(newData);

    // Находим элемент с заданным organizationId
    const itemToUpdate = treeData.find((item: any) => {
      console.log('item.organizationId++++++', item?.organizationId);
      console.log('id+++++++', id);
      return item.organizationId === id;
    });

    if (itemToUpdate && itemToUpdate.childCount > 0 && !itemToUpdate.children) {
      // Обновляем состояние, добавляя вложенные элементы
      setTreeData((prevTreeData: any) =>
        prevTreeData.map((item: any) =>
          item.organizationId === id ? { ...item, children: newDatas } : item
        )
      );
    }
  };
  // console.log('selectTree', selectTree.organizationId);
  // console.log('treeData', treeData);

  // useEffect(() => {
  //   updateTreeData();
  // }, [selectTree]);

  // ----------------------------------------------------------

  const addChildrenRecursively = (
    data: any,
    parentId: any,
    childrenData: any
  ) => {
    console.log('data', data);

    return data.map((item: any) => {
      if (item.organizationId === parentId) {
        if (item.childCount > 0) {
          return {
            ...item,
            children: addChildrenRecursively(
              childrenData,
              item.organizationId,
              childrenData
            ),
          };
        }
      }
      return item;
    });
  };

  const handleClick = (organizationId: any) => {
    // Находим элемент с заданным organizationId
    const itemToUpdate = treeData.find(
      (item: any) => item.organizationId === organizationId
    );

    if (itemToUpdate && itemToUpdate.childCount > 0 && !itemToUpdate.children) {
      // Обновляем состояние, добавляя вложенные элементы
      setTreeData((prevTreeData: any) =>
        addChildrenRecursively(prevTreeData, organizationId, newDatas)
      );
    }
  };

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
                />
                <Input
                  onChange={(value) => setBetween2(value)}
                  onClick={() => setBetweenIndex(index)}
                  value={between2}
                  isLabel
                  label={t(inputs.colName)}
                  className={cls.input}
                  placeholder={t(inputs.colName)}
                />
              </VStack>
            )}
            {inputs.displayType === 'L' && (
              <VStack className={cls.input}>
                <label htmlFor="">{t(inputs.colName)}</label>
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
                <label htmlFor="">{t(inputs.colName)}</label>
                <TreeViewInModal
                  data={treeData}
                  selectTreeItems={(value: any) => setSelectTree(value)}
                  placeholder={t(inputs.colName)}
                  valueData={inputs.value}
                  index={index}
                  onChange={onChange}
                  updateTreeData={handleClick}
                />
              </VStack>
            )}
          </VStack>
        );
      })}
    </div>
  );
});
