export function convertToNormalizaCheckboxDefaultValue(inputArray: any) {
  const selectedData: any = {};

  inputArray?.forEach((item: any) => {
    selectedData[item] = {
      checked: true,
      partialChecked: false,
    };
  });

  return selectedData;
}
