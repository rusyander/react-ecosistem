import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Edit.module.scss';
import {
  Button,
  HStack,
  Modal,
  ModalHeader,
  SubmitFormFooter,
  Texts,
  classNames,
} from 'Modules/UiKit';
import { Icon } from '@iconify/react';

import { fildListAddNewEdit } from '../../consts/const';
import { GetDataM, SaveDataM } from '../../api/saveData';
import { InputsFields, convertArrayToObject } from 'widgets/InputsFields';
import { Filters } from 'widgets/InputsFields/ui/Filters/Filters';

interface EditProps {
  className?: string;
  selectedField: any;
}

export const Edit = memo((props: EditProps) => {
  const { className, selectedField } = props;
  const { t } = useTranslation('core');
  const [saveData, { data: saveDataQ }] = SaveDataM();
  // const [getData, { data: getDataQ }] = GetDataM();
  const [getData] = GetDataM();
  const [defaultData, setDefaultData] = useState<any>([]);

  const [openEditModal, setOpenEditModal] = useState(false);
  // const [noFilterInputsData, setNoFilterInputsData] = useState([]);

  // const reconfigurateNoFilterInputsData = useCallback(() => {
  //   const addNewValueFields: any = fildListAddNewEdit.map((item: any) => {
  //     return {
  //       ...item,
  //       value: getDataQ?.data?.[item.token] || null,
  //     };
  //   });

  //   setNoFilterInputsData(addNewValueFields);
  // }, [getDataQ?.data]);
  // useEffect(() => {
  //   reconfigurateNoFilterInputsData();
  // }, []);

  const openModalFunction = () => {
    setOpenEditModal(true);

    getData(selectedField?.user_id).then((res: any) => {
      setDefaultData(res.data);
    });
  };

  const closeModalFunction = useCallback(() => {
    setOpenEditModal(false);
  }, [setOpenEditModal]);

  // ----------------------------------
  const [requiredLength, setRequiredLength] = useState(0);
  const [allRequeredLength, setAllRequeredLength] = useState(0);
  const [inputsValue, setInputsValue]: any = useState([]);

  const handleSubmit = useCallback(() => {
    const updateValue = inputsValue;

    getData(selectedField?.user_id).then((res: any) => {
      // if (res !== undefined) {
      const resData = res?.data?.data;

      // console.log(resData, 'resData');
      updateValue?.forEach((item: any) => {
        if (item.fildValue === null || item.fildValue === undefined) {
          item.fildValue = resData?.[item.fildName];
        }
      });

      const value = convertArrayToObject(updateValue);

      const addUserId = { ...value, userId: selectedField?.user_id };
      console.log(addUserId, 'addUserId');

      saveData(addUserId);
      setInputsValue([]);
      console.log('updateValue', updateValue);

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

          <InputsFields
            className={cls.filters}
            filterData={fildListAddNewEdit}
            // filterData={noFilterInputsData}
            modalTitle={t('Справочник')}
            isFilter={false}
            // setInputsValues={(data: any) => console.log('setInputsValues', data)}
            setInputsValues={(data: any) => setInputsValue(data)}
            requiredLength={(data: any) => setRequiredLength(data)}
            allRequeredLength={(data: any) => setAllRequeredLength(data)}
            defaultValuesData={defaultData}
            // ----
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

// {
//   "result": "1",
//   "data": {
//       "isActiveFlagCode": "Y",
//       "address": null,
//       "changePasswordFlagCode": "N",
//       "endDate": null,
//       "employeeIdName": null,
//       "employeeId": null,
//       "addInfo": "TEST2",
//       "login": "TEST2",
//       "userId": 5,
//       "organizationIdName": "Головная организация 9",
//       "organizationId": 46,
//       "firstLastName": "TEST2",
//       "emailAddress": "12333",
//       "telefon": null,
//       "fax": null,
//       "startDate": "28.07.2023"
//   },
//   "comments": null
// }
// const data: any = {
//   isActiveFlagCode: 'Y',
//   address: null,
//   changePasswordFlagCode: 'N',
//   endDate: null,
//   employeeIdName: null,
//   employeeId: null,
//   addInfo: 'TEST2',
//   login: 'TEST2',
//   userId: 5,
//   organizationIdName: 'Головная организация 9',
//   organizationId: 46,
//   firstLastName: 'TEST2',
//   emailAddress: '12333',
//   telefon: null,
//   fax: null,
//   startDate: '28.07.2023',
// };
