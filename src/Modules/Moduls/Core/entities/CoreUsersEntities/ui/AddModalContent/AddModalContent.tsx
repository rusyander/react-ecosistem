import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './AddModalContent.module.scss';
import {
  CheckFormEnterM,
  ErrorMessage,
  ModalHeader,
  SubmitFormFooter,
  Toast,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { convertArrayToObject, InputsFields } from 'widgets/InputsFields';

interface AddModalContentProps {
  className?: string;
  closeModalFunction: () => void;
  saveData: any;
  saveDataQ: any;
  refetchGridData?: () => void;
  fildListAddNews: any;
}

export const AddModalContent = memo((props: AddModalContentProps) => {
  const {
    className,
    closeModalFunction,
    saveData,
    saveDataQ,
    refetchGridData,
    fildListAddNews,
  } = props;
  const { t } = useTranslation('core');

  const [inputsValue, setInputsValue] = useState([]);
  const [isErrored, setIsErrored] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = useCallback(() => {
    const value = convertArrayToObject(inputsValue);
    saveData(value).then((res: any) => {
      if (res?.data?.result === '1') {
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
    <div className={classNames(cls.addModalContent, {}, [className])}>
      <CheckFormEnterM checkFormEnterName="CORE_USER_ADD_EDIT" />
      <ModalHeader
        title={t('Реквизиты пользователя') || ''}
        onClose={closeModalFunction}
      />
      <VStack className="formContent" max>
        {isErrored && <ErrorMessage isAdd isOpen setIsError={setIsErrored} />}
        {isSuccess && <Toast isAdd />}

        <InputsFields
          className={cls.filters}
          filterData={fildListAddNews}
          modalTitle={t('Справочник')}
          isFilter={false}
          setInputsValues={(data: any) => setInputsValue(data)}
          errorData={saveDataQ?.data}
        />
      </VStack>
      <SubmitFormFooter onClose={closeModalFunction} onSubmit={handleSubmit} />
    </div>
  );
});
