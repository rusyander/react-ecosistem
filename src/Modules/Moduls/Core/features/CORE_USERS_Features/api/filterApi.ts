import { rtkApi } from 'shared/api/rtkApi';

const FilterApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    filterGridInit: build.mutation<any, any>({
      query: (arg) => ({
        url: '/api/core/grid/init',
        body: 'CORE_USER_ROLES',
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});
export const getFilterDataGridInitM = FilterApi.useFilterGridInitMutation;
