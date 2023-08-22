import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './EditModalContent.module.scss';
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

interface EditModalContentProps {
  className?: string;
  selectedField: any;
  closeModalFunction: () => void;
  refetchGridData?: () => void;
  saveData: any;
  saveDataQ: any;
  getData: any;
  fildListAddNewEdits: any;
}

export const EditModalContent = memo((props: EditModalContentProps) => {
  const {
    className,
    selectedField,
    closeModalFunction,
    refetchGridData,
    getData,
    saveData,
    saveDataQ,
    fildListAddNewEdits,
  } = props;
  const { t } = useTranslation('core');

  const [defaultData, setDefaultData] = useState<any>([]);
  const [inputsValue, setInputsValue]: any = useState([]);
  const [isErrored, setIsErrored] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    getData(selectedField?.user_id).then((res: any) => {
      setDefaultData(res.data);
    });
  }, []);

  const handleSubmit = useCallback(() => {
    const updateValue = inputsValue;
    getData(selectedField?.user_id).then((res: any) => {
      const resData = res?.data?.data;
      updateValue?.forEach((item: any) => {
        if (item.fildValue === null || item.fildValue === undefined) {
          item.fildValue = resData?.[item.fildName];
        }
      });
      const value = convertArrayToObject(updateValue);
      const addUserId = { ...value, userId: selectedField?.user_id };

      saveData(addUserId).then((res: any) => {
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
      // }
    });
  }, [
    inputsValue,
    getData,
    selectedField?.user_id,
    saveData,
    refetchGridData,
    closeModalFunction,
  ]);

  return (
    <div className={classNames(cls.editModalContent, {}, [className])}>
      <CheckFormEnterM checkFormEnterName="CORE_USER_ADD_EDIT" />
      <ModalHeader
        title={t('Реквизиты пользователя') || ''}
        onClose={closeModalFunction}
      />
      <VStack className="formContent" max>
        {isErrored && <ErrorMessage isEdit isOpen setIsError={setIsErrored} />}
        {isSuccess && <Toast isEdit />}
        <InputsFields
          className={cls.filters}
          filterData={fildListAddNewEdits}
          modalTitle={t('Справочник')}
          isFilter={false}
          setInputsValues={(data: any) => setInputsValue(data)}
          defaultValuesData={defaultData}
          errorData={saveDataQ?.data}
        />
      </VStack>

      <SubmitFormFooter onClose={closeModalFunction} onSubmit={handleSubmit} />
    </div>
  );
});
