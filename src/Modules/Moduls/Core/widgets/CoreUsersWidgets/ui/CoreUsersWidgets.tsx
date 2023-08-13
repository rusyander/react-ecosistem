import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreUsersWidgets.module.scss';
import { CheckFormEnterM, Grid, classNames } from 'Modules/UiKit';

import { Add, Edit, Roles } from '../../../features/CORE_USERS_Features';
import { filterBlock, gridCols, pageCountOptions } from '../consts/consts';
import { GridSort } from '../../../../../../shared/Globals/types/GridTypes';
import { Content } from '../model/types/coreUsersWidgets';
import { getGridDataM } from 'shared/Globals/globalApi/globalApi';
import { InputsFields } from 'widgets/InputsFields';
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
  const [getGridData, { data: grid, isLoading }] = getGridDataM();
  const [showFilters, setShowFilters] = useState(false);

  const [selected, setSelected] = useState(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(100);

  // --------------------
  const gridParamsData = useMemo(() => {
    return {
      filter: [],
      pageNumber: currentPageNumber ?? 1,
      pageSize: pageLimit ?? 100,
      params: [],
      sort: [],
      totalCount: totalCount ?? 0,
    };
  }, [currentPageNumber, pageLimit, totalCount]);

  useEffect(() => {
    onPaginationPageChange();
  }, []);

  const refreshButtonFunction = useCallback(() => {
    if (gridParamsData) {
      getGridData(gridParamsData);
    }
  }, [getGridData, gridParamsData]);

  const onPaginationPageChange = useCallback(
    async (currentPage?: number, pageSizeElement?: number) => {
      getGridData(gridParamsData);

      if (grid?.result === '1') {
        if (grid?.data?.totalElements) {
          setCurrentPageNumber(currentPage ?? 1);
          setPageLimit(pageSizeElement ?? 100);
          setTotalCount(grid?.data?.totalElements);
        }
      }
    },
    [getGridData, grid?.data?.totalElements, grid?.result, gridParamsData]
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

  // console.log('grid+++++++++++++++++', grid);

  const inputFoldsPayload = useMemo(
    () => ({
      filter: null,
      pageNumber: 1,
      pageSize: 100,
      params: null,
      sort: [],
      totalCount: null,
    }),
    []
  );

  return (
    <div className={classNames(cls.coreUsersWidgets, {}, [className])}>
      <CheckFormEnterM />
      <Grid
        // for grid data
        gridCols={gridCols}
        rowData={grid?.data?.content as Content[]}
        // for grid height
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
            getGridData={getGridData}
            payloadData={inputFoldsPayload}
            // filterData={standartInputs}
            filterData={filterBlock}
            modalTitle={t('Справочник')}
            isFilter={true}
            // setInputsValues={(data: any) => console.log('dataInputs', data)}
          />
        }
        // sort function
        setSortFields={sortData}
        // refresh function
        onRefresh={refreshButtonFunction}
        // new button
        AddNewButtonComponents={[
          <Add key={1} />,
          <Edit key={2} selectedField={selected} />,
          <Roles key={3} />,
        ]}
        // loading
        isLoading={isLoading}
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
        hasOpenGridRowModal={true}
        //isSelectable
        isSelectable={true}
      />
    </div>
  );
});
