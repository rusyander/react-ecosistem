import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './SearchFavorite.module.scss';
import { Input, Texts, VStack, classNames } from 'Modules/UiKit';

interface SearchFavoriteProps {
  className?: string;
}

export const SearchFavorite = memo((props: SearchFavoriteProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const [favorite, setFavorite] = useState('');
  const searchFavorite = (value: string) => {
    setFavorite(value);
  };

  return (
    <div className={classNames(cls.searchFavorite, {}, [className])}>
      <VStack max className={cls.menuFavorite} gap="4">
        <Texts size="sizeM" title={t('Избранное')} className={cls.menu} />
      </VStack>

      <div className={cls.sidebarContent}>
        <Input value={favorite} onChange={searchFavorite} search />
      </div>

      <div className={cls.divider} />
    </div>
  );
});
