import styled from 'styled-components/macro';

export const StyledInput = styled.input`
  display: block;
  width: 100%;
  height: 2.5rem;
  padding: 6px 12px;
  line-height: 1.5;
  color: black;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ccc;
  :focus-visible {
    outline: unset;
  }
`;
