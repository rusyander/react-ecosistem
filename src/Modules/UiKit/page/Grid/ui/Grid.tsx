import cls from "./Grid.module.css";
import { Grid, GridInPopup } from "../../../widgets/Grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input, Button } from "../../..";

// const rowHeaderElements = [
//   { id: "1", accessorKey: "items", header: "Items" },
//   { id: "2", accessorKey: "order", header: "Order" },
//   { id: "3", accessorKey: "amount", header: "Amount" },
//   { id: "4", accessorKey: "status", header: "Status" },
//   { id: "5", accessorKey: "deliveryDriver", header: "Delivery Driver" },
// ];
// const rowDataElements = [
//   {
//     order: "3213456785",
//     items: "Large Detroit Style Pizza1",
//     amount: "$31.437",
//     deliveryDriver: "John Doe",
//     status: "Delivered",
//     id: "1",
//   },
//   {
//     items: "Large Detroit Style Pizza2",
//     order: "3213456785",
//     amount: "$31.434",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "2",
//   },
//   {
//     items: "Large Detroit Style Pizza3",
//     order: "3213456785",
//     amount: "$31.433",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "3",
//   },
//   {
//     items: "Large Detroit Style Pizza4",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "4",
//   },
//   {
//     items: "Large Detroit Style Pizza5",
//     order: "3213456785",
//     amount: "$31.431",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "5",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "6",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "7",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "8",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "9",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "10",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "11",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "12",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "13",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "14",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "15",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "16",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "17",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "18",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "19",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "20",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "21",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "22",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "23",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "24",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "25",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "26",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "27",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "28",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "29",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "30",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "31",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "32",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "33",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "34",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "35",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "36",
//   },
//   {
//     items: "1000000000",
//     order: "1000000",
//     amount: "$31.432",
//     status: "Delivered",
//     deliveryDriver: "John Doe",
//     id: "37",
//   },
// ];

// // ---------------------------------

// const rowHeaderElements2 = [
//   { id: "1", accessorKey: "items", header: "Items" },
//   { id: "2", accessorKey: "order", header: "Order" },
//   { id: "3", accessorKey: "amount", header: "Amount" },
// ];
// const rowDataElements2 = [
//   {
//     order: "3213456785",
//     items: "Large Detroit Style Pizza1",
//     amount: "$31.437",

//     id: "1",
//   },
//   {
//     items: "Large Detroit Style Pizza2",
//     order: "3213456785",
//     amount: "$31.434",

//     id: "2",
//   },
//   {
//     items: "Large Detroit Style Pizza3",
//     order: "3213456785",
//     amount: "$31.433",

//     id: "3",
//   },
//   {
//     items: "Large Detroit Style Pizza4",
//     order: "3213456785",
//     amount: "$31.432",

//     id: "4",
//   },
//   {
//     items: "Large Detroit Style Pizza5",
//     order: "3213456785",
//     amount: "$31.431",

//     id: "5",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",

//     id: "6",
//   },
//   {
//     items: "Large Detroit Style Pizza6",
//     order: "3213456785",
//     amount: "$31.432",

//     id: "7",
//   },
// ];

// const pageCountOptions2 = [
//   { value: 2, label: "2" },
//   { value: 10, label: "10" },
// ];

const pageCountOptions = [
  { value: 2, label: "2" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
  { value: 40, label: "40" },
];
const headerForTest = [
  { id: "1", accessorKey: "postId", header: "postId" },
  { id: "2", accessorKey: "id", header: "id" },
  { id: "3", accessorKey: "name", header: "name" },
  { id: "4", accessorKey: "email", header: "email" },
  { id: "5", accessorKey: "body", header: "body" },
];

const ModalContents = () => {
  return <div>modal</div>;
};

const FilterFormComponents = () => {
  return (
    <div>
      <div className={cls.FilterModulFilds}>
        {/* <div className={cls.FilterModulHeader}>
          <p className={cls.title}>Фильтр</p>
          <button onClick={closeFilter} className={cls.closeButton}>
            +
          </button>
        </div> */}

        <Input
          value={""}
          onChange={() => {
            return null;
          }}
          isLabel={true}
          label="Организация"
        />

        <Input
          value={""}
          onChange={() => {
            return null;
          }}
          isLabel={true}
          label="ФИО"
        />

        <Input
          value={""}
          onChange={() => {
            return null;
          }}
          isLabel={true}
          label="Логин"
        />

        <Input
          value={""}
          onChange={() => {
            return null;
          }}
          isLabel={true}
          label="Активен?"
        />
      </div>
      <div className={cls.actionButtons}>
        <Button theme="background">Применить</Button>
        <Button theme="background">Очистить</Button>
      </div>
    </div>
  );
};

const NewButtons = () => {
  return <Button theme="background">NEW</Button>;
};

export function GridPage() {
  const [selected, setSelected] = useState(null);
  const [rowDatasElements, setRowDatasElements] = useState([]);
  const [tatalCount, setTotalCount] = useState(10);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  // console.log("selected ++++ ", selected);

  const [isOpenFilter, setIsOpenFilter] = useState(true);

  useEffect(() => {
    onPaginationPageChange();
  }, []);

  const onPaginationPageChange = async (
    currentPage?: number,
    pageSizeElement?: number
  ) => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/comments",
      {
        params: {
          _page: currentPage || 1,
          _limit: pageSizeElement || 10,
        },
      }
    );
    if (!response) throw new Error("response is null");
    setCurrentPageNumber(currentPage || 1);
    setPageLimit(pageSizeElement || 10);

    setTotalCount(response.headers["x-total-count"]);
    setRowDatasElements(response.data);
  };

  // refresh button
  const refreshButtonFunction = () => {
    onPaginationPageChange(currentPageNumber, pageLimit);
  };

  return (
    <div>
      {/* <HeadersActionButtons /> */}
      <div className={cls.GridTableBlock}>
        <GridInPopup
          // for grid data
          headerData={headerForTest}
          rowData={rowDatasElements}
          // for grid height
          gridHeight={415}
          // for modal
          gridIsOpenModal={true}
          ModalContent={ModalContents}
          // pagination
          pageCountOptions={pageCountOptions}
          defaultPageSize={10}
          selectedFields={(selected: any) => setSelected(selected)}
          onPaginationPageChange={onPaginationPageChange}
          totalDataCount={tatalCount}
          // filter button
          showIsOpenFilter={isOpenFilter}
          FilterFormComponents={FilterFormComponents}
          // refresh Buttons
          showRefreshButton={true}
          onRefresh={refreshButtonFunction}
          // new button
          AddNewButtonComponents={[
            <NewButtons />,
            <NewButtons />,
            <NewButtons />,
            <NewButtons />,
          ]}
          // inPopup
          placeholder="Выберите организацию"
          // loading
          isLoading={false}
        />

        <Grid
          // for grid data
          headerData={headerForTest}
          rowData={rowDatasElements}
          // for grid height
          gridHeight={415}
          // for modal
          gridIsOpenModal={true}
          ModalContent={ModalContents}
          // pagination
          pageCountOptions={pageCountOptions}
          defaultPageSize={10}
          selectedFields={(selected: any) => setSelected(selected)}
          onPaginationPageChange={onPaginationPageChange}
          totalDataCount={tatalCount}
          // filter button
          showIsOpenFilter={isOpenFilter}
          FilterFormComponents={FilterFormComponents}
          // refresh Buttons
          showRefreshButton={true}
          onRefresh={refreshButtonFunction}
          // new button
          AddNewButtonComponents={[
            <NewButtons />,
            <NewButtons />,
            <NewButtons />,
            <NewButtons />,
          ]}
          // loading
          isLoading={false}
        />
      </div>
    </div>
  );
}
