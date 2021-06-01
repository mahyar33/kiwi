import styled, { keyframes } from 'styled-components/macro';

const speed = 1.5;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 0, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100, 150;
    stroke-dashoffset: -24;
  }
  100% {
    stroke-dasharray: 0, 150;
    stroke-dashoffset: -124;
  }
`;

export interface SvgProps {
  small?: boolean;
}

export const Svg = styled.svg<SvgProps>`
  animation: ${rotate} ${speed * 1.75}s linear infinite;
  height: ${p => (p.small ? '1.25rem' : '3rem')};
  width: ${p => (p.small ? '1.25rem' : '3rem')};
  transform-origin: center;
`;

export const Circle = styled.circle`
  animation: ${dash} ${speed}s ease-in-out infinite;
  stroke: rgba(215, 113, 88, 1);
  stroke-linecap: round;
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
