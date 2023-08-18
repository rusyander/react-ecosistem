import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './OsOrgStructureWidgets.module.scss';
import { HeadersActionButtons, classNames } from 'Modules/UiKit';
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
    const { t } = useTranslation();
    const [selectedFild, setSelectedFild] = useState<any>([]);

    // console.log('selectedFild', selectedFild);

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
        <TreeViewInModalContent
          selectTreeItems={(value: any) => setSelectedFild(value)}
          selectedFild={selectedFild}
        />
      </div>
    );
  }
);
