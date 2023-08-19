import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreSchedulerTasksWidgets.module.scss';
import {
  CheckFormEnterM,
  Grid,
  classNames,
  pageCountOptions,
} from 'Modules/UiKit';
import {
  getDataGridM,
  getGridDataInitM,
} from 'shared/Globals/globalApi/globalApi';
import { GridSort } from 'shared/Globals/types/GridTypes';
import { InputsFields } from 'widgets/InputsFields';

export interface CoreSchedulerTasksWidgetsProps {
  className?: string;
}

const screenHeight = window.innerHeight;
const navbarHeight = 50;
const breadcrumbsHeight = 37;
const paginationHeight = 42;
const currentGridHeight =
  screenHeight - (navbarHeight + breadcrumbsHeight + paginationHeight);

export const CoreSchedulerTasksWidgets = memo(
  ({ className }: CoreSchedulerTasksWidgetsProps) => {
    const { t } = useTranslation();

    const [getDataGrid, { data: grid, isLoading }] = getDataGridM();

    const [
      getGridDataInit,
      { data: gridDataInit, isLoading: gridDataInitLoading },
    ] = getGridDataInitM();

    const [selected, setSelected]: any = useState('');
    const [totalCount, setTotalCount] = useState<number | null>(null);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [pageLimit, setPageLimit] = useState(100);
    const roleName = 'OS_COUNTRIES';
    const aplicationCode = gridDataInit?.data?.applicationCode;

    const headerData = gridDataInit?.data?.cols?.map((item: any) => {
      return {
        field: item?.fieldName,
        size: `${item.width}px`,
        is_sortable_flag: item?.isSortableFlagCode === 'Y' ? true : false,
        header: item?.name,
      };
    });

    useEffect(() => {
      onPaginationPageChange();
      getGridDataInit(roleName);
    }, []);

    const gridParamsData = useMemo(() => {
      return {
        gridCode: roleName,
        gridRequest: {
          filter: [],
          pageNumber: currentPageNumber ?? 1,
          pageSize: pageLimit ?? 100,
          sort: [],
          params: [],
          totalCount: totalCount ?? null,
        },
      };
    }, [currentPageNumber, pageLimit, totalCount]);

    const refreshButtonFunction = useCallback(() => {
      if (gridParamsData) {
        getDataGrid(gridParamsData);
      }
    }, [getDataGrid, gridParamsData]);

    const onPaginationPageChange = useCallback(
      async (currentPage?: number, pageSizeElement?: number) => {
        getDataGrid(gridParamsData);

        if (grid?.result === '1') {
          if (grid?.data?.totalElements) {
            setCurrentPageNumber(currentPage ?? 1);
            setPageLimit(pageSizeElement ?? 100);
            setTotalCount(grid?.data?.totalElements);
          }
        }
      },
      [getDataGrid, grid?.data?.totalElements, grid?.result, gridParamsData]
    );

    const sortData = useCallback(
      (sorted: GridSort[]) => {
        const gridParamsData = {
          gridCode: roleName,
          gridRequest: {
            filter: [],
            pageNumber: currentPageNumber,
            pageSize: pageLimit,
            sort: sorted,
            params: [],
            totalCount: totalCount ?? 0,
          },
        };
        getDataGrid(gridParamsData);
      },
      [currentPageNumber, getDataGrid, pageLimit, totalCount]
    );

    const inputFoldsPayload = useMemo(
      () => ({
        gridCode: roleName,
        gridRequest: {
          params: [],
          pageNumber: 1,
          pageSize: 100,
          totalCount: null,
          sort: [],
          filter: null,
        },
      }),
      []
    );

    return (
      <div
        className={classNames(cls.coreSchedulerTasksWidgets, {}, [className])}
      >
        {roleName && <CheckFormEnterM checkFormEnterName={roleName} />}
        {headerData && (
          <Grid
            // for grid data
            gridCols={headerData ? headerData : []}
            rowData={grid?.data?.content}
            // gridCols={[]}
            // rowData={[]}
            // for grid height
            // gridHeight={630}
            gridHeight={currentGridHeight !== 0 ? currentGridHeight : 500}
            // for modal
            // ModalContent={ModalContents}
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
                isFilter={true}
              />
            }
            // sort function
            setSortFields={sortData}
            // refresh function
            onRefresh={refreshButtonFunction}
            // new button
            // AddNewButtonComponents={[
            //   <OsCountriesFeaturesAdd key={1} />,
            //   <OsCountriesFeaturesEdit key={2} selectedField={selected} />,
            //   <OsCountriesFeaturesDelete key={3} selectedField={selected} />,
            // ]}
            // loading
            isLoading={isLoading}
            // optional components
            // filter button
            showIsOpenFilter={true}
            // refresh Buttons
            showRefreshButton={true}
            // can open modal when double click on grid row
            hasOpenGridRowModal={false}
            // pagination
            // isPageable={true}
            isPageable={
              gridDataInit?.data?.isPageableFlagCode === 'Y' ? true : false
            }
            // sort
            // disableSorting={true}
            disableSorting={
              gridDataInit?.data?.isSortableFlagCode === 'Y' ? true : false
            }
            //isSelectable
            // isSelectable={true}
            isSelectable={
              gridDataInit?.data?.isSelectableFlagCode === 'Y' ? true : false
            }
          />
        )}
      </div>
    );
  }
);