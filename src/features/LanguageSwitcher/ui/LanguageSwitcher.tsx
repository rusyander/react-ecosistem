import { Button, classNames } from 'Modules/UiKit';
import { memo, type FC } from 'react';
import { useTranslation } from 'react-i18next';

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
