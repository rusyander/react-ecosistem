import { memo, useCallback, useState } from 'react';
import { Icon } from '@iconify/react';

import cls from './Pagination.module.scss';
import { DOTS, usePagination } from '../../../shared/lib/hook/usePagination';
import { Select, classNames } from '../../../shared';

interface PaginationProps {
  totalCount: number;
  siblingCount?: number;
  className?: string;
  pageCountOptions: Array<{ value: number; label: string }> | any;
  onPaginationPageChange?: (page: number, limit: number) => void;
  defaultPageSize?: number;
}

interface PaginationRangeProps {
  currentPage: number;
  totalCount: number;
  siblingCount: number;
  pageSizeElement?: number | any;
}

export const Pagination = memo((props: PaginationProps) => {
  const {
    totalCount,
    siblingCount = 1,
    className,
    pageCountOptions,
    defaultPageSize,
    onPaginationPageChange = () => {
      return null;
    },
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizeElement, setPageSizeElement] = useState(defaultPageSize || 0);
  const onPageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const paginationRange: PaginationRangeProps[] | any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSizeElement,
  });

  const pageCountStart = currentPage * pageSizeElement - pageSizeElement;
  const pageCountEnd = currentPage * pageSizeElement;

  const onNext = useCallback(() => {
    if (currentPage !== paginationRange.at(-1)) {
      onPageChange(currentPage + 1);
      onPaginationPageChange(currentPage + 1, pageSizeElement);
    }
  }, [
    currentPage,
    onPageChange,
    onPaginationPageChange,
    pageSizeElement,
    paginationRange,
  ]);

  const onLast = useCallback(() => {
    if (currentPage !== paginationRange.at(-1)) {
      onPageChange(paginationRange.at(-1));
      onPaginationPageChange(paginationRange.at(-1), pageSizeElement);
    }
  }, [
    currentPage,
    onPageChange,
    onPaginationPageChange,
    pageSizeElement,
    paginationRange,
  ]);

  const onPrevious = useCallback(() => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
      onPaginationPageChange(currentPage - 1, pageSizeElement);
    }
  }, [currentPage, onPageChange, onPaginationPageChange, pageSizeElement]);
  const onFirst = useCallback(() => {
    if (currentPage !== 1) {
      onPageChange(1);
      onPaginationPageChange(1, pageSizeElement);
    }
  }, [currentPage, onPageChange, onPaginationPageChange, pageSizeElement]);

  const changePageNumber = useCallback(
    (pageNumber: number) => {
      onPageChange(pageNumber);
      onPaginationPageChange(pageNumber, pageSizeElement);
    },
    [onPageChange, onPaginationPageChange, pageSizeElement]
  );

  return (
    <div className={classNames(cls.pagination, {}, [className])}>
      <div className={cls.pageCount}>
        <p>
          {pageCountStart + 1} -{' '}
          {pageCountEnd > totalCount ? totalCount : pageCountEnd} из{' '}
          {totalCount}
        </p>
      </div>

      <div className={cls.pageControl}>
        <div className={cls.pageSelect}>
          <button onClick={onFirst} className={cls.buttonPageChange}>
            <Icon
              className={classNames(
                cls.doubleArrowColor,
                {
                  [cls.doubleArrow]: currentPage !== 1,
                  [cls.doubleArrowDisabled]: currentPage === 1,
                },
                [className]
              )}
              icon="radix-icons:double-arrow-left"
            />
          </button>
          <button onClick={onPrevious} className={cls.buttonPageChange}>
            <Icon
              className={classNames(
                cls.singleArrowColor,
                {
                  [cls.singleArrow]: currentPage !== 1,
                  [cls.singleArrowDisabled]: currentPage === 1,
                },
                [className]
              )}
              icon="ep:arrow-left-bold"
            />
          </button>
          {/* --------------- */}
          {paginationRange?.map((pageNumber: any, index: any) => {
            if (pageNumber === DOTS) {
              return (
                <li key={index} className={(cls.paginationItem, cls.dots)}>
                  &#8230;
                </li>
              );
            }

            return (
              <li
                key={index}
                className={classNames(
                  cls.paginationItem,
                  {
                    [cls.selected]: pageNumber === currentPage,
                  },
                  [className]
                )}
                onClick={() => changePageNumber(pageNumber)}
              >
                {pageNumber}
              </li>
            );
          })}
          {/* -------------------- */}
          <button onClick={onNext} className={cls.buttonPageChange}>
            <Icon
              className={classNames(
                cls.singleArrowColor,
                {
                  [cls.singleArrow]: currentPage !== paginationRange?.at(-1),
                  [cls.singleArrowDisabled]:
                    currentPage === paginationRange?.at(-1),
                },
                [className]
              )}
              icon="ep:arrow-right-bold"
            />
          </button>
          <button onClick={onLast} className={cls.buttonPageChange}>
            <Icon
              className={classNames(
                cls.doubleArrowColor,
                {
                  [cls.doubleArrow]: currentPage !== paginationRange?.at(-1),
                  [cls.doubleArrowDisabled]:
                    currentPage === paginationRange?.at(-1),
                },
                [className]
              )}
              icon="radix-icons:double-arrow-right"
            />
          </button>
        </div>
        <div>
          <Select
            selectedItemForPage={pageSizeElement}
            setPageSizeElement={setPageSizeElement}
            options={pageCountOptions}
            isOpenPosition="top"
            totalCount={totalCount}
            onPaginationPageChange={onPaginationPageChange}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
});
