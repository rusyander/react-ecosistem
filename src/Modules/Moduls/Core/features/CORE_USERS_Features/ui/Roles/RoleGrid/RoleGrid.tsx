import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './RoleGrid.module.scss';
import {
  Grid,
  GridSkeleton,
  IsError,
  NoData,
  classNames,
  pageCountOptions,
} from 'Modules/UiKit';
import {
  getDataGridM,
  getGridDataInitM,
} from 'shared/Globals/globalApi/globalApi';
import {
  InputsFields,
  currentGridHeight,
  headerGridData,
  pageGridParamsData,
} from 'widgets/InputsFields';
import { RolesGridAdd } from '../RolesGridActions/RolesGridAdd/RolesGridAdd';
import { RolesGridEdit } from '../RolesGridActions/RolesGridEdit/RolesGridEdit';
import { RolesGridDelete } from '../RolesGridActions/RolesGridDelete/RolesGridDelete';
import { RolesCancel } from '../RolesGridActions/RolesCancel/RolesCancel';

interface RoleGridProps {
  className?: string;
  closeModalFunction?: () => void;
}

export const RoleGrid = memo((props: RoleGridProps) => {
  const { className, closeModalFunction } = props;
  const { t } = useTranslation('core');
  const [
    getDataGrid,
    { data: grid, isLoading: gridIsLoading, error: gridDataError },
  ] = getDataGridM();
  const [getGridDataInit, { data: gridDataInit }] = getGridDataInitM();

  const [selected, setSelected]: any = useState('');
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState<
    number | undefined
  >(1);
  const [pageLimit, setPageLimit] = useState<number | undefined>(100);
  const [sortedData, setSortedData] = useState([]);
  const [filtersData, setFiltersData] = useState([]);

  const roleName = gridDataInit?.data?.gridCode
    ? gridDataInit?.data?.gridCode
    : 'CORE_USER_ROLES';

  const headerData = headerGridData(gridDataInit);

  useEffect(() => {
    refetchGridData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getDataGrid(gridParamsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCount, currentPageNumber, pageLimit]);

  const gridParamsData = pageGridParamsData({
    roleName: roleName,
    currentPageNumber: currentPageNumber,
    pageLimit: pageLimit,
    totalCount: totalCount,
    params: [1],
  });

  const refreshButtonFunction = useCallback(() => {
    if (gridParamsData) {
      const newData = pageGridParamsData({
        roleName: roleName,
        currentPageNumber: 1,
        pageLimit: pageLimit,
        totalCount: totalCount,
        sorted: sortedData,
        filter: filtersData,
        params: [1],
      });
      getDataGrid(newData);
    }
  }, [
    filtersData,
    getDataGrid,
    gridParamsData,
    pageLimit,
    roleName,
    sortedData,
    totalCount,
  ]);

  const onPaginationPageChange = useCallback(
    async (currentPage?: number, pageSizeElement?: number) => {
      setCurrentPageNumber((prev) => (prev = currentPage));
      setPageLimit(pageSizeElement);
      setTotalCount(grid?.data?.totalElements);
    },
    [grid?.data?.totalElements]
  );

  const sortData = useCallback(
    (sorted) => {
      setSortedData(sorted);
      const gridsortDataParamsData = pageGridParamsData({
        roleName,
        sorted,
        params: [1],
      });
      getDataGrid(gridsortDataParamsData);
    },
    [getDataGrid, roleName]
  );

  const inputFoldsPayload = pageGridParamsData({
    roleName,
    filter: null,
    sorted: [],
    params: [1],
  });

  const refetchGridData = useCallback(() => {
    getDataGrid(gridParamsData);
    getGridDataInit(roleName);
  }, [getDataGrid, getGridDataInit, gridParamsData, roleName]);

  return (
    <div className={classNames(cls.roleGrid, {}, [className])}>
      {!headerData && gridIsLoading && (
        <GridSkeleton height={currentGridHeight} />
      )}
      {gridDataInit && (
        <Grid
          // for grid data
          gridCols={gridDataInit ? headerData : []}
          rowData={grid?.data?.content}
          gridHeight={630}
          selectedFields={(selected: any) => setSelected(selected)}
          // pagination
          pageCountOptions={pageCountOptions}
          defaultPageSize={100}
          onPaginationPageChange={onPaginationPageChange}
          totalDataCount={grid?.data?.totalElements}
          // filter form
          FilterFormComponents={
            <InputsFields
              getGridData={getDataGrid}
              filterData={gridDataInit?.data?.cols}
              payloadData={inputFoldsPayload}
              attrData={gridDataInit?.data?.attr}
              modalTitle={t('Справочник')}
              isFilter={true}
              refetchClearData={refetchGridData}
              filteredData={(value) => setFiltersData(value)}
            />
          }
          // sort function
          setSortFields={sortData}
          // refresh function
          onRefresh={refreshButtonFunction}
          // new button
          AddNewButtonComponents={[
            <RolesGridAdd key={1} refetchGridData={refetchGridData} />,
            <RolesGridEdit
              key={2}
              refetchGridData={refetchGridData}
              selectedField={selected}
            />,
            <RolesGridDelete
              key={3}
              refetchGridData={refetchGridData}
              selectedField={selected}
            />,
            <RolesCancel key={4} closeModalFunction={closeModalFunction} />,
          ]}
          // loading
          isLoading={gridIsLoading}
          // optional components
          // filter button
          showIsOpenFilter={true}
          // refresh Buttons
          showRefreshButton={true}
          // can open modal when double click on grid row
          hasOpenGridRowModal={true}
          // pagination
          isPageable={
            gridDataInit?.data?.isPageableFlagCode === 'Y' ? true : false
          }
          // sort
          disableSorting={
            gridDataInit?.data?.isSortableFlagCode === 'Y' ? true : false
          }
          //isSelectable
          isSelectable={
            gridDataInit?.data?.isSelectableFlagCode === 'Y' ? true : false
          }
        />
      )}
      {grid?.data?.content === 0 && <NoData />}
      {gridDataError && <IsError />}
    </div>
  );
});
