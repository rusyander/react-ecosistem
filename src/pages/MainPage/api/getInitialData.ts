import { rtkApi } from 'shared/api/rtkApi';

const initialDataApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getInitialData: build.mutation({
      query: (body: any) => ({
        url: '/api/core/desktop/init',
        method: 'POST',
        body: {
          appVersion: 1,
          session: JSON.parse(body),
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const getInitialDataList = initialDataApi.useGetInitialDataMutation;
