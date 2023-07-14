import { BreadCrumbs } from 'Modules/UiKit';
import { useCallback, useEffect, useState } from 'react';
import cls from './MainPage.module.scss';
import { useDispatch } from 'react-redux';
import { CoreApp } from 'Modules/Moduls/Core';
import { UserActions } from 'entities/User';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { getInitialDataList } from '../api/getInitialData';

// export default function MainPage() {
export default function MainPage() {
  const [initialData, setInitialData] = useState<any>();
  const userAuthStorage = localStorage.getItem('user');
  const [getInitialData] = getInitialDataList();

  const setInitiadData = () => {
    if (userAuthStorage) {
      // @ts-ignore
      getInitialData(userAuthStorage).then((res) => {
        setInitialData(res);
      });
    }
  };

  useEffect(() => {
    setInitiadData();
  }, []);
  console.log('navbarData', initialData?.data);

  return (
    <div className={cls.formSize}>
      <Sidebar sidebarData={initialData?.data} />
      <>
        <Navbar navbarData={initialData?.data} />
        <BreadCrumbs />
      </>
      <CoreApp />
    </div>
  );
}
