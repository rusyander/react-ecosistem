import { CoreApp } from 'Modules/Moduls/Core';
import React from 'react';
import { Sidebar } from 'widgets/Sidebar';

export default function MainPage() {
  return (
    <>
      <Sidebar />
      <CoreApp />
    </>
  );
}
