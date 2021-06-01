import React, { FunctionComponent } from 'react';
import { StyledButton } from './styles';

type ButtonProps = {
  onClick?: () => void;
  text: string;
  btnColor: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

export const Button = ({
  onClick,
  text,
  btnColor,
  disabled,
  type = 'button',
}: ButtonProps) => {
  return (
    <StyledButton
      disabled={disabled}
      type={type}
      btnColor={btnColor}
      onClick={onClick}
    >
      {text}
    </StyledButton>
  );
};
