import { rtkApi } from 'shared/api/rtkApi';
import { RoleReturnData } from '../models/types/roleTypes';
import { CheckboxTreeDataProps } from 'shared/Globals/types/checkboxTreeTypes';
import { SaveAccessDataPayload } from 'shared/types/initType';

const RoleApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    addDataRole: build.mutation<RoleReturnData, any>({
      query: (data) => ({
        url: '/api/core/role/addData',
        body: data,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    deleteRole: build.mutation<RoleReturnData, string>({
      query: (id) => ({
        url: '/api/core/role/deleteData',
        body: id,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    saveAccessData: build.mutation<
      SaveAccessDataPayload,
      CheckboxTreeDataProps
    >({
      query: (payload) => ({
        url: '/api/core/role/saveAccessData',
        body: payload,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    getAccessTree: build.mutation<CheckboxTreeDataProps, string[]>({
      query: (path) => ({
        url: '/api/core/role/getAccessTree',
        body: path,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: true,
});

export const AddDataRoleM = RoleApi.useAddDataRoleMutation;
export const DeleteRoleM = RoleApi.useDeleteRoleMutation;
export const SaveAccessDataM = RoleApi.useSaveAccessDataMutation;
export const getAccessTreeM = RoleApi.useGetAccessTreeMutation;
