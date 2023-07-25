import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Filters.module.scss';
import { Button, HStack, VStack, classNames } from 'Modules/UiKit';
import { FilterBlock } from '../../../../shared/types/filterBlock';
import { FilterItems } from '../../../../entities/FilterItems';

const UseFilterPayload = (
  data: FilterBlock[],
  setUpdateData: any,
  index: number,
  value: string,
  isFilter?: boolean
) => {
  const updatedData = [...data];
  updatedData[index] = { ...updatedData[index], value };
  setUpdateData(updatedData);

  // if (updatedData) {
  const changedData = updatedData.map((item) => {
    if (isFilter && item.value !== '' && item.value !== undefined) {
      const payloadDataMap = {
        itemName: item.itemName,
        colName: item.colName,
        dataType: item.dataType,
        condition: item.condition,
        upperSign: item.upperSign,
        likePercSign: item.likePercSign,

        filterGroup: 'ALL',
        values: item.condition === 'BETWEEN' ? item.value : [item.value],
      };
      return payloadDataMap;
    }
    if (!isFilter) {
      const payloadDataMap = {
        fildName: item.itemName,
        fildValue: item.value,
      };
      return payloadDataMap;
    }
    return undefined;
  });

  const currentData = changedData.filter((item) => item !== undefined);
  // }
  return currentData;
};

interface FiltersProps {
  className?: string;
  getGridData?: (data: any) => void;
  filterData?: any;
  modalTitle?: string;
  isFilter?: boolean;
  // if not filter
  setInputsValues?: (data: any) => void;
}

export const Filters = memo((props: FiltersProps) => {
  const {
    className,
    getGridData,
    filterData,
    modalTitle,
    isFilter = true,
    setInputsValues,
  } = props;
  const { t } = useTranslation();

  const [filterColsData, setFilterColsData] = useState<FilterBlock[]>(
    filterData as FilterBlock[]
  );
  const [newDataArray, setNewDataArray] = useState<FilterBlock[] | undefined>(
    undefined
  );

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

  const convertArrayToObject = (array: any) => {
    const result: any = {};
    array.forEach((item: any) => {
      result[item.fildName] = item.fildValue;
    });
    return result;
  };

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
  }, [getGridData, newFilterPayload]);

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
          data={filterColsData}
          onChange={handleInputChange}
          modalTitle={modalTitle}
        />
      </VStack>

      <HStack align="center" justify="around" className={cls.buttons}>
        <Button size="size_s" theme="background" onClick={handleFilter}>
          {t('Применить')}
        </Button>
        <Button onClick={clear} size="size_s" theme="background">
          {t('Очистить')}
        </Button>
      </HStack>
    </div>
  );
});
