import { memo } from 'react';
import { TreeViewComponents } from '../TreeViewComponents/TreeViewComponents';

export interface TreeDataTypes {
  label: string;
  id: string;
  children?: TreeDataTypes[];
  selectTreeItems?: any;
  selectedFild?: any;
  data?: any;
  updateTreeData?: any;
  loadingTree?: boolean;
}

export const TreeView = memo(
  ({
    data,
    selectTreeItems,
    selectedFild,
    updateTreeData,
    loadingTree,
  }: TreeDataTypes | any) => {
    // console.log('data+++++++++', data);

    return (
      <>
        {data?.map((node: TreeDataTypes, index: string) => (
          <TreeViewComponents
            key={index}
            node={node}
            selectTreeItems={selectTreeItems}
            selectedFild={selectedFild}
            updateTreeData={updateTreeData}
            loadingTree={loadingTree}
          />
        ))}
      </>
    );
  }
);
