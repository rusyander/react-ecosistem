import { GridComponent } from './GridComponent/GridComponent';
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
  isPageable?: boolean;

  // row data
  rowData: any[];
  gridCols: any[];

  gridHeight: number;

  ModalContent?: () => JSX.Element;

  selectedFields?: (selectedField: string) => void;
  FilterFormComponents?: JSX.Element | ReactNode;
  showIsOpenFilter?: boolean;
  showRefreshButton?: boolean;
  onRefresh?: () => void;
  AddNewButtonComponents?: any[];
  isLoading?: boolean;

  disableSorting?: boolean;
  setSortFields?: any;
  hasOpenGridRowModal?: boolean;

  isSelectable?: boolean;
}

export const Grid = (props: GridProps) => {
  const {
    rowData = [],
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
    disableSorting,
    setSortFields,
    isPageable,
    hasOpenGridRowModal,
    gridCols,
    isSelectable,
  } = props;

  return (
    <div>
      <GridComponent
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
        isPagination={isPageable}
        hasOpenGridRowModal={hasOpenGridRowModal}
        // ---
        canSort={disableSorting}
        setSortFields={setSortFields}
        gridCols={gridCols}
        isSelectable={isSelectable}
      />
    </div>
  );
};
