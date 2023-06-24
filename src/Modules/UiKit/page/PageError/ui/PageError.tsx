import { memo } from "react";
import cls from "./PageError.module.css";
import { classNames } from "../../../shared";

interface PageErrorProps {
  className?: string;
  errorText?: string;
  reloadButtonText?: string;
}

export const PageError = memo(
  ({
    className,
    errorText = "Произошла ошибка",
    reloadButtonText = "Обновить страницу",
  }: PageErrorProps) => {
    const reloadPage = () => {
      location.reload();
    };
    return (
      <div className={classNames(cls.PageError, {}, [className])}>
        <p>{errorText}</p>
        <button onClick={reloadPage}>{reloadButtonText}</button>
      </div>
    );
  }
);
