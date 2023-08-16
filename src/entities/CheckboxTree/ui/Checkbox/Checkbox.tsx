import { ChangeEvent, useEffect, useRef } from 'react';

export interface CheckboxProps {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  label: string;
  onChange?: () => void;
}

export const CheckBox = ({
  isChecked = false,
  isIndeterminate = false,
  label,
  onChange,
}: CheckboxProps) => {
  const id = new Date().getTime().toString();
  const checkboxRef = useRef<HTMLInputElement>(null);
  useEffect(
    function changeCheckboxState() {
      if (!checkboxRef.current) return;
      if (isChecked) {
        checkboxRef.current.checked = true;
        checkboxRef.current.indeterminate = false;
        return;
      }
      if (isIndeterminate) {
        checkboxRef.current.checked = false;
        checkboxRef.current.indeterminate = true;
        return;
      }
      checkboxRef.current.checked = false;
      checkboxRef.current.indeterminate = false;
    },
    [isChecked, isIndeterminate]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    onChange();
  };
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        ref={checkboxRef}
        onChange={handleChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
