import { rtkApi } from 'shared/api/rtkApi';
import {
  InitPolicyPropsResponse,
  SaveDataPropsResponse,
  UserRoleDataProps,
} from '../model/types/usersTypes';

const RoleApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    saveDataRole: build.mutation<UserRoleDataProps, SaveDataPropsResponse>({
      query: (formData) => ({
        url: 'api/core/userRole/saveData',
        body: formData,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    initPolicyDataRole: build.mutation<
      UserRoleDataProps,
      InitPolicyPropsResponse
    >({
      query: (formData) => ({
        url: 'api/core/userRole/initPolicy',
        body: formData,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    deleteUserRoleData: build.mutation<UserRoleDataProps, number>({
      query: (roleId) => ({
        url: '/api/core/userRole/deleteData',
        body: roleId,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: true,
});
export const SaveDataRoleM = RoleApi.useSaveDataRoleMutation;
export const InitPolicyDataRoleM = RoleApi.useInitPolicyDataRoleMutation;
export const DeleteUserRoleDataM = RoleApi.useDeleteUserRoleDataMutation;
