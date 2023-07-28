import { rtkApi } from 'shared/api/rtkApi';

const SaveDataApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    saveData: build.mutation<any, any>({
      query: (formData) => ({
        url: '/api/core/user/saveData',
        body: formData,
        method: 'POST',
      }),
    }),
    getData: build.mutation({
      query: (id) => ({
        url: '/api/core/user/getData',
        body: id,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});
export const SaveDataM = SaveDataApi.useSaveDataMutation;
export const GetDataM = SaveDataApi.useGetDataMutation;

// create -

// {
//   "firstLastName": "2",
//   "login": "2",
//   "changePasswordFlagCode": "N",
//   "addInfo": "2",
//   "emailAddress": "2",
//   "address": "2",
//   "fax": "2",
//   "startDate": "28.07.2023",
//   "endDate": "29.07.2023",
//   "employeeId": 1,
//   "organizationId": 47,
//   "isActiveFlagCode": "Y"
//   "password": "2",
// }

// edit -
// {
//   "firstLastName": "2",
//   "login": "2",
//   "changePasswordFlagCode": "N",
//   "addInfo": "2",
//   "isActiveFlagCode": "Y",
//   "emailAddress": "2",
//   "address": "2",
//   "fax": "2",
//   "startDate": "28.07.2023"
//   "endDate": "29.07.2023",
//   "employeeId": 1,
//   "employeeIdName": "ADMIN",
//   "userId": 22,
//   "organizationIdName": "Головная организация 10",
//   "organizationId": 47,
//   "telefon": null,
// }
