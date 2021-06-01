import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin: auto;
  font-family: sans-serif;
`;

export const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(2, minmax(min-content, max-content));
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr) auto;
  gap: 0 15px;
  align-items: baseline;
  @media (max-width: 768px) {
    gap: 10px 10px;
    grid-template-columns: auto 1fr;
    grid-template-rows: repeat(2, minmax(min-content, max-content));
  }
`;
