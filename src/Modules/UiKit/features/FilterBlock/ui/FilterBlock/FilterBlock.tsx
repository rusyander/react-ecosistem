import cls from './FilterBlock.module.scss';
import { classNames } from '../../../../shared';
import { memo, useCallback } from 'react';

interface FilterBlockProps {
  FilterFormComponents?: () => JSX.Element;
  canOpenFilter?: boolean;
  setCanOpenFilter?: (canOpenFilter: boolean) => void;
}

export const FilterBlock = memo((props: FilterBlockProps) => {
  const {
    FilterFormComponents = () => {
      return <></>;
    },
    canOpenFilter = false,
    setCanOpenFilter = () => {
      return null;
    },
  } = props;

  const closeFilter = useCallback(() => {
    setCanOpenFilter(false);
  }, [setCanOpenFilter]);

  return (
    <div
      className={classNames(
        cls.FilterModul,
        { [cls.collapsed]: !canOpenFilter },
        ['']
      )}
    >
      <div className={cls.FilterModulHeader}>
        <p className={cls.title}>Фильтр</p>
        <button onClick={closeFilter} className={cls.closeButton}>
          +
        </button>
      </div>
      <FilterFormComponents />
    </div>
  );
});
