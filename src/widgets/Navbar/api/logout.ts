import { rtkApi } from 'shared/api/rtkApi';

const logoutApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    logout: build.mutation({
      query: () => ({
        url: '/api/core/security/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const mutationLogout = logoutApi.useLogoutMutation;
