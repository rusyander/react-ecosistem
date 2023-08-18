import { rtkApi } from 'shared/api/rtkApi';
const OsCountriesApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    addData: build.mutation<any[], null>({
      query: (data) => ({
        url: '/api/os/dict/country/addData',
        body: data,
        method: 'POST',
      }),
    }),
    editData: build.mutation<any[], null>({
      query: (data) => ({
        url: '/api/os/dict/country/editData',
        body: data,
        method: 'POST',
      }),
    }),
    deleteData: build.mutation<any[], string>({
      query: (id) => ({
        url: '/api/os/dict/country/deleteData',
        body: id,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});
export const addDataM = OsCountriesApi.useAddDataMutation;
export const editDataM = OsCountriesApi.useEditDataMutation;
export const deleteDataM = OsCountriesApi.useDeleteDataMutation;
