import { rtkApi } from 'shared/api/rtkApi';
import { InitDataTypes } from 'shared/types/initType';

const SidebarApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    changeLanguage: build.mutation<InitDataTypes, number>({
      query: (number) => ({
        url: '/api/core/desktop/changeLang',
        body: number,
        method: 'POST',
      }),
    }),
    changeRole: build.mutation<InitDataTypes, number>({
      query: (code) => ({
        url: '/api/core/desktop/changeRole',
        body: code,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});

export const changeLanguageM = SidebarApi.useChangeLanguageMutation;
export const changeRoleM = SidebarApi.useChangeRoleMutation;
