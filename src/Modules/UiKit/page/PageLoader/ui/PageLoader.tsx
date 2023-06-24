import { memo } from "react";
import cls from "./PageLoader.module.css";
import { Loader, classNames } from "../../../shared";

interface PageLoaderProps {
  className?: string;
}

export const PageLoader = memo(({ className }: PageLoaderProps) => {
  return (
    <div className={classNames(cls.PageLoader, {}, [className])}>
      <Loader />
    </div>
  );
});
