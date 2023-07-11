import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import cls from './TreeViewInPopup.module.scss';
import { Input, Modal, TreeView, classNames } from '../../..';
import { Icon } from '@iconify/react/dist/iconify.js';

interface DataElement {
  label: string;
  id: string;
  children?: DataElement[];
}
interface TreeViewInPopupProps {
  className?: string;
  data: DataElement[];
  selectTreeItems?: any;
  placeholder?: string;
}

export const TreeViewInPopup = memo(
  ({ data, placeholder, selectTreeItems, className }: TreeViewInPopupProps) => {
    const [hasOpenModal, setHasOpenModal] = useState(false);
    const [selectedFild, setSelectedFild]: any = useState('');
    const [inputValue, setInputValue] = useState(selectedFild);
    const inputValueRef = useRef(selectedFild) as React.MutableRefObject<any>;
    const [clearInputValue, setClearInputValue] = useState(true);

    useEffect(() => {
      setInputValue(selectedFild);
      inputValueRef.current = selectedFild;
      selectTreeItems?.(selectedFild);
    }, [selectTreeItems, selectedFild]);

    const OnClickOpenModal = useCallback(() => {
      setHasOpenModal(true);
    }, []);
    const OnClearFilds = useCallback(() => {
      inputValueRef.current = null;
      setInputValue('');
      setSelectedFild('');
      setClearInputValue(false);

      setTimeout(() => {
        setClearInputValue(true);
      }, 100);
    }, []);
    const OnClickCloseModal = useCallback(() => {
      setHasOpenModal(false);
    }, []);

    return (
      <div className={classNames('', {}, [className])}>
        <div className={cls.treeViewForm}>
          <Input
            readOnly
            className={cls.inputPointer}
            placeholder={placeholder}
            onChange={(e: any) => setInputValue(e.target.value)}
            value={clearInputValue === true ? inputValue?.label : ''}
            onClick={OnClickOpenModal}
          />
          {/* delete */}
          <Icon
            onClick={OnClearFilds}
            icon="iwwa:trash"
            className={cls.trashIcons}
          />
          {/* open modal */}
          <Icon
            onClick={OnClickOpenModal}
            icon="uis:grid"
            className={cls.treeViewIcons}
          />
        </div>
        <Modal isOpen={hasOpenModal} lazy onClose={OnClickCloseModal}>
          <div className={cls.treeViewMaxWidth}>
            <TreeView
              data={data}
              selectTreeItems={(value: any) => setSelectedFild(value)}
            />
          </div>
        </Modal>
      </div>
    );
  }
);
