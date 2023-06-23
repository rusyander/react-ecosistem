import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cls from './BreadCrumbs.module.css';
import { Icon } from '@iconify/react';
import { BreadCrumbsActions, BreadCrumbsReducer, Paths, getPathList } from '..';
import { memo, useCallback } from 'react';
import { DynamicModuleLoader, useAppDispatch } from '../../../shared';
import { ReducersList } from '../../../shared/components/DynamicModuleLoader/DynamicModuleLoader';

const reducers: ReducersList = {
  breadCrumps: BreadCrumbsReducer,
};

export const BreadCrumbs = memo(() => {
  const dispatch = useAppDispatch();

  const deletePathsElement = useCallback(
    (id: string) => {
      dispatch(BreadCrumbsActions.removePathListItem(id));
    },
    [dispatch]
  );

  const pathListData = useSelector(getPathList);
  console.log(pathListData);

  return (
    // <DynamicModuleLoader removeAfterUnmaunt={true} reducers={reducers}>

    <div className={cls.BreadCrumbsElementsList}>
      {pathListData.map((path: Paths) => (
        <div key={path.path} className={cls.BreadCrumbsElement}>
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
    // </DynamicModuleLoader>
  );
});
