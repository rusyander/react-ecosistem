import { memo} from 'react';
import { useTranslation } from 'react-i18next';
import cls from './[FTName].module.scss';
import { classNames } from 'Moduls/UiKit'


interface [FTName]Props {
   className?: string;
}

export const [FTName] = memo((props:[FTName]Props) => {
   const { className } = props;
   const { t } = useTranslation()

   return (
      <div className={classNames(cls.[FTName | camelcase], {}, [className])}>

      </div>
   );
})