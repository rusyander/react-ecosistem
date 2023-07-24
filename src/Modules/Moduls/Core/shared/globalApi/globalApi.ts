import { rtkApi } from 'shared/api/rtkApi';
import { CheckFormEnter } from '../types/CheckForm';
import { UserGridDataTypes } from '../../widgets/CoreUsersWidgets/model/types/coreUsersWidgets';
import { GridType } from '../types/GridTypes';

const CoreGlobalApi = rtkApi.injectEndpoints({
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

    getAttrValues: build.mutation<any, string>({
      query: (atrCode) => ({
        url: '/api/core/attr/getAttrValues',
        body: [{ code: atrCode }],
        method: 'POST',
      }),
    }),

    getTreePartDataSpr: build.mutation<any, string>({
      query: (paramsId) => ({
        url: '/api/os/org/getTreePartDataSpr',
        body: '-1',
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});
export const checkFormEnterM = CoreGlobalApi.useCheckFormEnterMutation;
export const getGridDataM = CoreGlobalApi.useGetGridDataMutation;
export const getAttrValuesM = CoreGlobalApi.useGetAttrValuesMutation;
export const getTreePartDataSprM = CoreGlobalApi.useGetTreePartDataSprMutation;
