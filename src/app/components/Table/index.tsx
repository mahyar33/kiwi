import React from 'react';
import { StyledTable } from './styled';
import { Alert } from '../Alert';

type TheadOptions = {
  dataField: string;
  text: string;
};

type TableProps = {
  tHead: Array<TheadOptions>;
  tBody: Array<{ [key: string]: string }>;
  noResult: string;
};

export const Table = React.memo(({ tHead, tBody, noResult }: TableProps) => {
  return tBody.length !== 0 ? (
    <StyledTable>
      <thead>
        <tr>
          {tHead.map(item => (
            <th key={item.dataField}>{item.text}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tBody.map(tr => {
          return (
            <tr key={tr.id}>
              {tHead.map((td, key) => (
                <td key={key}>{tr[td.dataField]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  ) : (
    <Alert key={'alert'} textAlert={noResult} />
  );
});
