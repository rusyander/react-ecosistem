import { useRef, memo, useState, useCallback, useEffect } from 'react';
import { TableHeadersProps } from '../../../../widgets/Grid';
import './TableHeaderSort.scss';
import { Modal } from '../../../../shared/ui/Modal';
import { TableRowContent } from '../../../../entities/TableRowContent';
// @ts-ignore
import TableHeaderSortContent from '../TableHeaderSortContent/TableHeaderSortContent';
import { useThrottle } from 'Modules/UiKit/shared';

interface TableHeaderSortProps {
  minCellWidth?: number;
  dataHeaders?: TableHeadersProps[];
  tableHeight?: number;
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
  sortFields?: any;
  setSortFields?: any;
  hasOpenGridRowModal?: boolean;
  fromModalForGrid?: boolean;
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
    tableHeight = 0,
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
    setSortFields,
    setColumnSize,
    hasOpenGridRowModal,
    fromModalForGrid = false,
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
    const mouseMove = useCallback(
      useThrottle((e: MouseEvent) => {
        const screenWidth = divRef?.current?.offsetWidth;
        const percentage = 23;
        const result = (percentage / 100) * screenWidth;

        const gridColumns: any = correctColumns.map((col: any, i: any) => {
          if (i === activeIndex) {
            const width = fromModalForGrid
              ? e.clientX - (col.ref.current.offsetLeft + result + 15)
              : e.clientX - (col.ref.current.offsetLeft - 6);
            if (width >= minCellWidth) {
              return `${canOpenFilter === true ? width - 300 : width}px`;
            }
          }
          return `${col.ref.current?.offsetWidth}px`;
        });
        tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
          ' '
        )}`;
        setColumnSize(gridColumns);
      }, 20),
      [activeIndex, columns, hasOpenModal, minCellWidth, canOpenFilter]
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
        const data = {
          direction: direction,
          property: field,
        };
        setSortFild(field);
        setGetSortDirections(direction);

        if (e.ctrlKey && e.button === 0) {
          setSortedData((prev: any) => {
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
    const isModalOpen = useCallback(() => {
      setIsModals(true);
    }, []);
    const onCloseModal = useCallback(() => {
      setIsModals(false);
    }, []);

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

          {hasOpenGridRowModal && (
            <Modal isOpen={isModals} onClose={onCloseModal} lazy>
              {isModals && (
                <div>
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
