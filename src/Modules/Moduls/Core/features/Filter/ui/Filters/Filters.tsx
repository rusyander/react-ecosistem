import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Filters.module.scss';
import { Button, HStack, VStack, classNames } from 'Modules/UiKit';
import { FilterBlock } from '../../../../shared/types/filterBlock';
import { FilterItems } from '../../../../entities/FilterItems';
import { UseFilterPayload } from '../../functions/normalizePayload';
import { convertArrayToObject } from '../../functions/arrayToObject';

interface FiltersProps {
  className?: string;
  getGridData?: (data: any) => void;
  filterData?: any;
  modalTitle?: string;
  isFilter?: boolean;
  // if not filter
  setInputsValues?: (data: any) => void;
  attrData?: any;
  requiredLength?: (length: number) => void;
}

export const Filters = memo((props: FiltersProps) => {
  const {
    className,
    getGridData,
    filterData,
    modalTitle,
    isFilter = true,
    setInputsValues,
    attrData,
    requiredLength,
  } = props;
  const { t } = useTranslation();

  const [filterColsData, setFilterColsData] = useState<FilterBlock[]>(
    filterData as FilterBlock[]
  );
  const [newDataArray, setNewDataArray] = useState<FilterBlock[] | undefined>(
    undefined
  );

  // console.log('filterColsData', filterColsData);
  // --------------------------

  // filter payload
  const newFilterPayload = useMemo(
    () => ({
      filter: newDataArray,
      pageNumber: 1,
      pageSize: 100,
      params: null,
      sort: [],
      totalCount: null,
    }),
    [newDataArray]
  );

  // function for input change and update data
  const handleInputChange = useCallback(
    (index: number, value: string) => {
      const data = UseFilterPayload(
        // isFilter ? filterColsData : noFilterInputsData,
        // isFilter ? setFilterColsData : setNoFilterInputsData,
        filterColsData,
        setFilterColsData,
        index,
        value,
        isFilter,
        requiredLength
      );
      if (isFilter) {
        setNewDataArray(data as any);
      }

      if (!isFilter) {
        setInputsValues?.(convertArrayToObject(data));
      }
    },
    [filterColsData, isFilter, setInputsValues]
  );

  console.log('newDataArray ----------------', newDataArray);

  // function for filter and update data
  const handleFilter = useCallback(() => {
    if (isFilter) {
      getGridData?.(newFilterPayload);
    }
  }, [getGridData, isFilter, newFilterPayload]);

  // function for clear filter
  const clear = useCallback(() => {
    setFilterColsData(filterData as any);
  }, [filterData]);

  // function for keydown
  const onKeyDown = useCallback(
    (e: KeyboardEvent | any) => {
      if (e.key === 'Enter') {
        console.log('onKeyDown');
        handleFilter();
      }
    },
    [handleFilter]
  );

  // function for keydown
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div
      className={classNames(cls.filters, {}, [className])}
      onKeyUp={onKeyDown}
    >
      <VStack gap="16">
        <FilterItems
          // data={isFilter ? filterColsData : noFilterInputsData}
          data={filterColsData}
          onChange={handleInputChange}
          modalTitle={modalTitle}
          isFilter={isFilter}
          attrData={attrData}
        />
      </VStack>

      {isFilter && (
        <HStack align="center" justify="around" className={cls.buttons}>
          <Button size="size_s" theme="background" onClick={handleFilter}>
            {t('Применить')}
          </Button>
          <Button onClick={clear} size="size_s" theme="background">
            {t('Очистить')}
          </Button>
        </HStack>
      )}
    </div>
  );
});
