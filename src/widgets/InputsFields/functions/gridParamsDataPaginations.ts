interface PageGridParamsDataProps {
  roleName?: string;
  currentPageNumber?: number | undefined;
  pageLimit?: number;
  totalCount?: number | null;
  sorted?: string[] | null;
  filter?: string[] | null;
}

export const pageGridParamsData = (props: PageGridParamsDataProps) => {
  const {
    roleName,
    currentPageNumber = 1,
    pageLimit = 100,
    totalCount = null,
    sorted = [],
    filter = [],
  } = props;
  return {
    gridCode: roleName,
    gridRequest: {
      filter: filter ? filter : [],
      pageNumber: currentPageNumber ?? 1,
      pageSize: pageLimit ?? 100,
      sort: sorted ? sorted : [],
      params: [],
      totalCount: totalCount ?? null,
    },
  };
};
