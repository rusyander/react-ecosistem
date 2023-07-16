import { rtkApi } from 'shared/api/rtkApi';

const SidebarApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    changeLanguage: build.mutation<any, { number: number }>({
      query: (number) => ({
        url: '/api/core/desktop/changeLang',
        body: number,
        method: 'POST',
      }),
    }),
    changeRole: build.mutation<any, { code: string }>({
      query: (code) => ({
        url: '/api/core/desktop/changeRole',
        body: code,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});
//export const getName = name.useGetNameQuery;

export const changeLanguageM = SidebarApi.useChangeLanguageMutation;
export const changeRoleM = SidebarApi.useChangeRoleMutation;
