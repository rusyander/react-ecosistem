import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import cls from './BreadCrumbs.module.css';
import { Icon } from '@iconify/react';
import { BreadCrumbsActions, Paths } from '..';
import { memo, useCallback } from 'react';
import { BreadCrumbsSchema, classNames } from '../../..';

export const BreadCrumbs = memo(() => {
  const location = useLocation();
  const dispatch = useDispatch();

  const deletePathsElement = useCallback(
    (id: string) => {
      dispatch(BreadCrumbsActions.removePathListItem(id));
    },
    [dispatch]
  );

  const pathListData = useSelector(
    (state: { breadCrumbs: BreadCrumbsSchema }) =>
      state.breadCrumbs?.pathList || []
  );
  return (
    <div className={cls.BreadCrumbsElementsList}>
      {pathListData?.map((path: Paths) => (
        <div
          key={path.path}
          className={classNames('', {}, [
            path.path === location.pathname
              ? cls.activeBreadcrubm
              : cls.BreadCrumbsElement,
          ])}
        >
          <Link className={cls.link} to={path.path}>
            {path.name}
          </Link>
          <Icon
            onClick={() => deletePathsElement(path.id)}
            className={cls.deleteIcons}
            icon="pajamas:remove"
          />
        </div>
      ))}
    </div>
  );
});
