import { rtkApi } from 'shared/api/rtkApi';

const FilterApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    //     filterGridInit: build.mutation<any, any>({
    //       query: (arg) => ({
    //         url: '/api/core/grid/init',
    //         body: 'add_edit_user',
    //         method: 'POST',
    //       }),
    //     }),
    //   }),
  }),
  overrideExisting: true,
});
