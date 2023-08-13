import { memo, useCallback, useEffect, useState } from 'react';
import { Filters } from '../Filters/Filters';

interface InputsFieldsProps {
  className?: string;
  getGridData?: (data: any) => void;
  filterData?: any;
  modalTitle?: string;
  isFilter?: boolean;
  payloadData?: any;
  // if not filter
  setInputsValues?: (data: any) => void;
  attrData?: any;
  errorData?: any;
  defaultValuesData?: any;
}

export const InputsFields = memo((props: InputsFieldsProps) => {
  const {
    className,
    attrData,
    filterData,
    getGridData,
    isFilter,
    modalTitle,
    setInputsValues,
    defaultValuesData,
    errorData,
    payloadData,
  } = props;

  const [noFilterInputsData, setNoFilterInputsData] = useState(null);

  const reconfigurateNoFilterInputsData = useCallback(() => {
    const addNewValueFields: any = filterData?.map((item: any) => {
      return {
        ...item,
        // value: defaultValuesData?.data?.[item.token] || null,
        value: null,
      };
    });

    setNoFilterInputsData(addNewValueFields);
  }, [filterData]);

  useEffect(() => {
    reconfigurateNoFilterInputsData();
  }, [reconfigurateNoFilterInputsData]);

  return (
    <>
      {noFilterInputsData !== null && (
        <Filters
          className={className}
          getGridData={getGridData}
          filterData={isFilter ? filterData : noFilterInputsData}
          modalTitle={modalTitle}
          isFilter={isFilter}
          payloadData={payloadData}
          // if not filter
          setInputsValues={setInputsValues}
          attrData={attrData}
          defaultValuesData={defaultValuesData}
          errorData={errorData}
        />
      )}
      {noFilterInputsData === null && <h1>no data</h1>}
    </>
  );
});
