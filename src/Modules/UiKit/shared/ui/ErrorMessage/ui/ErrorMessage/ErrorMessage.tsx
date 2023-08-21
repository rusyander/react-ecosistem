import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './ErrorMessage.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';

interface ErrorMessageProps {
  className?: string;
  title?: string;
  subTitle?: string;
  isOpen?: boolean;
  isAdd?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
  setIsError?: (value: boolean) => void | undefined;
}

export const ErrorMessage = memo((props: ErrorMessageProps) => {
  const {
    className,
    title = undefined,
    subTitle = undefined,
    isOpen = false,
    isAdd = false,
    isDelete = false,
    isEdit = false,
    setIsError = (value: boolean) => (value = false),
  } = props;
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState(isOpen);

  const closeModalFunction = useCallback(() => {
    setOpenModal(false);
    setIsError(false);
  }, [setIsError]);

  return (
    <div className={classNames(cls.errorMessage, {}, [className])}>
      <Modal zIndex={1000} isOpen={openModal} onClose={closeModalFunction}>
        {isOpen && (
          <div className={cls.MessagesModal}>
            {isAdd && (
              <div>
                <HStack justify="between" max>
                  <Texts
                    size="sizeL"
                    className={cls.text}
                    title={title ? title : t('Произошла ошибка')}
                  />
                </HStack>
                <div className={cls.divider} />
                <HStack justify="start" align="center" gap="8">
                  <Icon icon="material-symbols:error" className={cls.icons} />
                  <Texts
                    size="sizeL"
                    className={cls.textWith}
                    text={
                      subTitle
                        ? subTitle
                        : t(
                            // eslint-disable-next-line max-len
                            'При создании нового элемента произошла ошибка, пожалуйста попробуйте повторить чуть позже или проверьте правельно ли вы заполнили все поля'
                          )
                    }
                  />
                </HStack>
                <div className={cls.divider} />
                <HStack justify="end" gap="16">
                  <Button
                    theme="background"
                    className={cls.confirmButtons}
                    onClick={closeModalFunction}
                  >
                    {t('Ок')}
                  </Button>
                </HStack>
              </div>
            )}

            {isEdit && (
              <div>
                <HStack justify="between" max>
                  <Texts
                    size="sizeL"
                    className={cls.text}
                    title={title ? title : t('Произошла ошибка')}
                  />
                </HStack>
                <div className={cls.divider} />
                <HStack justify="start" align="center" gap="8">
                  <Icon icon="material-symbols:error" className={cls.icons} />
                  <Texts
                    size="sizeL"
                    className={cls.textWith}
                    text={
                      subTitle
                        ? subTitle
                        : t(
                            // eslint-disable-next-line max-len
                            'При редактировании элемента произошла ошибка, пожалуйста попробуйте повторить чуть позже или проверьте правельно ли вы заполнили все поля'
                          )
                    }
                  />
                </HStack>
                <div className={cls.divider} />
                <HStack justify="end" gap="16">
                  <Button
                    theme="background"
                    className={cls.confirmButtons}
                    onClick={closeModalFunction}
                  >
                    {t('Ок')}
                  </Button>
                </HStack>
              </div>
            )}

            {isDelete && (
              <div>
                <HStack justify="between" max>
                  <Texts
                    size="sizeL"
                    className={cls.text}
                    title={title ? title : t('Произошла ошибка')}
                  />
                </HStack>
                <div className={cls.divider} />
                <HStack justify="start" align="center" gap="8">
                  <Icon icon="material-symbols:error" className={cls.icons} />
                  <Texts
                    size="sizeL"
                    className={cls.textWith}
                    text={
                      subTitle
                        ? subTitle
                        : t(
                            // eslint-disable-next-line max-len
                            'При удалении элемента произошла ошибка, пожалуйста попробуйте повторить чуть позже или проверьте правельно ли вы заполнили все поля'
                          )
                    }
                  />
                </HStack>
                <div className={cls.divider} />
                <HStack justify="end" gap="16">
                  <Button
                    theme="background"
                    className={cls.confirmButtons}
                    onClick={closeModalFunction}
                  >
                    {t('Ок')}
                  </Button>
                </HStack>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
});
