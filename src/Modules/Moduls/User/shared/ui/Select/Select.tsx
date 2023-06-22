import { ChangeEvent, memo, useCallback, useMemo } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOptions {
  value: string;
  content: string;
}

interface SelectProps {
  className?: string;
  label?: string;
  options?: SelectOptions[];
  value?: string;
  onChange?: (value?: string) => void;
  readonly?: boolean;
}

export const Select = memo(
  ({
    className,
    label = 'Укажи значение',
    options,
    value,
    onChange,
    readonly,
  }: SelectProps) => {
    const mods: Mods = {
      [cls.readonly]: readonly,
    };

    const onChangeHandler = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
      },
      [onChange]
    );

    const optionsList = useMemo(() => {
      return options?.map((opt) => (
        <option key={opt.value} className={cls.option} value={opt.value}>
          {opt.content}
        </option>
      ));
    }, [options]);
    return (
      <div className={classNames(cls.Wrapper, mods, [className])}>
        {label && <span className={cls.label}>{`${label}>`}</span>}
        <select
          disabled={readonly}
          onChange={onChangeHandler}
          value={value}
          className={cls.select}
        >
          {optionsList}
        </select>
      </div>
    );
  }
);
