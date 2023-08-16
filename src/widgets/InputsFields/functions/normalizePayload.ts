export const UseFilterPayload = (
  data: any,
  setUpdateData: any,
  index: number,
  value: string,
  isFilter?: boolean
) => {
  const updatedData = [...data];
  updatedData[index] = { ...updatedData[index], value };
  setUpdateData(updatedData);
  console.log('value', value);

  const changedData = updatedData.map((item) => {
    // console.log('item-------------------------', item);
    if (isFilter && item.value !== '' && item.value !== undefined) {
      if (item.filterUpperSign && item.filterLikePercSign) {
        const payloadDataMap = {
          itemName: item.fieldName,
          colName: item.filterColName,
          dataType: item.dataTypeId,
          condition: item.filterCondition,
          upperSign: item.filterUpperSign,
          likePercSign: item.filterLikePercSign,

          filterGroup: 'ALL',
          values:
            item.filterCondition === 'BETWEEN' ? item.value : [item.value],
        };
        return payloadDataMap;
      } else {
        const payloadDataMap = {
          itemName: item.fieldName,
          colName: item.filterColName,
          dataType: item.dataTypeId,
          condition: item.filterCondition,
          upperSign: 'NONE',
          likePercSign: 'NONE',

          filterGroup: 'ALL',
          values:
            item.filterCondition === 'BETWEEN' ? item.value : [item.value],
        };
        return payloadDataMap;
      }
    }
    if (!isFilter) {
      const payloadDataMap = {
        fildName: item.token,
        fildValue: item?.value,
      };
      return payloadDataMap;
    }
    return undefined;
  });

  const currentData = changedData.filter((item) => item !== undefined);
  return currentData;
};
