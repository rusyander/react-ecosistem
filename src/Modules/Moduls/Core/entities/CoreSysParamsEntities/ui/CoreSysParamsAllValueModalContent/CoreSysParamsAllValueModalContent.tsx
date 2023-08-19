import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreSysParamsAllValueModalContent.module.scss';
import {
  CheckFormEnterM,
  Grid,
  ModalHeader,
  classNames,
  pageCountOptions,
} from 'Modules/UiKit';

import { InputsFields } from 'widgets/InputsFields';
import { filterBlock, gridColsHeader } from '../../consts/headerFildsData';

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

    const [selected, setSelected]: any = useState('');
    const [totalCount, setTotalCount] = useState<number | null>(null);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [pageLimit, setPageLimit] = useState(100);
    const roleName = 'CORE_SYSTEM_PARAMS';

    const getAttrValuesPayload = [
      {
        code: 'CORE_SYS_PAR_LEVELS',
      },
      {
        code: 'CORE_APPLICATIONS',
      },
      {
        code: 'CORE_ROLES',
      },
      {
        code: 'CORE_USERS',
      },
    ];
    useEffect(() => {
      getAttrValues(getAttrValuesPayload);
      onPaginationPageChange();
      getSysParValuesGridData(roleName);
    }, []);

    const gridParamsData = useMemo(() => {
      return {
        applicationCode: 'CORE',
        parameterCode: selectedField?.parameter_code,
        gridRequest: {
          filter: [],
          pageNumber: currentPageNumber ?? 1,
          pageSize: pageLimit ?? 100,
          sort: [],
          params: [],
          totalCount: totalCount ?? null,
        },
      };
    }, [
      currentPageNumber,
      pageLimit,
      selectedField?.parameter_code,
      totalCount,
    ]);

    const refreshButtonFunction = useCallback(() => {
      if (gridParamsData) {
        getSysParValuesGridData(gridParamsData);
      }
    }, [getSysParValuesGridData, gridParamsData]);

    const onPaginationPageChange = useCallback(
      async (currentPage?: number, pageSizeElement?: number) => {
        getSysParValuesGridData(gridParamsData);

        if (getSysParValuesGridDataQ?.result === '1') {
          if (getSysParValuesGridDataQ?.data?.totalElements) {
            setCurrentPageNumber(currentPage ?? 1);
            setPageLimit(pageSizeElement ?? 100);
            setTotalCount(getSysParValuesGridDataQ?.data?.totalElements);
          }
        }
      },
      [
        getSysParValuesGridData,
        getSysParValuesGridDataQ?.data?.totalElements,
        getSysParValuesGridDataQ?.result,
        gridParamsData,
      ]
    );

    const sortData = useCallback(
      (sorted: any) => {
        const gridParamsData = {
          applicationCode: 'CORE',
          parameterCode: selectedField?.parameter_code,
          gridRequest: {
            params: null,
            pageNumber: currentPageNumber,
            pageSize: pageLimit,
            totalCount: totalCount ?? null,
            sort: sorted,
            filter: [],
          },
        };
        getSysParValuesGridData(gridParamsData);
      },
      [
        currentPageNumber,
        getSysParValuesGridData,
        pageLimit,
        selectedField?.parameter_code,
        totalCount,
      ]
    );

    const inputFoldsPayload = useMemo(
      () => ({
        applicationCode: 'CORE',
        parameterCode: selectedField?.parameter_code,
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

    console.log(
      'getSysParValuesGridDataQ',
      getSysParValuesGridDataQ?.data?.content
    );
    console.log('getAttrValuesQ', getAttrValuesQ?.data);

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
        {getSysParValuesGridDataQ && (
          <Grid
            // for grid datagridColsHeader
            // gridCols={headerData ? headerData : []}
            gridCols={gridColsHeader}
            rowData={getSysParValuesGridDataQ?.data?.content}
            // gridCols={[]}
            // rowData={[]}
            // for grid height
            gridHeight={630}
            // for modal
            // ModalContent={ModalContents}
            selectedFields={(selected: any) => setSelected(selected)}
            // pagination
            pageCountOptions={pageCountOptions}
            defaultPageSize={100}
            onPaginationPageChange={onPaginationPageChange}
            totalDataCount={getSysParValuesGridDataQ?.data?.totalElements}
            // filter form
            FilterFormComponents={
              <InputsFields
                getGridData={getSysParValuesGridData}
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
