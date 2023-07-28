import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Add.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { ModalHeader } from '../../../../entities/ModalHeader';
import { Filters } from '../../../Filter';
import { fildListAddNew } from '../../consts/const';
import { SubmitFormFooter } from '../../../../entities/SubmitFormFooter';
import { SaveDataM } from '../../api/saveData';

interface AddProps {
  className?: string;
}

export const Add = memo((props: AddProps) => {
  const { className } = props;
  const { t } = useTranslation('core');

  const [openAddModal, setOpenAddModal] = useState(false);

  const openModalFunction = useCallback(() => {
    setOpenAddModal(true);
  }, [setOpenAddModal]);

  const closeModalFunction = useCallback(() => {
    setOpenAddModal(false);
  }, [setOpenAddModal]);

  const [saveData, { data: saveDataQ }] = SaveDataM();
  // console.log('saveDataQ', saveDataQ);

  // ----------------------------------

  const [noFilterInputsData, setNoFilterInputsData] = useState([]);

  const reconfigurateNoFilterInputsData = useCallback(() => {
    const addNewValueFields: any = fildListAddNew.map((item: any) => {
      return {
        ...item,
        value: null,
      };
    });
    setNoFilterInputsData(addNewValueFields);
  }, []);
  useEffect(() => {
    // reconfigurateNoFilterInputsData();
  }, []);

  // ----------------------------------
  const [requiredLength, setRequiredLength] = useState(0);
  const [allRequeredLength, setAllRequeredLength] = useState(0);
  const [inputsValue, setInputsValue] = useState([]);

  const handleSubmit = useCallback(() => {
    const data = inputsValue;
    saveData(data);
    if (saveDataQ?.result === '1') {
      closeModalFunction();
    }
  }, [saveData, closeModalFunction, inputsValue, saveDataQ?.result]);

  return (
    <div className={classNames(cls.add, {}, [className])}>
      <Button
        onClick={openModalFunction}
        theme="background"
        className={cls.addButtons}
      >
        <HStack gap="16">
          <Icon width={20} icon="zondicons:add-outline" />
          <Texts text={t('Добавить')} />
        </HStack>
      </Button>

      <Modal isOpen={openAddModal} onClose={closeModalFunction} lazy>
        <ModalHeader
          title={t('Реквизиты пользователя') || ''}
          onClose={closeModalFunction}
        />
        <Filters
          className={cls.filters}
          filterData={fildListAddNew}
          modalTitle={t('Справочник')}
          isFilter={false}
          // setInputsValues={(data: any) => console.log('setInputsValues', data)}
          setInputsValues={(data: any) => setInputsValue(data)}
          requiredLength={(data: any) => setRequiredLength(data)}
          allRequeredLength={(data: any) => setAllRequeredLength(data)}
          errorData={saveDataQ?.data}
        />
        <SubmitFormFooter
          onClose={closeModalFunction}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
});
