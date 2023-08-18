import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsOrgStructureNewOrganizationsModelContent.module.scss';
import {
  CheckFormEnterM,
  ModalHeader,
  SubmitFormFooter,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { convertArrayToObject, InputsFields } from 'widgets/InputsFields';

interface OsOrgStructureNewOrganizationsModelContentProps {
  className?: string;
  closeModalFunction: () => void;
  getInit?: any;
  saveData?: any;
  getInitData?: any;
  saveDataQ?: any;
}

export const OsOrgStructureNewOrganizationsModelContent = memo(
  (props: OsOrgStructureNewOrganizationsModelContentProps) => {
    const {
      className,
      closeModalFunction,
      saveData,
      saveDataQ,
      getInit,
      getInitData,
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
        // parentOrganizationId: null,
      };
      saveData(currentData);
      if (saveDataQ?.result === '1') {
        closeModalFunction();
      }
    }, [inputsValue, saveData, saveDataQ?.result, closeModalFunction]);

    return (
      <div
        className={classNames(
          cls.osOrgStructureNewOrganizationsModelContent,
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
