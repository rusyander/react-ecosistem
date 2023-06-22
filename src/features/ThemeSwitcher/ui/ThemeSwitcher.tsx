import React, { memo, type FC } from 'react';
import { useTheme, Theme } from 'app/providers/ThemeProvider';

import LightIcon from '../../../shared/assets/icons/theme-light.svg';
import DarkIcon from '../../../shared/assets/icons/theme-dark.svg';
import { Button, classNames } from 'Modules/UiKit';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(
  ({ className }: ThemeSwitcherProps) => {
    const { toggleTheme, theme } = useTheme();
    return (
      <Button
        theme="clear"
        className={classNames('', {}, [className])}
        onClick={toggleTheme}
      >
        {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
      </Button>
    );
  }
);
