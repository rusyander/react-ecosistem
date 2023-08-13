import { rtkApi } from 'shared/api/rtkApi';

const RoleApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    saveDataRole: build.mutation<any, any>({
      query: (formData) => ({
        url: 'api/core/userRole/saveData',
        body: formData,
        method: 'POST',
      }),
    }),

    initPolicyDataRole: build.mutation<any, any>({
      query: (formData) => ({
        url: 'api/core/userRole/initPolicy',
        body: formData,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});
export const SaveDataRoleM = RoleApi.useSaveDataRoleMutation;
export const InitPolicyDataRoleM = RoleApi.useInitPolicyDataRoleMutation;
