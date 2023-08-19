import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreSysParamsWidgets.module.scss';
import {
  CheckFormEnterM,
  Grid,
  classNames,
  pageCountOptions,
} from 'Modules/UiKit';

import { getGridDataInitM } from 'shared/Globals/globalApi/globalApi';
import { GridSort } from 'shared/Globals/types/GridTypes';
import { InputsFields } from 'widgets/InputsFields';
import { filterBlock, gridColsHeader } from '../../consts/headerData';
import { GetAttrValuesM, GetGridDataM } from '../../api/CoreSysParamsWidgets';
import {
  CoreSysParamsAllValue,
  CoreSysParamsNewValue,
} from 'Modules/Moduls/Core/features/CoreSysParamsFeatures';

export interface CoreSysParamsWidgetsProps {
  className?: string;
}

const screenHeight = window.innerHeight;
const navbarHeight = 50;
const breadcrumbsHeight = 37;
const paginationHeight = 42;
const currentGridHeight =
  screenHeight - (navbarHeight + breadcrumbsHeight + paginationHeight);

export const CoreSysParamsWidgets = memo((props: CoreSysParamsWidgetsProps) => {
  const { className } = props;
  const { t } = useTranslation('core');
  const [getDataGrid, { data: grid, isLoading }]: any = GetGridDataM();

  const [
    getGridDataInit,
    { data: gridDataInit, isLoading: gridDataInitLoading },
  ] = getGridDataInitM();
  const [getAttrValues, { data: getAttrValuesQ }]: any = GetAttrValuesM();

  const [selected, setSelected]: any = useState('');
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(100);
  const roleName = 'CORE_SYSTEM_PARAMS';

  const getAttrValuesPayload = [{ code: 'CORE_APPLICATIONS' }];
  useEffect(() => {
    onPaginationPageChange();
    getGridDataInit(roleName);
    getAttrValues(getAttrValuesPayload);
  }, []);

  const gridParamsData = useMemo(() => {
    return {
      applCode: null,
      roleCode: null,
      orgId: null,
      userId: null,
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
        applCode: null,
        roleCode: null,
        orgId: null,
        userId: null,
        gridRequest: {
          params: null,
          pageNumber: currentPageNumber,
          pageSize: pageLimit,
          totalCount: totalCount ?? null,
          sort: sorted,
          filter: [],
        },
      };
      getDataGrid(gridParamsData);
    },
    [currentPageNumber, getDataGrid, pageLimit, totalCount]
  );

  const inputFoldsPayload = useMemo(
    () => ({
      applCode: null,
      roleCode: null,
      orgId: null,
      userId: null,
      gridRequest: {
        params: null,
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
    <div className={classNames(cls.coreSysParamsWidgets, {}, [className])}>
      {roleName && <CheckFormEnterM checkFormEnterName={roleName} />}
      {grid && (
        <Grid
          // for grid datagridColsHeader
          // gridCols={headerData ? headerData : []}
          gridCols={gridColsHeader}
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
              // filterData={gridDataInit?.data?.cols}
              filterData={filterBlock}
              payloadData={inputFoldsPayload}
              // attrData={gridDataInit?.data?.attr}
              // attrData={filterData}
              attrData={getAttrValuesQ?.data}
              isFilter={true}
            />
          }
          // sort function
          setSortFields={sortData}
          // refresh function
          onRefresh={refreshButtonFunction}
          // new button
          AddNewButtonComponents={[
            <CoreSysParamsNewValue key={1} selectedField={selected} />,
            <CoreSysParamsAllValue key={2} selectedField={selected} />,
            // <OsCountriesFeaturesDelete key={3} selectedField={selected} />,
          ]}
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
});
