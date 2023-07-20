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

//--------------------------------------- DATA
export interface GridDataTypes {
  commnets?: string | null;
  data?: GridData | null;
  result?: string;
}

export interface GridData {
  // content?: Content[]; // dynamic
  content?: any; // dynamic

  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageble?: Pageble; // dynamic
  size?: number;
  sort?: Sort; // dynamic
  totalElements: number;
  totalPages: number;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageble {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  unpaged: boolean;
}
