import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreUsersWidgets.module.scss';
import {
  CheckFormEnterM,
  Grid,
  GridSkeleton,
  IsError,
  NoData,
  classNames,
  pageCountOptions,
} from 'Modules/UiKit';

import { Add, Edit, Roles } from '../../../features/CORE_USERS_Features';
import { filterBlock, gridCols } from '../consts/consts';
import { Content } from '../model/types/coreUsersWidgets';
import { getGridDataM } from 'shared/Globals/globalApi/globalApi';
import {
  InputsFields,
  currentGridHeight,
  pageGridParamsDataNoBeckend,
} from 'widgets/InputsFields';
export interface CoreUsersWidgetsProps {
  className?: string;
}
export const CoreUsersWidgets = memo(({ className }: CoreUsersWidgetsProps) => {
  const { t } = useTranslation('core');
  const [
    getGridData,
    { data: grid, isLoading: gridIsLoading, error: gridDataError },
  ]: any = getGridDataM();

  const [selected, setSelected] = useState(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState<
    number | undefined
  >(1);
  const [pageLimit, setPageLimit] = useState<number | undefined>(100);
  const [sortedData, setSortedData] = useState([]);
  const [filtersData, setFiltersData] = useState([]);

  const roleName = 'CORE_USERS';

  useEffect(() => {
    refetchGridData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getGridData(gridParamsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCount, currentPageNumber, pageLimit]);

  const gridParamsData = pageGridParamsDataNoBeckend({
    roleName: roleName,
    currentPageNumber: currentPageNumber,
    pageLimit: pageLimit,
    totalCount: totalCount,
  });

  const refreshButtonFunction = useCallback(() => {
    if (gridParamsData) {
      const newData = pageGridParamsDataNoBeckend({
        roleName: roleName,
        currentPageNumber: 1,
        pageLimit: pageLimit,
        totalCount: totalCount,
        sorted: sortedData,
        filter: filtersData,
      });
      getGridData(newData);
    }
  }, [
    filtersData,
    getGridData,
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
      const gridsortDataParamsData = pageGridParamsDataNoBeckend({ sorted });
      getGridData(gridsortDataParamsData);
    },
    [getGridData]
  );

  const inputFoldsPayload = pageGridParamsDataNoBeckend({
    roleName,
    filter: null,
    sorted: [],
  });

  const refetchGridData = useCallback(() => {
    getGridData(gridParamsData);
  }, [getGridData, gridParamsData]);

  return (
    <div className={classNames(cls.coreUsersWidgets, {}, [className])}>
      <CheckFormEnterM checkFormEnterName={roleName} />
      {!gridCols && gridIsLoading && (
        <GridSkeleton height={currentGridHeight} />
      )}
      <Grid
        // for grid data
        gridCols={gridCols}
        rowData={grid?.data?.content as Content[]}
        gridHeight={currentGridHeight}
        selectedFields={(selected: any) => setSelected(selected)}
        // pagination
        pageCountOptions={pageCountOptions}
        defaultPageSize={100}
        onPaginationPageChange={onPaginationPageChange}
        totalDataCount={grid?.data?.totalElements}
        // filter form
        FilterFormComponents={
          <InputsFields
            getGridData={getGridData}
            payloadData={inputFoldsPayload}
            // filterData={standartInputs}
            filterData={filterBlock}
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
          <Add key={1} refetchGridData={refetchGridData} />,
          <Edit
            key={2}
            refetchGridData={refetchGridData}
            selectedField={selected}
          />,
          <Roles key={3} />,
        ]}
        // loading
        isLoading={gridIsLoading}
        // optional components
        // pagination
        isPageable={true}
        // filter button
        showIsOpenFilter={true}
        // sort
        disableSorting={true}
        // refresh Buttons
        showRefreshButton={true}
        // can open modal when double click on grid row
        hasOpenGridRowModal={false}
        //isSelectable
        isSelectable={true}
      />
      {grid?.data?.content === 0 && <NoData />}
      {gridDataError && <IsError />}
    </div>
  );
});
