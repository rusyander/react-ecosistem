import cls from './FilterBlock.module.scss';
import { HStack, Texts, classNames } from '../../../../shared';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';

interface FilterBlockProps {
  FilterFormComponents?: any;
  canOpenFilter?: boolean;
  setCanOpenFilter?: (canOpenFilter: boolean) => void;
}

export const FilterBlock = memo((props: FilterBlockProps) => {
  const { t } = useTranslation();
  const {
    FilterFormComponents = () => {
      return <></>;
    },
    canOpenFilter = false,
    setCanOpenFilter = () => {
      return null;
    },
  } = props;

  const closeFilter = useCallback(() => {
    setCanOpenFilter(false);
  }, [setCanOpenFilter]);

  return (
    <div
      className={classNames(
        cls.FilterModul,
        { [cls.collapsed]: !canOpenFilter },
        ['']
      )}
    >
      <HStack
        align="center"
        justify="between"
        className={cls.FilterModulHeader}
      >
        <Texts size="sizeM" title={t('фильтр')} />
        <Icon
          onClick={closeFilter}
          width={23}
          icon="ep:close-bold"
          className={cls.closeButton}
        />
      </HStack>
      {/* <FilterFormComponents /> */}

      {canOpenFilter && FilterFormComponents}
    </div>
  );
});
