import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CoreSetFormActionAuditSave.module.scss';
import {
  Button,
  ErrorMessage,
  HStack,
  Texts,
  Toast,
  classNames,
} from 'Modules/UiKit';
import { convertToNormalizaCheckboxDefaultValue } from 'widgets/InputsFields';
import { Icon } from '@iconify/react';

interface CoreSetFormActionAuditSaveProps {
  className?: string;
  getAccessTreeQData: any;
  selectedKeys: any;
  saveConfigAccessTree: any;
}

export const CoreSetFormActionAuditSave = memo(
  (props: CoreSetFormActionAuditSaveProps) => {
    const {
      className,
      getAccessTreeQData,
      saveConfigAccessTree,
      selectedKeys,
    } = props;
    const { t } = useTranslation();

    const [isEdited, setIsEdited] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSave = () => {
      const dataForTree = convertToNormalizaCheckboxDefaultValue(
        getAccessTreeQData?.data?.accessData
      );

      if (selectedKeys) {
        const checked = Object.keys(selectedKeys).filter(
          (key) => selectedKeys[key].checked
        );
        saveConfigAccessTree(checked).then((res: any) => {
          if (res?.data?.result === '1') {
            setIsEdited(true);
            setTimeout(() => {
              setIsEdited(false);
            }, 3000);
          } else {
            setIsError(true);
          }
        });
      }
      if (selectedKeys === undefined) {
        const checked = Object.keys(dataForTree).filter(
          (key) => dataForTree[key].checked
        );
        saveConfigAccessTree(checked).then((res: any) => {
          if (res?.data?.result === '1') {
            setIsEdited(true);
            setTimeout(() => {
              setIsEdited(false);
            }, 3000);
          } else {
            setIsError(true);
          }
        });
      }
    };

    return (
      <div
        className={classNames(cls.coreSetFormActionAuditSave, {}, [className])}
      >
        {isEdited && <Toast isEdit />}
        {isError && <ErrorMessage isOpen isEdit setIsError={setIsError} />}
        <Button
          onClick={handleSave}
          theme="background"
          className={cls.addButtons}
        >
          <HStack gap="16">
            <Icon width={20} icon="zondicons:add-outline" />
            <Texts text={t('Сохранить')} />
          </HStack>
        </Button>
      </div>
    );
  }
);
