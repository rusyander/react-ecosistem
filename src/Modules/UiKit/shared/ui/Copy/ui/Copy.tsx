import { memo, useCallback } from 'react';
import cls from './Copy.module.scss';
// import CopyImage from "shared/assets/icons/copy.svg";
import { Button, Icon, classNames } from '../../..';

interface CopyProps {
  className?: string;
  text: string;
}

export const Copy = memo((props: CopyProps) => {
  const { className, text } = props;

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(cls.code, {}, [className])}>
      <Button onClick={copyCode} className={cls.copyBtn} theme="clear">
        {/* <Icon Svg={CopyImage} className={cls.copyIcon} /> */}
        Copy
      </Button>
      <code>{text}</code>
    </pre>
  );
});
