import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreSetFormActionAuditWidgets.module.scss';
import { Button, HStack, Texts, classNames } from 'Modules/UiKit';
import {
  getAccessTreeQ,
  saveConfigAccessTreeM,
} from '../../api/CoreSetFormActionAuditWidgets';
import { Icon } from '@iconify/react';

import { Tree } from 'primereact/tree';
import { convertToNormalizaCheckboxDefaultValue } from 'widgets/InputsFields';
import { CoreSetFormActionAuditEntities } from 'Modules/Moduls/Core/entities/CoreSetFormActionAuditEntities';

export interface CoreSetFormActionAuditWidgetsProps {
  className?: string;
}

export const CoreSetFormActionAuditWidgets = memo(
  ({ className }: CoreSetFormActionAuditWidgetsProps) => {
    const { t } = useTranslation();
    const { data: getAccessTreeQData, isLoading } = getAccessTreeQ(null);
    const [saveConfigAccessTree, { data: saveConfigAccessTreeData }] =
      saveConfigAccessTreeM();

    const [nodes, setNodes]: any = useState(getAccessTreeQData?.data?.access);
    const [selectedKeys, setSelectedKeys]: any = useState();

    const handleSave = () => {
      const dataForTree = convertToNormalizaCheckboxDefaultValue(
        getAccessTreeQData?.data?.accessData
      );

      if (selectedKeys) {
        const checked = Object.keys(selectedKeys).filter(
          (key) => selectedKeys[key].checked
        );
        saveConfigAccessTree(checked);
      }
      if (selectedKeys === undefined) {
        const checked = Object.keys(dataForTree).filter(
          (key) => dataForTree[key].checked
        );
        saveConfigAccessTree(checked);
      }
    };

    // -------------------------------------

    return (
      <div
        className={classNames(cls.coreSetFormActionAuditWidgets, {}, [
          className,
        ])}
      >
        <Button
          onClick={handleSave}
          theme="background"
          className={cls.addButtons}
        >
          <HStack gap="16">
            <Icon width={20} icon="zondicons:add-outline" />
            <Texts text={t('Сохранить')} />
          </HStack>
        </Button>
        <div className={cls.divider}></div>
        {getAccessTreeQData && (
          <CoreSetFormActionAuditEntities
            treeData={getAccessTreeQData}
            selectedKeys={selectedKeys}
            setSelectedKeys={setSelectedKeys}
            nodes={nodes}
          />
        )}
      </div>
    );
  }
);
