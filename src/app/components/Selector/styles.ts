import styled from 'styled-components/macro';

type DropdownWrapperProps = {
  isLoading: boolean;
};

export const SelectorWrapper = styled.div`
  position: relative
`;

export const DropdownWrapper = styled.div<DropdownWrapperProps>`
  position: absolute;
  width: 100%;
  text-align: ${props => (props.isLoading ? 'center' : 'unset')};
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: 0;
  box-shadow: inset 0px 0px 3px 0px #6d6c6c8a;
  max-height: 110px;
  overflow: ${props => (props.isLoading ? 'unset' : 'auto')};
  svg {
    width: 30px
  }
`;

export const DropdownItem = styled.div`
  padding: 6px 12px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  :last-child{
     border-bottom: unset;
  }
  :hover{
     background-color: #bbbaba;
     color: white;
  }
`;
