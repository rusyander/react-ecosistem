export interface User {
  id: string;
  login: string;
  avatar?: string;
}

export interface UserSchema {
  authData?: User;
  isAuth: boolean;
  _inited: boolean;
  globalData?: any;
}
