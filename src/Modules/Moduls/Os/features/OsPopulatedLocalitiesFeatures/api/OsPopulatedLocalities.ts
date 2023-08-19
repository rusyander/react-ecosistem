import { rtkApi } from 'shared/api/rtkApi';
const OsPopulatedLocalitiesApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    saveData: build.mutation<any[], null>({
      query: (data) => ({
        url: '/api/core/os/dict/populatedLocality/saveData',
        body: data,
        method: 'POST',
      }),
    }),
    deleteData: build.mutation<any[], null>({
      query: (data) => ({
        url: '/api/core/os/dict/populatedLocality/deleteData',
        body: data,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});
export const saveDataM = OsPopulatedLocalitiesApi.useSaveDataMutation;
export const deleteDataM = OsPopulatedLocalitiesApi.useDeleteDataMutation;
