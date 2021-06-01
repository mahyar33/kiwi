import React from 'react';
import { StyledInput } from './styles';

type InputProps = {
  placeholder?: string;
  value?: string;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = React.memo(
  ({ placeholder, value, type, onChange }: InputProps) => (
    <>
      <StyledInput
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
      />
    </>
  ),
);
