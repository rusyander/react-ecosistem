import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import cls from './OsPopulatedLocalitiesEditModalContent.module.scss';
import {
  CheckFormEnterM,
  ModalHeader,
  SubmitFormFooter,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { convertArrayToObject, InputsFields } from 'widgets/InputsFields';
import { useTranslation } from 'react-i18next';

interface OsPopulatedLocalitiesEditModalContentProps {
  className?: string;
  closeModalFunction: any;
  getInit: any;
  saveData: any;
  getInitData: any;
  saveDataQ: any;
  getFgData: any;
  selectedField: any;
}

export const OsPopulatedLocalitiesEditModalContent = memo(
  (props: OsPopulatedLocalitiesEditModalContentProps) => {
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
    const { t } = useTranslation('os');
    // console.log('selectedField', selectedField);

    const editDataPayload = useMemo(() => {
      return {
        code: 'OS_POPULATED_LOCALITY_FIELDS',
        params: [selectedField?.country_code],
      };
    }, [selectedField?.country_code]);

    useEffect(() => {
      getInit('OS_POPULATED_LOCALITY_FIELDS');

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
            item.fildValue = resData?.[item.fildName];
          }
        });
        const value = convertArrayToObject(updateValue);
        const addUserId = {
          ...value,
        };

        saveData(addUserId).then((res: any) => {
          if (res?.result === '1') {
            closeModalFunction();
          }
        });
      });
    }, [inputsValue, getFgData, editDataPayload, saveData, closeModalFunction]);

    return (
      <div
        className={classNames(cls.osPopulatedLocalitiesEditModalContent, {}, [
          className,
        ])}
      >
        <CheckFormEnterM checkFormEnterName="OS_POPULATED_LOCALITY_ADD_EDIT" />
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
