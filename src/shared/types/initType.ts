export interface InitDataTypes {
  comminets?: string | null;
  result?: string;
  data?: InitData | undefined;
}

export interface InitData {
  lang?: string;
  menu?: string;
  roleMenuFavorites?: any[];
  security?: string[];
  style?: string | null;
  userRoleInfo?: UserRoleInfo;
  userRoles: UserRoles[];
}

export interface UserRoleInfo {
  applicationCode: string;
  applicationName: string;
  applicationVersion: string;
  orgId: string;
  orgName: string;
  userRoleId: number;
  userRoleName: string;
}

export interface UserRoles {
  code?: number;
  name?: string;
}
