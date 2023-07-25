import { memo, useCallback, useState } from 'react';
import cls from './TreeViewComponents.module.scss';
import { HStack, Skeleton, classNames } from '../../../..';
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
  loadingTree?: boolean;
}

export const TreeViewComponents = ({
  node,
  selectTreeItems = () => {
    return null;
  },
  selectedFild,
  updateTreeData,
  loadingTree,
}: TreeViewComponentsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(
    (node: any) => {
      setIsOpen(!isOpen);
      // selectTreeItems(node[0] ? node[0] : node);
      updateTreeData?.(node?.organizationId);
      // console.log(
      //   'node--------------------------------------------',
      //   node?.organizationId
      // );
    },
    [isOpen, selectTreeItems, updateTreeData]
  );

  const selectItem = (node: any) => {
    // console.log('selectItem', node);

    // selectTreeItems(node[0] ? node[0] : node);
    selectTreeItems(node);
  };

  const saveData = (node: any) => {
    // selectTreeItems(node[0] ? node[0] : node);
    selectTreeItems(node);
  };

  return (
    <>
      <div
        className={classNames(cls.treeNode, {
          [cls.selected]: selectedFild?.organizationId === node?.organizationId,
        })}
      >
        <HStack>
          {node?.childCount > 0 && (
            <span onClick={() => handleToggle(node)}>
              <Icon className={cls.iconTree} icon="ep:arrow-down-bold" />
            </span>
          )}
          <div onClick={() => selectItem(node)}>{node?.name}</div>
        </HStack>
      </div>
      <div className={cls.treeNodeChildren}>
        {isOpen && node?.children && (
          <>
            {node?.children.map((childNode: any) => (
              <div
                // onClick={() => saveData(childNode)}
                key={childNode?.organizationId}
                className={cls.childrenMargin}
              >
                {/* {loadingTree ? (
                  <div>
                    <Skeleton width={300} height={30} />
                  </div>
                ) : ( */}
                {/* <h1>s</h1> */}
                <TreeViewComponents
                  node={childNode}
                  selectTreeItems={selectTreeItems}
                  selectedFild={selectedFild}
                  updateTreeData={updateTreeData}
                />
                {/* )} */}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};
