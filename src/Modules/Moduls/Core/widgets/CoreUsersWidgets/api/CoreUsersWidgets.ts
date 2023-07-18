import { rtkApi } from 'shared/api/rtkApi';
const CoreUsersWidgetsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    checkFormEnter: build.mutation<any, any>({
      query: (formCode: string) => ({
        url: '/api/core/security/checkFormEnter',
        body: formCode,
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
export const checkFormEnterM = CoreUsersWidgetsApi.useCheckFormEnterMutation;
export const getGridDataM = CoreUsersWidgetsApi.useGetGridDataMutation;
