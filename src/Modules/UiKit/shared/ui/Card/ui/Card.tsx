import { memo } from "react";
import cls from "./Card.module.css";
import { classNames } from "../../..";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export const Card = memo((props: CardProps) => {
  const { className, children, ...otherProps } = props;

  return (
    <div {...otherProps} className={classNames(cls.card, {}, [className])}>
      {children}
    </div>
  );
});
