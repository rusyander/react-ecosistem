export const headerGridData = (gridDataInit: any) => {
  return gridDataInit?.data?.cols?.map((item: any) => {
    return {
      field: item?.fieldName,
      size: `${item.width}px`,
      is_sortable_flag: item?.isSortableFlagCode === 'Y' ? true : false,
      header: item?.name,
    };
  });
};
