import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './TreeViewInModal.module.scss';
import { Icon } from '@iconify/react';
import {
  Button,
  classNames,
  HStack,
  Input,
  Modal,
  Texts,
  TreeView,
  VStack,
} from 'Modules/UiKit';

interface DataElement {
  label: string;
  id: string;
  children?: DataElement[];
}
interface TreeViewInModalPropsProps {
  className?: string;
  data: any;
  selectTreeItems?: any;
  placeholder?: string;
  valueData?: string;
  index?: number;
  onChange?: (index: any, value: any) => void;
  updateTreeData?: any;
}

export const TreeViewInModal = memo(
  ({
    data,
    placeholder,
    selectTreeItems,
    className,
    valueData,
    index,
    onChange,
    updateTreeData,
  }: TreeViewInModalPropsProps) => {
    const [hasOpenModal, setHasOpenModal] = useState(false);
    const [selectedFild, setSelectedFild]: any = useState('');
    const [inputValue, setInputValue] = useState(selectedFild);
    const inputValueRef = useRef(selectedFild) as React.MutableRefObject<any>;
    const [clearInputValue, setClearInputValue] = useState(true);

    console.log('selectedFild', selectedFild);

    const { t } = useTranslation();

    useEffect(() => {
      // setInputValue(selectedFild);
      inputValueRef.current = selectedFild;
      // selectTreeItems?.(selectedFild);
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

    const selectRow = useCallback(() => {
      setInputValue(selectedFild);
      selectTreeItems?.(selectedFild);
      setHasOpenModal(false);
      onChange?.(index, selectedFild?.organizationId);
    }, [index, onChange, selectTreeItems, selectedFild, updateTreeData]);

    return (
      <div className={classNames('', {}, [className])}>
        <div className={cls.treeViewForm}>
          <Input
            readOnly
            className={cls.inputPointer}
            placeholder={placeholder}
            onChange={(e: any) => setInputValue(e.target.value)}
            // value={clearInputValue === true ? inputValue?.label : ''}valueData
            value={
              valueData === selectedFild?.organizationId
                ? selectedFild?.name
                : ''
            }

            // onClick={OnClickOpenModal}
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
          <VStack>
            <HStack max align="center" justify="between">
              <Texts title="Справочник" />
              <Icon
                onClick={OnClickCloseModal}
                width={25}
                className={cls.closeIcon}
                icon="ep:close-bold"
              />
            </HStack>

            <Button
              size="size_s"
              theme="background"
              className={cls.selectButton}
              onClick={selectRow}
            >
              {t('Выбрать')}
            </Button>

            <div className={cls.treeViewMaxWidth}>
              <TreeView
                data={data}
                selectTreeItems={(value: any) => setSelectedFild(value)}
                selectedFild={selectedFild}
                updateTreeData={updateTreeData}
              />
            </div>
          </VStack>
        </Modal>
      </div>
    );
  }
);
