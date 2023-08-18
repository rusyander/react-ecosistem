import { rtkApi } from 'shared/api/rtkApi';
const OsSubregionsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    saveData: build.mutation<any[], null>({
      query: (data) => ({
        url: '/api/core/os/dict/subregion/saveData',
        body: data,
        method: 'POST',
      }),
    }),
    deleteData: build.mutation<any[], null>({
      query: (data) => ({
        url: '/api/core/os/dict/subregion/deleteData',
        body: data,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});
export const saveDataM = OsSubregionsApi.useSaveDataMutation;
export const deleteDataM = OsSubregionsApi.useDeleteDataMutation;
