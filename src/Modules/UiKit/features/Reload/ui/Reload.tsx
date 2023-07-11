import { memo } from 'react';
import { Icon } from '@iconify/react';

import cls from './Reload.module.scss';
import { Button } from '../../../shared';

interface ReloadProps {
  onRefresh: () => void;
}
export const Reload = memo(({ onRefresh }: ReloadProps) => {
  return (
    <div onClick={onRefresh}>
      <Button theme="background">
        <Icon className={cls.iconSize} icon="oi:reload" />
      </Button>
    </div>
  );
});
