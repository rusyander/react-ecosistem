import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './RolesGridAddModalContent.module.scss';
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
import {
  InputsFields,
  convertArrayToObject,
  transformData,
} from 'widgets/InputsFields';

interface RolesGridAddModalContentProps {
  className?: string;
  closeModalFunction: () => void;

  saveDataRole: any;
  saveDataRoleData: any;
  initPolicyDataRole: any;
  initPolicyDataRoleData: any;
  getInit: any;
  getInitData: any;
  refetchGridData: any;
}

export const RolesGridAddModalContent = memo(
  (props: RolesGridAddModalContentProps) => {
    const {
      className,
      closeModalFunction,
      getInit,
      getInitData,
      initPolicyDataRole,
      initPolicyDataRoleData,
      refetchGridData,
      saveDataRole,
      saveDataRoleData,
    } = props;
    const { t } = useTranslation('core');

    const [inputsValue, setInputsValue]: any = useState([]);
    const [inputsValueInitPolicy, setInputsValueInitPolicy]: any = useState([]);
    const [isErrored, setIsErrored] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    useEffect(() => {
      getInit('CORE_USER_ROLES');
      initPolicyDataRole({ applicationCode: 'CORE', userRoleId: null });
    }, []);

    const handleSubmit = useCallback(() => {
      const defaultData = {
        fildName: 'CORE_ADMIN_ORG_PERM',
        fildValue: 'CURRENT',
      };

      const value = convertArrayToObject(inputsValue);
      const currValue = {
        ...value,
        userId: 1,
        policies: {},
        userRoleId: null,
      };

      const policy: any =
        transformData(inputsValueInitPolicy, defaultData) ?? false;
      const currentData = {
        ...value,
        userId: 1,
        userRoleId: null,
        applicationCode: 'CORE',
        policies: policy === false ? defaultData : policy,
      };
      if (inputsValue[0]?.fildValue === null) {
        saveDataRole(currValue).then((res: any) => {
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
      } else {
        saveDataRole(currentData).then((res: any) => {
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
      }
    }, [
      inputsValue,
      inputsValueInitPolicy,
      saveDataRole,
      refetchGridData,
      closeModalFunction,
    ]);

    return (
      <div
        className={classNames(cls.rolesGridAddModalContent, {}, [className])}
      >
        <CheckFormEnterM checkFormEnterName={'CORE_USER_ROLE_ADD_EDIT'} />
        <ModalHeader
          title={t('Реквизиты пользователя') || ''}
          onClose={closeModalFunction}
        />
        <VStack max gap="32" className="formContent">
          {isErrored && <ErrorMessage isAdd isOpen setIsError={setIsErrored} />}
          {isSuccess && <Toast isAdd />}
          {!getInitData?.data?.attrData && <InputsDataSkeleton />}
          {getInitData?.data?.attrData?.length === 0 && <NoData />}
          {getInitData && (
            <InputsFields
              className={cls.filters}
              filterData={getInitData?.data.attr}
              modalTitle={t('Реквизиты пользовательской роли')}
              isFilter={false}
              setInputsValues={(data: any) => setInputsValue(data)}
              errorData={saveDataRoleData?.data}
              attrData={getInitData?.data?.attrData}
            />
          )}
          {inputsValue[0]?.fildValue !== null && initPolicyDataRoleData && (
            <InputsFields
              className={cls.filters}
              filterData={initPolicyDataRoleData?.data.attr}
              isFilter={false}
              setInputsValues={(data: any) => setInputsValueInitPolicy(data)}
              attrData={initPolicyDataRoleData?.data?.attrData}
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
