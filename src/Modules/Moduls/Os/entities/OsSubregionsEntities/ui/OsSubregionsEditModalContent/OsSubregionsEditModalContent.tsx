import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import cls from './OsSubregionsEditModalContent.module.scss';
import {
  CheckFormEnterM,
  ModalHeader,
  SubmitFormFooter,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { t } from 'i18next';
import { convertArrayToObject, InputsFields } from 'widgets/InputsFields';

interface OsSubregionsEditModalContentProps {
  className?: string;
  closeModalFunction: any;
  getInit: any;
  saveData: any;
  getInitData: any;
  saveDataQ: any;
  getFgData: any;
  selectedField: any;
}

export const OsSubregionsEditModalContent = memo(
  (props: OsSubregionsEditModalContentProps) => {
    const {
      className,
      closeModalFunction,
      getInit,
      getInitData,
      saveData,
      saveDataQ,
      selectedField,
      getFgData,
    } = props;
    const [defaultData, setDefaultData] = useState<any>([]);

    const [inputsValue, setInputsValue]: any = useState([]);
    // console.log('selectedField', selectedField);

    const editDataPayload = useMemo(() => {
      return {
        code: 'OS_SUBREGION_FIELDS',
        params: [selectedField?.subregion_id],
      };
    }, [selectedField?.subregion_id]);

    useEffect(() => {
      getInit('OS_SUBREGION_FIELDS');

      getFgData(editDataPayload).then((res: any) => {
        setDefaultData(res.data);
      });
    }, []);

    const handleSubmit = useCallback(() => {
      const updateValue = inputsValue;

      getFgData(editDataPayload).then((res: any) => {
        const resData = res?.data?.data;

        updateValue?.forEach((item: any) => {
          if (item.fildValue === null || item.fildValue === undefined) {
            if (item.fildValue !== 'countryCode') {
              item.fildValue = resData?.[item.fildName];
            }
          }
        });
        const deleteCountriCode = updateValue?.filter(
          (item: any) => item.fildName !== 'countryCode'
        );
        const value = convertArrayToObject(deleteCountriCode);

        const addUserId = {
          ...value,
          subregionId: selectedField?.subregion_id,
        };

        saveData(addUserId).then((res: any) => {
          if (res?.result === '1') {
            closeModalFunction();
          }
        });
      });
    }, [
      inputsValue,
      getFgData,
      editDataPayload,
      selectedField?.subregion_id,
      saveData,
      closeModalFunction,
    ]);

    return (
      <div
        className={classNames(cls.osSubregionsEditModalContent, {}, [
          className,
        ])}
      >
        <CheckFormEnterM checkFormEnterName="OS_SUBREGION_ADD_EDIT" />
        <ModalHeader
          title={t('Реквизиты организации') || ''}
          onClose={closeModalFunction}
        />
        <VStack max gap="32" className="formContent">
          {getInitData && (
            <InputsFields
              className={cls.filters}
              filterData={getInitData?.data.attr}
              isFilter={false}
              setInputsValues={(data: any) => setInputsValue(data)}
              errorData={saveDataQ?.data}
              attrData={getInitData?.data?.attrData}
              defaultValuesData={defaultData}
            />
          )}
        </VStack>
        <SubmitFormFooter
          onClose={closeModalFunction}
          onSubmit={handleSubmit}
        />
      </div>
    );
  }
);
