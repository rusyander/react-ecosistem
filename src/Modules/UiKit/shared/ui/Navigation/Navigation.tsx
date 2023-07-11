import { memo, useCallback } from 'react';
import cls from './Navigation.module.scss';
import { Texts, classNames } from '../..';
import { Link } from 'react-router-dom';
import { BreadCrumbsActions, Paths } from '../../../features/BreadCrumbs';
import { useDispatch } from 'react-redux';

interface NavigationProps {
  className?: string;
  path: string;
  name: string;
}

export const Navigation = memo(
  ({ className = '', path = '', name = '' }: NavigationProps) => {
    const dispatch = useDispatch();

    const addNewPaths = useCallback(
      (path: Paths) => {
        dispatch(BreadCrumbsActions.addPathList(path));
      },
      [dispatch]
    );

    return (
      <Link
        className={classNames(cls.Navigation, {}, [className])}
        onClick={() => addNewPaths({ path: path, name: name, id: path })}
        to={path}
      >
        <Texts size="sizeM" text={name} />
      </Link>
    );
  }
);
