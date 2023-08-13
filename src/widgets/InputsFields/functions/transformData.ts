export function transformData(inputData: any, defaultValue?: any) {
  const result: any = {};

  for (const item of inputData) {
    if (item.fildName === 'CORE_ADMIN_ORG_PERM') {
      if (item.fildValue === null) {
        result[defaultValue.fildName] = defaultValue.fildValue;
      }
    }
    if (item.fildValue !== null) {
      result[item.fildName] = item.fildValue;
    }
  }

  return result;
}
