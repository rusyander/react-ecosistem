import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './FilterItems.module.scss';
import { HStack, Input, Texts, VStack, classNames } from 'Modules/UiKit';
import { TreeViewInModal } from '../TreeViewInModal/TreeViewInModal';
import { GridModal } from '../GridModal/GridModal';
import { getAttrValuesM } from 'shared/Globals/globalApi/globalApi';
import { Dropdown } from 'entities/Fields/Dropdown';
import { DatePicker } from 'entities/Fields/DatePickers';
import { DateTimePicker } from 'entities/Fields/DateTimePicker';

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
  // console.log('data ----------------', data);

  // for BETWEEN
  const [between1, setBetween1] = useState('');
  const [between2, setBetween2] = useState('');
  const [betweenIndex, setBetweenIndex] = useState('');
  const [inputsData, setInputsData] = useState<any>(null);
  const normalizedValuesBetween = [between1, between2];

  useEffect(() => {
    onChange(betweenIndex, normalizedValuesBetween, inputsData);
  }, [between1, between2]);

  //--------- For dropdown data
  const [dropdawnValue, setDropdawnValue] = useState([]);
  const [dropdownData, setDropdownData] = useState<any>([]);

  const getDropdawnData = useCallback(() => {
    data?.forEach((item: any) => {
      if (item.filterDisplayTypeCode === 'L') {
        // getAttrValues(item?.attrCode);
        getAttrValues(item?.filterAttributeCode).then((res: any) => {
          setDropdownData(res?.data?.data);
        });
        // setDropdownData(dropdownDatas?.data);
      }
    });
  }, [data, getAttrValues]);

  useEffect(() => {
    getDropdawnData();
  }, [getDropdawnData]);

  // console.log('attrData', attrData);

  // ---------------------------------------------------------- For tree data
  const [selectTree, setSelectTree] = useState<any>('');

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

  // ------------

  // console.log('defaultValuesData', defaultValuesData);

  return (
    <div className={classNames(cls.coreUsersFilter, {}, [className])}>
      {data?.map((inputs: any, index: any) => {
        return (
          <div key={index}>
            {/* errorData */}
            {isFilter ? (
              <VStack max className={cls.inputFilds}>
                {inputs?.filterDisplayTypeCode === 'F' &&
                  inputs?.filterCondition !== 'BETWEEN' &&
                  inputs?.dataTypeId !== 4 &&
                  inputs?.dataTypeId !== 132 && (
                    <VStack max gap="8">
                      <Input
                        onChange={(value) => onChange(index, value)}
                        value={inputs?.value}
                        isLabel
                        label={t(inputs?.name)}
                        className={cls.input}
                        placeholder={t(inputs?.name)}
                      />
                    </VStack>
                  )}

                {inputs?.filterDisplayTypeCode === 'F' &&
                  inputs?.dataTypeId !== 4 &&
                  inputs?.dataTypeId !== 132 &&
                  inputs?.filterCondition === 'BETWEEN' && (
                    <VStack max>
                      <Input
                        onChange={(value) => setBetween1(value)}
                        onClick={() => setBetweenIndex(index)}
                        value={between1}
                        isLabel
                        label={t(inputs?.name)}
                        className={cls.input}
                        placeholder={t(inputs?.name)}
                      />
                      <Input
                        onChange={(value) => setBetween2(value)}
                        onClick={() => setBetweenIndex(index)}
                        value={between2}
                        isLabel
                        label={t(inputs?.name)}
                        className={cls.input}
                        placeholder={t(inputs?.name)}
                      />
                    </VStack>
                  )}

                {inputs?.filterDisplayTypeCode === 'F' &&
                  inputs?.filterCondition === 'BETWEEN' &&
                  inputs?.dataTypeId === 4 && (
                    <VStack max gap="16" className={cls.datepicker}>
                      <VStack max>
                        <DatePicker
                          onChange={(value) => {
                            setBetween1(value || '');
                            setBetweenIndex(index);
                            setInputsData(inputs);
                          }}
                          label={`${t(inputs?.name)}  ${t('fromDAte')}`}
                          inputs={inputs}
                          defaultValuesData={defaultValuesData}
                        />
                      </VStack>
                      <VStack
                        max
                        onClick={() => {
                          setBetweenIndex(index);
                          setInputsData(inputs);
                        }}
                      >
                        <DatePicker
                          onChange={(value) => {
                            setBetween2(value || '');
                            setBetweenIndex(index);
                            setInputsData(inputs);
                          }}
                          label={`${t(inputs?.name)} ${t('toDate')}`}
                          inputs={inputs}
                          defaultValuesData={defaultValuesData}
                        />
                      </VStack>
                    </VStack>
                  )}

                {inputs?.filterCondition === 'BETWEEN' &&
                  inputs?.dataTypeId === 132 && (
                    <VStack max gap="16" className={cls.datepicker}>
                      <VStack max onClick={() => setBetweenIndex(index)}>
                        <DateTimePicker
                          onChange={(value) => {
                            setBetween1(value);
                            setBetweenIndex(index);
                            setInputsData(inputs);
                          }}
                          label={`${t(inputs?.name)}  ${t('fromDAte')}`}
                          inputs={inputs}
                          defaultValuesData={defaultValuesData}
                        />
                      </VStack>
                      <VStack max onClick={() => setBetweenIndex(index)}>
                        <DateTimePicker
                          onChange={(value) => {
                            setBetween2(value);
                            setBetweenIndex(index);
                            setInputsData(inputs);
                          }}
                          label={`${t(inputs?.name)} ${t('toDate')}`}
                          inputs={inputs}
                          defaultValuesData={defaultValuesData}
                        />
                      </VStack>
                    </VStack>
                  )}

                {inputs?.filterDisplayTypeCode === 'L' && (
                  <VStack max className={cls.input}>
                    <label htmlFor="">{t(inputs?.name)}</label>
                    <Dropdown
                      key={inputs?.name}
                      onChange={onChange}
                      inputs={inputs}
                      data={data}
                      getAttrValues={getAttrValues}
                      index={index}
                      defaultValue={t(inputs?.value)}
                      items={dropdownData?.[inputs?.filterAttributeCode] || []}
                    />
                  </VStack>
                )}

                {inputs?.filterDisplayTypeCode === 'FB' && (
                  <VStack max className={cls.input}>
                    <label htmlFor="">{t(inputs?.name)}</label>
                    <TreeViewInModal
                      // data={treeData}
                      selectTreeItems={(value: any) => setSelectTree(value)}
                      placeholder={t(inputs?.name)}
                      // valueData={inputs?.value}
                      index={index}
                      onChange={onChange}
                      modalTitle={props.modalTitle}
                    />
                  </VStack>
                )}

                {inputs?.filterDisplayTypeCode === 'CH' && (
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

                {inputs?.filterDisplayTypeCode === 'F' &&
                  inputs?.filterCondition !== 'BETWEEN' &&
                  inputs?.dataTypeId === 4 && (
                    <DatePicker
                      onChange={(value) => onChange(index, value)}
                      inputs={inputs}
                      defaultValuesData={defaultValuesData}
                    />
                  )}

                {inputs?.filterDisplayTypeCode === 'DQ' && (
                  <VStack className={cls.input}>
                    <label htmlFor="">
                      {inputs?.name}
                      {inputs?.isNullableFlag === 'N' && (
                        <sup className={cls.required}>*</sup>
                      )}
                    </label>
                    <GridModal
                      selectTreeItems={(value: any) => setSelectGrid(value)}
                      placeholder={t(inputs?.name)}
                      index={index}
                      onChange={onChange}
                      modalTitle={props.modalTitle}
                    />
                  </VStack>
                )}
              </VStack>
            ) : (
              // -------------------------------------------

              <VStack max>
                {inputs?.displayTypeCode === 'F' &&
                  inputs?.token !== 'password' &&
                  !inputs?.widthItem &&
                  !inputs?.maxlength &&
                  inputs?.dataTypeId !== 132 &&
                  inputs?.dataTypeId !== 4 && (
                    <VStack max align="start">
                      <Input
                        onChange={(value) => onChange(index, value)}
                        value={
                          inputs?.value
                            ? inputs?.value
                            : defaultValuesData?.data?.[inputs?.token]
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
                  inputs?.dataTypeId !== 4 &&
                  inputs?.dataTypeId !== 132 && (
                    <VStack max align="start">
                      <Input
                        onChange={(value) => onChange(index, value)}
                        value={
                          inputs?.value
                            ? inputs?.value
                            : defaultValuesData?.data?.[inputs?.token]
                        }
                        maxLength={inputs?.maxlength}
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
                  inputs?.widthItem &&
                  inputs?.dataTypeId !== 4 &&
                  inputs?.dataTypeId !== 132 && (
                    <VStack max align="start" justify="start">
                      <Input
                        onChange={(value) => onChange(index, value)}
                        value={
                          inputs?.value
                            ? inputs?.value
                            : defaultValuesData?.data?.[inputs?.token]
                        }
                        isLabel
                        label={inputs?.name}
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
                {inputs?.displayTypeCode === 'L' && (
                  <VStack max>
                    <VStack max className={cls.input}>
                      <HStack>
                        {inputs?.name}
                        {inputs?.isNullableFlag === 'N' && (
                          <sup className={cls.required}>*</sup>
                        )}
                      </HStack>
                      <Dropdown
                        key={inputs?.name}
                        onChange={onChange}
                        inputs={inputs}
                        data={data}
                        getAttrValues={getAttrValues}
                        index={index}
                        defaultValue={
                          inputs?.value
                            ? t(inputs?.value)
                            : inputs?.defValData?.name
                            ? inputs?.defValData?.name
                            : defaultValuesData?.data?.roleCodeName
                            ? defaultValuesData?.data?.roleCodeName
                            : defaultValuesData?.data?.[`${inputs?.token}Name`]
                        }
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
                      <HStack>
                        {inputs?.name}
                        {inputs?.isNullableFlag === 'N' && (
                          <sup className={cls.required}>*</sup>
                        )}
                      </HStack>
                      <TreeViewInModal
                        selectTreeItems={(value: any) => setSelectTree(value)}
                        placeholder={t(inputs?.colName)}
                        index={index}
                        onChange={onChange}
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
                          checked={inputs?.value === 'N' ? true : false}
                          onChange={(e: any) =>
                            onChange(
                              index,
                              e.target.checked === true ? 'N' : 'Y'
                            )
                          }
                        />
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
                    <VStack max className={cls.inputs}>
                      <DatePicker
                        onChange={(value) => onChange(index, value)}
                        index={index}
                        inputs={inputs}
                        defaultValuesData={defaultValuesData}
                      />
                      {JSON.stringify(errorData)?.includes(inputs?.token) && (
                        <Texts
                          text={`${inputs?.name} ${errorData?.[index]?.message}`}
                          className={cls.errorText}
                        />
                      )}
                    </VStack>
                  )}

                {inputs?.displayTypeCode === 'DQ' && (
                  <VStack max>
                    <VStack className={cls.input} max>
                      <HStack>
                        {inputs?.name}
                        {inputs?.isNullableFlag === 'N' && (
                          <sup className={cls.required}>*</sup>
                        )}
                      </HStack>
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
