import { memo, useCallback, useEffect, useState } from 'react';
import { Filters } from '../Filters/Filters';

interface InputsFormProps {
  className?: string;
  getGridData?: (data: any) => void;
  filterData?: any;
  modalTitle?: string;
  isFilter?: boolean;
  // if not filter
  setInputsValues?: (data: any) => void;
  attrData?: any;
  requiredLength?: (length: number) => void;
}

export const InputsForm = memo((props: InputsFormProps) => {
  const {
    className,
    attrData,
    filterData,
    getGridData,
    isFilter,
    modalTitle,
    requiredLength,
    setInputsValues,
  } = props;
  const [noFilterInputsData, setNoFilterInputsData] = useState([]);

  const reconfigurateNoFilterInputsData = useCallback(() => {
    const addNewValueFields = filterData.map((item: any) => {
      return {
        ...item,
        value: '',
        error: '',
      };
    });
    setNoFilterInputsData(addNewValueFields);
  }, [filterData]);

  useEffect(() => {
    reconfigurateNoFilterInputsData();
  }, []);

  return (
    <Filters
      className={className}
      getGridData={getGridData}
      filterData={isFilter ? filterData : noFilterInputsData}
      modalTitle={modalTitle}
      isFilter={isFilter}
      // if not filter
      setInputsValues={setInputsValues}
      attrData={attrData}
      requiredLength={requiredLength}
    />
  );
});
