import { memo, useCallback, useEffect, useState } from 'react';
import cls from './CoreAuditSessionsWidgets.module.scss';
import {
  CheckFormEnterM,
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
import { CoreAuditSessionsFeatures } from 'Modules/Moduls/Core/features/CoreAuditSessionsFeatures';

export interface CoreAuditSessionsWidgetsProps {
  className?: string;
}

export const CoreAuditSessionsWidgets = memo(
  (props: CoreAuditSessionsWidgetsProps) => {
    const { className } = props;
    const [
      getDataGrid,
      { data: grid, isLoading: gridIsLoading, error: gridDataError },
    ] = getDataGridM();

    const [getGridDataInit, { data: gridDataInit }] = getGridDataInitM();

    const [selected, setSelected] = useState<any>(null);
    const [totalCount, setTotalCount] = useState<number | null>(null);
    const [currentPageNumber, setCurrentPageNumber] = useState<
      number | undefined
    >(1);
    const [pageLimit, setPageLimit] = useState<number | undefined>(100);
    const [sortedData, setSortedData] = useState([]);
    const [filtersData, setFiltersData] = useState([]);

    const roleName = gridDataInit?.data?.gridCode
      ? gridDataInit?.data?.gridCode
      : 'CORE_AUDIT_SESSIONS';

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
        const gridsortDataParamsData = pageGridParamsData({ roleName, sorted });
        getDataGrid(gridsortDataParamsData);
      },
      [getDataGrid, roleName]
    );

    const inputFoldsPayload = pageGridParamsData({
      roleName,
      filter: null,
      sorted: [],
    });

    const refetchGridData = useCallback(() => {
      getDataGrid(gridParamsData);
      getGridDataInit(roleName);
    }, [getDataGrid, getGridDataInit, gridParamsData, roleName]);

    return (
      <div
        className={classNames(cls.coreAuditSessionsWidgets, {}, [className])}
      >
        {roleName && <CheckFormEnterM checkFormEnterName={roleName} />}
        {!headerData && gridIsLoading && (
          <GridSkeleton height={currentGridHeight} />
        )}
        {headerData && (
          <Grid
            // for grid data
            gridCols={headerData ? headerData : []}
            rowData={grid?.data?.content}
            gridHeight={currentGridHeight}
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
                isFilter={true}
                refetchClearData={refetchGridData}
                filteredData={(value) => setFiltersData(value)}
              />
            }
            // sort function
            setSortFields={sortData}
            // refresh function
            onRefresh={refreshButtonFunction}
            // selected row
            selectedFields={(value) => setSelected(value)}
            // new button
            AddNewButtonComponents={[
              <CoreAuditSessionsFeatures
                key={1}
                selectedField={selected}
                refetchGridData={refetchGridData}
              />,
            ]}
            // loading
            isLoading={gridIsLoading}
            // optional components
            // filter button
            showIsOpenFilter={true}
            // refresh Buttons
            showRefreshButton={true}
            // can open modal when double click on grid row
            hasOpenGridRowModal={false}
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
  }
);
