import { useCallback, useEffect, useRef, useState } from 'react';
import { TableHeadersProps } from '../..';
import { Input, Modal } from '../../../..';
import { GridComponent } from '../GridComponent/GridComponent';
import cls from './GridInPopupComponent.module.scss';
import { Icon } from '@iconify/react';
import { PageCountOptionsProps } from '../../model/types/gridSchema';

interface GridInPopupComponentProps {
  rowData: any[];
  headerData: TableHeadersProps[];
  gridHeight: number;
  gridIsOpenModal: boolean;
  pageCountOptions: PageCountOptionsProps[];
  ModalContent?: () => JSX.Element;
  defaultPageSize?: number;
  selectedFields?: (selectedField: string) => void;
  onPaginationPageChange?: (page: number, limit: number) => void;
  totalDataCount?: number;
  FilterFormComponents?: () => JSX.Element;
  isOpenFilter?: boolean;
  showRefreshButton?: boolean;
  onRefresh?: () => void;
  AddNewButtonComponents?: any[];
  placeholder?: string;
  isLoading?: boolean;
}

export const GridInPopupComponent = (props: GridInPopupComponentProps) => {
  const {
    rowData = [],
    headerData = [],
    gridHeight = 0,
    gridIsOpenModal = false,
    ModalContent,
    pageCountOptions,
    defaultPageSize = 0,
    selectedFields,
    onPaginationPageChange,
    totalDataCount,
    FilterFormComponents,
    isOpenFilter,
    showRefreshButton = false,
    onRefresh,
    AddNewButtonComponents,
    placeholder,
    isLoading,
  } = props;

  const [hasOpenModal, setHasOpenModal] = useState(false);
  const [selectedFild, setSelectedFild]: any = useState('');
  const [inputValue, setInputValue] = useState(selectedFild);
  const inputValueRef = useRef(selectedFild) as React.MutableRefObject<any>;
  const [clearInputValue, setClearInputValue] = useState(true);

  useEffect(() => {
    setInputValue(selectedFild);
    inputValueRef.current = selectedFild;
    selectedFields?.(selectedFild);
  }, [selectedFields, selectedFild]);

  const OnClickOpenModal = useCallback(() => {
    onPaginationPageChange?.(1, 10);
    setHasOpenModal(true);
  }, [onPaginationPageChange]);
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
    <div>
      <div className={cls.gridForm}>
        <Input
          readOnly
          className={cls.inputPointer}
          placeholder={placeholder}
          onChange={(e: any) => setInputValue(e.target.value)}
          value={clearInputValue === true ? inputValue?.email : ''}
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
          className={cls.gridIcons}
        />
      </div>

      <Modal isOpen={hasOpenModal} onClose={OnClickCloseModal}>
        <div className={cls.GridComponentMaxWidth}>
          <GridComponent
            headerData={headerData}
            ModalContent={ModalContent}
            pageCountOptions={pageCountOptions}
            rowData={rowData}
            gridHeight={gridHeight}
            gridIsOpenModal={gridIsOpenModal}
            defaultPageSize={defaultPageSize}
            selectedFields={(value: any) => setSelectedFild(value)}
            onPaginationPageChange={onPaginationPageChange}
            totalDataCount={totalDataCount}
            FilterFormComponents={FilterFormComponents}
            isOpenFilter={isOpenFilter}
            showRefreshButton={showRefreshButton}
            onRefresh={onRefresh}
            AddNewButtonComponents={AddNewButtonComponents}
            isLoading={isLoading}
            hasOpenModal={hasOpenModal}
          />
        </div>
      </Modal>
    </div>
  );
};
