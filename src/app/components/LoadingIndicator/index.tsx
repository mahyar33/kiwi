import React from 'react';
import { Circle, Svg, SvgProps } from './styles';

interface Props extends SvgProps {}

export const LoadingIndicator = (props: Props) => (
  <Svg viewBox="-24 -24 48 48" small={props.small}>
    <Circle cx="0" cy="0" r="20" fill="none" strokeWidth="4" />
  </Svg>
);
