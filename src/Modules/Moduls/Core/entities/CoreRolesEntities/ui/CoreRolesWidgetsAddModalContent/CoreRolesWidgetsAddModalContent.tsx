import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreRolesWidgetsAddModalContent.module.scss';
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

interface CoreRolesWidgetsAddModalContentProps {
  className?: string;
  closeModalFunction: () => void;
  getInit: any;
  addDataRole: any;
  getInitData: any;
  addDataRoleQ: any;
  refetchGridData?: () => void;
}

export const CoreRolesWidgetsAddModalContent = memo(
  (props: CoreRolesWidgetsAddModalContentProps) => {
    const {
      className,
      closeModalFunction,
      addDataRole,
      addDataRoleQ,
      getInit,
      getInitData,
      refetchGridData,
    } = props;
    const { t } = useTranslation('core');

    const [inputsValue, setInputsValue] = useState([]);

    const [isErrored, setIsErrored] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
      getInit('CORE_ROLE_FIELDS');
    }, []);

    const handleSubmit = useCallback(() => {
      const value = convertArrayToObject(inputsValue);
      addDataRole(value).then((res: any) => {
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
    }, [inputsValue, addDataRole, refetchGridData, closeModalFunction]);

    return (
      <div
        className={classNames(cls.coreRolesWidgetsAddModalContent, {}, [
          className,
        ])}
      >
        <CheckFormEnterM checkFormEnterName={'CORE_USER_ROLE_ADD_EDIT'} />
        <ModalHeader
          title={t('Реквизиты пользовательской роли') || ''}
          onClose={closeModalFunction}
        />
        <VStack className="formContent" max>
          {isErrored && <ErrorMessage isAdd isOpen setIsError={setIsErrored} />}
          {isSuccess && <Toast isAdd />}
          {!getInitData?.data?.attrData && <InputsDataSkeleton />}
          {getInitData?.data?.attrData?.length === 0 && <NoData />}

          {getInitData && (
            <InputsFields
              className={cls.filters}
              filterData={getInitData?.data.attr ?? []}
              isFilter={false}
              setInputsValues={(data: any) => setInputsValue(data)}
              errorData={addDataRoleQ?.data}
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
