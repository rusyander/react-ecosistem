import { memo, useCallback, useEffect, useState } from 'react';
import cls from './TreeViewInModalContent.module.scss';
import {
  IsError,
  NoData,
  TreeDataSkeleton,
  TreeView,
  classNames,
} from 'Modules/UiKit';
import { getTreePartDataSprM } from 'shared/Globals/globalApi/globalApi';
import { $api } from 'shared/api/api';

interface TreeViewInModalContentProps {
  className?: string;
  selectedFild?: any;
  selectTreeItems?: any;
}

export const TreeViewInModalContent = memo(
  (props: TreeViewInModalContentProps) => {
    const { className, selectedFild, selectTreeItems } = props;

    const [getTreePartDataSpr, { data: getTreePartData, isLoading, isError }] =
      getTreePartDataSprM();

    const [treeData, setTreeData]: any = useState<any>([]);
    const [selectedTreeDataFildId, setSelectedTreeDataFildId] = useState<
      number | string | any
    >('');

    const sendTreeDataFirst = useCallback(() => {
      getTreePartDataSpr('-1').then((res: any) => {
        if (treeData === undefined || treeData.length === 0) {
          setTreeData(res?.data?.data);
        }
      });
    }, [getTreePartDataSpr, treeData]);

    useEffect(() => {
      sendTreeDataFirst();
      // }
    }, []);
    const [loadingTree, setLoadingTree] = useState(false);

    const updateTreeDataFunction = useCallback((id: number, newFields: any) => {
      const findAndAddData = (data: any) => {
        if (data.organizationId === id) {
          const updatedData = { ...data, children: newFields };
          if (newFields.childCount > 0) {
            updatedData.children = [
              ...(data.children || []),
              ...newFields.children,
            ];
          }

          return { ...updatedData, ...newFields };
        } else if (data.children && data.children.length > 0) {
          return { ...data, children: data.children.map(findAndAddData) };
        }
        return data;
      };

      setTimeout(() => {
        setTreeData((prevTreeData: any) => prevTreeData?.map(findAndAddData));
      }, 0);
    }, []);

    const fetchDataFromBackend = useCallback(
      async (id: number) => {
        try {
          setLoadingTree(true);
          const newFields = await $api.post(
            '/api/os/org/getTreePartDataSpr',
            id
          );
          if (newFields.data) {
            updateTreeDataFunction(id, newFields?.data?.data);
            setLoadingTree(false);
          }
        } catch (error) {
          console.error('Error fetching data from the backend:', error);
        }
      },
      [updateTreeDataFunction]
    );

    const handleItemClick = useCallback(
      (id: number) => {
        setSelectedTreeDataFildId((prev: any) => {
          const uniqueID = [...new Set(prev)];
          return [...uniqueID, id];
        });
        if (!selectedTreeDataFildId.includes(id)) {
          fetchDataFromBackend(id);
        }
      },
      [fetchDataFromBackend, selectedTreeDataFildId]
    );

    return (
      <div className={classNames(cls.treeViewInModalContent, {}, [className])}>
        {isLoading && <TreeDataSkeleton />}
        {isError && <IsError />}
        {treeData?.length === 0 && <NoData />}
        {getTreePartData && (
          <TreeView
            data={treeData}
            selectTreeItems={(value: any) => selectTreeItems(value)}
            selectedFild={selectedFild}
            updateTreeData={handleItemClick}
            loadingTree={loadingTree}
          />
        )}
      </div>
    );
  }
);
