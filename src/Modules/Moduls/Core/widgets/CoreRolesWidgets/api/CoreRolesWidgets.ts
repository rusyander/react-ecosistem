import { rtkApi } from 'shared/api/rtkApi';
const CoreRolesWidgetsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getName: build.query<any[], null>({
      query: (limit) => ({
        url: 'api??',
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
  overrideExisting: true,
});
//export const getName = name.useGetNameQuery;
