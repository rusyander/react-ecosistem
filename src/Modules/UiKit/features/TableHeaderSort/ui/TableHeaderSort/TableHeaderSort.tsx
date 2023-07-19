import { useRef, memo, useState, useCallback, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { TableHeadersProps } from '../../../../widgets/Grid';
import './TableHeaderSort.scss';
import { Modal } from '../../../../shared/ui/Modal';
import { TableRowContent } from '../../../../entities/TableRowContent';
// @ts-ignore
import TableHeaderSortContent from '../TableHeaderSortContent/TableHeaderSortContent';

interface TableHeaderSortProps {
  minCellWidth?: number;
  dataHeaders?: TableHeadersProps[];
  tableHeight?: number;
  hasModal?: boolean;
  ModalContent?: () => JSX.Element;
  dataRowState?: any[];
  setDataRowState?: any;
  setSelectedFild?: any;
  selectedFild?: any;
  selectedFields?: (value: any) => void;
  canOpenFilter?: boolean;
  isLoading?: boolean;
  hasOpenModal?: boolean;
  // ----
  canSort?: boolean;
  columnSize?: any;
  setColumnSize?: any;
  // checkFormEnter(locations.pathname.replaceAll('/', ''));
  sortFields?: any;
  setSortFields?: any;
}

const createHeaders = (headers: TableHeadersProps[]) => {
  return headers?.map((item) => ({
    header: item.header,
    ref: useRef(),
    id: item.id,
    accessorKey: item.accessorKey,
  }));
};

export const TableHeaderSort = memo(
  ({
    minCellWidth = 0,
    dataHeaders = [],
    dataRowState = [],
    setDataRowState,
    tableHeight = 0,
    hasModal = false,
    setSelectedFild,
    selectedFild,
    isLoading = false,
    hasOpenModal = false,
    selectedFields = () => {
      return null;
    },
    canOpenFilter = false,
    ModalContent = () => <div>Modal</div>,
    // ----
    canSort,
    columnSize,
    // checkFormEnter(locations.pathname.replaceAll('/', ''));
    sortFields,
    setSortFields,
    setColumnSize,
  }: TableHeaderSortProps) => {
    const [tableHeights, setTableHeights] = useState(0);
    const [activeIndex, setActiveIndex]: any = useState(null);
    const tableElement: any = useRef<HTMLTableElement>(null);
    const divBlock: any = useRef<HTMLDivElement>(null);
    const divRef: any = useRef<HTMLDivElement>(null);
    const [isModals, setIsModals] = useState(false);
    const columns = createHeaders?.(dataHeaders);

    const mouseDown = useCallback((index: any) => {
      setActiveIndex(index);
    }, []);

    const correctColumns = columns.filter(
      (item: any) => item.accessorKey !== ''
    );

    const columnSizeDefaultStyle = columnSize.map((col: any) => {
      return `minmax(${col}, 1fr)`;
    });
    const styles = {
      gridTemplateColumns: columnSizeDefaultStyle.join(' '),
      height: `${
        divRef?.current?.offsetHeight - 55 > tableHeight - 55
          ? tableHeight - 55
          : ''
      }px`,
      display: 'grid',
    };
    // console.log(columnSizeDefaultStyle, 'columnSizeDefaultStyle');

    // useEffect(() => {}, [counter]);

    // if (counter === 0) {
    //   setCounter(1);
    //   setActiveIndex(0);
    // }
    // console.log(activeIndex);

    const mouseMove = useCallback(
      (e?: MouseEvent | any) => {
        const indexCurrent = activeIndex === null ? 0 : activeIndex;
        const screenWidth = window.innerWidth;
        const gridColumns: any = correctColumns.map((col: any, i: any) => {
          if (i === activeIndex) {
            const width = e.clientX - col.ref.current.offsetLeft;
            if (width >= minCellWidth) {
              return `${canOpenFilter === true ? width - 300 : width}px`;
            }
          }
          return `${col.ref.current?.offsetWidth}px`;
        });
        // console.log(columnSize, 'columnSize');

        // if (sortFields === null) {
        //   // columnSize = gridColumns;
        //   setColumnSize(gridColumns);
        // }
        // console.log(columnSize, 'columnSize');

        const currentSize = columnSize === null ? gridColumns : columnSize;
        // console.log(hasOpenModal, "hasOpenModal");
        // console.log(gridColumns, 'gridColumns');
        // console.log(screenWidth, 'screenWidth');

        if (hasOpenModal === true) {
          const gridColumnsInModal = gridColumns.map((col: any, i: any) => {
            if (i === indexCurrent) {
              const toNumber = col.split('px')[0];
              // return `${Math.floor(Number(toNumber) / 1.575)}px`;
              // return `${Math.floor(Number(toNumber) - 84)}px`;
              // return `${Math.floor(Number(toNumber) - 331)}px`;
              if (screenWidth <= 1100) {
                return `${Math.floor(Number(toNumber) - 35)}px`;
              }
              if (screenWidth <= 1200) {
                return `${Math.floor(Number(toNumber) - 79)}px`;
              }
              if (screenWidth <= 1200) {
                return `${Math.floor(Number(toNumber) - 142)}px`;
              }
              if (screenWidth <= 1300) {
                return `${Math.floor(Number(toNumber) - 183)}px`;
              }
              if (screenWidth <= 1400) {
                return `${Math.floor(Number(toNumber) - 223)}px`;
              }
              if (screenWidth <= 1500) {
                return `${Math.floor(Number(toNumber) - 290)}px`;
              }
              if (screenWidth <= 1650) {
                return `${Math.floor(Number(toNumber) - 330)}px`;
              }
              if (screenWidth <= 1922) {
                return `${Math.floor(Number(toNumber) - 455)}px`;
              }
            }
            return `${col}`;
          });
          tableElement.current.style.gridTemplateColumns = `${gridColumnsInModal.join(
            ' '
          )}`;
          // console.log(gridColumnsInModal, 'gridColumnsInModal');
        }
        if (hasOpenModal === false) {
          // if (counter === 0) {
          //   setCounter(1);
          //   tableElement.current.style.gridTemplateColumns = `${columnSize.join(
          //     ' '
          //   )}`;
          // }
          // if (counter !== 0) {
          tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
            ' '
          )}`;
          // }
        }
        // columnSize = gridColumns;
        setColumnSize(gridColumns);
      },
      [
        activeIndex,
        correctColumns,
        columnSize,
        hasOpenModal,
        setColumnSize,
        minCellWidth,
        canOpenFilter,
      ]
    );

    const removeListeners = useCallback(() => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', removeListeners);
    }, [mouseMove]);

    const mouseUp = useCallback(() => {
      setActiveIndex(null);
      removeListeners();
    }, [setActiveIndex, removeListeners]);

    useEffect(() => {
      divBlock.current.getBoundingClientRect();
      if (activeIndex !== null) {
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);
      }
      setTableHeights(tableElement.current.offsetHeight);
      return () => {
        removeListeners();
      };
    }, [activeIndex, mouseMove, mouseUp, removeListeners]);

    const [sortFild, setSortFild] = useState('');
    const [getSortDirections, setGetSortDirections] = useState('ASC');
    const [sortedDatas, setSortedData]: any = useState([]);

    const selectFild = useCallback(
      (selectedFieldsElement: string) => {
        setSelectedFild(selectedFieldsElement);
        selectedFields(selectedFieldsElement);
      },
      [selectedFields, setSelectedFild]
    );

    const sortByFields = useCallback(
      (field: string, e: any) => {
        let direction = 'ASC';
        if (sortFild === field) {
          direction = getSortDirections === 'ASC' ? 'DESC' : 'ASC';
        }
        // const sortedData = [...dataRowState].sort((a: any, b: any) => {
        //   if (a[field] < b[field]) {
        //     return direction === 'ASC' ? -1 : 1;
        //   }
        //   if (a[field] > b[field]) {
        //     return direction === 'ASC' ? 1 : -1;
        //   }
        //   return 0;
        // });
        const data = {
          direction: direction,
          property: field,
        };
        // setDataRowState(sortedData);
        setSortFild(field);
        setGetSortDirections(direction);

        if (e.ctrlKey && e.button === 0) {
          setSortedData((prev: any) => {
            // console.log('prev', prev);

            const pathList = [...prev, data];
            const uniquePaths = [
              ...new Set(
                pathList.map((item) => {
                  if (item.property === field) {
                    return JSON.stringify({ ...item, direction: direction });
                  }
                  return JSON.stringify(item);
                })
              ),
            ].map((item) => JSON.parse(item));

            const updateSortFields: any = [];

            uniquePaths.forEach((item: any) => {
              if (item.property === field) {
                updateSortFields.push({ ...item, direction: direction });
              } else {
                updateSortFields.push(item);
              }
            });

            // console.log(
            //   'updateSortFields-*-*-*-*-*-*-*-*-*-*-*-*-*-',
            //   updateSortFields
            // );
            setSortFields(updateSortFields);
            return [...updateSortFields];
          });
        } else {
          setSortedData([]);
          setSortedData((prev: any) => {
            setSortFields([{ ...prev, data }.data]);
            return [...prev, data];
          });
        }
      },
      [getSortDirections, setSortFields, sortFild]
    );

    // const renderSortIcon = useCallback(
    //   (field: string) => {
    //     if (field === sortFild) {
    //       return getSortDirections === 'ASC' ? (
    //         <Icon className="sortIconsSecondary" icon="bx:sort-up" /> // Верхняя стрелка
    //       ) : (
    //         <Icon className="sortIconsSecondary" icon="bx:sort-down" /> // Нижняя стрелка
    //       );
    //     }
    //     return null;
    //   },
    //   [getSortDirections, sortFild]
    // );

    // ------
    const isModalOpen = useCallback(() => {
      setIsModals(true);
    }, []);
    const onCloseModal = useCallback(() => {
      setIsModals(false);
    }, []);

    // console.log('divRef.current?.offsetHeight', divRef.current?.offsetHeight);

    return (
      <div ref={divRef}>
        <div className="table-wrapper" ref={divBlock}>
          <table
            style={styles}
            // style={{
            //   display: 'grid',
            //   gridTemplateColumns: `repeat(${correctColumns.length},  minmax(${
            //     hasOpenModal ? 100 : 100
            //   }px, 1fr))`,
            //   height: `${
            //     divRef?.current?.offsetHeight - 45 > tableHeight - 45
            //       ? tableHeight - 45
            //       : ''
            //   }px`,
            //   // height: `${tableHeight - 45}px`,
            //   // height: `${500 - 45}px`,
            //   // ------------------------------------

            //   // gridTemplateColumns: `repeat(${correctColumns.length},  minmax(${
            //   //   hasOpenModal ? 100 : 100
            //   // }px, 1fr))`,

            //   // ------------------------------------
            // }}
            ref={tableElement}
          >
            <TableHeaderSortContent
              columns={correctColumns}
              sortByFields={sortByFields}
              tableHeights={tableHeights}
              mouseDown={mouseDown}
              activeIndex={activeIndex}
              canSort={canSort}
              sortedDatas={sortedDatas}
            />

            <TableRowContent
              tableData={dataRowState}
              selectFild={selectFild}
              selectedFild={selectedFild}
              dataHeaders={correctColumns}
              isModalOpen={isModalOpen}
              isLoading={isLoading}
            />
          </table>

          {hasModal && (
            <Modal isOpen={isModals} onClose={onCloseModal} lazy>
              {isModals && (
                <div>
                  <div>
                    Modal <h1>{selectedFild.id}</h1>
                  </div>
                  <ModalContent />
                </div>
              )}
            </Modal>
          )}
        </div>
      </div>
    );
  }
);
