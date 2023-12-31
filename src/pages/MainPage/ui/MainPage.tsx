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
import { InitDataTypes } from 'shared/types/initType';

export default function MainPage() {
  const [initialData, setInitialData] = useState<InitDataTypes>({});
  const [getInitialData] = getInitialDataList();
  const dispatch = useAppDispatch();
  const globalDataList = useSelector(globalData);

  const session = localStorage.getItem(USER_LOCALSTORAGE_HEADER) || '';

  const setInitiadData = useCallback(() => {
    if (session) {
      getInitialData(JSON.parse(session)).then((res: InitDataTypes | any) => {
        dispatch(UserActions.setGlobalData(res?.data));
        setInitialData(res?.data);
      });
    }
  }, [dispatch, getInitialData, session]);

  useEffect(() => {
    setInitiadData();
  }, []);

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
