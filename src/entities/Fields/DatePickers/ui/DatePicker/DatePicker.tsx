import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './DatePicker.module.scss';
import { Input } from 'Modules/UiKit';

interface DatePickerProps {
  className?: string;
  onChange: (event: string) => void;
  defaultValuesData?: string;
  index?: any;
  inputs: any;
  label?: any;
  onClick?: any;
}

export const DatePicker = memo((props: DatePickerProps) => {
  const { t } = useTranslation();
  const {
    className,
    onChange,
    defaultValuesData = undefined,
    inputs,
    label,
  } = props;

  // @ts-ignore
  const defaulData = defaultValuesData?.data?.[inputs?.token]
    ?.split('.')
    .reverse()
    .join('-');

  const [dateValue, setDateValue] = useState('');

  const handleDateChange = (value: any) => {
    const selectedValue = value;

    const formatDate = (dateString: any) => {
      if (!dateString) return 'None';
      const date = new Date(dateString);
      const formattedDate = `${String(date.getDate()).padStart(
        2,
        '0'
      )}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
      return formattedDate;
    };

    if (selectedValue) {
      onChange(formatDate(selectedValue));
      setDateValue(selectedValue);
    }
  };

  return (
    <Input
      onChange={handleDateChange}
      id="dateInput"
      value={dateValue ? dateValue : defaulData}
      isLabel
      type="date"
      maxLength={10}
      label={label ? label : inputs?.name}
      className={cls.input}
      placeholder={inputs?.name}
      requered={inputs?.isNullableFlag === 'N' ? true : false}
    />
  );
});
