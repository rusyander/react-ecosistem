import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import cls from './OsRegionsEditModalContent.module.scss';
import {
  CheckFormEnterM,
  ErrorMessage,
  InputsDataSkeleton,
  ModalHeader,
  NoData,
  SubmitFormFooter,
  Toast,
  VStack,
  classNames,
} from 'Modules/UiKit';
import { t } from 'i18next';
import { convertArrayToObject, InputsFields } from 'widgets/InputsFields';

interface OsRegionsEditModalContentProps {
  className?: string;
  closeModalFunction: any;
  getInit: any;
  saveData: any;
  getInitData: any;
  saveDataQ: any;
  getFgData: any;
  selectedField: any;
  refetchGridData?: () => void;
}

export const OsRegionsEditModalContent = memo(
  (props: OsRegionsEditModalContentProps) => {
    const {
      className,
      closeModalFunction,
      getInit,
      getInitData,
      saveData,
      saveDataQ,
      selectedField,
      getFgData,
      refetchGridData,
    } = props;
    const [defaultData, setDefaultData] = useState<any>([]);

    const [inputsValue, setInputsValue]: any = useState([]);
    const [isErrored, setIsErrored] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const editDataPayload = useMemo(() => {
      return {
        code: 'OS_REGION_FIELDS',
        params: [selectedField?.region_id],
      };
    }, [selectedField?.region_id]);

    useEffect(() => {
      getInit('OS_REGION_FIELDS');

      getFgData(editDataPayload).then((res: any) => {
        setDefaultData(res.data);
      });
    }, []);

    const handleSubmit = useCallback(() => {
      const updateValue = inputsValue;

      getFgData(editDataPayload).then((res: any) => {
        const resData = res?.data?.data;

        updateValue?.forEach((item: any) => {
          if (item.fildValue === null || item.fildValue === undefined) {
            item.fildValue = resData?.[item.fildName];
          }
        });
        const value = convertArrayToObject(updateValue);
        const addUserId = {
          ...value,
          regionId: selectedField?.region_id,
        };

        saveData(addUserId).then((res: any) => {
          if (res?.data?.result === '1') {
            refetchGridData?.();
            setIsSuccess(true);
            setTimeout(() => {
              setIsSuccess(false);
              closeModalFunction();
            }, 1000);
          } else {
            setIsErrored(true);
          }
        });
      });
    }, [
      inputsValue,
      getFgData,
      editDataPayload,
      selectedField?.region_id,
      saveData,
      refetchGridData,
      closeModalFunction,
    ]);

    return (
      <div
        className={classNames(cls.osRegionsEditModalContent, {}, [className])}
      >
        <CheckFormEnterM checkFormEnterName="OS_REGION_ADD_EDIT" />
        <ModalHeader
          title={t('Реквизиты организации') || ''}
          onClose={closeModalFunction}
        />
        <VStack max gap="32" className="formContent">
          {isErrored && (
            <ErrorMessage isEdit isOpen setIsError={setIsErrored} />
          )}
          {isSuccess && <Toast isEdit />}
          {!getInitData?.data?.attrData && <InputsDataSkeleton />}
          {getInitData?.data?.attrData?.length === 0 && <NoData />}
          {getInitData && (
            <InputsFields
              className={cls.filters}
              filterData={getInitData?.data.attr}
              isFilter={false}
              setInputsValues={(data: any) => setInputsValue(data)}
              errorData={saveDataQ?.data}
              attrData={getInitData?.data?.attrData}
              defaultValuesData={defaultData}
            />
          )}
        </VStack>
        <SubmitFormFooter
          onClose={closeModalFunction}
          onSubmit={handleSubmit}
        />
      </div>
    );
  }
);
