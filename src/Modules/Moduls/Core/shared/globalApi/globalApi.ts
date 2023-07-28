import { rtkApi } from 'shared/api/rtkApi';
import { CheckFormEnter } from '../types/CheckForm';
import { UserGridDataTypes } from '../../widgets/CoreUsersWidgets/model/types/coreUsersWidgets';
import {
  GetAttrValues,
  GetTreePartDataSpr,
  GridType,
} from '../types/GridTypes';

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

    getAttrValues: build.mutation<GetAttrValues, string>({
      query: (atrCode) => ({
        url: '/api/core/attr/getAttrValues',
        body: [{ code: atrCode }],
        method: 'POST',
      }),
    }),

    getTreePartDataSpr: build.mutation<GetTreePartDataSpr, string>({
      query: (paramsId) => ({
        url: '/api/os/org/getTreePartDataSpr',
        body: paramsId,
        method: 'POST',
      }),
    }),

    getDataPaged: build.mutation<any, any>({
      query: (data) => ({
        url: '/api/core/dict/getDataPaged',
        body: data,
        method: 'POST',
      }),
    }),

    getDataGrid: build.mutation<any, any>({
      query: (path) => ({
        url: '/api/core/grid/getData',
        body: path,
        method: 'POST',
      }),
    }),
    getGridDataInit: build.mutation<any, string>({
      query: (path) => ({
        url: '/api/core/grid/init',
        body: path,
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
export const getDataPagedM = CoreGlobalApi.useGetDataPagedMutation;
export const getDataGridM = CoreGlobalApi.useGetDataGridMutation;
export const getGridDataInitM = CoreGlobalApi.useGetGridDataInitMutation;