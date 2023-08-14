import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './EditModalContent.module.scss';
import {
  ModalHeader,
  SubmitFormFooter,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { convertArrayToObject, InputsFields } from 'widgets/InputsFields';
import { fildListAddNewEdit } from '../../consts/const';
import { GetDataM, SaveDataM } from '../../api/saveData';

interface EditModalContentProps {
  className?: string;
  selectedField: any;
  closeModalFunction: () => void;
}

export const EditModalContent = memo((props: EditModalContentProps) => {
  const { className, selectedField, closeModalFunction } = props;
  const { t } = useTranslation('core');

  const [saveData, { data: saveDataQ }] = SaveDataM();
  // const [getData, { data: getDataQ }] = GetDataM();
  const [getData] = GetDataM();
  const [defaultData, setDefaultData] = useState<any>([]);

  const [inputsValue, setInputsValue]: any = useState([]);

  useEffect(() => {
    getData(selectedField?.user_id).then((res: any) => {
      setDefaultData(res.data);
    });
  }, []);

  const handleSubmit = useCallback(() => {
    const updateValue = inputsValue;
    getData(selectedField?.user_id).then((res: any) => {
      const resData = res?.data?.data;
      updateValue?.forEach((item: any) => {
        if (item.fildValue === null || item.fildValue === undefined) {
          item.fildValue = resData?.[item.fildName];
        }
      });
      const value = convertArrayToObject(updateValue);
      const addUserId = { ...value, userId: selectedField?.user_id };

      saveData(addUserId);
      setInputsValue([]);

      if (res?.data.result === '1') {
        closeModalFunction();
      }
      // }
    });
  }, [
    getData,
    selectedField?.user_id,
    inputsValue,
    saveData,
    closeModalFunction,
  ]);

  return (
    <div className={classNames(cls.editModalContent, {}, [className])}>
      <ModalHeader
        title={t('Реквизиты пользователя') || ''}
        onClose={closeModalFunction}
      />
      <VStack className="formContent" max>
        <InputsFields
          className={cls.filters}
          filterData={fildListAddNewEdit}
          // filterData={noFilterInputsData}
          modalTitle={t('Справочник')}
          isFilter={false}
          // setInputsValues={(data: any) => console.log('setInputsValues', data)}
          setInputsValues={(data: any) => setInputsValue(data)}
          defaultValuesData={defaultData}
          // ----
          errorData={saveDataQ?.data}
        />
      </VStack>

      <SubmitFormFooter onClose={closeModalFunction} onSubmit={handleSubmit} />
    </div>
  );
});
