import { memo } from 'react';
import cls from './Icon.module.scss';
import { classNames } from '../../..';

interface IconProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>> | any;
}

export const Icon = memo((props: IconProps) => {
  const { className, Svg } = props;

  return <Svg className={classNames(cls.icon, {}, [className])} />;
});
