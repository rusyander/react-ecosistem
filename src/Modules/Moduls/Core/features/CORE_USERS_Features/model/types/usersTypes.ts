export interface UserRoleDataProps {
  comments: string;
  data: any;
  result: string;
}

export interface InitPolicyPropsResponse {
  applicationCode: string;
  userRoleId: number | null;
}
export interface SaveDataPropsResponse {
  applicationCode: string;
  name1: string;
  name2: string;
  name3: string;
  policies: any;
  roleCode: string;
  userId: number | null;
  userRoleId: number | null;
}
