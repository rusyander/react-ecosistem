import cls from './Grid.module.scss';
import { TableHeadersProps } from '../..';
import { FilterBlock, Pagination } from '../../../../features';
import { useState, memo, useEffect } from 'react';
import { HeadersActionButtons } from '../HeadersActionButtons/HeadersActionButtons';
import { TableHeaderSort } from '../../../../features/TableHeaderSort';
import { PageCountOptionsProps } from '../../model/types/gridSchema';

interface GridComponentProps {
  headerData: TableHeadersProps[];
  ModalContent?: () => JSX.Element;
  pageCountOptions?: PageCountOptionsProps[];
  rowData: any;
  gridHeight: number;
  defaultPageSize: number;
  selectedFields?: (selectedField: string) => void;
  onPaginationPageChange?: (page: number, limit: number) => void;
  totalDataCount?: number | any;
  FilterFormComponents?: any;
  isOpenFilter?: boolean;
  showRefreshButton?: boolean;
  onRefresh?: () => void;
  AddNewButtonComponents?: any[];
  isLoading?: boolean;
  hasOpenModal?: boolean;

  isPagination?: boolean;

  canSort?: boolean;
  columnSize?: any;
  sortFields?: any;
  setSortFields?: any;
  setColumnSize?: any;
  hasOpenGridRowModal?: boolean;
}

export const GridComponent = memo(
  ({
    headerData,
    ModalContent,
    pageCountOptions,
    rowData,
    gridHeight = 100,
    defaultPageSize,
    totalDataCount,
    FilterFormComponents,
    selectedFields = () => {
      return null;
    },
    isOpenFilter,
    onPaginationPageChange,
    showRefreshButton = false,
    onRefresh = () => {
      return null;
    },
    hasOpenModal = false,
    AddNewButtonComponents,
    isLoading,
    // ---
    canSort,
    columnSize,
    sortFields,
    setSortFields,
    setColumnSize,
    isPagination,
    hasOpenGridRowModal,
  }: GridComponentProps) => {
    const [dataRowState, setDataRowState] = useState();
    useEffect(() => {
      setDataRowState(rowData);
    }, [rowData]);

    const [canOpenFilter, setCanOpenFilter] = useState(false);

    const [selectedFild, setSelectedFild] = useState<string | null>(null);
    return (
      <div>
        <HeadersActionButtons
          isOpenFilter={isOpenFilter}
          setCanOpenFilter={setCanOpenFilter}
          showRefreshButton={showRefreshButton}
          onRefresh={onRefresh}
          AddNewButtonComponents={AddNewButtonComponents}
        />
        <div className={cls.GridTableBlock}>
          {isOpenFilter && (
            <FilterBlock
              FilterFormComponents={FilterFormComponents}
              canOpenFilter={canOpenFilter}
              setCanOpenFilter={setCanOpenFilter}
            />
          )}

          <div
            className={cls.content}
            style={{ maxHeight: gridHeight, height: gridHeight - 5 }}
          >
            <TableHeaderSort
              dataHeaders={headerData}
              minCellWidth={hasOpenModal ? 550 : 100}
              dataRowState={dataRowState}
              setDataRowState={setDataRowState}
              //sort
              //height
              tableHeight={gridHeight}
              //modal
              ModalContent={ModalContent}
              setSelectedFild={setSelectedFild}
              selectedFild={selectedFild}
              selectedFields={selectedFields}
              hasOpenModal={hasOpenModal}
              //filter
              canOpenFilter={canOpenFilter}
              // loading
              isLoading={isLoading}
              //---------

              canSort={canSort}
              setColumnSize={setColumnSize}
              columnSize={columnSize}
              sortFields={sortFields}
              setSortFields={setSortFields}
              hasOpenGridRowModal={hasOpenGridRowModal}
            />
            {isPagination && (
              <Pagination
                pageCountOptions={pageCountOptions}
                totalCount={totalDataCount}
                defaultPageSize={defaultPageSize}
                onPaginationPageChange={onPaginationPageChange}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);
