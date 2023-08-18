import cls from './HeadersActionButtons.module.scss';
import { classNames } from '../../../../shared';

import { Fragment, memo } from 'react';
import { Filter, Reload } from '../../../../features';

interface HeadersActionButtonsProps {
  setCanOpenFilter?: (canOpenFilter: boolean) => void;
  isOpenFilter?: boolean;
  showRefreshButton?: boolean;
  onRefresh?: any;
  AddNewButtonComponents?: any[];
}

export const HeadersActionButtons = memo((props: HeadersActionButtonsProps) => {
  const {
    setCanOpenFilter,
    isOpenFilter,
    showRefreshButton,
    onRefresh,
    AddNewButtonComponents = [],
  } = props;
  return (
    <div className={classNames(cls.HeadersActionButtons, {}, [])}>
      <div className={cls.buttons}>
        {AddNewButtonComponents.map((component, index) => (
          <Fragment key={index}>{component}</Fragment>
        ))}
      </div>
      <div className={cls.buttons}>
        {showRefreshButton && <Reload onRefresh={onRefresh} />}
        {isOpenFilter && <Filter setCanOpenFilter={setCanOpenFilter} />}
      </div>
    </div>
  );
});
