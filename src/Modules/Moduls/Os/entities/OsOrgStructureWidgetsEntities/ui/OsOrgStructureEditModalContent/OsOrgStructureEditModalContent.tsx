import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsOrgStructureEditModalContent.module.scss';
import {
  CheckFormEnterM,
  ModalHeader,
  SubmitFormFooter,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { convertArrayToObject, InputsFields } from 'widgets/InputsFields';

interface OsOrgStructureEditModalContentProps {
  className?: string;
  selectedField: any;
  closeModalFunction: any;
  getInit: any;
  saveData: any;
  getFgData: any;
  getInitData: any;
  saveDataQ: any;
}

export const OsOrgStructureEditModalContent = memo(
  (props: OsOrgStructureEditModalContentProps) => {
    const {
      className,
      closeModalFunction,
      getFgData,
      getInit,
      getInitData,
      saveData,
      saveDataQ,
      selectedField,
    } = props;
    const { t } = useTranslation('os');

    const [defaultData, setDefaultData] = useState<any>([]);

    const [inputsValue, setInputsValue]: any = useState([]);

    const editDataPayload = useMemo(() => {
      return {
        code: 'OS_ORGANIZATION_FIELDS',
        params: [selectedField?.organizationId],
      };
    }, [selectedField?.organizationId]);

    useEffect(() => {
      getInit('OS_ORGANIZATION_FIELDS');

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
        const addUserId = {
          ...value,
          parentOrganizationId: selectedField?.organizationId,
        };

        saveData(addUserId);

        if (res?.data.result === '1') {
          closeModalFunction();
        }
        // }
      });
    }, [
      inputsValue,
      getFgData,
      editDataPayload,
      selectedField?.organizationId,
      saveData,
      closeModalFunction,
    ]);

    return (
      <div
        className={classNames(
          cls.osOrgStructureWidgetsFeaturesEditModalContent,
          {},
          [className]
        )}
      >
        <CheckFormEnterM checkFormEnterName="OS_ORG_STRUCTURE_ADD_EDIT" />
        <ModalHeader
          title={t('Реквизиты организации') || ''}
          onClose={closeModalFunction}
        />
        <VStack max gap="32" className="formContent">
          {getInitData && (
            <InputsFields
              className={cls.filters}
              filterData={getInitData?.data.attr}
              isFilter={false}
              setInputsValues={(data: any) => setInputsValue(data)}
              errorData={saveDataQ?.data}
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
