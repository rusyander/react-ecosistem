import { Icon } from "@iconify/react/dist/iconify.js";

interface TableHeaderSortContentProps {
  columns: any;
  sortFild: string;
  sortByFields: (sortFild: any) => void;
  renderSortIcon: any;
  tableHeights: number;
  mouseDown: (mouseEvent: any) => void;
  activeIndex: string | number | any;
}

export default function TableHeaderSortContent(
  props: TableHeaderSortContentProps
) {
  const {
    columns,
    sortFild,
    sortByFields,
    renderSortIcon,
    tableHeights,
    mouseDown,
    activeIndex,
  } = props;
  return (
    <thead>
      <tr>
        {columns.map(({ header, accessorKey, ref }: any, i: any) => (
          <th
            ref={ref}
            key={header}
            className={`tr colorTR ${
              sortFild === accessorKey && "bgColorTRLast"
            }`}
          >
            <div className="thFlex">
              <span className="tableTitleStyle">{header}</span>
              {/* <Texts title={header} size="sizeM" /> */}

              <button
                className="buttonTable"
                onClick={() => sortByFields(accessorKey)}
              >
                {renderSortIcon(accessorKey)}
                {sortFild !== accessorKey && (
                  <Icon
                    onClick={() => sortByFields(accessorKey)}
                    className="sortIcons"
                    icon="bx:sort-alt-2"
                  />
                )}
              </button>
            </div>
            <div
              style={{ height: tableHeights }}
              onMouseDown={() => mouseDown(i)}
              className={`resize-handle ${
                activeIndex === i ? "active" : "idle"
              }`}
            />
          </th>
        ))}
      </tr>
    </thead>
  );
}
