import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreSysParamsNewValueModalContent.module.scss';
import {
  CheckFormEnterM,
  ErrorMessage,
  InputsDataSkeleton,
  ModalHeader,
  NoData,
  SubmitFormFooter,
  Texts,
  Toast,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { convertArrayToObject, InputsFields } from 'widgets/InputsFields';

interface CoreSysParamsNewValueModalContentProps {
  className?: string;
  closeModalFunction: any;
  getInit: any;
  saveData: any;
  getInitData: any;
  saveDataQ: any;
  fildValue: any;
  selectedField: any;
  refetchGridData?: () => void;
}

export const CoreSysParamsNewValueModalContent = memo(
  (props: CoreSysParamsNewValueModalContentProps) => {
    const {
      className,
      closeModalFunction,
      fildValue,
      getInit,
      getInitData,
      saveData,
      saveDataQ,
      selectedField,
      refetchGridData,
    } = props;
    const { t } = useTranslation();

    const [inputsValue, setInputsValue] = useState([]);
    const [isErrored, setIsErrored] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const data = useMemo(
      () => ({
        ...fildValue,
        applicationCode: 'CORE',
        parameterCode: selectedField?.parameter_code,
        attributeCode: selectedField?.attribute_code,
      }),
      [fildValue, selectedField]
    );

    useEffect(() => {
      getInit(data);
    }, []);

    const handleSubmit = useCallback(() => {
      const notNulableData = inputsValue.filter(
        (item: any) => item.fildValue !== null && item.fildValue !== undefined
      );
      const value = convertArrayToObject(notNulableData);
      const currentData = {
        ...data,
        values: { ...value },
      };

      saveData(currentData).then((res: any) => {
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
    }, [inputsValue, data, saveData, refetchGridData, closeModalFunction]);

    return (
      <div
        className={classNames(cls.coreSysParamsNewValueModalContent, {}, [
          className,
        ])}
      >
        <CheckFormEnterM checkFormEnterName="CORE_LEVEL_VALUES_PARAMS" />
        <VStack gap="16" max>
          <ModalHeader
            title={t('Значения параметра') || ''}
            onClose={closeModalFunction}
          />
          <Texts
            text={t('Вести учёт действий пользователя?')}
            className={cls.usersShecheds}
          />
          <VStack className="formContent" max>
            {isErrored && (
              <ErrorMessage isAdd isOpen setIsError={setIsErrored} />
            )}
            {isSuccess && <Toast isAdd />}
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
        </VStack>
      </div>
    );
  }
);
