import { Page } from 'Modules/UiKit';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { checkFormEnterM, getGridDataM } from '../api/CORE_USERS_API';
import { useEffect } from 'react';
import { CoreUsersWidgets } from '../../../widgets/CoreUsersWidgets';

export default function CORE_USERS() {
  const { t } = useTranslation('');
  // const locations = useLocation();

  // const [checkFormEnter, { data }] = checkFormEnterM();
  // const [getGridData, { data: grid }] = getGridDataM();
  // const sessions =
  //   localStorage.getItem('e531a7d0-6948-4ae2-a051-a1754c7ad48') || '';
  // const gridParams = {
  //   filter: [],
  //   pageNumber: 1,
  //   pageSize: 10,
  //   params: [],
  //   // session: sessions,
  //   sort: [],
  //   totalCount: 0,
  // };

  // useEffect(() => {
  //   checkFormEnter(locations.pathname.replaceAll('/', ''));
  //   getGridData(gridParams);
  // }, []);

  // const getGrid = () => {
  //   getGridData(gridParams);
  // };
  // console.log('checkFormEnterRequest', data?.result);
  // console.log('gridRequest', grid);

  return (
    <Page>
      {/* <div>CORE_USERS</div> */}
      {/* <button onClick={getGrid}>click</button> */}
      <CoreUsersWidgets />
    </Page>
  );
}
