import { CoreApp } from 'Modules/Moduls/Core';
import MainPage from 'pages/MainPage/ui/MainPage';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

export default function Routers(): JSX.Element {
  const location = useLocation();

  return (
    <Routes location={location}>
      {/* <Route path="*" element={<MainPage />} /> */}
      {/* <Route path="/" element={<MainPage />}>
        <Route path="core" element={<CoreApp />} />
      </Route> */}

      {/* <Route path="/core/*" element={<CoreApp />} /> */}
    </Routes>
  );
}
