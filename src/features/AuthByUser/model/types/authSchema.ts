interface Data {
  loginId?: string;
  userId?: string;
  userName?: string;
  needChangePassword?: boolean;
}

export interface UserData {
  result: string;
  comments: string | null;
  data?: Data | null;
}

export interface AuthSchema {
  login: string;
  password: string;
  isLoading: boolean;
  error?: string;
  userData?: UserData | undefined;
}
