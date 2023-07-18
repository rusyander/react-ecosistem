import { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreUsersWidgets.module.scss';
import { Button, Grid, Input, classNames } from 'Modules/UiKit';
import { checkFormEnterM, getGridDataM } from '../api/CoreUsersWidgets';
import { useLocation } from 'react-router-dom';
export interface CoreUsersWidgetsProps {
  className?: string;
}

const ModalContents = () => {
  return <div>modal</div>;
};

interface SortData {
  property: string;
  direction: string;
}

const FilterFormComponents = () => {
  return (
    <div>
      <div className={cls.FilterModulFilds}>
        {/* <div className={cls.FilterModulHeader}>
          <p className={cls.title}>Фильтр</p>
          <button onClick={closeFilter} className={cls.closeButton}>
            +
          </button>
        </div> */}

        <Input
          value={''}
          onChange={() => {
            return null;
          }}
          isLabel={true}
          label="Организация"
        />

        <Input
          value={''}
          onChange={() => {
            return null;
          }}
          isLabel={true}
          label="ФИО"
        />

        <Input
          value={''}
          onChange={() => {
            return null;
          }}
          isLabel={true}
          label="Логин"
        />

        <Input
          value={''}
          onChange={() => {
            return null;
          }}
          isLabel={true}
          label="Активен?"
        />
      </div>
      <div className={cls.actionButtons}>
        <Button theme="background">Применить</Button>
        <Button theme="background">Очистить</Button>
      </div>
    </div>
  );
};

const NewButtons = () => {
  return <Button theme="background">NEW</Button>;
};

const pageCountOptions = [
  { value: 2, label: '2' },
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' },
];

const headerGrid = [
  { id: '1', accessorKey: 'org_name', header: 'Организация' },
  { id: '2', accessorKey: 'first_last_name', header: 'ФИО' },
  { id: '3', accessorKey: 'login', header: 'Логин' },
  { id: '4', accessorKey: 'start_date', header: 'Начало действия' },
  { id: '5', accessorKey: 'end_date', header: 'Окончание действия' },
  { id: '6', accessorKey: 'is_active_flag_name', header: 'Активен' },
  // ---- not used
  { id: '', accessorKey: '', header: '' },
  { id: '', accessorKey: '', header: '' },
  { id: '', accessorKey: '', header: '' },
];

export const CoreUsersWidgets = memo(({ className }: CoreUsersWidgetsProps) => {
  const { t } = useTranslation();
  const locations = useLocation();
  const [checkFormEnter, { data }] = checkFormEnterM();
  const [getGridData, { data: grid, isLoading }] = getGridDataM();
  const sessions =
    localStorage.getItem('e531a7d0-6948-4ae2-a051-a1754c7ad48') || '';

  const [selected, setSelected] = useState(null);
  const [totalCount, setTotalCount]: any = useState(null);
  const [currentPageNumber, setCurrentPageNumber]: any = useState(null);
  const [pageLimit, setPageLimit]: any = useState(null);
  const [isOpenFilter, setIsOpenFilter] = useState(true);

  // refresh button
  const refreshButtonFunction = () => {
    onPaginationPageChange(currentPageNumber, pageLimit);
  };

  const screenHeight = window.innerHeight;
  const navbarHeight = 50;
  const breadcrumbsHeight = 37;
  const paginationHeight = 45;
  const currentGridHeight =
    screenHeight - (navbarHeight + breadcrumbsHeight + paginationHeight);

  // --------------------

  useEffect(() => {
    checkFormEnter(locations.pathname.replaceAll('/', ''));

    onPaginationPageChange();
  }, []);

  const onPaginationPageChange = async (
    currentPage?: number,
    pageSizeElement?: number
  ) => {
    const gridParamsData = {
      filter: [],
      pageNumber: currentPageNumber !== null ? currentPageNumber : 1,
      pageSize: pageLimit !== null ? pageLimit : 100,
      params: [],
      sort: [],
      totalCount: totalCount !== null ? totalCount : 0,
    };

    getGridData(gridParamsData);

    setCurrentPageNumber(currentPage);
    setPageLimit(pageSizeElement);
    setTotalCount(grid?.data?.totalElements);
  };

  const sortData = (sorted: SortData) => {
    const gridParamsData = {
      filter: [],
      pageNumber: 1,
      pageSize: 100,
      session: JSON.parse(sessions),
      params: null,
      sort: sorted,
      totalCount: totalCount,
    };
    getGridData(gridParamsData);
  };
  const [size, setSize]: any = useState([
    '560px',
    '260px',
    '183px',
    '183px',
    '183px',
    '183px',
  ]);
  // const size = ['560px', '260px', '183px', '183px', '183px', '183px'];
  // const size = null;

  console.log('grid+++++++++++++++++', grid);

  return (
    <div className={classNames(cls.coreUsersWidgets, {}, [className])}>
      <Grid
        // for grid data
        headerData={headerGrid}
        rowData={grid?.data?.content}
        // for grid height
        gridHeight={currentGridHeight !== 0 ? currentGridHeight : 500}
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
        FilterFormComponents={FilterFormComponents}
        // refresh Buttons
        showRefreshButton={true}
        onRefresh={refreshButtonFunction}
        // new button
        AddNewButtonComponents={[
          <NewButtons key={1} />,
          <NewButtons key={2} />,
          <NewButtons key={3} />,
          <NewButtons key={4} />,
        ]}
        // loading
        isLoading={isLoading}
        //------------
        canSort={true}
        columnSize={size}
        setColumnSize={setSize}
        setSortFields={sortData}
      />
    </div>
  );
});
