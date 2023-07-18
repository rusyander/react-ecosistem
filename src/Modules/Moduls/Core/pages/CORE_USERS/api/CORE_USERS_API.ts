import { rtkApi } from 'shared/api/rtkApi';
import { GridType } from '../model/types/gridType';

const CORE_USERS_API = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    checkFormEnter: build.mutation<any, any>({
      query: (formCode: string) => ({
        url: '/api/core/security/checkFormEnter',
        body: formCode, //CORE_USERS
        method: 'POST',
      }),
    }),

    getGridData: build.mutation<any, any>({
      query: (arg) => ({
        url: '/api/core/user/getGridData',
        body: arg,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});

export const checkFormEnterM = CORE_USERS_API.useCheckFormEnterMutation;
export const getGridDataM = CORE_USERS_API.useGetGridDataMutation;
