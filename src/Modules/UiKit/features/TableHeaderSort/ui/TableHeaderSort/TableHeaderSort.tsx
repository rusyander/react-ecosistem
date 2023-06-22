import { useRef, memo, useState, useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";
import { TableHeadersProps } from "../../../../widgets/Grid";
import "./TableHeaderSort.css";
import { Modal } from "../../../../shared/ui/Modal";
import TableHeaderSortContent from "../TableHeaderSortContent/TableHeaderSortContent";
import { TableRowContent } from "../../../../entities/TableRowContent";

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
    selectedFields = () => {
      return null;
    },
    canOpenFilter = false,
    ModalContent = () => <div>Modal</div>,
  }: TableHeaderSortProps) => {
    const [tableHeights, setTableHeights] = useState(0);
    const [activeIndex, setActiveIndex] = useState(null);
    const tableElement: any = useRef<HTMLTableElement>(null);
    const divBlock: any = useRef<HTMLDivElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const [isModals, setIsModals] = useState(false);
    const columns = createHeaders?.(dataHeaders);

    const mouseDown = useCallback((index: any) => {
      setActiveIndex(index);
    }, []);

    const mouseMove = useCallback(
      (e: MouseEvent) => {
        const gridColumns = columns.map((col: any, i: any) => {
          if (i === activeIndex) {
            const width = e.clientX - col.ref.current.offsetLeft;
            if (width >= minCellWidth) {
              return `${canOpenFilter == true ? width - 300 : width}px`;
            }
          }
          return `${col.ref.current?.offsetWidth}px`;
        });
        tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
          " "
        )}`;
      },
      [activeIndex, columns, canOpenFilter, minCellWidth]
    );

    const removeListeners = useCallback(() => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", removeListeners);
    }, [mouseMove]);

    const mouseUp = useCallback(() => {
      setActiveIndex(null);
      removeListeners();
    }, [setActiveIndex, removeListeners]);

    useEffect(() => {
      divBlock.current.getBoundingClientRect();
      if (activeIndex !== null) {
        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseup", mouseUp);
      }
      setTableHeights(tableElement.current.offsetHeight);
      return () => {
        removeListeners();
      };
    }, [activeIndex, mouseMove, mouseUp, removeListeners]);

    //---------------------------- sort

    const [sortFild, setSortFild] = useState("");
    const [getSortDirections, setGetSortDirections] = useState("asc");

    const selectFild = useCallback(
      (selectedFieldsElement: string) => {
        setSelectedFild(selectedFieldsElement);
        selectedFields(selectedFieldsElement);
      },
      [selectedFields, setSelectedFild]
    );

    const sortByFields = useCallback(
      (field: string) => {
        let direction = "asc";
        if (sortFild === field) {
          direction = getSortDirections === "asc" ? "desc" : "asc";
        }
        const sortedData = [...dataRowState].sort((a: any, b: any) => {
          if (a[field] < b[field]) {
            return direction === "asc" ? -1 : 1;
          }
          if (a[field] > b[field]) {
            return direction === "asc" ? 1 : -1;
          }
          return 0;
        });
        setDataRowState(sortedData);
        setSortFild(field);
        setGetSortDirections(direction);
      },
      [dataRowState, getSortDirections, setDataRowState, sortFild]
    );

    const renderSortIcon = useCallback(
      (field: string) => {
        if (field === sortFild) {
          return getSortDirections === "asc" ? (
            <Icon className="sortIconsSecondary" icon="bx:sort-up" /> // Верхняя стрелка
          ) : (
            <Icon className="sortIconsSecondary" icon="bx:sort-down" /> // Нижняя стрелка
          );
        }
        return null;
      },
      [getSortDirections, sortFild]
    );

    // ------
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
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns.length},  minmax(10px, 1fr))`,
              maxHeight: `${tableHeight - 45}px`,
            }}
            ref={tableElement}
          >
            <TableHeaderSortContent
              columns={columns}
              sortFild={sortFild}
              sortByFields={sortByFields}
              renderSortIcon={renderSortIcon}
              tableHeights={tableHeights}
              mouseDown={mouseDown}
              activeIndex={activeIndex}
            />

            <TableRowContent
              tableData={dataRowState}
              selectFild={selectFild}
              selectedFild={selectedFild}
              dataHeaders={dataHeaders}
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
