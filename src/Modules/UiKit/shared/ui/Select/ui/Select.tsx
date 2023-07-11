import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import cls from './Select.module.scss';

export interface Option {
  label: string;
  value: number;
}

interface SelectProps {
  className?: string;
  options: Option[];
  onSelect?: (value: string) => void;

  // For paginations
  isOpenPosition?: 'top' | 'bottom';
  selectedItemForPage?: number;
  totalCount?: number;
  setPageSizeElement?: (value: number) => void;
  onPaginationPageChange?: any;
  onPageChange?: (selectedItem: number) => void;
}

export const Select = memo(
  ({
    onSelect,
    options = [],
    isOpenPosition = 'bottom',
    selectedItemForPage = 0,
    totalCount = 0,
    setPageSizeElement,
    onPaginationPageChange,
    onPageChange,
  }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const [selectedItem, setSelectedItem] = useState(options[0].label);
    const allCount = { value: totalCount, label: 'Все' };

    const allOptions = [...options, allCount];

    const handleSelect = (value: Option) => {
      setSelectedItem(value.label);
      setPageSizeElement?.(value.value);
      onPaginationPageChange?.(1, value.value);
      onPageChange?.(1);
      onSelect?.(value.label);
      setIsOpen(false);
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }, []);

    const toggleSelect = useCallback(() => {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }, []);

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className={cls.customSelect} ref={selectRef}>
        <div
          className={`${cls.selectHeader} ${isOpen ? cls.open : ''}`}
          onClick={toggleSelect}
        >
          <span>
            {selectedItemForPage === 0 ? selectedItem : selectedItemForPage}
          </span>
          <Icon
            className={`${cls.arrow} ${isOpen ? cls.open : ''}`}
            icon="ep:arrow-down-bold"
          />
        </div>
        {isOpen && (
          <div>
            <ul
              className={`${cls.options} ${
                isOpenPosition === 'bottom' ? '' : cls.openBottom
              }`}
            >
              {allOptions.map((option) => (
                <li key={option.value} onClick={() => handleSelect(option)}>
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);
