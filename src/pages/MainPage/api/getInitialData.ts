import { rtkApi } from 'shared/api/rtkApi';
import { InitPayload } from '../model/types/type';
import { InitDataTypes } from 'shared/types/ititType';

const initialDataApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getInitialData: build.mutation<InitDataTypes, InitPayload>({
      query: (body) => ({
        url: '/api/core/desktop/init',
        method: 'POST',
        body: {
          appVersion: 1,
          session: body,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const getInitialDataList = initialDataApi.useGetInitialDataMutation;
