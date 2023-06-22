import { Button, classNames } from 'Modules/UiKit';
import React, { type FC, useEffect, useState } from 'react';

interface BugButtonProps {
  className?: string;
}

export const BugButton: FC<BugButtonProps> = ({ className }) => {
  const [error, setError] = useState(false);
  const toogleError = () => {
    setError(!error);
  };

  useEffect(() => {
    if (error) {
      throw new Error('Error');
    }
  }, [error]);
  return (
    <Button onClick={toogleError} className={classNames('', {}, [className])}>
      throw new Error
    </Button>
  );
};
