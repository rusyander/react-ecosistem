export const convertArrayToObject = (array: any) => {
  const result: any = {};
  array?.forEach((item: any) => {
    if (item.fildName !== undefined && item.fildValue !== undefined) {
      result[item.fildName] = item.fildValue;
    }
  });
  return result;
};
