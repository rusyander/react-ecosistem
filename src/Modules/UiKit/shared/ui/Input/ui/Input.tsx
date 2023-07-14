import React, {
  InputHTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import cls from './Input.module.scss';
import { classNames } from '../../../lib/classNames/classNames';
import { Icon } from '@iconify/react';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  label?: string;
  isLabel?: boolean;
  search?: boolean;
}

export const Input = memo((props: InputProps) => {
  const {
    className = '',
    value = '',
    onChange,
    type = 'text',
    placeholder,
    autoFocus,
    label,
    isLabel,
    search = false,
    ...otherProps
  } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);

  useEffect(() => {
    if (autoFocus) {
      setIsFocus(true);
      ref.current?.focus();
    }
  }, [autoFocus, ref]);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
      setCaretPosition(e.target.value.length);
    },
    [onChange]
  );

  const onBlur = useCallback(() => {
    setIsFocus(false);
  }, []);

  const onFocus = useCallback(() => {
    setIsFocus(true);
  }, []);
  const onSelect = useCallback((e: any) => {
    setCaretPosition(e?.target?.selectionStart || 0);
  }, []);

  const mods: Record<string, boolean | any> = {
    [cls.isLabel]: isLabel,
  };

  return (
    <div className={classNames(cls.InputWrapper, {}, [className])}>
      {search ? (
        <>
          {isLabel && <label className={cls.inputLabel}>{label}</label>}

          <div className={cls.searchInput}>
            <input
              ref={ref}
              type={type}
              placeholder={placeholder}
              onChange={onChangeHandler}
              value={value}
              className={classNames(cls.inputs, mods, [className])}
              onBlur={onBlur}
              onFocus={onFocus}
              onSelect={onSelect}
              {...otherProps}
            />
            <Icon icon="ic:outline-search" className={cls.iconSearch} />
          </div>
        </>
      ) : (
        <>
          {isLabel && <label className={cls.inputLabel}>{label}</label>}

          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            onChange={onChangeHandler}
            value={value}
            className={classNames(cls.input, mods, [className])}
            onBlur={onBlur}
            onFocus={onFocus}
            onSelect={onSelect}
            {...otherProps}
          />
        </>
      )}
    </div>
  );
});
