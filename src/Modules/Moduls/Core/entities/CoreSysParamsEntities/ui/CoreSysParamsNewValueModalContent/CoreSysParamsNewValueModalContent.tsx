import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreSysParamsNewValueModalContent.module.scss';
import {
  CheckFormEnterM,
  ModalHeader,
  SubmitFormFooter,
  Texts,
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
    } = props;
    const { t } = useTranslation();

    const [inputsValue, setInputsValue] = useState([]);

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
          closeModalFunction();
        }
      });
    }, [inputsValue, data, saveData, closeModalFunction]);

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
