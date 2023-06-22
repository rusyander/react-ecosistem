import { TreeView } from '../shared/ui/TreeView/ui/TreeView/TreeView';

// import Routers from "./providers/router/routes";
import { BreadCrumbs } from '../features/BreadCrumbs';

import { DropdownMenu } from '../shared/ui/DropdownMenu';
import { MultiSelect } from '../shared/ui/MultiSelect/ui/MultiSelect';
import { Input, Navigation, Select, Tooltip } from '../shared';
import { Grid } from '..';

import { TreeViewInPopup } from '../features/TreeViewInPopup';
import { useState } from 'react';
import { GridPage } from '../page/Grid';

const pageCountOptions2 = [
  { value: 2, label: '2' },
  { value: 10, label: '10' },
];

// ---------------------

const treeData = [
  {
    label: 'Node 1',
    id: '1',
    children: [
      {
        label: 'Node 1.1',
        id: '2',
        children: [
          { label: 'Node 1.1.1', id: '3' },
          {
            label: 'Node 1.1.2',
            id: '4',
            children: [{ id: '5', label: 'Node 1.1.2' }],
          },
        ],
      },
      { id: '6', label: 'Node 1.2' },
    ],
  },
  {
    id: '7',
    label: 'Node 2',
    children: [
      { label: 'Node 2.1', id: '8' },
      { label: 'Node 2.2', id: '9' },
    ],
  },
];

const menuItems = [
  {
    title: 'Home',
    url: '/page1',
  },
  {
    title: 'Services',
    url: '/page1',
    submenu: [
      {
        title: 'web design',
        url: '/page2',
      },
      {
        title: 'web development',
        url: '/page1',
        submenu: [
          {
            title: 'Frontend',
            url: '/page3',
          },
          {
            title: 'Backend',
            submenu: [
              {
                title: 'NodeJS',
                url: '/page2',
              },
              {
                title: 'PHP',
                url: '/page1',
              },
            ],
          },
        ],
      },
      {
        title: 'SEO',
        url: '/page1',
      },
    ],
  },
  {
    title: 'About',
    url: '//page1',
    submenu: [
      {
        title: 'Who we are',
        url: '/page2',
      },
      {
        title: 'Our values',
        url: '/page3',
      },
    ],
  },
];

const options = [
  { value: '1', label: 'Oon 1 sdasdasadasadasasdasdasdasd' },
  { value: '2', label: 'Opion 2' },
  { value: '3', label: 'Oon 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: ' 4' },
  { value: '6', label: 'Opon 4' },
  { value: '7', label: 'On 4' },
];

const selectOptions = [
  { value: 200, label: '200' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30' },
  { value: 40, label: '40' },
];

function App() {
  const [multiSelectData, setMultiSelectData] = useState<string[]>([]);
  const [selectData, setSelectData] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectTree, setSelectTree] = useState([]);

  return (
    <>
      {/* <div className="navigations">
        <Navigation path={"/page1"} name={"Страница 1"} />
        <Navigation path={"/page2"} name={"Страница 2"} />
        <Navigation path={"/page3"} name={"Страница 3"} />
      </div> */}

      {/* ----------------------- */}
      {/* <BreadCrumbs /> */}

      {/* routers */}
      {/* <Routers /> */}

      {/* TreeViews */}
      {/* <TreeView
        data={treeData}
        selectTreeItems={(value: any) => setSelectTree(value)}
      /> */}

      {/* Tooltip */}
      {/* <Tooltip text="delete">
        {(propsGetter) => (
          <button
            {...propsGetter({
              // onMouseEnter: (e) => console.log(e, "enter"),
            })}
          >
            Tooltip text
          </button>
        )}
      </Tooltip> */}

      {/* DropdownMenu */}
      {/* <DropdownMenu menuItems={menuItems} /> */}

      {/* Multiselect */}
      {/* <MultiSelect
        options={options}
        className="multiselect"
        onChange={(value) => setMultiSelectData(value)}
      /> */}

      {/* Select */}
      {/* <Select
        options={selectOptions}
        onSelect={(value: string) => setSelectData(value)}
      /> */}

      {/* Input */}
      {/* <Input
        value={inputValue}
        label="value"
        placeholder="value"
        onChange={(value) => setInputValue(value)}
      /> */}

      {/* GridPage */}
      <GridPage />

      {/* treeView popup */}
      {/* <TreeViewInPopup
        data={treeData}
        selectTreeItems={(value: any) => setSelectTree(value)}
        placeholder={"Выберите значение"}
      /> */}
    </>
  );
}

export default App;
