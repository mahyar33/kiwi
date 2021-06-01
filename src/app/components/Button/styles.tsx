import styled from 'styled-components';

type StyledButtonProps = {
  btnColor: string;
};

export const StyledButton = styled.button<StyledButtonProps>`
  border-radius: 4px;
  border: 0;
  cursor: pointer;
  padding: 12px 15px;
  color: ${props => (props.btnColor ? 'white' : '#1d1d1d')};
  background-color: ${props => (props.btnColor ? props.btnColor : '#e0e0e0')};
  :hover {
    opacity: 0.8;
  }
`;
