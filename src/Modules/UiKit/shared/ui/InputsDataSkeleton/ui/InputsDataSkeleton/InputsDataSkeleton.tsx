import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './InputsDataSkeleton.module.scss';
import { HStack, Skeleton, VStack, classNames } from 'Modules/UiKit';

interface InputsDataSkeletonProps {
  className?: string;
}

export const InputsDataSkeleton = memo((props: InputsDataSkeletonProps) => {
  const { className } = props;
  const { t } = useTranslation();

  const fackeArray = Array(5).fill(1);

  return (
    <div className={classNames(cls.inputsDataSkeleton, {}, [className])}>
      <VStack className={cls.vstack} max gap="16">
        {fackeArray.map((index) => (
          <HStack key={index} max gap="16">
            <Skeleton height={40} width="100%" border="18" />
          </HStack>
        ))}
      </VStack>
    </div>
  );
});
