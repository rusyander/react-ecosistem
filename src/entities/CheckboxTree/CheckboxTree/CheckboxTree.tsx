import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import cls from './CheckboxTree.module.scss';
import './CheckboxTree.scss';

import { classNames } from 'Modules/UiKit';
interface TreeNode {
  key: string;
  label: string;
  nodeType: string;
  children?: TreeNode[];
}

interface CheckboxTreeProps {
  treeData?: TreeNode[] | any;
  checkedKeys?: string[];
}

export const CheckboxTree: React.FC<CheckboxTreeProps> = ({
  treeData,
  checkedKeys = [],
}: any) => {
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([...checkedKeys]);

  const toggleNode = (key: string) => {
    if (expandedNodes.includes(key)) {
      setExpandedNodes(expandedNodes.filter((nodeKey) => nodeKey !== key));
    } else {
      setExpandedNodes([...expandedNodes, key]);
    }
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string,
    childrenKeys?: string[]
  ) => {
    console.log('key', key);

    event.stopPropagation();
    let updatedCheckedItems = [...checkedItems];

    if (event.target.checked) {
      updatedCheckedItems.push(key);
      if (childrenKeys) {
        updatedCheckedItems = updatedCheckedItems.filter(
          (item) => !childrenKeys.includes(item)
        );
      }
    } else {
      updatedCheckedItems = updatedCheckedItems.filter((item) => item !== key);
      if (childrenKeys) {
        updatedCheckedItems = updatedCheckedItems.filter(
          (item) => !childrenKeys.includes(item)
        );
      }
    }

    setCheckedItems(updatedCheckedItems);
  };

  const areAllChildrenChecked = (node: TreeNode): boolean => {
    if (!node.children) {
      return checkedItems.includes(node.key);
    }
    return node.children.every((child) => checkedItems.includes(child.key));
  };

  const handleParentCheckboxChange = (node: TreeNode, e: any) => {
    e.stopPropagation();
    console.log('node', node);

    const childrenKeys = node.children
      ? node.children.map((child) => child.key)
      : [];
    const isChecked = !areAllChildrenChecked(node);

    const updatedCheckedItems = isChecked
      ? Array.from(new Set([...checkedItems, ...childrenKeys]))
      : checkedItems.filter((item) => !childrenKeys.includes(item));

    setCheckedItems(updatedCheckedItems);
  };

  // console.log('checkedItems', checkedItems);

  const renderTree = (nodes: TreeNode[]) => (
    <ul>
      {nodes.map((node) => (
        <li
          key={node.key}
          onClick={(e) => handleParentCheckboxChange(node, e)}
          className="asdasdasdasdsdasd"
        >
          <label>
            <input
              type="checkbox"
              checked={
                checkedItems.includes(node.key) || areAllChildrenChecked(node)
              }
              onChange={(event) =>
                handleCheckboxChange(
                  event,
                  node.key,
                  node.children?.map((child) => child.key)
                )
              }
            />
            {node.label}
          </label>
          {Array.isArray(node.children) && (
            <button
              className="toggle-button"
              onClick={() => toggleNode(node.key)}
            >
              {/* {expandedNodes.includes(node.key) ? '-' : '+'} */}
              {node.children.length > 0 ? '-' : '+'}
            </button>
          )}
          {expandedNodes.includes(node.key) &&
            Array.isArray(node.children) &&
            renderTree(node.children)}
        </li>
      ))}
    </ul>
  );

  return <div>{renderTree(treeData)}</div>;
};
