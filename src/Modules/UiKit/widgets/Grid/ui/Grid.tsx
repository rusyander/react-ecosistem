import { GridComponent } from './GridComponent/GridComponent';
import { TableHeadersProps } from '..';
import { ReactNode } from 'react';

interface PageCountOptionsProps {
  value: number;
  label: string;
}

interface GridProps {
  // pagination
  defaultPageSize?: number;
  pageCountOptions?: PageCountOptionsProps[];
  onPaginationPageChange?: (page: number, limit: number) => void;
  totalDataCount?: number | any;
  isPagination?: boolean;

  // row data
  rowData: any[];
  headerData: TableHeadersProps[];

  gridHeight: number;

  ModalContent?: () => JSX.Element;

  selectedFields?: (selectedField: string) => void;
  FilterFormComponents?: ReactNode;
  showIsOpenFilter?: boolean;
  showRefreshButton?: boolean;
  onRefresh?: () => void;
  AddNewButtonComponents?: any[];
  isLoading?: boolean;

  canSort?: boolean;
  columnSize?: any;
  setColumnSize?: (value: string[]) => void;
  setSortFields?: any;
  hasOpenGridRowModal?: boolean;
}

export const Grid = (props: GridProps) => {
  const {
    rowData = [],
    headerData = [],
    gridHeight = 0,
    ModalContent,
    pageCountOptions,
    defaultPageSize = 0,
    selectedFields,
    onPaginationPageChange,
    totalDataCount,
    FilterFormComponents,
    showIsOpenFilter,
    showRefreshButton = false,
    onRefresh,
    AddNewButtonComponents,
    isLoading,
    canSort,
    columnSize,
    setSortFields,
    setColumnSize,
    isPagination,
    hasOpenGridRowModal,
  } = props;

  return (
    <div>
      <GridComponent
        headerData={headerData}
        ModalContent={ModalContent}
        pageCountOptions={pageCountOptions}
        rowData={rowData}
        gridHeight={gridHeight}
        defaultPageSize={defaultPageSize}
        selectedFields={selectedFields}
        onPaginationPageChange={onPaginationPageChange}
        totalDataCount={totalDataCount}
        FilterFormComponents={FilterFormComponents}
        isOpenFilter={showIsOpenFilter}
        showRefreshButton={showRefreshButton}
        onRefresh={onRefresh}
        AddNewButtonComponents={AddNewButtonComponents}
        isLoading={isLoading}
        isPagination={isPagination}
        hasOpenGridRowModal={hasOpenGridRowModal}
        // ---
        canSort={canSort}
        columnSize={columnSize}
        setColumnSize={setColumnSize}
        setSortFields={setSortFields}
      />
    </div>
  );
};
