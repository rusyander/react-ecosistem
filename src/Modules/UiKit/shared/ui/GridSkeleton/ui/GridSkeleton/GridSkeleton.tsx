import { memo } from 'react';
import cls from './GridSkeleton.module.scss';
import { HStack, Skeleton, VStack, classNames } from 'Modules/UiKit';

interface GridSkeletonProps {
  className?: string;
  height?: number;
}

export const GridSkeleton = memo((props: GridSkeletonProps) => {
  const { className, height } = props;

  const fackeArray = Array(30).fill(1);

  return (
    <div
      style={{ height: height }}
      className={classNames(cls.gridSkeleton, {}, [className])}
    >
      <HStack className={cls.hstack} max justify="between" align="center">
        <HStack max gap="16">
          <Skeleton height={40} width={80} border="18" />
          <Skeleton height={40} width={80} border="18" />
          <Skeleton height={40} width={80} border="18" />
        </HStack>
        <HStack max gap="16" justify="end">
          <Skeleton height={40} width={40} border="18" />
          <Skeleton height={40} width={40} border="18" />
        </HStack>
      </HStack>
      <div className={cls.divider} />
      <div className={cls.gridData}>
        {fackeArray.map((index) => (
          <VStack max className={cls.borders} key={index}>
            <HStack max justify="between">
              <Skeleton
                height={40}
                width={160}
                border="18"
                className={cls.borders}
              />
              <Skeleton
                height={40}
                width={200}
                border="18"
                className={cls.borders}
              />
              <Skeleton
                height={40}
                width={160}
                border="18"
                className={cls.borders}
              />
              <Skeleton
                height={40}
                width={260}
                border="18"
                className={cls.borders}
              />
              <Skeleton
                height={40}
                width={150}
                border="18"
                className={cls.borders}
              />
              <Skeleton
                height={40}
                width={90}
                border="18"
                className={cls.borders}
              />
              <Skeleton
                height={40}
                width={150}
                border="18"
                className={cls.borders}
              />
            </HStack>
          </VStack>
        ))}
      </div>
      <HStack className={cls.paginations} max justify="between" align="center">
        <HStack max gap="16">
          <Skeleton height={40} width={160} border="18" />
        </HStack>
        <HStack max gap="16" justify="end">
          <Skeleton height={30} width={40} border="18" />
          <Skeleton height={30} width={40} border="18" />
          <Skeleton height={30} width={40} border="18" />
          <Skeleton height={30} width={40} border="18" />
          <Skeleton height={30} width={40} border="18" />
          <Skeleton height={30} width={40} border="18" />
          <Skeleton height={30} width={40} border="18" />
          <Skeleton height={30} width={80} border="18" />
        </HStack>
      </HStack>
    </div>
  );
});
