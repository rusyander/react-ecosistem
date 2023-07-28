import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './FilterItems.module.scss';
import {
  HStack,
  Input,
  ListBox,
  Texts,
  VStack,
  classNames,
} from 'Modules/UiKit';
import {
  getAttrValuesM,
  getTreePartDataSprM,
} from '../../../../shared/globalApi/globalApi';
import { $api } from 'shared/api/api';
import { TreeViewInModal } from '../TreeViewInModal/TreeViewInModal';
import { GridModal } from '../GridModal/GridModal';

interface FilterItemsProps {
  className?: string;
  data: any;
  onChange: any;
  modalTitle?: string;
  isFilter?: boolean;
  attrData?: any;
  errorData?: any;
  defaultValuesData?: any;
}

export const FilterItems = memo((props: FilterItemsProps) => {
  const {
    className,
    data,
    onChange,
    isFilter,
    attrData,
    errorData,
    defaultValuesData,
  } = props;
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
    // if (isFilter) {
    getDropdawnData();
    // }
  }, [getDropdawnData, isFilter]);

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
    // if (isFilter) {
    sendTreeDataFirst();
    // }
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
      if (
        // selectedTreeDataFildId?.childCount !== 0 &&
        !selectedTreeDataFildId.includes(id)
      ) {
        fetchDataFromBackend(id);
      }
    },
    [fetchDataFromBackend, selectedTreeDataFildId]
  );

  // console.log('selectedTreeDataFildId', selectedTreeDataFildId);

  // grid
  const [selectGrid, setSelectGrid] = useState<any>('');

  //passwor
  const [password, setPassword] = useState<any>('');
  const [passwordConf, setPasswordConf] = useState<any>('');
  const [passIndex, setPassIndex] = useState<any>('');

  useEffect(() => {
    if (password === passwordConf) {
      onChange(passIndex, password);
    }
  }, [password, passwordConf]);

  // ------------------- fatePicker

  // const [inputValue, setInputValue] = useState('');

  // // Функция для форматирования даты в виде "дд,мм,гггг"
  // const formatDate = (dateString: any) => {
  //   const date = new Date(dateString);
  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const year = date.getFullYear().toString();
  //   return `${day}.${month}.${year}`;
  // };

  // // Функция для обработки ввода даты
  // const handleInputChange = (value: any) => {
  //   // Удаляем все, кроме цифр и точек, чтобы получить только числа и разделители
  //   const cleanedValue = value.replace(/[^\d.]/g, '');

  //   // Форматируем дату в виде "дд,мм,гггг" и обновляем состояние
  //   const formattedDate = formatDate(value);
  //   setInputValue(formattedDate);
  // };

  // console.log('inputValue', inputValue);

  // console.log(errorData?.[0].field);
  // console.log('defaultValuesData---', defaultValuesData);

  return (
    <div className={classNames(cls.coreUsersFilter, {}, [className])}>
      {data?.map((inputs: any, index: any) => {
        return (
          <div key={index}>
            {/* errorData */}
            {isFilter ? (
              <VStack className={cls.inputFilds}>
                {inputs?.displayType === 'F' &&
                  inputs?.condition !== 'BETWEEN' &&
                  inputs?.dataType !== 4 && (
                    <VStack gap="8">
                      <Input
                        onChange={(value) => onChange(index, value)}
                        value={inputs?.value}
                        isLabel
                        label={t(inputs?.colName)}
                        className={cls.input}
                        placeholder={t(inputs?.colName)}
                      />
                    </VStack>
                  )}

                <p>{errorData?.field}</p>

                {inputs?.displayType === 'F' &&
                  inputs?.condition === 'BETWEEN' && (
                    <VStack>
                      <Input
                        onChange={(value) => setBetween1(value)}
                        onClick={() => setBetweenIndex(index)}
                        value={between1}
                        isLabel
                        label={t(inputs?.colName)}
                        className={cls.input}
                        placeholder={t(inputs?.colName)}
                      />
                      <Input
                        onChange={(value) => setBetween2(value)}
                        onClick={() => setBetweenIndex(index)}
                        value={between2}
                        isLabel
                        label={t(inputs?.colName)}
                        className={cls.input}
                        placeholder={t(inputs?.colName)}
                      />
                    </VStack>
                  )}
                {inputs?.displayType === 'L' && (
                  <VStack className={cls.input}>
                    <label htmlFor="">{t(inputs?.colName)}</label>
                    <ListBox
                      defaultValue={t(inputs?.colName)}
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

                {inputs?.displayType === 'FB' && (
                  <VStack className={cls.input}>
                    <label htmlFor="">{t(inputs?.colName)}</label>
                    <TreeViewInModal
                      data={treeData}
                      selectTreeItems={(value: any) => setSelectTree(value)}
                      placeholder={t(inputs?.colName)}
                      valueData={inputs?.value}
                      index={index}
                      onChange={onChange}
                      updateTreeData={handleItemClick}
                      sendTreeDataFirst={sendTreeDataFirst}
                      loadingTree={loadingTree}
                      modalTitle={props.modalTitle}
                    />
                  </VStack>
                )}

                {inputs?.displayType === 'CH' && (
                  <VStack max align="start" className={cls.input}>
                    <HStack>{inputs?.name}</HStack>
                    <label className={cls.checkbox}>
                      <input
                        type="checkbox"
                        checked={
                          inputs?.value ? inputs?.value : inputs?.default_value
                        }
                        onChange={(e) =>
                          onChange(index, e.target.checked === true ? 'N' : 'Y')
                        }
                      />
                      <span></span>
                    </label>
                  </VStack>
                )}

                {inputs?.displayType === 'F' && inputs?.dataType === 4 && (
                  <Input
                    onChange={(value) => onChange(index, value)}
                    value={inputs?.value}
                    isLabel
                    type="date"
                    form="dd.MM.yyyy"
                    data-slots="dmy"
                    pattern="\d{4}-\d{2}-\d{2}"
                    label={inputs?.name}
                    className={cls.input}
                    placeholder={inputs?.name}
                    requered={inputs?.isNullableFlag === 'N' ? true : false}
                    style={{ width: inputs?.widthItem }}
                  />
                )}

                {inputs?.displayType === 'DQ' && (
                  <VStack className={cls.input}>
                    <label htmlFor="">
                      {inputs?.name}
                      {inputs?.isNullableFlag === 'N' && (
                        <sup className={cls.required}>*</sup>
                      )}
                    </label>
                    <GridModal
                      selectTreeItems={(value: any) => setSelectGrid(value)}
                      placeholder={t(inputs?.colName)}
                      index={index}
                      onChange={onChange}
                      modalTitle={props.modalTitle}
                    />
                  </VStack>
                )}
              </VStack>
            ) : (
              // --------------------------------------------------------------------------
              // --------------------------------------------------------------------------
              <VStack max>
                {/* <div className="container">
                <div className="row"> */}
                {inputs?.displayTypeCode === 'F' &&
                  inputs?.token !== 'password' &&
                  !inputs?.widthItem &&
                  !inputs?.maxlength &&
                  inputs?.dataTypeId !== 4 && (
                    <VStack max align="start">
                      <Input
                        onChange={(value) => onChange(index, value)}
                        // value={inputs?.value}
                        value={
                          !inputs?.value
                            ? defaultValuesData?.data?.[inputs?.token]
                            : inputs?.value
                        }
                        isLabel
                        label={inputs?.name}
                        className={cls.input}
                        placeholder={inputs?.name}
                        requered={inputs?.isNullableFlag === 'N' ? true : false}
                        style={{ width: inputs?.widthItem }}
                      />
                      {JSON.stringify(errorData)?.includes(inputs?.token) && (
                        <Texts
                          text={`${inputs?.name} ${errorData?.[index]?.message}`}
                          className={cls.errorText}
                        />
                      )}
                    </VStack>
                  )}

                {inputs?.displayTypeCode === 'F' &&
                  inputs?.token !== 'password' &&
                  inputs?.maxlength &&
                  inputs?.dataTypeId !== 4 && (
                    <VStack max align="start">
                      <Input
                        onChange={(value) => onChange(index, value)}
                        value={
                          !inputs?.value
                            ? defaultValuesData?.data?.[inputs?.token]
                            : inputs?.value
                        }
                        maxLength={inputs?.maxlength}
                        isLabel
                        label={inputs?.name}
                        className={cls.input}
                        placeholder={inputs?.name}
                        requered={inputs?.isNullableFlag === 'N' ? true : false}
                        style={{ width: inputs?.widthItem }}
                      />

                      {/* defaultValuesData?.data?.[item.token], */}

                      {JSON.stringify(errorData)?.includes(inputs?.token) && (
                        <Texts
                          text={`${inputs?.name} ${errorData?.[index]?.message}`}
                          className={cls.errorText}
                        />
                      )}
                    </VStack>
                  )}
                {inputs?.displayTypeCode === 'F' &&
                  inputs?.widthItem &&
                  inputs?.dataTypeId !== 4 && (
                    <VStack max align="start" justify="start">
                      <Input
                        onChange={(value) => onChange(index, value)}
                        // value={inputs?.value}
                        value={
                          !inputs?.value
                            ? defaultValuesData?.data?.[inputs?.token]
                            : inputs?.value
                        }
                        isLabel
                        label={inputs?.name}
                        // className={cls.input}
                        // className="col-6"
                        placeholder={inputs?.name}
                        requered={inputs?.isNullableFlag === 'N' ? true : false}
                      />
                      {JSON.stringify(errorData)?.includes(inputs?.token) && (
                        <Texts
                          text={`${inputs?.name} ${errorData?.[index]?.message}`}
                          className={cls.errorText}
                        />
                      )}
                    </VStack>
                  )}
                {inputs?.displayTypeCode === 'F' &&
                  inputs?.condition === 'BETWEEN' && (
                    <VStack max>
                      <VStack max>
                        <Input
                          onChange={(value) => setBetween1(value)}
                          onClick={() => setBetweenIndex(index)}
                          value={between1}
                          isLabel
                          label={inputs?.name}
                          className={cls.input}
                          placeholder={inputs?.name}
                          requered={
                            inputs?.isNullableFlag === 'N' ? true : false
                          }
                        />
                        <Input
                          onChange={(value) => setBetween2(value)}
                          onClick={() => setBetweenIndex(index)}
                          value={between2}
                          isLabel
                          label={inputs?.name}
                          className={cls.input}
                          placeholder={inputs?.name}
                          requered={
                            inputs?.isNullableFlag === 'N' ? true : false
                          }
                        />
                      </VStack>
                      {JSON.stringify(errorData)?.includes(inputs?.token) && (
                        <Texts
                          text={`${inputs?.name} ${errorData?.[index]?.message}`}
                          className={cls.errorText}
                        />
                      )}
                    </VStack>
                  )}
                {inputs?.displayTypeCode === 'L' && (
                  <VStack max>
                    <VStack max className={cls.input}>
                      <HStack max>
                        {inputs?.name}
                        {inputs?.isNullableFlag === 'N'
                          ? true
                          : false && <sup className={cls.required}>*</sup>}
                      </HStack>
                      <ListBox
                        defaultValue={t(inputs?.value)}
                        onChange={(value) => {
                          setDropdawnValue(value);
                          onChange(index, value.code);
                        }}
                        value={dropdawnValue}
                        items={attrData?.[inputs?.attributeCode] || []}
                      />
                    </VStack>
                    {JSON.stringify(errorData)?.includes(inputs?.token) && (
                      <Texts
                        text={`${inputs?.name} ${errorData?.[index]?.message}`}
                        className={cls.errorText}
                      />
                    )}
                  </VStack>
                )}

                {inputs?.displayTypeCode === 'FB' && (
                  <VStack max>
                    <VStack max className={cls.input}>
                      <HStack max>
                        {inputs?.name}
                        {inputs?.isNullableFlag === 'N' && (
                          <sup className={cls.required}>*</sup>
                        )}
                      </HStack>
                      <TreeViewInModal
                        data={treeData}
                        selectTreeItems={(value: any) => setSelectTree(value)}
                        placeholder={t(inputs?.colName)}
                        valueData={inputs?.value}
                        index={index}
                        onChange={onChange}
                        updateTreeData={handleItemClick}
                        sendTreeDataFirst={sendTreeDataFirst}
                        loadingTree={loadingTree}
                        modalTitle={props.modalTitle}
                        className={cls.dataTree}
                        defaultValues={defaultValuesData}
                      />
                    </VStack>

                    {JSON.stringify(errorData)?.includes(inputs?.token) && (
                      <Texts
                        text={`${inputs?.name} ${errorData?.[index]?.message}`}
                        className={cls.errorText}
                      />
                    )}
                  </VStack>
                )}

                {inputs?.displayTypeCode === 'CH' && (
                  <VStack max>
                    <VStack max align="start" className={cls.input}>
                      <HStack>
                        {inputs?.name}
                        {inputs?.isNullableFlag === 'N' && (
                          <sup className={cls.required}>*</sup>
                        )}
                      </HStack>
                      <label className={cls.checkbox}>
                        <input
                          type="checkbox"
                          checked={
                            // inputs?.value ? inputs?.value : inputs?.default_value
                            defaultValuesData?.changePasswordFlagCode === 'N'
                              ? true
                              : inputs?.default_value === 'N'
                              ? true
                              : inputs?.value === 'N'
                              ? true
                              : false

                            // inputs?.default_value === 'N'
                            //   ? true
                            //   : inputs?.value === 'N'
                            //   ? true
                            //   : false
                          }
                          onChange={(e: any) =>
                            onChange(
                              index,
                              e.target.checked === true ? 'N' : 'Y'
                            )
                          }
                        />
                        <span></span>
                      </label>
                    </VStack>
                    {JSON.stringify(errorData)?.includes(inputs?.token) && (
                      <Texts
                        text={`${inputs?.name} ${errorData?.[index]?.message}`}
                        className={cls.errorText}
                      />
                    )}
                  </VStack>
                )}

                {inputs?.displayTypeCode === 'F' &&
                  inputs?.dataTypeId === 4 && (
                    <VStack max>
                      <Input
                        // onChange={(value) => onChange(index, value)}
                        onChange={(value) => {
                          const date = new Date(value);
                          const day = date
                            .getDate()
                            .toString()
                            .padStart(2, '0');
                          const month = (date.getMonth() + 1)
                            .toString()
                            .padStart(2, '0');
                          const year = date.getFullYear().toString();
                          const dateValue = `${day}.${month}.${year}`;

                          return onChange(index, dateValue);
                          // return handleInputChange(dateValue);
                        }}
                        id="dateInput"
                        // value={inputs?.value}
                        value={
                          inputs?.value
                            ? inputs?.value?.split('.').reverse().join('.')
                            : ''
                        }
                        isLabel
                        type="date"
                        form="dd.MM.yyyy"
                        data-slots="dmy"
                        maxLength={10}
                        pattern="\d{4}-\d{2}-\d{2}"
                        label={inputs?.name}
                        className={cls.input}
                        placeholder={inputs?.name}
                        requered={inputs?.isNullableFlag === 'N' ? true : false}
                      />
                      {JSON.stringify(errorData)?.includes(inputs?.token) && (
                        <Texts
                          text={`${inputs?.name} ${errorData?.[index]?.message}`}
                          className={cls.errorText}
                        />
                      )}
                    </VStack>
                  )}
                {/* <h1>{inputs?.value}</h1>
                <h1>{inputs?.value?.split('.').reverse().join('.')}</h1> */}

                {inputs?.displayTypeCode === 'DQ' && (
                  <VStack max>
                    <VStack className={cls.input} max>
                      <label htmlFor="">
                        {inputs?.name}
                        {inputs?.isNullableFlag === 'N' && (
                          <sup className={cls.required}>*</sup>
                        )}
                      </label>
                      <GridModal
                        selectTreeItems={(value: any) => setSelectGrid(value)}
                        placeholder={t(inputs?.colName)}
                        index={index}
                        onChange={onChange}
                        modalTitle={props.modalTitle}
                        defaultValuesData={defaultValuesData}
                      />
                    </VStack>
                    {JSON.stringify(errorData)?.includes(inputs?.token) && (
                      <Texts
                        text={`${inputs?.name} ${errorData?.[index]?.message}`}
                        className={cls.errorText}
                      />
                    )}
                  </VStack>
                )}

                {inputs?.displayTypeCode === 'F' &&
                  inputs?.token === 'password' && (
                    <VStack max align="start">
                      <HStack align="center" justify="between" max>
                        <Input
                          onChange={(value) => {
                            setPassIndex(index);
                            return setPassword(value);
                          }}
                          value={password}
                          isLabel
                          label={inputs?.name}
                          className={cls.input}
                          placeholder={inputs?.name}
                          requered={
                            inputs?.isNullableFlag === 'N' ? true : false
                          }
                        />

                        <Input
                          onChange={(value) => {
                            setPassIndex(index);
                            return setPasswordConf(value);
                          }}
                          value={passwordConf}
                          isLabel
                          label={t('Повтор пароля')}
                          className={cls.input}
                          placeholder={t('Повтор пароля')}
                          requered={
                            inputs?.isNullableFlag === 'N' ? true : false
                          }
                        />
                      </HStack>
                      {password !== passwordConf && (
                        <HStack align="center" justify="center" max>
                          <Texts
                            theme="error"
                            title="Пароли должны совподать"
                          />
                        </HStack>
                      )}
                      {JSON.stringify(errorData)?.includes(inputs?.token) && (
                        <Texts
                          text={`${inputs?.name} ${errorData?.[index]?.message}`}
                          className={cls.errorText}
                        />
                      )}
                    </VStack>
                  )}
                {/* </div>
              </div> */}
              </VStack>
            )}
          </div>
        );
      })}
    </div>
  );
});
