import React from 'react';
import { StyledAlert } from './styles';

type AlertProps = {
  textAlert: string;
};

export const Alert = ({ textAlert }: AlertProps) => (
  <StyledAlert role="alert">{textAlert}</StyledAlert>
);
