export { UserReducer, UserActions } from './model/slice/UserSlice';
export type { UserSchema, User } from './model/types/user';
export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
export { getUserInitedSelectors } from './model/selectors/getUserInitedSelectors/getUserInitedSelectors';
export { getUserIsAuth } from './model/selectors/getUserIsAuth/getUserIsAuth';
export { getDefaultDataQ } from './api/getDefaultData';
export { globalData } from './model/selectors/globalData';
