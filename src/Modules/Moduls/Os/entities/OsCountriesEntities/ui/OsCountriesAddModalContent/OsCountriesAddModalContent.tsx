import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsCountriesAddModalContent.module.scss';
import {
  CheckFormEnterM,
  ErrorMessage,
  InputsDataSkeleton,
  ModalHeader,
  NoData,
  SubmitFormFooter,
  Toast,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { convertArrayToObject, InputsFields } from 'widgets/InputsFields';

interface OsCountriesAddModalContentProps {
  className?: string;
  closeModalFunction: any;
  getInit: any;
  saveData: any;
  getInitData: any;
  saveDataQ: any;
  refetchGridData?: () => void;
}

export const OsCountriesAddModalContent = memo(
  (props: OsCountriesAddModalContentProps) => {
    const {
      className,
      saveData,
      saveDataQ,
      closeModalFunction,
      getInit,
      getInitData,
      refetchGridData,
    } = props;
    const { t } = useTranslation('os');

    const [inputsValue, setInputsValue] = useState([]);
    const [isErrored, setIsErrored] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    useEffect(() => {
      getInit('OS_COUNTRY_FIELDS');
    }, []);

    const handleSubmit = useCallback(() => {
      const value = convertArrayToObject(inputsValue);
      const currentData = {
        ...value,
      };
      saveData(currentData).then((res: any) => {
        if (res?.result === '1') {
          refetchGridData?.();
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            closeModalFunction();
          }, 1000);
        } else {
          setIsErrored(true);
        }
      });
    }, [inputsValue, saveData, refetchGridData, closeModalFunction]);

    return (
      <div
        className={classNames(cls.osCountriesAddModalContent, {}, [className])}
      >
        <CheckFormEnterM checkFormEnterName="OS_COUNTRY_ADD_EDIT" />
        <ModalHeader
          title={t('Реквизиты организации') || ''}
          onClose={closeModalFunction}
        />
        {isErrored && <ErrorMessage isAdd isOpen setIsError={setIsErrored} />}
        {isSuccess && <Toast isAdd />}
        <VStack className="formContent" max>
          {!getInitData?.data?.attrData && <InputsDataSkeleton />}
          {getInitData?.data?.attrData?.length === 0 && <NoData />}
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
