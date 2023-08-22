interface PageGridParamsDataProps {
  roleName?: string;
  currentPageNumber?: number | undefined;
  pageLimit?: number;
  totalCount?: number | null;
  sorted?: string[] | null;
  filter?: string[] | null;
  params?: string[] | null | number[];

  //
  applCode?: null | any;
  roleCode?: null | any;
  orgId?: null | any;
  userId?: null | any;

  //
  parameterCode?: null | any;
  applicationCode?: null | any;
}

export const pageGridParamsData = (props: PageGridParamsDataProps) => {
  const {
    roleName,
    currentPageNumber = 1,
    pageLimit = 100,
    totalCount = null,
    sorted = [],
    filter = [],
    params = [],
  } = props;
  return {
    gridCode: roleName,
    gridRequest: {
      filter: filter ? filter : [],
      pageNumber: currentPageNumber ?? 1,
      pageSize: pageLimit ?? 100,
      sort: sorted ? sorted : [],
      params: params ? params : [],
      totalCount: totalCount ?? null,
    },
  };
};

export const pageGridParamsDataNoBeckend = (props: PageGridParamsDataProps) => {
  const {
    currentPageNumber = 1,
    pageLimit = 100,
    totalCount = null,
    sorted = [],
    filter = [],
  } = props;
  return {
    filter: filter ? filter : [],
    pageNumber: currentPageNumber ?? 1,
    pageSize: pageLimit ?? 100,
    sort: sorted ? sorted : [],
    params: [],
    totalCount: totalCount ?? null,
  };
};

export const pageGridParamsDataNoBeckendWithInputs = (
  props: PageGridParamsDataProps
) => {
  const {
    currentPageNumber = 1,
    pageLimit = 100,
    totalCount = null,
    sorted = [],
    filter = [],
    applCode = null,
    roleCode = null,
    orgId = null,
    userId = null,
  } = props;
  return {
    applCode: applCode ? applCode : null,
    roleCode: roleCode ? roleCode : null,
    orgId: orgId ? orgId : null,
    userId: userId ? userId : null,
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

export const pageGridSysParamsAllValue = (props: PageGridParamsDataProps) => {
  const {
    currentPageNumber = 1,
    pageLimit = 100,
    totalCount = null,
    sorted = [],
    filter = [],
    applicationCode = 'CORE',
    parameterCode = null,
  } = props;
  return {
    applicationCode: applicationCode ? applicationCode : 'CORE',
    parameterCode: parameterCode ? parameterCode : null,
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
