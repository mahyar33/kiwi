import React from 'react';
import { SelectorWrapper, DropdownWrapper, DropdownItem } from './styles';
import { Input } from '../Input';
import { Location } from '../../containers/HomePage/types';
import { LoadingIndicator } from '../LoadingIndicator';

type SelectorProps = {
  options: Array<{ text: string; value: string; id: number }>;
  placeholder: string;
  name: string;
  value?: string;
  expanded?: boolean;
  loading?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  onSelectItem?: (text: string, value: string, name: string) => void;
};

export const Selector = React.memo(
  ({
    options,
    placeholder,
    value,
    onChange,
    onSelectItem,
    expanded,
    loading,
    name,
  }: SelectorProps) => {
    const handleSelectItem = (text: string, value: string) => {
      if (onSelectItem) {
        onSelectItem(text, value, name);
      }
    };
    const handleOnchange = e => {
      if (onChange) {
        onChange(e, name);
      }
    };
    return (
      <SelectorWrapper>
        <Input
          placeholder={placeholder}
          value={value}
          type="search"
          onChange={handleOnchange}
        />
        {expanded && (
          <DropdownWrapper isLoading={loading!}>
            {loading ? (
              <LoadingIndicator />
            ) : (
              options.map(item => (
                <DropdownItem
                  onClick={() => handleSelectItem(item.text, item.value)}
                  key={item.id}
                >
                  {item.text}
                </DropdownItem>
              ))
            )}
          </DropdownWrapper>
        )}
      </SelectorWrapper>
    );
  },
);
