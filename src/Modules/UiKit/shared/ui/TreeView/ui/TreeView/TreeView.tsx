import { memo } from "react";
import { TreeViewComponents } from "../TreeViewComponents/TreeViewComponents";

export interface TreeDataTypes {
  label: string;
  id: string;
  children?: TreeDataTypes[];
  selectTreeItems?: any;
}

export const TreeView = memo(
  ({ data, selectTreeItems }: TreeDataTypes | any) => {
    return (
      <>
        {data.map((node: TreeDataTypes, index: string) => (
          <TreeViewComponents
            key={index}
            node={node}
            selectTreeItems={selectTreeItems}
          />
        ))}
      </>
    );
  }
);
