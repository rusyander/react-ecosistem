import { memo, type FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';

interface LanguageSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = memo(
  ({ className, short }: LanguageSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = () => {
      i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };
    return (
      <Button
        theme="clear"
        onClick={toggle}
        className={classNames('', {}, [className])}
      >
        {t(short ? 'Короткий Язык' : 'Язык')}
      </Button>
    );
  }
);
