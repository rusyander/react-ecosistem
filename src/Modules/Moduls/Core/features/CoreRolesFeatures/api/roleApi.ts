import { rtkApi } from 'shared/api/rtkApi';
import { RoleReturnData } from '../models/types/roleTypes';

const RoleApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    addDataRole: build.mutation<RoleReturnData, any>({
      query: (data) => ({
        url: '/api/core/role/addData',
        body: data,
        method: 'POST',
      }),
    }),

    deleteRole: build.mutation<RoleReturnData, string>({
      query: (id) => ({
        url: '/api/core/role/deleteData',
        body: id,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});

export const AddDataRoleM = RoleApi.useAddDataRoleMutation;
export const DeleteRoleM = RoleApi.useDeleteRoleMutation;
