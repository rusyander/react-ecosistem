import { GridComponent } from './GridComponent/GridComponent';
import { TableHeadersProps } from '..';

interface PageCountOptionsProps {
  value: number;
  label: string;
}

interface GridProps {
  rowData: any[];
  headerData: TableHeadersProps[];

  gridHeight: number;

  gridIsOpenModal: boolean;

  pageCountOptions: PageCountOptionsProps[];

  ModalContent?: () => JSX.Element;

  defaultPageSize: number;
  selectedFields?: (selectedField: string) => void;
  onPaginationPageChange: (page: number, limit: number) => void;
  totalDataCount: number;
  FilterFormComponents?: () => JSX.Element;
  showIsOpenFilter: boolean;
  showRefreshButton: boolean;
  onRefresh?: () => void;
  AddNewButtonComponents?: any[];
  isLoading?: boolean;

  canSort: boolean;
  columnSize: any;
  setColumnSize?: (value: string[]) => void;
  setSortFields?: any;
}

export const Grid = (props: GridProps) => {
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
    showIsOpenFilter,
    showRefreshButton = false,
    onRefresh,
    AddNewButtonComponents,
    isLoading,
    canSort,
    columnSize,
    setSortFields,
    setColumnSize,
  } = props;

  return (
    <div>
      <GridComponent
        headerData={headerData}
        ModalContent={ModalContent}
        pageCountOptions={pageCountOptions}
        rowData={rowData}
        gridHeight={gridHeight}
        gridIsOpenModal={gridIsOpenModal}
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
        // ---
        canSort={canSort}
        columnSize={columnSize}
        setColumnSize={setColumnSize}
        setSortFields={setSortFields}
      />
    </div>
  );
};
