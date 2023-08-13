import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './RolesGridDeleteModalContent.module.scss';
import { classNames } from 'Modules/UiKit';

interface RolesGridDeleteModalContentProps {
  className?: string;
  selectedField: any;
  closeModalFunction: any;
}

export const RolesGridDeleteModalContent = memo(
  (props: RolesGridDeleteModalContentProps) => {
    const { className, closeModalFunction, selectedField } = props;
    const { t } = useTranslation();

    return (
      <div
        className={classNames(cls.rolesGridDeleteModalContent, {}, [className])}
      ></div>
    );
  }
);
