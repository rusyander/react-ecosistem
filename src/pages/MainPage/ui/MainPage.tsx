import { BreadCrumbs } from 'Modules/UiKit';
import { useCallback, useEffect, useState } from 'react';
import cls from './MainPage.module.scss';
import { useSelector } from 'react-redux';
import { CoreApp } from 'Modules/Moduls/Core';
import { UserActions, globalData } from 'entities/User';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { getInitialDataList } from '../api/getInitialData';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Os } from 'Modules/Moduls/Os';
import { USER_LOCALSTORAGE_HEADER } from 'shared/const/localstorage';

export default function MainPage() {
  const [initialData, setInitialData] = useState<any>();
  const [getInitialData] = getInitialDataList();
  const dispatch = useAppDispatch();
  const globalDataList = useSelector(globalData);

  const session = localStorage.getItem(USER_LOCALSTORAGE_HEADER) || '';

  const setInitiadData = useCallback(() => {
    if (session) {
      getInitialData(session).then((res: any) => {
        dispatch(UserActions.setGlobalData(res?.data));
        setInitialData(res?.data);
      });
    }
  }, [dispatch, getInitialData, session]);

  useEffect(() => {
    setInitiadData();
  }, []);
  console.log('globalDataList', globalDataList);

  return (
    <div className={cls.formSize}>
      <Sidebar sidebarData={globalDataList} initialData={initialData} />
      <>
        <Navbar navbarData={globalDataList} />
        <BreadCrumbs />
      </>
      {globalDataList?.data?.userRoleInfo?.userRoleId === 3 && <Os />}
      {globalDataList?.data?.userRoleInfo?.userRoleId === 1 && <CoreApp />}
    </div>
  );
}
