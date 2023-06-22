import React, {
  InputHTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import cls from "./Input.module.css";
import { classNames } from "../../../lib/classNames/classNames";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  label?: string;
  isLabel?: boolean;
}

export const Input = memo((props: InputProps) => {
  const {
    className = "",
    value = "",
    onChange,
    type = "text",
    placeholder,
    autoFocus,
    label,
    isLabel,
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
    </div>
  );
});
