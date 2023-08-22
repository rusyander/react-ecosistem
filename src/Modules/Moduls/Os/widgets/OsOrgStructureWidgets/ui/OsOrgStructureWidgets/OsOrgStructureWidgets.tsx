import { memo, useCallback, useState } from 'react';
import cls from './OsOrgStructureWidgets.module.scss';
import { HeadersActionButtons, VStack, classNames } from 'Modules/UiKit';
import { TreeViewInModalContent } from 'features/FilterItems';
import {
  OsOrgStructureWidgetsFeaturesAdd,
  OsOrgStructureWidgetsFeaturesEdit,
  OsOrgStructureWidgetsFeaturesNewOrganizations,
  OsOrgStructureWidgetsFeaturesDelete,
} from 'Modules/Moduls/Os/features/OsOrgStructureWidgetsFeatures';
import { getTreePartDataSprM } from 'shared/Globals/globalApi/globalApi';

export interface OsOrgStructureWidgetsProps {
  className?: string;
}

export const OsOrgStructureWidgets = memo(
  ({ className }: OsOrgStructureWidgetsProps) => {
    const [selectedFild, setSelectedFild] = useState();
    const [getTreePartDataSpr] = getTreePartDataSprM();
    const [treeDatas, setTreeDatas]: any = useState<any>([]);
    const refetchData = useCallback(() => {
      getTreePartDataSpr('-1').then((res: any) => {
        setTreeDatas(res?.data?.data);
      });
    }, [getTreePartDataSpr]);

    return (
      <div className={classNames(cls.osOrgStructureWidgets, {}, [className])}>
        <HeadersActionButtons
          showRefreshButton={false}
          isOpenFilter={false}
          AddNewButtonComponents={[
            <OsOrgStructureWidgetsFeaturesAdd
              key={1}
              selectedField={selectedFild}
              refetchData={refetchData}
            />,
            <OsOrgStructureWidgetsFeaturesEdit
              key={2}
              selectedField={selectedFild}
              refetchData={refetchData}
            />,
            <OsOrgStructureWidgetsFeaturesNewOrganizations
              key={3}
              refetchData={refetchData}
            />,
            <OsOrgStructureWidgetsFeaturesDelete
              key={4}
              selectedField={selectedFild}
              refetchData={refetchData}
            />,
          ]}
        />
        <VStack max className={cls.osOrgStructureTree}>
          <TreeViewInModalContent
            selectTreeItems={(value: any) => setSelectedFild(value)}
            selectedFild={selectedFild}
            treeDatas={treeDatas}
          />
        </VStack>
      </div>
    );
  }
);
