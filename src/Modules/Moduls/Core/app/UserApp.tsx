import { Suspense, useEffect } from 'react';

import { AppRouter2 } from './providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
// import { UserActions, getUserInitedSelectors } from 'entities/User';
import { classNames } from 'Modules/UiKit';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider2 } from './providers/StoreProvider';

export const UserApp = () => {
  const dispatch = useDispatch();
  // const initedUser = useSelector(getUserInitedSelectors);

  // useEffect(() => {
  //   dispatch(UserActions.initAuthData());
  // }, [dispatch]);

  return (
    // <BrowserRouter>
    // <StoreProvider2>
    //   {/* <div className={classNames('app', {}, [theme])}> */}
    //   <div className={classNames('app', {}, [])}>
    //     <Suspense fallback={''}>
    //       <Navbar />

    //       <div className="content-page">
    //         {/* <Sidebar /> */}
    //         {/* {initedUser && <AppRouter />} */}
    //         <AppRouter />
    //       </div>
    //     </Suspense>
    //   </div>
    // </StoreProvider2>
    // </BrowserRouter>
    // <div className={classNames('app', {}, [theme])}>
    //   <Suspense fallback={''}>
    //     <Navbar />

    //     <div className="content-page">
    //       <Sidebar />
    //       {initedUser && <AppRouter />}
    //     </div>
    //   </Suspense>
    // </div>

    <StoreProvider2>
      <Suspense fallback={''}>
        <div className="navBatHeight">
          <Navbar />
        </div>
        <div className="contentMargin">
          <AppRouter2 />
        </div>
      </Suspense>
    </StoreProvider2>
  );
};
// --sidebar-height
