import { Texts } from '../../..';
import { Skeleton } from '../../../shared/ui/Skeleton/ui/Skeleton';
import { TableHeadersProps } from '../../../widgets/Grid';
import cls from './TableRowContent.module.scss';

interface TableRowContentProps {
  tableData?: any[];
  selectFild?: (id: string) => void;
  selectedFild?: any;
  dataHeaders?: TableHeadersProps[];
  isModalOpen: () => void;
  isLoading?: boolean;
  isSelectable?: boolean;
}

export const TableRowContent = ({
  tableData = [],
  dataHeaders = [],
  selectFild,
  selectedFild,
  isModalOpen,
  isLoading,
  isSelectable,
}: TableRowContentProps) => {
  const trStyles: any = {
    '&:hover td': {
      backgroundColor: 'red !important',
      // Другие стили
    },
  };

  if (isLoading)
    return (
      <tbody>
        {new Array(tableData.length).fill(0).map((_, index) => (
          <tr key={index} className={cls.CkeletonLoader}>
            {new Array(dataHeaders.length).fill(0).map((_, index) => (
              <td key={index} className={cls.CkeletonLoader}>
                <Skeleton width="100%" height="16px" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  return (
    <tbody>
      {tableData?.map((item: any, index) => (
        <tr
          style={trStyles}
          className={isSelectable ? 'trColor' : ''}
          key={index}
          onClick={() => selectFild?.(item || '')}
          onDoubleClick={isModalOpen}
        >
          {dataHeaders?.map((column: TableHeadersProps | any) => (
            <td
              key={column.id}
              style={{
                background: `${
                  // selectedFild?.id === item.id
                  JSON.stringify(selectedFild) === JSON.stringify(item) &&
                  isSelectable
                    ? 'var(--select-row-item-bg)'
                    : 'var(--seccondary-bg-color)'
                }`,
              }}
            >
              <Texts
                text={item[column?.accessorKey]}
                className={cls.tableRowContent}
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
