import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './TreeViewInModal.module.scss';
import { Icon } from '@iconify/react';
import {
  Button,
  classNames,
  Input,
  Modal,
  ModalHeader,
  VStack,
} from 'Modules/UiKit';
import { TreeViewInModalContent } from '../TreeViewInModalContent/TreeViewInModalContent';

interface DataElement {
  label: string;
  id: string;
  children?: DataElement[];
}
interface TreeViewInModalPropsProps {
  className?: string;
  selectTreeItems?: any;
  placeholder?: string;
  index?: number;
  onChange?: (index: any, value: any) => void;
  sendTreeDataFirst?: any;
  modalTitle?: string;
  defaultValues?: any;
}

export const TreeViewInModal = memo(
  ({
    className,
    placeholder,
    selectTreeItems,
    index,
    onChange,
    sendTreeDataFirst,
    modalTitle,
    defaultValues = undefined,
  }: TreeViewInModalPropsProps) => {
    const [hasOpenModal, setHasOpenModal] = useState(false);
    const [selectedFild, setSelectedFild]: any = useState(
      defaultValues
        ? {
            name: defaultValues?.data?.organizationIdName,
            organizationId: defaultValues?.data?.organizationId,
          }
        : ''
    );
    const [inputValue, setInputValue] = useState(selectedFild);
    const inputValueRef = useRef(selectedFild) as React.MutableRefObject<any>;

    const { t } = useTranslation();

    const [selectedForInput, setSelectedForInput]: any = useState(null);
    const [forClean, setForClean] = useState(false);

    useEffect(() => {
      inputValueRef.current = selectedFild;
    }, [selectTreeItems, selectedFild]);

    const OnClickOpenModal = useCallback(() => {
      setHasOpenModal(true);
      sendTreeDataFirst?.();
    }, [sendTreeDataFirst]);

    const OnClearFilds = useCallback(() => {
      setSelectedForInput(null);
      setForClean(true);
      inputValueRef.current = null;
      setSelectedFild('');
    }, []);

    const OnClickCloseModal = useCallback(() => {
      setHasOpenModal(false);
    }, []);

    const selectRow = useCallback(() => {
      setForClean(false);
      setSelectedForInput(selectedFild);
      // setInputValue(selectedFild);
      selectTreeItems?.(selectedFild);
      setHasOpenModal(false);
      onChange?.(index, selectedFild?.organizationId);
    }, [index, onChange, selectTreeItems, selectedFild]);

    return (
      <div className={classNames('', {}, [className])}>
        <div className={cls.treeViewForm}>
          <Input
            readOnly
            className={cls.inputPointer}
            placeholder={placeholder}
            onChange={(e: any) => setInputValue(e.target.value)}
            value={
              selectedForInput?.name
                ? selectedForInput?.name
                : forClean
                ? ''
                : defaultValues?.data?.organizationIdName
            }
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
        <Modal
          zIndex={1000}
          isOpen={hasOpenModal}
          lazy
          onClose={OnClickCloseModal}
        >
          <VStack>
            <ModalHeader title={modalTitle || ''} onClose={OnClickCloseModal} />

            <Button
              size="size_s"
              theme="background"
              className={cls.selectButton}
              onClick={selectRow}
            >
              {t('Выбрать')}
            </Button>

            <div className={cls.treeViewMaxWidth}>
              {hasOpenModal && (
                <TreeViewInModalContent
                  selectTreeItems={(value: any) => setSelectedFild(value)}
                  selectedFild={selectedFild}
                />
              )}
            </div>
          </VStack>
        </Modal>
      </div>
    );
  }
);
