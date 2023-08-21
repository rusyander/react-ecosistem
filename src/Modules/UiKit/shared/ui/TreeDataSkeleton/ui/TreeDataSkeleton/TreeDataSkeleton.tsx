import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './TreeDataSkeleton.module.scss';
import { HStack, Skeleton, VStack, classNames } from 'Modules/UiKit';

interface TreeDataSkeletonProps {
  className?: string;
}

export const TreeDataSkeleton = memo((props: TreeDataSkeletonProps) => {
  const { className } = props;
  const { t } = useTranslation();

  const fackeArray = Array(13).fill(1);
  return (
    <div className={classNames(cls.treeDataSkeleton, {}, [className])}>
      <VStack className={cls.vstack} max gap="16">
        {fackeArray.map((index) => (
          <HStack key={index} max gap="16">
            <Skeleton height={30} width={350} border="18" />
          </HStack>
        ))}
      </VStack>
    </div>
  );
});
