import { PayloadData } from 'shared/Globals/types/globalTypes';
import { rtkApi } from 'shared/api/rtkApi';
const OsOrgStructureWidgetsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    saveData: build.mutation<PayloadData, any>({
      query: (data) => ({
        url: '/api/os/org/saveData',
        body: data,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});

export const saveDataM = OsOrgStructureWidgetsApi.useSaveDataMutation;
