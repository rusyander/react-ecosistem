const values: any = {
  isActiveFlagCode: 'Y',
  address: null,
  changePasswordFlagCode: 'N',
  endDate: null,
  employeeIdName: 'EMP3',
  employeeId: 3,
  addInfo: null,
  login: 'ADMIN',
  userId: 1,
  organizationIdName: 'Головная организация',
  organizationId: 1,
  firstLastName: 'Системный администратор',
  emailAddress: null,
  telefon: null,
  fax: null,
  startDate: '07.02.2007',
};

export const UseFilterPayload = (
  data: any,
  setUpdateData: any,
  index: number,
  value: string,
  isFilter?: boolean,
  requiredLength?: (length: any) => void,
  allRequeredLength?: (length: any) => void,
  defaultValuesData?: any
) => {
  // const newsData = data.map((item: any) => {
  //   return {
  //     ...item,
  //     value: defaultValuesData?.data?.[item.token],
  //     // value: values?.[item.token],
  //   };
  // });

  // console.log('data', data);

  const updatedData = [...data];
  updatedData[index] = { ...updatedData[index], value };
  setUpdateData(updatedData);
  const isRequiredList: any = [];
  let allRequireNumber: any = 0;

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
        fildName: item.token,
        fildValue: item?.value,
        // fildValue: !item?.value
        //   ? defaultValuesData?.data?.[item.token]
        //   : item?.value,
      };

      if (item.isNullableFlag === 'N') {
        allRequireNumber += 1;
      }

      // if (
      //   item.isNullableFlag === 'N' &&
      //   item.value !== '' &&
      //   item.value !== undefined &&
      //   item.value !== null
      // ) {
      //   isRequiredList.push(item.token);
      //   const uniqueRequiredToken = [...new Set(isRequiredList)];
      //   requiredLength?.(uniqueRequiredToken.length);
      //   allRequeredLength?.(allRequireNumber);
      //   return payloadDataMap;
      // }
      // if (item.isNullableFlag !== 'N') {
      //   return payloadDataMap;
      // }
      return payloadDataMap;
    }
    return undefined;
  });

  const currentData = changedData.filter((item) => item !== undefined);
  return currentData;
};