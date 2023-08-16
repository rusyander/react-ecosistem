import { rtkApi } from 'shared/api/rtkApi';
const CoreAuditActionsWidgetsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getName: build.query<any[], null>({
      query: (limit) => ({
        url: 'api??',
        params: {
          _limit: limit,
        },
      }),
      providesTags: ['User'],
    }),
  }),
  overrideExisting: true,
});
//export const getName = name.useGetNameQuery;
