import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './AddModalContent.module.scss';
import {
  ModalHeader,
  SubmitFormFooter,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { SaveDataM } from '../../api/saveData';
import { convertArrayToObject, InputsFields } from 'widgets/InputsFields';
import { fildListAddNew } from '../../consts/const';

interface AddModalContentProps {
  className?: string;
  closeModalFunction: () => void;
}

export const AddModalContent = memo((props: AddModalContentProps) => {
  const { className, closeModalFunction } = props;
  const { t } = useTranslation('core');

  const [saveData, { data: saveDataQ }] = SaveDataM();

  const [inputsValue, setInputsValue] = useState([]);

  const handleSubmit = useCallback(() => {
    const value = convertArrayToObject(inputsValue);
    saveData(value);
    if (saveDataQ?.result === '1') {
      closeModalFunction();
    }
  }, [saveData, closeModalFunction, inputsValue, saveDataQ?.result]);

  const inputFoldsPayload = useMemo(
    () => ({
      filter: null,
      pageNumber: 1,
      pageSize: 100,
      params: null,
      sort: [],
      totalCount: null,
    }),
    []
  );

  return (
    <div className={classNames(cls.addModalContent, {}, [className])}>
      <ModalHeader
        title={t('Реквизиты пользователя') || ''}
        onClose={closeModalFunction}
      />
      <VStack className="formContent" max>
        <InputsFields
          className={cls.filters}
          filterData={fildListAddNew}
          modalTitle={t('Справочник')}
          isFilter={false}
          payloadData={inputFoldsPayload}
          // setInputsValues={(data: any) => console.log('setInputsValues', data)}
          setInputsValues={(data: any) => setInputsValue(data)}
          errorData={saveDataQ?.data}
        />
      </VStack>
      <SubmitFormFooter onClose={closeModalFunction} onSubmit={handleSubmit} />
    </div>
  );
});
