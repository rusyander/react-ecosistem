import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import cls from './BreadCrumbs.module.css';
import { Icon } from '@iconify/react';
import { BreadCrumbsActions, Paths, getPathList } from '..';
import { memo, useCallback } from 'react';
import { classNames } from '../../..';

export const BreadCrumbs = memo(() => {
  const location = useLocation();
  const dispatch = useDispatch();

  const deletePathsElement = useCallback(
    (id: string) => {
      dispatch(BreadCrumbsActions.removePathListItem(id));
    },
    [dispatch]
  );

  // const pathListData = useSelector(getPathList);
  const pathListData = useSelector((state: any) => state.breadCrumbs?.pathList);
  console.log(pathListData, 'pathListData CORE');

  // path.path === location.pathname ? cls.activeBreadcrubm : ""
  return (
    <div className={cls.BreadCrumbsElementsList}>
      {pathListData?.map((path: Paths) => (
        <div
          key={path.path}
          className={classNames('', {}, [
            // cls.BreadCrumbsElement
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
