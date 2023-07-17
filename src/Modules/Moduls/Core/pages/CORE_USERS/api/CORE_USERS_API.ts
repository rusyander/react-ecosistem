import { rtkApi } from 'shared/api/rtkApi';

const CORE_USERS_API = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    checkFormEnter: build.mutation<void, { formCode: string }>({
      query: (formCode) => ({
        url: '/api/core/security/checkFormEnter',
        body: formCode,
        method: 'POST',
      }),
    }),

    getGridData: build.mutation<void, any>({
      //   query: ({ userId, articleId, rate, feedback }) => ({
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
