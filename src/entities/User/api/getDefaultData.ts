import { rtkApi } from 'shared/api/rtkApi';

const getDefaultDataApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getDefaultData: build.query<void, any>({
      query: () => ({
        url: '/api/core/desktop/defaultData',
      }),
      providesTags: ['User'],
    }),
  }),
  overrideExisting: true,
});

export const getDefaultDataQ = getDefaultDataApi.useGetDefaultDataQuery;
