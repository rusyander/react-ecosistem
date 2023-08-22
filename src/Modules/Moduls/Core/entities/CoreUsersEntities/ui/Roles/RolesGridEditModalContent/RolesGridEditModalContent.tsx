import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './RolesGridEditModalContent.module.scss';
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
  convertArrayToObject,
  transformData,
  InputsFields,
} from 'widgets/InputsFields';

interface RolesGridEditModalContentProps {
  className?: string;
  selectedField: any;
  closeModalFunction: () => void;
  saveDataRole: any;
  saveDataRoleData: any;
  initPolicyDataRole: any;
  initPolicyDataRoleData: any;
  getFgData: any;
  getInit: any;
  getInitData: any;
  refetchGridData: any;
}

export const RolesGridEditModalContent = memo(
  (props: RolesGridEditModalContentProps) => {
    const {
      className,
      closeModalFunction,
      selectedField,
      getFgData,
      getInit,
      getInitData,
      initPolicyDataRole,
      initPolicyDataRoleData,
      refetchGridData,
      saveDataRole,
      saveDataRoleData,
    } = props;
    const { t } = useTranslation();

    const [inputsValue, setInputsValue]: any = useState([]);
    const [inputsValueInitPolicy, setInputsValueInitPolicy]: any = useState([]);

    const [defaultData, setDefaultData] = useState<any>([]);
    const [isErrored, setIsErrored] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const editDataPayload = useMemo(() => {
      return {
        code: 'CORE_USER_ROLES',
        params: [selectedField?.user_role_id],
      };
    }, [selectedField?.user_role_id]);

    useEffect(() => {
      getInit('CORE_USER_ROLES');
      initPolicyDataRole({ applicationCode: 'CORE', userRoleId: null });
      getFgData(editDataPayload).then((res: any) => {
        setDefaultData(res.data);
      });
    }, []);

    const handleSubmit = useCallback(() => {
      const defaultDatas = {
        fildName: 'CORE_ADMIN_ORG_PERM',
        fildValue: 'CURRENT',
      };

      const value = convertArrayToObject(inputsValue);

      const policy: any =
        transformData(inputsValueInitPolicy, defaultDatas) ?? false;
      const currentData = {
        ...value,
        userId: selectedField?.user_id,
        userRoleId: selectedField?.user_role_id,
        applicationCode: selectedField?.application_code,
        policies: policy === false ? defaultDatas : policy,
      };

      getFgData(editDataPayload).then((res: any) => {
        const resData = res?.data?.data;

        for (const key in currentData) {
          if (currentData[key] === null && resData[key] !== null) {
            currentData[key] = resData[key];
          }
        }

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
      });
    }, [
      inputsValue,
      inputsValueInitPolicy,
      selectedField?.user_id,
      selectedField?.user_role_id,
      selectedField?.application_code,
      getFgData,
      editDataPayload,
      saveDataRole,
      refetchGridData,
      closeModalFunction,
    ]);

    return (
      <div
        className={classNames(cls.rolesGridEditModalContent, {}, [className])}
      >
        <CheckFormEnterM checkFormEnterName={'CORE_USER_ROLE_ADD_EDIT'} />
        <ModalHeader
          title={t('Реквизиты пользователя') || ''}
          onClose={closeModalFunction}
        />

        <VStack max gap="32" className="formContent">
          {isErrored && (
            <ErrorMessage isEdit isOpen setIsError={setIsErrored} />
          )}
          {isSuccess && <Toast isEdit />}
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
              defaultValuesData={defaultData}
            />
          )}
          {initPolicyDataRoleData && (
            <InputsFields
              className={cls.filters}
              filterData={initPolicyDataRoleData?.data.attr}
              isFilter={false}
              setInputsValues={(data: any) => setInputsValueInitPolicy(data)}
              attrData={initPolicyDataRoleData?.data?.attrData}
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
