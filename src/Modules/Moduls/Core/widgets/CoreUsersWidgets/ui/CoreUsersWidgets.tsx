import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreUsersWidgets.module.scss';
import { Grid, classNames } from 'Modules/UiKit';
import { checkFormEnterM, getGridDataM } from '../api/CoreUsersWidgets';
import { useLocation } from 'react-router-dom';
import { GridSort } from '../model/types/coreUsersWidgets';
import {
  Add,
  Edit,
  Filters,
  Roles,
} from '../../../features/CORE_USERS_Features';
import { headerGrid, pageCountOptions } from '../consts/consts';
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
  return <div>modal</div>;
};

export const CoreUsersWidgets = memo(({ className }: CoreUsersWidgetsProps) => {
  const { t } = useTranslation('core');
  const locations = useLocation();
  const [checkFormEnter] = checkFormEnterM();
  const [getGridData, { data: grid, isLoading }] = getGridDataM();

  const [selected, setSelected] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(100);
  const [isOpenFilter, setIsOpenFilter] = useState(true);

  // --------------------

  const gridParamsData = useMemo(() => {
    return {
      filter: [],
      pageNumber:
        currentPageNumber !== null && currentPageNumber !== undefined
          ? currentPageNumber
          : 1,
      pageSize:
        pageLimit !== null && currentPageNumber !== pageLimit ? pageLimit : 100,
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
      getGridData(gridParamsData);
      setCurrentPageNumber(currentPage ?? 1);
      setPageLimit(pageSizeElement ?? 100);
      setTotalCount(grid?.data?.totalElements);
    },
    [getGridData, grid?.data?.totalElements, gridParamsData]
  );

  const sortData = useCallback(
    (sorted: GridSort[]) => {
      const gridParamsData = {
        filter: [],
        pageNumber: 1,
        pageSize: 100,
        params: null,
        sort: sorted,
        totalCount: totalCount,
      };
      getGridData(gridParamsData);
    },
    [getGridData, totalCount]
  );
  const [size, setSize] = useState([
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
        rowData={grid?.data?.content}
        // for grid height
        gridHeight={currentGridHeight !== 0 ? currentGridHeight : 500}
        columnSize={size}
        setColumnSize={setSize}
        // for modal
        gridIsOpenModal={true}
        ModalContent={ModalContents}
        // pagination
        pageCountOptions={pageCountOptions}
        defaultPageSize={100}
        selectedFields={(selected: any) => setSelected(selected)}
        onPaginationPageChange={onPaginationPageChange}
        totalDataCount={totalCount}
        // filter button
        showIsOpenFilter={isOpenFilter}
        FilterFormComponents={Filters}
        canSort={true}
        setSortFields={sortData}
        // refresh Buttons
        showRefreshButton={true}
        onRefresh={refreshButtonFunction}
        // new button
        AddNewButtonComponents={[
          <Add key={1} />,
          <Edit key={2} />,
          <Roles key={3} />,
        ]}
        // loading
        isLoading={isLoading}
      />
    </div>
  );
});
