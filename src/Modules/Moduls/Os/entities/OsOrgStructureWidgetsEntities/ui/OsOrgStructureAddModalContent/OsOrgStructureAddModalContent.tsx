import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsOrgStructureAddModalContent.module.scss';
import {
  CheckFormEnterM,
  ModalHeader,
  SubmitFormFooter,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { convertArrayToObject, InputsFields } from 'widgets/InputsFields';

interface OsOrgStructureAddModalContentProps {
  className?: string;
  closeModalFunction: () => void;
  getInit?: any;
  saveData?: any;
  getInitData?: any;
  saveDataQ?: any;
  selectedField?: any;
}

export const OsOrgStructureAddModalContent = memo(
  (props: OsOrgStructureAddModalContentProps) => {
    const {
      className,
      closeModalFunction,
      saveData,
      saveDataQ,
      getInit,
      getInitData,
      selectedField,
    } = props;
    const { t } = useTranslation('os');

    const [inputsValue, setInputsValue] = useState([]);

    useEffect(() => {
      getInit('OS_ORGANIZATION_FIELDS');
    }, []);

    const handleSubmit = useCallback(() => {
      const value = convertArrayToObject(inputsValue);
      const currentData = {
        ...value,
        parentOrganizationId: selectedField?.organizationId,
      };
      saveData(currentData);
      if (saveDataQ?.result === '1') {
        closeModalFunction();
      }
    }, [
      inputsValue,
      selectedField?.organizationId,
      saveData,
      saveDataQ?.result,
      closeModalFunction,
    ]);

    return (
      <div
        className={classNames(
          cls.osOrgStructureWidgetsEntitiesAddModalContent,
          {},
          [className]
        )}
      >
        <CheckFormEnterM checkFormEnterName="OS_ORG_STRUCTURE_ADD_EDIT" />
        <ModalHeader
          title={t('Реквизиты организации') || ''}
          onClose={closeModalFunction}
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
      </div>
    );
  }
);
