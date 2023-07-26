import { FilterBlock } from 'Modules/UiKit';
import { useState } from 'react';

export const UseFilterPayload = (
  data: any,
  setUpdateData: any,
  index: number,
  value: string,
  isFilter?: boolean,
  requiredLength?: (length: number) => void
) => {
  const updatedData = [...data];
  updatedData[index] = { ...updatedData[index], value };
  setUpdateData(updatedData);
  // const [isRequiredList, setIsRequiredList]: any = useState([]);
  const isRequiredList: any = [];

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
        // ? item.value.trim()
        // : [item.value.trim()],
      };
      return payloadDataMap;
    }
    if (!isFilter) {
      const payloadDataMap = {
        fildName: item.token,
        fildValue: item.value,
      };
      if (item.isNullableFlag === 'N' && item.value.trim() !== '') {
        isRequiredList.push(item.token);
        const uniqueRequiredToken = [...new Set(isRequiredList)];
        // setIsRequiredList((prev: any) => {
        //   const uniqueRequiredToken = [...new Set(prev)];
        //   return [...uniqueRequiredToken, item.token];
        // });
        console.log(
          'uniqueRequiredToken++++++++++++++++++++++++',
          uniqueRequiredToken
        );

        requiredLength?.(uniqueRequiredToken.length);
        return payloadDataMap;
      }
      if (item.isNullableFlag !== 'N') {
        return payloadDataMap;
      }
    }
    return undefined;
  });

  const currentData = changedData.filter((item) => item !== undefined);
  // }
  return currentData;
};
