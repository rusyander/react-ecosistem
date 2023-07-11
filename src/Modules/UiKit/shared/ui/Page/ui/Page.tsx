import { MutableRefObject, useRef } from 'react';
import cls from './Page.module.scss';
import { classNames, useInfiniteScroll } from '../../..';

interface PageProps {
  className?: string;
  children?: React.ReactNode;
  onScrollEnd?: () => void;
}

export const Page = (props: PageProps) => {
  const {
    className,
    children,
    onScrollEnd = () => {
      return null;
    },
  } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  return (
    <section ref={wrapperRef} className={classNames(cls.page, {}, [className])}>
      {children}
      <div ref={triggerRef} />
    </section>
  );
};
