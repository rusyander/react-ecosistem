import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Add.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { ModalHeader } from '../../../../entities/ModalHeader';
import { Filters } from '../../../Filter';
import { attrDataNoBD, fildListAddNew, inputsData } from '../../consts/const';

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

  // ----------------------------------

  const [noFilterInputsData, setNoFilterInputsData] = useState([]);

  const reconfigurateNoFilterInputsData = useCallback(() => {
    const addNewValueFields: any = inputsData.map((item: any) => {
      return {
        ...item,
        value: '',
      };
    });
    setNoFilterInputsData(addNewValueFields);
  }, []);
  useEffect(() => {
    reconfigurateNoFilterInputsData();
  }, []);

  // ----------------------------------
  const [requiredLength, setRequiredLength] = useState(0);
  console.log('requiredLength-------------------', requiredLength);

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
          width={900}
        />

        {/* ----------- */}

        <Filters
          filterData={fildListAddNew}
          // filterData={noFilterInputsData}
          // attrData={attrDataNoBD}
          modalTitle={t('Справочник')}
          isFilter={false}
          setInputsValues={(data: any) => console.log('dataInputs', data)}
          requiredLength={(data: any) => setRequiredLength(data)}
        />
      </Modal>
    </div>
  );
});
