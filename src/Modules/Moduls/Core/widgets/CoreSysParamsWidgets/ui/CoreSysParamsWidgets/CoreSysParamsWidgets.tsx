import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreSysParamsWidgets.module.scss';
import {
  CheckFormEnterM,
  Grid,
  IsError,
  NoData,
  Texts,
  classNames,
  pageCountOptions,
} from 'Modules/UiKit';

import { getInitM } from 'shared/Globals/globalApi/globalApi';
import {
  InputsFields,
  convertArrayToObject,
  currentGridHeight,
  pageGridParamsDataNoBeckendWithInputs,
} from 'widgets/InputsFields';
import { filterBlock, gridColsHeader } from '../../consts/headerData';
import { GetAttrValuesM, GetGridDataM } from '../../api/CoreSysParamsWidgets';

import {
  CoreSysParamsAllValue,
  CoreSysParamsNewValue,
} from 'Modules/Moduls/Core/features/CoreSysParamsFeatures';

export interface CoreSysParamsWidgetsProps {
  className?: string;
}

export const CoreSysParamsWidgets = memo((props: CoreSysParamsWidgetsProps) => {
  const { className } = props;
  const { t } = useTranslation('core');
  const [
    getDataGrid,
    { data: grid, isLoading: gridIsLoading, error: gridDataError },
  ]: any = GetGridDataM();
  const [getInit, { data: getInitData }] = getInitM();
  const [getAttrValues, { data: getAttrValuesQ }]: any = GetAttrValuesM();

  const [selected, setSelected]: any = useState('');
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState<
    number | undefined
  >(1);
  const [pageLimit, setPageLimit] = useState<number | undefined>(100);
  const [sortedData, setSortedData] = useState([]);
  const [filtersData, setFiltersData] = useState([]);

  const roleName = 'CORE_SYSTEM_PARAMS';

  const getAttrValuesPayload = [{ code: 'CORE_APPLICATIONS' }];

  useEffect(() => {
    refetchGridData();
    getInit('CORE_SYSTEM_PARAMS_FIELDS');
    getAttrValues(getAttrValuesPayload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getDataGrid(gridParamsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCount, currentPageNumber, pageLimit]);

  const gridParamsData = pageGridParamsDataNoBeckendWithInputs({
    roleName: roleName,
    currentPageNumber: currentPageNumber,
    pageLimit: pageLimit,
    totalCount: totalCount,
  });

  const refreshButtonFunction = useCallback(() => {
    if (gridParamsData) {
      const newData = pageGridParamsDataNoBeckendWithInputs({
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
      const gridsortDataParamsData = pageGridParamsDataNoBeckendWithInputs({
        sorted,
      });
      getDataGrid(gridsortDataParamsData);
    },
    [getDataGrid]
  );

  const inputFoldsPayload = pageGridParamsDataNoBeckendWithInputs({
    roleName,
    filter: null,
    sorted: [],
  });

  const refetchGridData = useCallback(() => {
    getDataGrid(gridParamsData);
  }, [getDataGrid, gridParamsData]);

  // ---------------------

  function transformObject(inputObject: any) {
    const transformedObject = {
      applCode: inputObject.applicationCode,
      roleCode: inputObject.roleCode,
      orgId: inputObject.organizationId,
      userId: inputObject.userId,
    };
    return transformedObject;
  }

  const [inputsValue, setInputsValue] = useState([]);
  const inputeRef: any = useRef(null);
  const [transformData, setTransformData]: any = useState();
  const gridHeight = currentGridHeight - inputeRef?.current?.clientHeight;
  useEffect(() => {
    handleSubmit();
  }, [inputsValue]);

  const handleSubmit = useCallback(() => {
    // getDataGrid(gridParamsData);
    const clearData = inputsValue.filter((item: any) => {
      return item.fildValue !== null && item.fildValue !== undefined;
    });
    const value = convertArrayToObject(clearData);
    const transformedObject = transformObject(value);
    setTransformData(transformedObject);
    const currentData = {
      ...transformedObject,
      gridRequest: {
        params: null,
        pageNumber: 1,
        pageSize: 100,
        totalCount: null,
        sort: [],
        filter: [],
      },
    };
    if (value) {
      getDataGrid(currentData);
    }
  }, [getDataGrid, inputsValue]);

  return (
    <div className={classNames(cls.coreSysParamsWidgets, {}, [className])}>
      {roleName && <CheckFormEnterM checkFormEnterName={roleName} />}

      <div ref={inputeRef}>
        <div className={cls.Divider} />
        <Texts size="sizeM" title={t('Уровень')} className={cls.margins} />
        <div className={cls.Divider} />

        {getInitData && (
          <InputsFields
            className={cls.filters}
            filterData={getInitData?.data.attr ?? []}
            isFilter={false}
            setInputsValues={(data: any) => setInputsValue(data)}
            attrData={getInitData?.data?.attrData}
          />
        )}

        <Texts
          size="sizeM"
          title={t('Значения параметров выбранного уровня')}
          className={cls.marginsValues}
        />
        <div className={cls.Divider} />
      </div>

      {grid && (
        <Grid
          gridCols={gridColsHeader ? gridColsHeader : []}
          rowData={grid?.data?.content}
          gridHeight={gridHeight}
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
              filterData={filterBlock}
              payloadData={inputFoldsPayload}
              attrData={getAttrValuesQ?.data}
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
            <CoreSysParamsNewValue
              key={1}
              selectedField={selected}
              fildValue={transformData}
              refetchGridData={refetchGridData}
            />,
            <CoreSysParamsAllValue key={2} selectedField={selected} />,
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
          isPageable={true}
          // sort
          disableSorting={true}
          //isSelectable
          isSelectable={true}
        />
      )}
      {grid?.data?.content === 0 && <NoData />}
      {gridDataError && <IsError />}
    </div>
  );
});
