import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Filters.module.scss';
import { Button, HStack, VStack, classNames } from 'Modules/UiKit';

import { UseFilterPayload } from '../../functions/normalizePayload';
import { FilterBlock } from 'shared/Globals/types/filterBlock';
import { FilterItems } from 'features/FilterItems';

interface FiltersProps {
  className?: string;
  getGridData?: (data: any) => void;
  filterData?: any;
  modalTitle?: string;
  isFilter?: boolean;
  // if not filter
  setInputsValues?: (data: any) => void;
  attrData?: any;
  errorData?: any;
  defaultValuesData?: any;
  payloadData?: any;
  refetchClearData?: () => void;
  filteredData?: (value: any) => void;
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
    errorData,
    defaultValuesData,
    payloadData,
    refetchClearData,
    filteredData,
  } = props;
  const { t } = useTranslation();

  const [filterColsData, setFilterColsData] = useState<FilterBlock[]>(
    // []
    filterData as FilterBlock[]
  );
  const [newDataArray, setNewDataArray] = useState<FilterBlock[] | undefined>(
    undefined
  );

  // payloadData
  const newFilterPayload = useMemo(() => {
    if (isFilter) {
      if (payloadData.filter !== undefined) {
        return { ...payloadData, filter: newDataArray };
      } else {
        const updatedGridRequest = {
          ...payloadData.gridRequest,
          filter: newDataArray,
        };

        return {
          ...payloadData,
          gridRequest: updatedGridRequest,
        };
      }
    }
  }, [isFilter, newDataArray, payloadData]);

  // function for input change and update data
  const handleInputChange = useCallback(
    (index: number, value: string) => {
      const data = UseFilterPayload(
        filterColsData,
        setFilterColsData,
        index,
        value,
        isFilter
      );

      if (isFilter) {
        setNewDataArray(data as any);
        filteredData?.(data);
      }
      setInputsValues?.(data);
    },
    [filterColsData, filteredData, isFilter, setInputsValues]
  );

  // function for filter and update data
  const handleFilter = useCallback(() => {
    if (isFilter) {
      getGridData?.(newFilterPayload);
    }
  }, [getGridData, isFilter, newFilterPayload]);

  // function for clear filter
  const clear = useCallback(() => {
    // setFilterColsData(filterData as any);
    refetchClearData?.();
  }, [refetchClearData]);

  // function for keydown
  const onKeyDown = useCallback(
    (e: KeyboardEvent | any) => {
      if (e.key === 'Enter') {
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
      onKeyDown={onKeyDown}
    >
      <VStack gap="16">
        <FilterItems
          data={filterColsData}
          onChange={handleInputChange}
          modalTitle={modalTitle}
          isFilter={isFilter}
          attrData={attrData}
          errorData={errorData}
          defaultValuesData={defaultValuesData}
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
