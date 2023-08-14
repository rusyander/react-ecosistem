import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Datepicker.module.scss';
import { classNames } from 'Modules/UiKit';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

interface DatepickerProps {
  className?: string;
  inputs?: any;
  onChange: (index: number, value: any) => void;
  defaultValuesData?: any;
  index?: any;
}

export const Datepicker = memo((props: DatepickerProps) => {
  const { className, onChange, defaultValuesData, inputs, index } = props;
  const { t } = useTranslation();

  const dateParts = defaultValuesData?.data?.[inputs?.token]
    ? defaultValuesData?.data?.[inputs?.token].split('.')
    : ''; // Разбиваем строку на части
  const parsedDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); // Преобразуем в объект Date

  console.log('dateParts', dateParts);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      {/* <DemoContainer components={['DatePicker']}> */}
      <DatePicker
        className={cls.input}
        label={inputs?.name}
        value={inputs?.value}
        onChange={(value) => onChange(index, value)}
        // onOpen={() => setBetweenIndex(index)}
        // format="DD.MM.YYYY"
        // defaultValue={dayjs(
        //   // defaultValuesData?.data?.[inputs?.token]
        //   // '17.04.2022'
        //   '2022.04.17'
        // )}
        // defaultValue={dayjs(defaultValuesData?.data?.[inputs?.token])}
        defaultValue={parsedDate}
      />
      <h4>{defaultValuesData?.data?.[inputs?.token]}</h4>
      {/* </DemoContainer> */}
    </LocalizationProvider>
  );
});
