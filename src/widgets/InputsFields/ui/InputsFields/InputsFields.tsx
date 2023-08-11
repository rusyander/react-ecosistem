import { memo, useCallback, useEffect, useState } from 'react';
import { Filters } from '../Filters/Filters';

interface InputsFieldsProps {
  className?: string;
  getGridData?: (data: any) => void;
  filterData?: any;
  modalTitle?: string;
  isFilter?: boolean;
  // if not filter
  setInputsValues?: (data: any) => void;
  attrData?: any;
  requiredLength?: (length: number) => void;
  allRequeredLength?: (length: number) => void;
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
    requiredLength,
    setInputsValues,
    allRequeredLength,
    defaultValuesData,
    errorData,
  } = props;

  const [noFilterInputsData, setNoFilterInputsData] = useState(null);
  // console.log(defaultValuesData, 'defaultValuesData');

  const reconfigurateNoFilterInputsData = useCallback(() => {
    // const addNewValueFields: any = filterData?.map((item: any) => {
    //   return {
    //     ...item,
    //     // value: getDataQ?.data?.[item.token] || null,
    //     value: null,
    //   };
    // });

    const addNewValueFields: any = filterData?.map((item: any) => {
      return {
        ...item,
        value: defaultValuesData?.data?.[item.token] || null,
        // value: null,
      };
    });

    setNoFilterInputsData(addNewValueFields);
  }, [filterData]);

  useEffect(() => {
    reconfigurateNoFilterInputsData();
  }, [reconfigurateNoFilterInputsData]);

  return (
    <div>
      {noFilterInputsData !== null && (
        <Filters
          className={className}
          getGridData={getGridData}
          filterData={isFilter ? filterData : noFilterInputsData}
          // filterData={filterData}
          // filterData={noFilterInputsData}
          modalTitle={modalTitle}
          isFilter={isFilter}
          // if not filter
          setInputsValues={setInputsValues}
          attrData={attrData}
          requiredLength={requiredLength}
          allRequeredLength={allRequeredLength}
          defaultValuesData={defaultValuesData}
          errorData={errorData}
        />
      )}
      {noFilterInputsData === null && <h1>no data</h1>}
    </div>
  );
});
