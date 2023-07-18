interface GridFilter {
  colName: string;
  condition: string;
  dataType: number;
  filterGroup: string;
  itemName: string;
  likePercSign: string;
  upperSign: string;
  values: string[];
}

interface GridSession {
  lang: number;
  loginId: string;
  orgId: number;
  userId: number;
}
interface GridSort {
  direction: string;
  property: string;
}

export interface GridType {
  filter?: GridFilter[];
  pageNumber?: number;
  pageSize?: number;
  params?: any;
  session?: GridSession;
  sort?: GridSort[];
  totalCount?: number;
}
// {
//   "filter": [
//     {
//       "colName": "string",
//       "condition": "string",
//       "dataType": 0,
//       "filterGroup": "string",
//       "itemName": "string",
//       "likePercSign": "string",
//       "upperSign": "string",
//       "values": [
//         "string"
//       ]
//     }
//   ],
//   "pageNumber": 0,
//   "pageSize": 0,
//   "params": [
//     {}
//   ],
//   "session": {
//     "lang": 1,
//     "loginId": "string",
//     "orgId": -1,
//     "userId": 1
//   },
//   "sort": [
//     {
//       "direction": "string",
//       "property": "string"
//     }
//   ],
//   "totalCount": 0
// }
