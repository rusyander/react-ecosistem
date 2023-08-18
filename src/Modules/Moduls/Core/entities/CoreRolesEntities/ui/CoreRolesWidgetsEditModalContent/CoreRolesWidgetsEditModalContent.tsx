import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreRolesWidgetsEditModalContent.module.scss';
import {
  ModalHeader,
  SubmitFormFooter,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { convertArrayToObject, InputsFields } from 'widgets/InputsFields';

interface CoreRolesWidgetsEditModalContentProps {
  className?: string;
  selectedField: any;
  closeModalFunction: () => void;
  getInit: any;
  addDataRole: any;
  getFgData: any;
  getInitData: any;
  addDataRoleQ: any;
}

export const CoreRolesWidgetsEditModalContent = memo(
  (props: CoreRolesWidgetsEditModalContentProps) => {
    const {
      className,
      selectedField,
      closeModalFunction,
      addDataRole,
      addDataRoleQ,
      getFgData,
      getInit,
      getInitData,
    } = props;
    const { t } = useTranslation('core');
    const [defaultData, setDefaultData] = useState<any>([]);

    const [inputsValue, setInputsValue]: any = useState([]);

    const editDataPayload = useMemo(() => {
      return {
        code: 'CORE_ROLE_FIELDS',
        params: [selectedField?.role_code],
      };
    }, [selectedField?.role_code]);

    useEffect(() => {
      getInit('CORE_ROLE_FIELDS');

      getFgData(editDataPayload).then((res: any) => {
        setDefaultData(res.data);
      });
    }, []);

    const handleSubmit = useCallback(() => {
      const updateValue = inputsValue;

      getFgData(editDataPayload).then((res: any) => {
        const resData = res?.data?.data;

        updateValue?.forEach((item: any) => {
          if (item.fildValue === null || item.fildValue === undefined) {
            item.fildValue = resData?.[item.fildName];
          }
        });
        const value = convertArrayToObject(updateValue);
        const addUserId = { ...value, roleCode: selectedField?.role_code };

        addDataRole(addUserId);

        if (res?.data.result === '1') {
          closeModalFunction();
        }
        // }
      });
    }, [
      inputsValue,
      getFgData,
      editDataPayload,
      selectedField?.role_code,
      addDataRole,
      closeModalFunction,
    ]);

    return (
      <div
        className={classNames(cls.coreRolesWidgetsEditModalContent, {}, [
          className,
        ])}
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
              errorData={addDataRoleQ?.data}
              attrData={getInitData?.data?.attrData}
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
