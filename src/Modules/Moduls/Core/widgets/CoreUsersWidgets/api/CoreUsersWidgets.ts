import { rtkApi } from 'shared/api/rtkApi';
import { CheckFormEnter } from '../../../shared/types/CheckForm';
import { GridType } from '../../../shared/types/GridTypes';
import { UserGridDataTypes } from '../model/types/coreUsersWidgets';
const CoreUsersWidgetsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    checkFormEnter: build.mutation<CheckFormEnter, string>({
      query: (formCode: string) => ({
        url: '/api/core/security/checkFormEnter',
        body: formCode,
        method: 'POST',
      }),
    }),

    getGridData: build.mutation<UserGridDataTypes, GridType>({
      query: (arg) => ({
        url: '/api/core/user/getGridData',
        body: arg,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});
export const checkFormEnterM = CoreUsersWidgetsApi.useCheckFormEnterMutation;
export const getGridDataM = CoreUsersWidgetsApi.useGetGridDataMutation;
