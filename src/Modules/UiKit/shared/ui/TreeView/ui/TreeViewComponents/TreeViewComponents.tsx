import { memo, useCallback, useState } from 'react';
import cls from './TreeViewComponents.module.scss';
import { classNames } from '../../../..';
import { Icon } from '@iconify/react';

interface TreeDataTypes {
  id: string;
  label: string;
  children?: TreeDataTypes[];
}

interface TreeViewComponentsProps {
  node: any;
  selectTreeItems?: (node: TreeDataTypes) => void;
  selectedFild?: any;
  updateTreeData?: any;
}

export const TreeViewComponents = ({
  node,
  selectTreeItems = () => {
    return null;
  },
  selectedFild,
  updateTreeData,
}: TreeViewComponentsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(
    (node: any) => {
      setIsOpen(!isOpen);
      selectTreeItems(node);
      updateTreeData?.(node?.organizationId);
    },
    [isOpen, selectTreeItems, updateTreeData]
  );

  const saveData = (node: any) => {
    console.log('node', node);

    selectTreeItems(node);
  };

  return (
    <>
      <div
        className={classNames(cls.treeNode, {
          [cls.selected]: selectedFild?.organizationId === node?.organizationId,
          // [cls.selected]: selectedNode === node.organizationId,
          // [cls.treeNode]: selectedNode !== node.id,
        })}
        onClick={() => handleToggle(node)}
      >
        <h2>{/* {selectedFild?.organizationId}---{node?.organizationId} */}</h2>
        <div>
          {node.childCount > 0 && (
            <span>
              <Icon className={cls.iconTree} icon="ep:arrow-down-bold" />
            </span>
          )}
          {node?.name}
        </div>
      </div>
      <div className={cls.treeNodeChildren}>
        {isOpen && node.children && (
          <>
            {node.children.map((childNode: any) => (
              <div
                onClick={() => saveData(childNode)}
                key={childNode.organizationId}
                className={cls.childrenMargin}
              >
                <TreeViewComponents
                  node={childNode}
                  selectTreeItems={selectTreeItems}
                  selectedFild={selectedFild}
                  updateTreeData={updateTreeData}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};
