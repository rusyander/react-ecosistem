import { memo, useCallback } from "react";
import cls from "./Navigation.module.css";
import { Texts, classNames, useAppDispatch } from "../..";
import { Link } from "react-router-dom";
import { BreadCrumbsActions, Paths } from "../../../features/BreadCrumbs";

interface NavigationProps {
  className?: string;
  path: string;
  name: string;
}

export const Navigation = memo(
  ({ className = "", path = "", name = "" }: NavigationProps) => {
    const dispatch = useAppDispatch();

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
