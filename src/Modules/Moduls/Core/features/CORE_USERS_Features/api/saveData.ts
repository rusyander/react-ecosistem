import { rtkApi } from 'shared/api/rtkApi';

const SaveDataApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    saveData: build.mutation<any, any>({
      query: (formData) => ({
        url: '/api/core/user/saveData',
        body: formData,
        method: 'POST',
      }),
    }),
    getData: build.mutation({
      query: (id) => ({
        url: '/api/core/user/getData',
        body: id,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});
export const SaveDataM = SaveDataApi.useSaveDataMutation;
export const GetDataM = SaveDataApi.useGetDataMutation;
