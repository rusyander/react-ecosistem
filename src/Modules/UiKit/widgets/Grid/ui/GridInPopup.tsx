import { TableHeadersProps } from "..";
import { GridInPopupComponent } from "./GridPopupComponent/GridPopupComponent";

interface GridInPopupProps {
  rowData: any[];
  headerData: TableHeadersProps[];

  gridHeight: number;

  gridIsOpenModal: boolean;

  pageCountOptions: { value: number; label: string }[];

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
}

export const GridInPopup = (props: GridInPopupProps) => {
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
    placeholder,
    isLoading,
  } = props;

  return (
    <div>
      <GridInPopupComponent
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
        placeholder={placeholder}
        isLoading={isLoading}
      />
    </div>
  );
};
