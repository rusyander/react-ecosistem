import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './GridModal.module.scss';
import { Button, Grid, Input, Modal, classNames } from 'Modules/UiKit';
import { pageCountOptions } from 'Modules/Moduls/Core/widgets/CoreUsersWidgets/consts/consts';
import { ModalHeader } from '../../../ModalHeader';
import {
  checkFormEnterM,
  getGridDataM,
} from '../../../../shared/globalApi/globalApi';
import { useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { GridSort } from '../../../../shared/types/GridTypes';

interface GridModalProps {
  className?: string;
  placeholder?: string;
  selectTreeItems?: (value: any) => void;
  index?: number;
  onChange?: (value: any) => void;
  modalTitle?: string;
}

export const GridModal = memo((props: GridModalProps) => {
  const {
    className,
    placeholder,
    selectTreeItems,
    onChange,
    index,
    modalTitle,
  } = props;
  const { t } = useTranslation();

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
      pageNumber: currentPageNumber ?? 1,
      pageSize: pageLimit ?? 100,
      params: [],
      sort: [],
      totalCount: totalCount ?? 0,
    };
  }, [currentPageNumber, pageLimit, totalCount]);

  useEffect(() => {
    checkFormEnter(locations.pathname.replaceAll('/', ''));
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

  // ------------------------------------------------------------

  const [hasOpenModal, setHasOpenModal] = useState(false);
  const [selectedFild, setSelectedFild]: any = useState('');
  const [inputValue, setInputValue] = useState(selectedFild);
  const inputValueRef = useRef(selectedFild) as React.MutableRefObject<any>;
  const [clearInputValue, setClearInputValue] = useState(true);

  useEffect(() => {
    setInputValue(selectedFild);
    inputValueRef.current = selectedFild;
    selectTreeItems?.(selectedFild);
  }, [selectTreeItems, selectedFild]);

  const OnClickOpenModal = useCallback(() => {
    setHasOpenModal(true);
  }, []);
  const OnClearFilds = useCallback(() => {
    inputValueRef.current = null;
    setInputValue('');
    setSelectedFild('');
    setClearInputValue(false);

    setTimeout(() => {
      setClearInputValue(true);
    }, 100);
  }, []);
  const OnClickCloseModal = useCallback(() => {
    setHasOpenModal(false);
  }, []);

  return (
    <div className={classNames(cls.gridModal, {}, [className])}>
      <div className={cls.gridForm}>
        <Input
          readOnly
          className={cls.inputPointer}
          placeholder={placeholder}
          onChange={(e: any) => setInputValue(e.target.value)}
          value={clearInputValue === true ? inputValue?.email : ''}
          onClick={OnClickOpenModal}
        />
        {/* delete */}
        <Icon
          onClick={OnClearFilds}
          icon="iwwa:trash"
          className={cls.trashIcons}
        />
        {/* open modal */}
        <Icon
          onClick={OnClickOpenModal}
          icon="uis:grid"
          className={cls.gridIcons}
        />
      </div>

      <Modal
        isGrid
        lazy
        zIndex={101}
        isOpen={hasOpenModal}
        onClose={OnClickCloseModal}
      >
        <ModalHeader
          title={t('Реквизиты пользователя') || ''}
          onClose={OnClickCloseModal}
        />

        <Button
          size="size_s"
          theme="background"
          className={cls.selectButton}
          // onClick={selectRow}
        >
          {t('Выбрать')}
        </Button>
        <div className={cls.GridComponentMaxWidth}>
          {/* <GridComponent
            headerData={headerData}
            ModalContent={ModalContent}
            pageCountOptions={pageCountOptions}
            rowData={rowData}
            gridHeight={gridHeight}
            gridIsOpenModal={gridIsOpenModal}
            defaultPageSize={defaultPageSize}
            selectedFields={(value: any) => setSelectedFild(value)}
            onPaginationPageChange={onPaginationPageChange}
            totalDataCount={totalDataCount}
            FilterFormComponents={FilterFormComponents}
            isOpenFilter={isOpenFilter}
            showRefreshButton={showRefreshButton}
            onRefresh={onRefresh}
            AddNewButtonComponents={AddNewButtonComponents}
            isLoading={isLoading}
            hasOpenModal={hasOpenModal}
          /> */}

          <Grid
            // for grid data
            // gridCols={gridCols}
            gridCols={[]}
            // rowData={grid?.data?.content as Content[]}
            rowData={[]}
            // for grid height
            gridHeight={700}
            // for modal
            // ModalContent={ModalContents}
            selectedFields={(selected: any) => setSelected(selected)}
            // pagination
            pageCountOptions={pageCountOptions}
            defaultPageSize={100}
            onPaginationPageChange={onPaginationPageChange}
            totalDataCount={grid?.data?.totalElements}
            // filter form
            // FilterFormComponents={
            //   <Filters
            //     getGridData={getGridData}
            //     // filterData={standartInputs}
            //     filterData={filterBlock}
            //     modalTitle={t('Справочник')}
            //     isFilter={true}
            //     setInputsValues={(data: any) => console.log('dataInputs', data)}
            //   />
            // }
            // sort function
            setSortFields={sortData}
            // refresh function
            onRefresh={refreshButtonFunction}
            // new button
            // AddNewButtonComponents={[
            //   <Add key={1} />,
            //   <Edit key={2} />,
            //   <Roles key={3} />,
            // ]}
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
            hasOpenGridRowModal={false}
            //isSelectable
            isSelectable={true}
          />
        </div>
      </Modal>
    </div>
  );
});
