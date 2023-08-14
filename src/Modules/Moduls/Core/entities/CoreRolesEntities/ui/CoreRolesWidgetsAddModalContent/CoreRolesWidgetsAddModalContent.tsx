import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreRolesWidgetsAddModalContent.module.scss';
import {
  ModalHeader,
  SubmitFormFooter,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { convertArrayToObject, InputsFields } from 'widgets/InputsFields';
import { getInitM } from 'shared/Globals/globalApi/globalApi';
import { AddDataRoleM } from 'Modules/Moduls/Core/features/CoreRolesFeatures/api/roleApi';

interface CoreRolesWidgetsAddModalContentProps {
  className?: string;
  closeModalFunction: () => void;
}

export const CoreRolesWidgetsAddModalContent = memo(
  (props: CoreRolesWidgetsAddModalContentProps) => {
    const { className, closeModalFunction } = props;
    const { t } = useTranslation('core');
    const [getInit, { data: getInitData }] = getInitM();

    const [addDataRole, { data: addDataRoleQ }] = AddDataRoleM();

    const [inputsValue, setInputsValue] = useState([]);

    useEffect(() => {
      getInit('CORE_ROLE_FIELDS');
    }, []);

    const handleSubmit = useCallback(() => {
      const value = convertArrayToObject(inputsValue);
      addDataRole(value);
      if (addDataRoleQ?.result === '1') {
        closeModalFunction();
      }
    }, [addDataRole, closeModalFunction, inputsValue, addDataRoleQ?.result]);

    console.log('getInitData', getInitData);

    return (
      <div
        className={classNames(cls.coreRolesWidgetsAddModalContent, {}, [
          className,
        ])}
      >
        <ModalHeader
          title={t('Реквизиты пользовательской роли') || ''}
          onClose={closeModalFunction}
        />
        <VStack className="formContent" max>
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
