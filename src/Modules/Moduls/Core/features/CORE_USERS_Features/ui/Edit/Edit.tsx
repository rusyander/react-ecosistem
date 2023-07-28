import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Edit.module.scss';
import { Button, HStack, Modal, Texts, classNames } from 'Modules/UiKit';
import { Icon } from '@iconify/react';
import { ModalHeader } from 'Modules/Moduls/Core/entities/ModalHeader';
import { SubmitFormFooter } from 'Modules/Moduls/Core/entities/SubmitFormFooter';
import { Filters } from '../../../Filter';
import { fildListAddNewEdit } from '../../consts/const';
import { GetDataM, SaveDataM } from '../../api/saveData';
import { convertArrayToObject } from '../../../Filter/functions/arrayToObject';

interface EditProps {
  className?: string;
  selectedField: any;
}

export const Edit = memo((props: EditProps) => {
  const { className, selectedField } = props;
  const { t } = useTranslation('core');
  const [saveData, { data: saveDataQ }] = SaveDataM();
  // const [getData, { data: getDataQ }] = GetDataM();
  const [getData, { data: getDataQ }] = GetDataM();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [noFilterInputsData, setNoFilterInputsData] = useState([]);

  const reconfigurateNoFilterInputsData = useCallback(() => {
    const addNewValueFields: any = fildListAddNewEdit.map((item: any) => {
      return {
        ...item,
        value: getDataQ?.data?.[item.token] || null,
      };
    });

    setNoFilterInputsData(addNewValueFields);
  }, [getDataQ?.data]);

  const openModalFunction = () => {
    setOpenEditModal(true);
    // getData(selectedField?.user_id);
    reconfigurateNoFilterInputsData();
    getData(selectedField?.user_id).then((res: any) => {
      setDefaultData(res.data);
    });
    // if (getDataQ?.result === '1') {
    // }
  };

  const closeModalFunction = useCallback(() => {
    setOpenEditModal(false);
  }, [setOpenEditModal]);

  // ----------------------------------

  useEffect(() => {
    console.log('selectedField1111111', selectedField);

    // getData(selectedField?.user_id).then((res: any) => {
    //   setDefaultData(res.data);
    // });
    // reconfigurateNoFilterInputsData();
    // getData(selectedField?.user_id);
    // if (getDataQ?.data) {
    //   setDefaultData(getDataQ?.data);
    // }
  }, []);

  // ----------------------------------
  const [requiredLength, setRequiredLength] = useState(0);
  const [allRequeredLength, setAllRequeredLength] = useState(0);
  const [inputsValue, setInputsValue] = useState([]);

  const [defaultData, setDefaultData] = useState<any>(getDataQ?.data);
  // console.log('requiredLength-------------------', requiredLength);
  // console.log('allRequeredLength-------------------', allRequeredLength);
  // console.log('inputsValue-------------------', inputsValue);
  // console.log('getDataQ?.data-------------------', getDataQ?.data);

  console.log('selectedField22222222222', selectedField);
  const handleSubmit = useCallback(() => {
    const updateValue = inputsValue;
    // if (defaultData) {
    //   updateValue?.forEach((item: any) => {
    //     if (item.fildValue === null || item.fildValue === undefined) {
    //       item.fildValue = defaultData?.[item.fildName];
    //     }
    //   });
    // }

    getData(selectedField?.user_id).then((res: any) => {
      updateValue?.forEach((item: any) => {
        if (item.fildValue === null || item.fildValue === undefined) {
          item.fildValue = res?.data?.[item.fildName];
        }
      });

      const value = convertArrayToObject(updateValue);
      const addUserId = { ...value, userId: selectedField?.user_id };
      saveData(addUserId);
      // console.log('addUserId ++++++++++++++++', addUserId);
    });

    // const data = inputsValue;
    // const addUserId = { ...data, userId: selectedField?.user_id };
    // console.log('data++++++++ ---- ****', data);selectedField
    // if (allRequeredLength === requiredLength) {
    // --------------------------------------------------------------------------
    // const data = inputsValue;
    // const findNulAndChangeIT = data?.map((item: any) => {
    //   if (item?.value === null) {
    //     return { ...item, value: '' };
    //   }
    //   return item;
    // });
    // const addUserId = { ...data, userId: selectedField?.user_id };
    // if (defaultData) {
    //   saveData(addUserId);
    // }
    // }
    if (saveDataQ?.result === '1') {
      closeModalFunction();
    }
  }, [
    getData,
    selectedField?.user_id,
    inputsValue,
    saveDataQ?.result,
    saveData,
    closeModalFunction,
  ]);

  const seee = () => {
    // console.log('*********************', getDataQ?.data);
  };
  // ******************************************************************
  const [dataEdit, setDataEdit] = useState(fildListAddNewEdit ?? []);

  return (
    <div className={classNames(cls.edit, {}, [className])}>
      <Button
        onClick={openModalFunction}
        theme="background"
        className={cls.addButtons}
      >
        <HStack gap="16">
          <Icon width={20} icon="clarity:edit-line" />
          <Texts text={t('Редактировать')} />
        </HStack>
      </Button>

      {/* <button onClick={seee}>click</button> */}

      {openEditModal && (
        <Modal isOpen={openEditModal} onClose={closeModalFunction}>
          <ModalHeader
            title={t('Реквизиты пользователя') || ''}
            onClose={closeModalFunction}
          />

          <Filters
            className={cls.filters}
            // filterData={fildListAddNewEdit}
            filterData={noFilterInputsData}
            modalTitle={t('Справочник')}
            isFilter={false}
            // setInputsValues={(data: any) => console.log('setInputsValues', data)}
            setInputsValues={(data: any) => setInputsValue(data)}
            requiredLength={(data: any) => setRequiredLength(data)}
            allRequeredLength={(data: any) => setAllRequeredLength(data)}
            defaultValuesData={getDataQ}
            // ----
            setDataEdit={setDataEdit}
            dataEdit={dataEdit}
            errorData={saveDataQ?.data}
          />

          <SubmitFormFooter
            onClose={closeModalFunction}
            onSubmit={handleSubmit}
          />
        </Modal>
      )}
    </div>
  );
});
