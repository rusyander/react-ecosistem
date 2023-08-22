import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreSysParamsAllValueModalContent.module.scss';
import {
  CheckFormEnterM,
  Grid,
  GridSkeleton,
  ModalHeader,
  NoData,
  classNames,
  pageCountOptions,
} from 'Modules/UiKit';

import { InputsFields, pageGridSysParamsAllValue } from 'widgets/InputsFields';
import { filterBlock, gridColsHeader } from '../../consts/headerFildsData';
import { getAttrValuesPayload } from 'Modules/Moduls/Core/features/CoreSysParamsFeatures/consts/filterParams';

interface CoreSysParamsAllValueModalContentProps {
  className?: string;
  closeModalFunction: any;
  getAttrValues: any;
  getAttrValuesQ: any;
  getSysParValuesGridData: any;
  getSysParValuesGridDataQ: any;
  selectedField: any;
}

export const CoreSysParamsAllValueModalContent = memo(
  (props: CoreSysParamsAllValueModalContentProps) => {
    const {
      className,
      closeModalFunction,
      getAttrValues,
      getAttrValuesQ,
      getSysParValuesGridData,
      getSysParValuesGridDataQ,
      selectedField,
    } = props;
    const { t } = useTranslation('core');

    const [totalCount, setTotalCount] = useState<number | null>(null);
    const [currentPageNumber, setCurrentPageNumber] = useState<
      number | undefined
    >(1);
    const [pageLimit, setPageLimit] = useState<number | undefined>(100);
    const [sortedData, setSortedData] = useState([]);
    const [filtersData, setFiltersData] = useState([]);
    const roleName = 'CORE_SYSTEM_PARAMS';

    useEffect(() => {
      getAttrValues(getAttrValuesPayload);
      refetchGridData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      // getGridData(gridParamsData);
      getAttrValues(getAttrValuesPayload);
      getSysParValuesGridData(gridParamsData);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalCount, currentPageNumber, pageLimit]);

    const gridParamsData = pageGridSysParamsAllValue({
      roleName: roleName,
      currentPageNumber: currentPageNumber,
      pageLimit: pageLimit,
      totalCount: totalCount,
      applicationCode: 'CORE',
      parameterCode: selectedField?.parameter_code,
    });

    const refreshButtonFunction = useCallback(() => {
      if (gridParamsData) {
        const newData = pageGridSysParamsAllValue({
          roleName: roleName,
          currentPageNumber: 1,
          pageLimit: pageLimit,
          totalCount: totalCount,
          sorted: sortedData,
          filter: filtersData,
          applicationCode: 'CORE',
          parameterCode: selectedField?.parameter_code,
        });
        getSysParValuesGridData(newData);
      }
    }, [
      filtersData,
      getSysParValuesGridData,
      gridParamsData,
      pageLimit,
      selectedField?.parameter_code,
      sortedData,
      totalCount,
    ]);

    const onPaginationPageChange = useCallback(
      async (currentPage?: number, pageSizeElement?: number) => {
        setCurrentPageNumber((prev) => (prev = currentPage));
        setPageLimit(pageSizeElement);
        setTotalCount(getSysParValuesGridDataQ?.data?.totalElements);
      },
      [getSysParValuesGridDataQ?.data?.totalElements]
    );
    const sortData = useCallback(
      (sorted) => {
        setSortedData(sorted);
        const gridsortDataParamsData = pageGridSysParamsAllValue({
          sorted,
          applicationCode: 'CORE',
          parameterCode: selectedField?.parameter_code,
        });
        getSysParValuesGridData(gridsortDataParamsData);
      },
      [getSysParValuesGridData, selectedField?.parameter_code]
    );

    const inputFoldsPayload = pageGridSysParamsAllValue({
      roleName,
      filter: null,
      sorted: [],
      applicationCode: 'CORE',
      parameterCode: selectedField?.parameter_code,
    });

    const refetchGridData = useCallback(() => {
      getSysParValuesGridData(gridParamsData);
    }, [getSysParValuesGridData, gridParamsData]);

    return (
      <div
        className={classNames(cls.coreSysParamsAllValueModalContent, {}, [
          className,
        ])}
      >
        <ModalHeader
          title={t('Значения параметра') || ''}
          onClose={closeModalFunction}
        />
        {roleName && <CheckFormEnterM checkFormEnterName={roleName} />}
        {!gridColsHeader && !getSysParValuesGridDataQ && (
          <GridSkeleton height={630} />
        )}
        {getSysParValuesGridDataQ && (
          <Grid
            gridCols={gridColsHeader}
            rowData={getSysParValuesGridDataQ?.data?.content}
            gridHeight={630}
            // pagination
            pageCountOptions={pageCountOptions}
            defaultPageSize={100}
            onPaginationPageChange={onPaginationPageChange}
            totalDataCount={getSysParValuesGridDataQ?.data?.totalElements}
            // filter form
            FilterFormComponents={
              <InputsFields
                getGridData={getSysParValuesGridData}
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
            AddNewButtonComponents={[]}
            // loading
            isLoading={false}
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
        {getSysParValuesGridDataQ?.data?.content === 0 && <NoData />}
      </div>
    );
  }
);
