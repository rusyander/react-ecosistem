import { memo, useEffect } from 'react';
import cls from './CheckFormEnter.module.scss';
import { classNames } from 'Modules/UiKit';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkFormEnterM } from 'shared/Globals/globalApi/globalApi';

interface CheckFormEnterProps {
  className?: string;
  checkFormEnterName?: string;
}

export const CheckFormEnter = memo((props: CheckFormEnterProps) => {
  const { className, checkFormEnterName = null } = props;

  const [checkFormEnter] = checkFormEnterM();
  const locations = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    checkFormEnter(
      checkFormEnterName === null
        ? locations.pathname.replaceAll('/', '')
        : checkFormEnterName
    );
  }, []);

  return <></>;
});
