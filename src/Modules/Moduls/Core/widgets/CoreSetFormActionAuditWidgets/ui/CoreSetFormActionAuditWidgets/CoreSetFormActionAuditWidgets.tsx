import { memo, useState } from 'react';
import cls from './CoreSetFormActionAuditWidgets.module.scss';
import {
  CheckFormEnterM,
  IsError,
  NoData,
  TreeDataSkeleton,
  classNames,
} from 'Modules/UiKit';
import {
  getAccessTreeQ,
  saveConfigAccessTreeM,
} from '../../api/CoreSetFormActionAuditWidgets';
import { CoreSetFormActionAuditEntities } from 'Modules/Moduls/Core/entities/CoreSetFormActionAuditEntities';
import { CoreSetFormActionAuditSave } from 'Modules/Moduls/Core/features/CoreSetFormActionAuditFeatures';

export interface CoreSetFormActionAuditWidgetsProps {
  className?: string;
}

export const CoreSetFormActionAuditWidgets = memo(
  ({ className }: CoreSetFormActionAuditWidgetsProps) => {
    const { data: getAccessTreeQData, isLoading, error } = getAccessTreeQ(null);
    const [saveConfigAccessTree] = saveConfigAccessTreeM();

    const [nodes, setNodes]: any = useState(getAccessTreeQData?.data?.access);
    const [selectedKeys, setSelectedKeys] = useState();

    return (
      <div
        className={classNames(cls.coreSetFormActionAuditWidgets, {}, [
          className,
        ])}
      >
        <CheckFormEnterM checkFormEnterName={'CORE_SET_FORM_ACTION_AUDIT'} />

        <CoreSetFormActionAuditSave
          getAccessTreeQData={getAccessTreeQData}
          selectedKeys={selectedKeys}
          saveConfigAccessTree={saveConfigAccessTree}
        />
        <div className={cls.divider}></div>
        {isLoading && <TreeDataSkeleton />}
        {error && <IsError />}
        {nodes?.length === 0 && <NoData />}
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
