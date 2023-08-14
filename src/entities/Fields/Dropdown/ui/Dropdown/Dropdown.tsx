import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Dropdown.module.scss';
import { ListBox } from 'Modules/UiKit';

interface DropdownProps {
  className?: string;
  inputs: any;
  onChange: any;
  data: any;
  index: number;
  getAttrValues: any;
  defaultValue?: any;
  items?: any;
}

export const Dropdown = memo((props: DropdownProps) => {
  const {
    className,
    inputs,
    onChange,
    data,
    getAttrValues,
    index,
    defaultValue,
    items,
  } = props;
  const { t } = useTranslation();

  const [dropdownData, setDropdownData] = useState<any>([]);
  const [dropdawnValue, setDropdawnValue] = useState([]);

  const getDropdawnData = useCallback(() => {
    data?.forEach((item: any) => {
      if (item.filterDisplayTypeCode === 'L') {
        getAttrValues(item?.filterAttributeCode).then((res: any) => {
          setDropdownData(res?.data?.data);
        });
      }
    });
  }, [data, getAttrValues]);

  useEffect(() => {
    getDropdawnData();
  }, [getDropdawnData]);

  return (
    <ListBox
      defaultValue={defaultValue}
      key={index}
      onChange={(value) => {
        setDropdawnValue(value);
        onChange(index, value.code);
      }}
      value={dropdawnValue}
      items={items}
    />
  );
});
