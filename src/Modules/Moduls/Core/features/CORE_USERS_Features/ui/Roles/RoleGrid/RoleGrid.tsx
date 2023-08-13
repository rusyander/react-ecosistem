import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './RoleGrid.module.scss';
import { Grid, classNames } from 'Modules/UiKit';

import { GridSort } from 'shared/Globals/types/GridTypes';
import { pageCountOptions } from 'Modules/Moduls/Core/widgets/CoreUsersWidgets/consts/consts';
import {
  getDataGridM,
  getGridDataInitM,
} from 'shared/Globals/globalApi/globalApi';
import { InputsFields } from 'widgets/InputsFields';
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
  const [getDataGrid, { data: grid, isLoading }] = getDataGridM();
  const [
    getGridDataInit,
    { data: gridDataInit, isLoading: gridDataInitLoading },
  ] = getGridDataInitM();

  const [selected, setSelected]: any = useState('');
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(100);
  const headerData = [
    {
      field: 'user_role_name',
      size: `${gridDataInit?.data?.cols?.[0].width}px`,
      is_sortable_flag: true,
    },
    {
      field: 'application_name',
      size: `${gridDataInit?.data?.cols?.[1].width}px`,
      is_sortable_flag: true,
    },
    {
      field: 'role_name',
      size: `${gridDataInit?.data?.cols?.[2].width}px`,
      is_sortable_flag: true,
    },
  ];

  useEffect(() => {
    onPaginationPageChange();
    getGridDataInit('CORE_USER_ROLES');
  }, []);

  const gridParamsData = useMemo(() => {
    return {
      gridCode: 'CORE_USER_ROLES',
      gridRequest: {
        filter: [],
        pageNumber: currentPageNumber ?? 1,
        pageSize: pageLimit ?? 100,
        sort: [],
        params: [1],
        totalCount: totalCount ?? 0,
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
        gridCode: 'CORE_USER_ROLES',
        gridRequest: {
          filter: [],
          pageNumber: currentPageNumber,
          pageSize: pageLimit,
          sort: sorted,
          params: [5],
          totalCount: totalCount ?? 0,
        },
      };
      getDataGrid(gridParamsData);
    },
    [currentPageNumber, getDataGrid, pageLimit, totalCount]
  );

  const inputFoldsPayload = useMemo(
    () => ({
      gridCode: 'CORE_USER_ROLES',
      gridRequest: {
        params: [1],
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
    <div className={classNames(cls.roleGrid, {}, [className])}>
      {gridDataInit && (
        <Grid
          // for grid data
          gridCols={gridDataInit ? headerData : []}
          rowData={grid?.data?.content}
          // for grid height
          gridHeight={630}
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
              modalTitle={t('Справочник')}
              isFilter={true}
            />
          }
          // sort function
          setSortFields={sortData}
          // refresh function
          onRefresh={refreshButtonFunction}
          // new button
          AddNewButtonComponents={[
            <RolesGridAdd key={1} />,
            <RolesGridEdit key={2} selectedField={selected} />,
            <RolesGridDelete key={3} selectedField={selected} />,
            <RolesCancel key={4} closeModalFunction={closeModalFunction} />,
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
      )}
    </div>
  );
});
