import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './GridModal.module.scss';
import { Button, Grid, HStack, Input, Modal, classNames } from 'Modules/UiKit';
import { pageCountOptions } from 'Modules/Moduls/Core/widgets/CoreUsersWidgets/consts/consts';
import { ModalHeader } from '../../../ModalHeader';
import {
  checkFormEnterM,
  getDataPagedM,
} from '../../../../shared/globalApi/globalApi';
import { Icon } from '@iconify/react';
import { GridSort } from '../../../../shared/types/GridTypes';

interface GridModalProps {
  className?: string;
  placeholder?: string;
  selectTreeItems?: (value: any) => void;
  index?: number;
  onChange?: any;
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

  const [checkFormEnter] = checkFormEnterM();
  const [getDataPaged, { data: grid, isLoading }] = getDataPagedM();

  const [selected, setSelected]: any = useState('');
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(100);
  console.log(selected);

  const headerData = [
    { field: 'full_name', size: '220px', is_sortable_flag: true },
    { field: 'org_name', size: '220px', is_sortable_flag: true },
  ];

  // --------------------
  const gridParamsData = useMemo(() => {
    return {
      dictCode: 'OS_EMPLOYEES',
      grid: {
        filter: [],
        pageNumber: currentPageNumber ?? 1,
        pageSize: pageLimit ?? 100,
        sort: [],
        totalCount: totalCount ?? 0,
      },
    };
  }, [currentPageNumber, pageLimit, totalCount]);

  const refreshButtonFunction = useCallback(() => {
    if (gridParamsData) {
      getDataPaged(gridParamsData);
    }
  }, [getDataPaged, gridParamsData]);

  const onPaginationPageChange = useCallback(
    async (currentPage?: number, pageSizeElement?: number) => {
      getDataPaged(gridParamsData);

      if (grid?.result === '1') {
        if (grid?.data?.totalElements) {
          setCurrentPageNumber(currentPage ?? 1);
          setPageLimit(pageSizeElement ?? 100);
          setTotalCount(grid?.data?.totalElements);
        }
      }
    },
    [getDataPaged, grid?.data?.totalElements, grid?.result, gridParamsData]
  );

  const sortData = useCallback(
    (sorted: GridSort[]) => {
      const gridParamsData = {
        dictCode: 'OS_EMPLOYEES',
        grid: {
          filter: [],
          pageNumber: currentPageNumber,
          pageSize: pageLimit,
          sort: sorted,
          totalCount: totalCount ?? 0,
        },
      };
      getDataPaged(gridParamsData);
    },
    [currentPageNumber, getDataPaged, pageLimit, totalCount]
  );

  // ------------------------------------------------------------

  const [hasOpenModal, setHasOpenModal] = useState(false);
  const [selectedFild, setSelectedFild]: any = useState('');
  const [inputValue, setInputValue] = useState(selectedFild);
  const inputValueRef = useRef(selectedFild) as React.MutableRefObject<any>;
  const [clearInputValue, setClearInputValue] = useState(true);

  useEffect(() => {
    inputValueRef.current = selectedFild;
    selectTreeItems?.(selectedFild);
  }, [selectTreeItems, selectedFild]);

  const OnClickOpenModal = useCallback(() => {
    setHasOpenModal(true);
    checkFormEnter('CORE_USER_ADD_EDIT');
    onPaginationPageChange();
  }, [checkFormEnter, onPaginationPageChange]);

  const OnClearFilds = useCallback(() => {
    inputValueRef.current = null;
    setInputValue(null);
    setSelectedFild(null);
    setClearInputValue(false);
  }, []);

  const OnClickCloseModal = useCallback(() => {
    setHasOpenModal(false);
  }, []);

  const selectRow = useCallback(() => {
    setClearInputValue(true);
    setInputValue(selectedFild);
    onChange?.(index, selected.employee_id);
    OnClickCloseModal();
  }, [OnClickCloseModal, index, onChange, selected.employee_id, selectedFild]);

  return (
    <div className={classNames(cls.gridModal, {}, [className])}>
      <HStack max className={cls.gridForm}>
        <Input
          readOnly
          className={cls.inputPointer}
          placeholder={placeholder}
          onChange={(e: any) => setInputValue(e.target.value)}
          value={clearInputValue === true ? selected?.full_name : ''}
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
          className={cls.treeViewIcons}
        />
      </HStack>

      <Modal
        isGrid
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
          onClick={selectRow}
        >
          {t('Выбрать')}
        </Button>
        <Grid
          // for grid data
          gridCols={headerData}
          rowData={grid?.data?.content as any}
          // for grid height
          gridHeight={630}
          selectedFields={(selected: any) => setSelected(selected)}
          // pagination
          pageCountOptions={pageCountOptions}
          defaultPageSize={100}
          onPaginationPageChange={onPaginationPageChange}
          totalDataCount={grid?.data?.totalElements}
          // sort function
          setSortFields={sortData}
          // refresh function
          onRefresh={refreshButtonFunction}
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
          // isModalGrid
          isModalGrid={true}
        />
      </Modal>
    </div>
  );
});
