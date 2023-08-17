import { rtkApi } from 'shared/api/rtkApi';
import { CheckFormEnter } from '../types/CheckForm';
import {
  GetAttrValues,
  GetTreePartDataSpr,
  GridType,
} from '../types/GridTypes';
import { UserGridDataTypes } from 'Modules/Moduls/Core';

const CoreGlobalApi = rtkApi.injectEndpoints({
  // tagTypes: ["Post"],
  endpoints: (build) => ({
    checkFormEnter: build.mutation<CheckFormEnter, string>({
      query: (formCode: string) => ({
        url: '/api/core/security/checkFormEnter',
        body: formCode,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    getGridData: build.mutation<UserGridDataTypes, GridType>({
      query: (arg) => ({
        url: '/api/core/user/getGridData',
        body: arg,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    getAttrValues: build.mutation<GetAttrValues, string>({
      query: (atrCode) => ({
        url: '/api/core/attr/getAttrValues',
        body: [{ code: atrCode }],
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    getTreePartDataSpr: build.mutation<GetTreePartDataSpr, string>({
      query: (paramsId) => ({
        url: '/api/os/org/getTreePartDataSpr',
        body: paramsId,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    getDataPaged: build.mutation<any, any>({
      query: (data) => ({
        url: '/api/core/dict/getDataPaged',
        body: data,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    getDataGrid: build.mutation<any, any>({
      query: (path) => ({
        url: '/api/core/grid/getData',
        body: path,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    getGridDataInit: build.mutation<any, string>({
      query: (path) => ({
        url: '/api/core/grid/init',
        body: path,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    getInit: build.mutation<any, string>({
      query: (path) => ({
        url: '/api/core/fg/init',
        body: path,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    getFgData: build.mutation<any, any>({
      query: (path) => ({
        url: '/api/core/fg/getData',
        body: path,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
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
export const getInitM = CoreGlobalApi.useGetInitMutation;
export const getFgDataM = CoreGlobalApi.useGetFgDataMutation;
