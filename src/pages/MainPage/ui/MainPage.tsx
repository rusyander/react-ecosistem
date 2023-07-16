import { BreadCrumbs } from 'Modules/UiKit';
import { useCallback, useEffect, useState } from 'react';
import cls from './MainPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { CoreApp } from 'Modules/Moduls/Core';
import { UserActions, globalData } from 'entities/User';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { getInitialDataList } from '../api/getInitialData';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Os } from 'Modules/Moduls/Os';

// export default function MainPage() {
export default function MainPage() {
  const [initialData, setInitialData] = useState<any>();
  const userAuthStorage = localStorage.getItem('user');
  const [getInitialData] = getInitialDataList();
  const dispatch = useAppDispatch();
  const globalDataList = useSelector(globalData);

  const setInitiadData = () => {
    if (userAuthStorage) {
      // @ts-ignore
      getInitialData(userAuthStorage).then((res: any) => {
        dispatch(UserActions.setGlobalData(res?.data));
        setInitialData(res?.data);
        console.log('res', res);
        // console.log('globalDataList', globalDataList);
        // setInterval(() => {
        //   setInitialData(globalDataList);
        // }, 5000);
        // if (globalDataList !== undefined) {
        //   setInitialData(globalDataList);
        // } else {
        //   setInitialData(res.data);
        // }
      });
    }
  };

  useEffect(() => {
    setInitiadData();
  }, []);
  console.log(
    'globalDataList?.userRoleInfo?.userRoleId',
    globalDataList?.data?.userRoleInfo?.userRoleId
  );

  return (
    <div className={cls.formSize}>
      {/* <Sidebar sidebarData={initialData?.data} /> */}
      <Sidebar sidebarData={globalDataList} initialData={initialData} />

      <>
        {/* <Navbar navbarData={initialData?.data} /> */}
        <Navbar navbarData={globalDataList} />

        <BreadCrumbs />
      </>
      {globalDataList?.data?.userRoleInfo?.userRoleId === 3 && <Os />}
      {globalDataList?.data?.userRoleInfo?.userRoleId === 1 && <CoreApp />}
    </div>
  );
}
