import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './FormsAndActionsModalContents.module.scss';
import {
  CheckFormEnterM,
  ModalHeader,
  SubmitFormFooter,
  VStack,
  classNames,
} from 'Modules/UiKit';

import { CheckboxTreeDataProps } from 'shared/Globals/types/checkboxTreeTypes';
import { convertToNormalizaCheckboxDefaultValue } from 'widgets/InputsFields';
import { RoleReturnData } from 'Modules/Moduls/Core/features/CoreRolesFeatures/models/types/roleTypes';
import { Tree } from 'primereact/tree';

interface FormsAndActionsModalContentsProps {
  className?: string;
  selectedField: any;
  closeModalFunction: any;
  getAccessTree: any;
  getAccessTreeData: any;
  saveAccessData: any;
}

export const FormsAndActionsModalContents = memo(
  (props: FormsAndActionsModalContentsProps) => {
    const {
      className,
      closeModalFunction,
      selectedField,
      getAccessTree,
      getAccessTreeData,
      saveAccessData,
    } = props;
    // const userAcces = ['OS', 'OS_SYS_ADMIN'];
    const userAcces = [selectedField.application_code, selectedField.role_code];

    const { t } = useTranslation('core');

    // -----------
    // const [checked, setChecked] = useState<string[]>(
    //   getAccessTreeData?.data?.accessData ?? []
    // );
    // const [checkboxTreeData, setCheckboxTreeData]: any = useState();

    // const [expanded, setExpanded] = useState<string[]>([]);

    // const onCheck = (value: string[]) => {
    //   setChecked(value);
    // };

    // const onExpand = (value: string[]) => {
    //   setExpanded(value);
    // };

    useEffect(() => {
      getAccessTree(userAcces).then((res: CheckboxTreeDataProps | any) => {
        if (res?.data?.result === '1') {
          // setChecked(res?.data?.data?.accessData);
          setSelectedKeys(
            convertToNormalizaCheckboxDefaultValue(res?.data?.data?.accessData)
          );
          setNodes(res?.data?.data?.access);
          // setCheckboxTreeData(
          //   transformCheckboxTreeData(res?.data?.data?.access)
          // );
        }
      });
    }, []);

    const [nodes, setNodes]: any = useState([]);
    const [selectedKeys, setSelectedKeys]: any = useState();

    const handleSubmit = () => {
      const checked = Object.keys(selectedKeys).filter(
        (key) => selectedKeys[key].checked
      );
      const payloadData = {
        applicationCode: selectedField.application_code,
        code: selectedField.role_code,
        params: checked,
      };
      saveAccessData(payloadData).then((res: RoleReturnData | any) => {
        if (res.data.result === '1') {
          closeModalFunction();
        }
      });
    };

    return (
      <div
        className={classNames(cls.formsAndActionsModalContents, {}, [
          className,
        ])}
      >
        <CheckFormEnterM checkFormEnterName="CORE_ROLE_FORMS_ACTIONS" />
        <ModalHeader
          title={t('Формы и действия роли') || ''}
          onClose={closeModalFunction}
        />
        <VStack max gap="32" className={cls.formContent}>
          {/* {checkboxTreeData && checked && (
            <CheckboxTree
              checked={checked}
              expanded={expanded}
              nodes={checkboxTreeData}
              onCheck={onCheck}
              onExpand={onExpand}
              iconsClass="fa5"
            />
          )} */}
          {nodes && (
            <Tree
              value={nodes}
              selectionMode="checkbox"
              selectionKeys={selectedKeys}
              onSelectionChange={(e: any) => setSelectedKeys(e.value)}
              className="w-full md:w-30rem"
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
