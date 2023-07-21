import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreUsersWidgets.module.scss';
import { Grid, classNames } from 'Modules/UiKit';
import { checkFormEnterM, getGridDataM } from '../api/CoreUsersWidgets';
import { useLocation } from 'react-router-dom';
import {
  Add,
  Edit,
  Filters,
  Roles,
} from '../../../features/CORE_USERS_Features';
import { headerGrid, pageCountOptions } from '../consts/consts';
import { GridSort } from '../../../shared/types/GridTypes';
import { Content } from '../model/types/coreUsersWidgets';
export interface CoreUsersWidgetsProps {
  className?: string;
}

const screenHeight = window.innerHeight;
const navbarHeight = 50;
const breadcrumbsHeight = 37;
const paginationHeight = 42;
const currentGridHeight =
  screenHeight - (navbarHeight + breadcrumbsHeight + paginationHeight);

const ModalContents = () => {
  return <div>modal s ss</div>;
};

export const CoreUsersWidgets = memo(({ className }: CoreUsersWidgetsProps) => {
  const { t } = useTranslation('core');
  const locations = useLocation();
  const [checkFormEnter] = checkFormEnterM();
  const [getGridData, { data: grid, isLoading }] = getGridDataM();

  const [selected, setSelected] = useState(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(100);

  // --------------------

  const gridParamsData = useMemo(() => {
    return {
      filter: [],
      pageNumber:
        currentPageNumber !== null && currentPageNumber !== undefined
          ? currentPageNumber
          : 1,
      pageSize: pageLimit !== null && pageLimit !== undefined ? pageLimit : 100,
      params: [],
      sort: [],
      totalCount:
        totalCount !== null && totalCount !== undefined ? totalCount : 0,
    };
  }, [currentPageNumber, pageLimit, totalCount]);

  useEffect(() => {
    checkFormEnter(locations.pathname.replaceAll('/', ''));
    onPaginationPageChange();
  }, []);

  const refreshButtonFunction = useCallback(() => {
    getGridData(gridParamsData);
  }, [getGridData, gridParamsData]);

  const onPaginationPageChange = useCallback(
    async (currentPage?: number, pageSizeElement?: number) => {
      const pageElements = {
        filter: [],
        pageNumber: currentPage ?? 1,
        pageSize: pageSizeElement ?? 100,
        params: [],
        sort: [],
        totalCount: grid?.data?.totalElements,
      };

      getGridData(pageElements);

      if (grid?.result === '1') {
        if (grid?.data?.totalElements) {
          setCurrentPageNumber(currentPage ?? 1);
          setPageLimit(pageSizeElement ?? 100);
          setTotalCount(grid?.data?.totalElements);
        }
      }
    },
    [getGridData, grid?.data?.totalElements, grid?.result]
  );

  const sortData = useCallback(
    (sorted: GridSort[]) => {
      const gridParamsData = {
        filter: [],
        pageNumber: currentPageNumber,
        pageSize: pageLimit,
        params: null,
        sort: sorted,
        totalCount: totalCount ?? 0,
      };
      getGridData(gridParamsData);
    },
    [currentPageNumber, getGridData, pageLimit, totalCount]
  );
  const [columnSize, setColumnSize] = useState([
    '560px',
    '260px',
    '103px',
    '103px',
    '103px',
    '103px',
  ]);

  console.log('grid+++++++++++++++++', grid);

  return (
    <div className={classNames(cls.coreUsersWidgets, {}, [className])}>
      <Grid
        // for grid data
        headerData={headerGrid}
        rowData={grid?.data?.content as Content[]}
        // for grid height
        gridHeight={currentGridHeight !== 0 ? currentGridHeight : 500}
        columnSize={columnSize}
        setColumnSize={setColumnSize}
        // for modal
        ModalContent={ModalContents}
        selectedFields={(selected: any) => setSelected(selected)}
        // pagination
        pageCountOptions={pageCountOptions}
        defaultPageSize={100}
        onPaginationPageChange={onPaginationPageChange}
        totalDataCount={grid?.data?.totalElements}
        // filter form
        FilterFormComponents={Filters}
        // sort function
        setSortFields={sortData}
        // refresh function
        onRefresh={refreshButtonFunction}
        // new button
        AddNewButtonComponents={[
          <Add key={1} />,
          <Edit key={2} />,
          <Roles key={3} />,
        ]}
        // loading
        isLoading={isLoading}
        // optional components
        // pagination
        isPagination={true}
        // filter button
        showIsOpenFilter={true}
        // sort
        canSort={true}
        // refresh Buttons
        showRefreshButton={true}
        // can open modal when double click on grid row
        hasOpenGridRowModal={true}
      />
    </div>
  );
});
