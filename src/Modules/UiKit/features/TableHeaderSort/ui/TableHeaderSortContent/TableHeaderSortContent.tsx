import { Icon } from '@iconify/react/dist/iconify.js';
import { useTranslation } from 'react-i18next';

interface TableHeaderSortContentProps {
  columns: any;
  sortByFields: (sortFild: any, e: any) => void;
  tableHeights: number;
  mouseDown: (mouseEvent: any) => void;
  activeIndex: string | number | any;
  canSort: any;
  sortedDatas: any;
}

export default function TableHeaderSortContent(
  props: TableHeaderSortContentProps
) {
  const {
    columns,
    sortByFields,
    tableHeights,
    mouseDown,
    activeIndex,
    canSort = true,
    sortedDatas,
  } = props;
  const { t } = useTranslation();

  return (
    <thead>
      <tr>
        {columns.map(
          ({ header, accessorKey, ref, is_sortable_flag }: any, i: any) => (
            <th
              ref={ref}
              key={header}
              className={`tr  ${
                JSON.stringify(sortedDatas).includes(accessorKey) &&
                'bgColorTRLast'
              } ${canSort && is_sortable_flag ? 'colorTR' : ''}`}
              onClick={(e) =>
                canSort && is_sortable_flag
                  ? sortByFields(accessorKey, e)
                  : null
              }
            >
              <div className="thFlex">
                {/* <span className="tableTitleStyle">{t(header)}</span> */}
                <span className="tableTitleStyle">{t(header)}</span>
                {canSort && is_sortable_flag && (
                  <button
                    className="buttonTable"
                    onClick={(e) =>
                      canSort ? sortByFields(accessorKey, e) : null
                    }
                  >
                    {sortedDatas.map((item: any) => {
                      if (item.property === accessorKey) {
                        if (item?.direction === 'ASC') {
                          return (
                            <Icon
                              key={item}
                              className="sortIconsSecondary"
                              icon="bx:sort-up"
                            />
                          );
                        }
                        if (item?.direction === 'DESC') {
                          return (
                            <Icon
                              key={item}
                              className="sortIconsSecondary"
                              icon="bx:sort-down"
                            />
                          );
                        }
                      }
                      return null;
                    })}
                    {!JSON.stringify(sortedDatas).includes(accessorKey) && (
                      <Icon className="sortIcons" icon="bx:sort-alt-2" />
                    )}
                  </button>
                )}
              </div>
              <div
                style={{ height: tableHeights }}
                onMouseDown={() => mouseDown(i)}
                className={`resize-handle ${
                  activeIndex === i ? 'active' : 'idle'
                }`}
              />
            </th>
          )
        )}
      </tr>
    </thead>
  );
}
