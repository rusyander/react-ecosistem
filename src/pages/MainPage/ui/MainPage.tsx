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
import {
  USER_LANGUAGE,
  USER_LOCALSTORAGE_KEY,
} from 'shared/const/localstorage';

export default function MainPage() {
  const [initialData, setInitialData] = useState<any>();
  const [getInitialData] = getInitialDataList();
  const dispatch = useAppDispatch();
  const globalDataList = useSelector(globalData);

  const token: any = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
  const tok = JSON.parse(token);
  const language = localStorage.getItem(USER_LANGUAGE) || '';
  const session = { ...tok, lang: language !== '' ? language : '1' };

  const setInitiadData = () => {
    if (session) {
      getInitialData(JSON.stringify(session)).then((res: any) => {
        dispatch(UserActions.setGlobalData(res?.data));
        setInitialData(res?.data);
      });
    }
  };

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
