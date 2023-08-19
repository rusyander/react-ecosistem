import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreSchedulerTasksWidgets.module.scss';
import {
  CheckFormEnterM,
  Grid,
  classNames,
  pageCountOptions,
} from 'Modules/UiKit';
import { InputsFields } from 'widgets/InputsFields';
import {
  GetAttrValuesM,
  GetSchedulerTaskGridDataM,
} from '../../api/CoreSchedulerTasks';
import { gridColsData } from '../../consts/headerData';

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

    const [
      getSchedulerTaskGridData,
      { data: getSchedulerTaskGridDataQ, isLoading },
    ]: any = GetSchedulerTaskGridDataM();

    const [
      getAttrValues,
      { data: getAttrValuesQ, isLoading: gridDataInitLoading },
    ]: any = GetAttrValuesM();

    const [selected, setSelected]: any = useState('');
    const [totalCount, setTotalCount] = useState<number | null>(null);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [pageLimit, setPageLimit] = useState(100);
    const roleName = 'CORE_SCHEDULER_TASKS';
    // const aplicationCode = getAttrValuesQ?.data?.applicationCode;
    const headerData: any = [];

    // const headerData = getAttrValuesQ?.data?.cols?.map((item: any) => {
    //   return {
    //     field: item?.fieldName,
    //     size: `${item.width}px`,
    //     is_sortable_flag: item?.isSortableFlagCode === 'Y' ? true : false,
    //     header: item?.name,
    //   };
    // });

    const attrData: any = [
      { code: 'CORE_SCHED_T_PHASES' },
      { code: 'CORE_SCHED_T_STATUS' },
    ];

    useEffect(() => {
      onPaginationPageChange();
      getAttrValues(attrData);
    }, []);

    const gridParamsData: any = useMemo(() => {
      return {
        filter: [],
        pageNumber: currentPageNumber ?? 1,
        pageSize: pageLimit ?? 100,
        sort: [],
        params: [],
        totalCount: totalCount ?? null,
      };
    }, [currentPageNumber, pageLimit, totalCount]);

    const refreshButtonFunction = useCallback(() => {
      if (gridParamsData) {
        getSchedulerTaskGridData(gridParamsData);
      }
    }, [getSchedulerTaskGridData, gridParamsData]);

    const onPaginationPageChange = useCallback(
      async (currentPage?: number, pageSizeElement?: number) => {
        getSchedulerTaskGridData(gridParamsData);

        if (getSchedulerTaskGridDataQ?.result === '1') {
          if (getSchedulerTaskGridDataQ?.data?.totalElements) {
            setCurrentPageNumber(currentPage ?? 1);
            setPageLimit(pageSizeElement ?? 100);
            setTotalCount(getSchedulerTaskGridDataQ?.data?.totalElements);
          }
        }
      },
      [
        getSchedulerTaskGridData,
        getSchedulerTaskGridDataQ?.data?.totalElements,
        getSchedulerTaskGridDataQ?.result,
        gridParamsData,
      ]
    );

    const sortData = useCallback(
      (sorted: any) => {
        const gridParamsData = {
          filter: [],
          pageNumber: currentPageNumber,
          pageSize: pageLimit,
          sort: sorted,
          params: [],
          totalCount: totalCount ?? 0,
        };
        getSchedulerTaskGridData(gridParamsData);
      },
      [currentPageNumber, getSchedulerTaskGridData, pageLimit, totalCount]
    );

    const inputFoldsPayload = useMemo(
      () => ({
        params: [],
        pageNumber: 1,
        pageSize: 100,
        totalCount: null,
        sort: [],
        filter: null,
      }),
      []
    );

    return (
      <div
        className={classNames(cls.coreSchedulerTasksWidgets, {}, [className])}
      >
        {roleName && <CheckFormEnterM checkFormEnterName={roleName} />}
        {gridColsData && (
          <Grid
            // for grid data
            gridCols={gridColsData}
            rowData={getSchedulerTaskGridDataQ?.data?.content ?? []}
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
            totalDataCount={getSchedulerTaskGridDataQ?.data?.totalElements}
            // filter form
            FilterFormComponents={
              <InputsFields
                getGridData={headerData ? headerData : []}
                // filterData={getAttrValuesQ?.data?.cols}
                payloadData={inputFoldsPayload}
                attrData={getAttrValuesQ?.data}
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
            isPageable={true}
            // isPageable={
            //   gridDataInit?.data?.isPageableFlagCode === 'Y' ? true : false
            // }
            // sort
            disableSorting={true}
            // disableSorting={
            //   gridDataInit?.data?.isSortableFlagCode === 'Y' ? true : false
            // }
            //isSelectable
            isSelectable={true}
            // isSelectable={
            //   gridDataInit?.data?.isSelectableFlagCode === 'Y' ? true : false
            // }
          />
        )}
      </div>
    );
  }
);
