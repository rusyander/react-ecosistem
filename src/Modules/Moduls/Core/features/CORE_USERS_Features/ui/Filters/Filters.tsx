import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Filters.module.scss';
import { Button, HStack, VStack, classNames } from 'Modules/UiKit';
import { FilterBlock } from '../../../../shared/types/filterBlock';
import { CORE_USERS_Filter } from 'Modules/Moduls/Core/entities/CORE_USERS_Filter';
import { getFilterDataGridInitM } from '../../api/filterApi';

interface FiltersProps {
  className?: string;
  getGridData?: (data: any) => void;
}

export const Filters = memo((props: FiltersProps) => {
  const { className, getGridData } = props;
  const { t } = useTranslation('core');
  const [filterGridInit] = getFilterDataGridInitM();

  const payloadData = {
    itemName: 'login',
    colName: 'e.login',
    dataType: 1,
    condition: 'LIKE',
    upperSign: 'BOTH',
    likePercSign: 'ALL',

    filterGroup: 'ALL',
    values: ['USER'],

    // для дропдауна
    //likePercSign: "NONE"
    //upperSign:"NONE"
    // values:["Y"]
  };

  const [filterColsData, setFilterColsData] = useState<FilterBlock[]>([
    {
      itemName: 'first_last_name',
      colName: 'e.firstLastName',
      dataType: 1,
      condition: 'LIKE',
      upperSign: 'BOTH',
      likePercSign: 'ALL',
      value: '',
      displayType: 'F',
    },
    {
      itemName: 'login',
      colName: 'e.login',
      dataType: 1,
      condition: 'LIKE',
      upperSign: 'BOTH',
      likePercSign: 'ALL',
      value: '',
      displayType: 'F',
    },
    {
      itemName: 'is_active_flag_name',
      colName: 'e.isActiveFlagCode',
      condition: '=',
      dataType: 1,
      displayType: 'L',
      dictCode: 'TEST',
      codeProperty: 'code',
      nameProperty: 'name',
      attrCode: 'YES_NO',
    },
  ]);

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
    const updatedData = [...filterColsData];
    updatedData[index] = { ...updatedData[index], value };
    setFilterColsData(updatedData);

    if (updatedData) {
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
            values: [item.value],
          };
          return payloadDataMap;
        }
        return undefined;
      });

      const currentData = changedData.filter((item) => item !== undefined);
      setNewDataArray(currentData as FilterBlock[]);
    }
  };

  const handleFilter = () => {
    getGridData?.(newFilterPayload);
  };

  return (
    <div className={classNames(cls.filters, {}, [className])}>
      <VStack gap="16">
        <CORE_USERS_Filter data={filterColsData} onChange={handleInputChange} />
      </VStack>
      <button onClick={filterGridInit}>click</button>

      <HStack align="center" justify="around" className={cls.buttons}>
        <Button size="size_s" theme="background" onClick={handleFilter}>
          {t('Применить')}
        </Button>
        <Button size="size_s" theme="background">
          {t('Очистить')}
        </Button>
      </HStack>
    </div>
  );
});
