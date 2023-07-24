import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Filters.module.scss';
import { Button, HStack, VStack, classNames } from 'Modules/UiKit';
import { FilterBlock } from '../../../../shared/types/filterBlock';
import { CORE_USERS_Filter } from '../../../../entities/CORE_USERS_Filter';
import { filterBlock } from '../../consts/filterBlock';
import { getTreePartDataSprM } from 'Modules/Moduls/Core/shared/globalApi/globalApi';

const UseFilterPayload = (
  data: FilterBlock[],
  setUpdateData: any,
  index: number,
  value: string
) => {
  const updatedData = [...data];
  updatedData[index] = { ...updatedData[index], value };
  setUpdateData(updatedData);

  // if (updatedData) {
  const changedData = updatedData.map((item) => {
    if (item.value !== '' && item.value !== undefined) {
      const payloadDataMap = {
        itemName: item.itemName,
        colName: item.colName,
        dataType: item.dataType,
        condition: item.condition,
        upperSign: item.upperSign,
        likePercSign: item.likePercSign,

        filterGroup: 'ALL',
        // values: [item.value],
        values: item.condition === 'BETWEEN' ? item.value : [item.value],
      };
      return payloadDataMap;
    }
    return undefined;
  });

  const currentData = changedData.filter((item) => item !== undefined);
  // setNewDataArray(currentData as FilterBlock[]);
  // }
  return currentData;
};

interface FiltersProps {
  className?: string;
  getGridData?: (data: any) => void;
}

export const Filters = memo((props: FiltersProps) => {
  const { className, getGridData } = props;
  const { t } = useTranslation('core');
  const [getTreePartDataSpr, { data }] = getTreePartDataSprM();
  const click = () => {
    getTreePartDataSpr('-1');
    console.log('data', data);
  };

  const [filterColsData, setFilterColsData] = useState<FilterBlock[]>(
    filterBlock as FilterBlock[]
  );

  const [newDataArray, setNewDataArray] = useState<FilterBlock[] | undefined>(
    undefined
  );

  const newFilterPayload = {
    filter: newDataArray,
    pageNumber: 1,
    pageSize: 100,
    params: null,
    sort: [],
    totalCount: null,
  };

  const handleInputChange = (index: number, value: string) => {
    const data = UseFilterPayload(
      filterColsData,
      setFilterColsData,
      index,
      value
    );
    setNewDataArray(data as any);
  };

  const handleFilter = () => {
    getGridData?.(newFilterPayload);
  };

  const clear = () => {
    setFilterColsData(filterBlock as any);
  };

  return (
    <div className={classNames(cls.filters, {}, [className])}>
      <VStack gap="16">
        <CORE_USERS_Filter data={filterColsData} onChange={handleInputChange} />
      </VStack>
      <button onClick={click}>---------------click</button>

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
