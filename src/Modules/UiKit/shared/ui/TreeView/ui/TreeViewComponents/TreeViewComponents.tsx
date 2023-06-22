import { memo, useCallback, useState } from "react";
import cls from "./TreeViewComponents.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { classNames } from "../../../..";

interface TreeDataTypes {
  id: string;
  label: string;
  children?: TreeDataTypes[];
}

interface TreeViewComponentsProps {
  node: TreeDataTypes;
  selectTreeItems?: (node: TreeDataTypes) => void;
}

export const TreeViewComponents = ({
  node,
  selectTreeItems = () => {
    return null;
  },
}: TreeViewComponentsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleToggle = useCallback(
    (node: TreeDataTypes) => {
      const removsAllSelectedNodes = document.querySelectorAll(
        `.${cls.selected}`
      );

      const notRemoveLastSelectedClassCss = () => {
        removsAllSelectedNodes.forEach((item) => {
          if (item.classList.contains(cls.selected)) {
            item.classList.remove(cls.selected);
          }
        });
      };
      notRemoveLastSelectedClassCss();
      if (selectedNode === node.id) {
        setSelectedNode(null);
      } else {
        setSelectedNode(node.id);
      }
      setIsOpen(!isOpen);
      selectTreeItems(node);
    },
    [isOpen, selectedNode, selectTreeItems]
  );

  const saveData = (node: TreeDataTypes) => {
    selectTreeItems(node);
  };

  return (
    <>
      <div
        className={classNames(cls.treeNode, {
          [cls.selected]: selectedNode === node.id,
          // [cls.treeNode]: selectedNode !== node.id,
        })}
        onClick={() => handleToggle(node)}
      >
        <div>
          {node.children && (
            <span>
              <Icon className={cls.iconTree} icon="ep:arrow-down-bold" />
            </span>
          )}
          {node.label}
        </div>
      </div>
      <div className={cls.treeNodeChildren}>
        {isOpen && node.children && (
          <>
            {node.children.map((childNode) => (
              <div
                onClick={() => saveData(childNode)}
                key={childNode.id}
                className={cls.childrenMargin}
              >
                <TreeViewComponents
                  node={childNode}
                  selectTreeItems={selectTreeItems}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};
