import { TableHeadersProps } from '..';
import { PageCountOptionsProps } from '../model/types/gridSchema';
import { GridInPopupComponent } from './GridPopupComponent/GridPopupComponent';

interface GridInPopupProps {
  rowData: any[];
  headerData: TableHeadersProps[];

  gridHeight: number;

  hasOpenGridRowModal: boolean;

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
  placeholder: string;
  canSort: boolean;
  sortFields: any;
}

export const GridInPopup = (props: GridInPopupProps) => {
  const {
    rowData = [],
    headerData = [],
    gridHeight = 0,
    hasOpenGridRowModal = false,
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
    placeholder,
    isLoading,
    // ----
    canSort,
    sortFields,
  } = props;

  return (
    <div>
      <GridInPopupComponent
        headerData={headerData}
        ModalContent={ModalContent}
        pageCountOptions={pageCountOptions}
        rowData={rowData}
        gridHeight={gridHeight}
        hasOpenGridRowModal={hasOpenGridRowModal}
        defaultPageSize={defaultPageSize}
        selectedFields={selectedFields}
        onPaginationPageChange={onPaginationPageChange}
        totalDataCount={totalDataCount}
        FilterFormComponents={FilterFormComponents}
        isOpenFilter={showIsOpenFilter}
        showRefreshButton={showRefreshButton}
        onRefresh={onRefresh}
        AddNewButtonComponents={AddNewButtonComponents}
        placeholder={placeholder}
        isLoading={isLoading}
        canSort={canSort}
        sortFields={sortFields}
      />
    </div>
  );
};
