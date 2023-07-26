export const convertArrayToObject = (array: any) => {
  const result: any = {};
  array.forEach((item: any) => {
    result[item.fildName] = item.fildValue;
  });
  return result;
};
