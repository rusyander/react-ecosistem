export interface GridFilter {
  colName: string;
  condition: string;
  dataType: number;
  filterGroup: string;
  itemName: string;
  likePercSign: string;
  upperSign: string;
  values: string[];
}

export interface GridSession {
  lang: number;
  loginId: string;
  orgId: number;
  userId: number;
}
export interface GridSort {
  direction: string;
  property: string;
}

export interface GridType {
  filter?: GridFilter[];
  pageNumber?: number;
  pageSize?: number;
  params?: any;
  session?: GridSession;
  sort?: GridSort[];
  totalCount?: number;
}
