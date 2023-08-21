import { memo, useState } from 'react';
import cls from './OsOrgStructureWidgets.module.scss';
import { HeadersActionButtons, VStack, classNames } from 'Modules/UiKit';
import { TreeViewInModalContent } from 'features/FilterItems';
import {
  OsOrgStructureWidgetsFeaturesAdd,
  OsOrgStructureWidgetsFeaturesEdit,
  OsOrgStructureWidgetsFeaturesNewOrganizations,
  OsOrgStructureWidgetsFeaturesDelete,
} from 'Modules/Moduls/Os/features/OsOrgStructureWidgetsFeatures';

export interface OsOrgStructureWidgetsProps {
  className?: string;
}

export const OsOrgStructureWidgets = memo(
  ({ className }: OsOrgStructureWidgetsProps) => {
    const [selectedFild, setSelectedFild] = useState();

    return (
      <div className={classNames(cls.osOrgStructureWidgets, {}, [className])}>
        <HeadersActionButtons
          showRefreshButton={false}
          isOpenFilter={false}
          AddNewButtonComponents={[
            <OsOrgStructureWidgetsFeaturesAdd
              key={1}
              selectedField={selectedFild}
            />,
            <OsOrgStructureWidgetsFeaturesEdit
              key={2}
              selectedField={selectedFild}
            />,
            <OsOrgStructureWidgetsFeaturesNewOrganizations key={3} />,
            <OsOrgStructureWidgetsFeaturesDelete
              key={4}
              selectedField={selectedFild}
            />,
          ]}
        />
        <VStack max className={cls.osOrgStructureTree}>
          <TreeViewInModalContent
            selectTreeItems={(value: any) => setSelectedFild(value)}
            selectedFild={selectedFild}
          />
        </VStack>
      </div>
    );
  }
);
