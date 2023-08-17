import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreSetFormActionAuditEntities.module.scss';
import { VStack, classNames } from 'Modules/UiKit';
import { CheckboxTreeDataProps } from 'shared/Globals/types/checkboxTreeTypes';
import { convertToNormalizaCheckboxDefaultValue } from 'widgets/InputsFields';
import { Tree } from 'primereact/tree';

interface CoreSetFormActionAuditEntitiesProps {
  className?: string;
  treeData?: CheckboxTreeDataProps;
  selectedKeys: any;
  setSelectedKeys: any;
  nodes: any;
}

export const CoreSetFormActionAuditEntities = memo(
  (props: CoreSetFormActionAuditEntitiesProps) => {
    const { className, treeData, selectedKeys, setSelectedKeys, nodes } = props;
    const { t } = useTranslation();

    return (
      <div
        className={classNames(cls.coreSetFormActionAuditEntities, {}, [
          className,
        ])}
      >
        <VStack max gap="32" className={cls.formContent}>
          <Tree
            value={nodes ? nodes : treeData?.data?.access}
            selectionMode="checkbox"
            selectionKeys={
              selectedKeys
                ? selectedKeys
                : convertToNormalizaCheckboxDefaultValue(
                    treeData?.data?.accessData
                  )
            }
            onSelectionChange={(e: any) => setSelectedKeys(e.value)}
            className="w-full md:w-30rem"
          />
        </VStack>
      </div>
    );
  }
);
