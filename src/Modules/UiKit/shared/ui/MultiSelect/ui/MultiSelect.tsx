import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  CSSProperties,
} from 'react';
import cls from './MultiSelect.module.scss';
import { Button, classNames } from '../../..';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  className?: string;
  style?: CSSProperties;
  onChange?: (value: string[]) => void;
}

export const MultiSelect = memo(
  ({ options, className, onChange = () => [] }: MultiSelectProps) => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option: Option) => {
      const data: Option[] = [];

      if (selectedOptions.some((item) => item.value === option.value)) {
        setSelectedOptions(
          selectedOptions.filter((item) => item.value !== option.value)
        );
        data.push(
          ...selectedOptions.filter((item) => item.value !== option.value)
        );
      } else {
        setSelectedOptions([...selectedOptions, option]);
        data.push(...selectedOptions, option);
      }
      const allSekectedId = data.map((item) => item.value);
      onChange(allSekectedId);
    };
    const handleClearSelection = () => {
      setSelectedOptions([]);
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const selectedItems = (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();
    };
    const deleteItems = useCallback(
      (item: Option) => () => {
        setSelectedOptions(
          selectedOptions.filter((i) => i.value !== item.value)
        );
      },
      [selectedOptions]
    );

    useEffect(() => {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, []);

    return (
      <div className={classNames(cls.MultiSelectComponent, {}, [className])}>
        <div className={cls.multiselectSelect} ref={selectRef}>
          <div
            className={classNames('', {}, [
              cls.selectedValue,
              isOpen ? cls.open : '',
            ])}
            onClick={toggleDropdown}
          >
            <div className={cls.multiSelectClear}>
              <div className={cls.multiSelectFilds}>
                {selectedOptions.length > 0
                  ? selectedOptions.map((item) => (
                      <span
                        key={item.value}
                        className={cls.selectedItem}
                        onClick={selectedItems}
                      >
                        {item.label}{' '}
                        <Button
                          theme="clear"
                          onClick={deleteItems(item)}
                          className={cls.closeItems}
                        >
                          X
                        </Button>
                      </span>
                    ))
                  : 'Выберете элементы'}
              </div>
            </div>
          </div>

          {isOpen && (
            <ul className={cls.dropdown}>
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleOptionSelect(option)}
                  className={classNames('', {}, [
                    cls.option,
                    selectedOptions.some((item) => item.value === option.value)
                      ? cls.selected
                      : '',
                  ])}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          {selectedOptions.length > 0 && (
            <button className={cls.clearButton} onClick={handleClearSelection}>
              X
            </button>
          )}
        </div>
      </div>
    );
  }
);
