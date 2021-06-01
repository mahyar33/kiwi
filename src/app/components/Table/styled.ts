import styled from 'styled-components/macro';

export const StyledTable = styled.table`
  border: 1px solid #ccc;
  color: black;
  width: 100%;
  margin: 2rem 0;
  border-collapse: collapse;
  word-break: keep-all;
  thead {
    background-color: #cccccc;
  }
  th {
    vertical-align: bottom;
    padding: 0.3rem;
  }
  td {
    border: 1px solid #ccc;
    padding: 0.3rem;
  }
`;
