import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './RolesGridAddModalContent.module.scss';
import {
  ModalHeader,
  SubmitFormFooter,
  VStack,
  classNames,
} from 'Modules/UiKit';
import {
  InputsFields,
  convertArrayToObject,
  transformData,
} from 'widgets/InputsFields';
import { getInitM } from 'shared/Globals/globalApi/globalApi';
import { InitPolicyDataRoleM, SaveDataRoleM } from '../../../../api/roleApi';

interface RolesGridAddModalContentProps {
  className?: string;
  closeModalFunction: () => void;
}

export const RolesGridAddModalContent = memo(
  (props: RolesGridAddModalContentProps) => {
    const { className, closeModalFunction } = props;
    const { t } = useTranslation('core');

    const [saveDataRole, { data: saveDataRoleData }] = SaveDataRoleM();
    const [initPolicyDataRole, { data: initPolicyDataRoleData }] =
      InitPolicyDataRoleM();

    const [getInit, { data: getInitData }] = getInitM();

    const [inputsValue, setInputsValue]: any = useState([]);
    const [inputsValueInitPolicy, setInputsValueInitPolicy]: any = useState([]);
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
        saveDataRole(currValue);
      } else {
        saveDataRole(currentData);
      }
      if (saveDataRoleData?.result === '1') {
        closeModalFunction();
      }
    }, [
      inputsValue,
      inputsValueInitPolicy,
      saveDataRole,
      saveDataRoleData?.result,
      closeModalFunction,
    ]);

    return (
      <div
        className={classNames(cls.rolesGridAddModalContent, {}, [className])}
      >
        <ModalHeader
          title={t('Реквизиты пользователя') || ''}
          onClose={closeModalFunction}
        />
        <VStack max gap="32" className="formContent">
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
