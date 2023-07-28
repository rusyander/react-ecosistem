export const convertArrayToObject = (array: any, defaultValuesData?: any) => {
  const result: any = {};
  array?.forEach((item: any) => {
    // console.log('******************************', item);

    if (item.fildName !== undefined && item.fildValue !== undefined) {
      result[item.fildName] = item.fildValue;
    }
    // if (item.fildName !== undefined && item.fildValue !== undefined) {
    //   result[item.fildName] = item.fildValue;
    // } else {
    //   result[item.fildName] = defaultValuesData?.data?.[item.token];
    // }
    // if (item.fildName !== undefined && item.fildValue !== undefined) {
    //   result[item.fildName] = item.fildValue;
    // }
    // if (item.fildValue === undefined || item.fildValue === null) {
    //   result[item.fildName] = defaultValuesData?.data?.[item.token];
    // }
  });
  return result;
};
