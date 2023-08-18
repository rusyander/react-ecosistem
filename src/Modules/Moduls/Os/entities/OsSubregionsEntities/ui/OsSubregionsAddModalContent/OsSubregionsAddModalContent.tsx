import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsSubregionsAddModalContent.module.scss';
import {
  CheckFormEnterM,
  ModalHeader,
  SubmitFormFooter,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { convertArrayToObject, InputsFields } from 'widgets/InputsFields';

interface OsSubregionsAddModalContentProps {
  className?: string;
  closeModalFunction: any;
  getInit: any;
  saveData: any;
  getInitData: any;
  saveDataQ: any;
}

export const OsSubregionsAddModalContent = memo(
  (props: OsSubregionsAddModalContentProps) => {
    const {
      className,
      saveData,
      saveDataQ,
      closeModalFunction,
      getInit,
      getInitData,
    } = props;
    const { t } = useTranslation('os');

    const [inputsValue, setInputsValue] = useState([]);

    useEffect(() => {
      getInit('OS_SUBREGION_FIELDS');
    }, []);

    const handleSubmit = useCallback(() => {
      const deleteCountriCode = inputsValue?.filter(
        (item: any) =>
          item.fildName !== 'countryCode' && item.fildName !== 'regionId'
      );
      const value = convertArrayToObject(deleteCountriCode);

      const currentData = {
        ...value,
      };
      saveData(currentData).then((res: any) => {
        if (res?.result === '1') {
          closeModalFunction();
        }
      });
    }, [inputsValue, saveData, closeModalFunction]);

    return (
      <div
        className={classNames(cls.osSubregionsAddModalContent, {}, [className])}
      >
        <CheckFormEnterM checkFormEnterName="OS_SUBREGION_ADD_EDIT" />
        <ModalHeader
          title={t('Реквизиты организации') || ''}
          onClose={closeModalFunction}
        />
        <VStack className="formContent" max>
          {getInitData && (
            <InputsFields
              className={cls.filters}
              filterData={getInitData?.data.attr ?? []}
              isFilter={false}
              setInputsValues={(data: any) => setInputsValue(data)}
              errorData={saveDataQ?.data}
              attrData={getInitData?.data?.attrData}
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
