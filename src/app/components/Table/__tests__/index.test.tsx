import React from 'react';
import { render, screen } from '@testing-library/react';
import { Table } from '../index';

const renderWithProps = (props: Parameters<typeof Table>[number]) =>
  render(<Table {...props} />);
const tHead = [
  {
    dataField: 'id',
    text: '#',
  },
  {
    dataField: 'cityFrom',
    text: 'From',
  },
  {
    dataField: 'cityTo',
    text: 'To',
  },
  {
    dataField: 'dTime',
    text: 'Date And Time',
  },
  {
    dataField: 'price',
    text: 'Price',
  },
];

describe('<Table />', () => {
  const props: Parameters<typeof Table>[number] = {
    noResult: 'text',
    tHead,
    tBody: [
      {
        dTime: '10:30' + '2021/1/1',
        id: '1',
        cityTo: 'Tehran',
        cityFrom: 'New York',
        price: '1000',
      },
    ],
  };
  it('should render an <table> tag', () => {
    const table = renderWithProps(props);
    expect(table.container.querySelector('table')).toBeInTheDocument();
  });
  it('should match snapshot', () => {
    const table = renderWithProps(props);
    expect(table.container.firstChild).toMatchSnapshot();
  });
  it('should have 1 rows in tbody', () => {
    const table = renderWithProps(props);
    expect(table.container.querySelectorAll('tbody tr').length).toBe(1);
  });
  it('should have props displayed', () => {
    const table = renderWithProps(props);
    expect(
      table.queryByText(props.tBody[0].cityTo, { exact: false }),
    ).toBeInTheDocument();
  });
  it('should show noResult', () => {
    props.tBody = [];
    const table = renderWithProps(props);
    expect(table.queryByText(props.noResult)).toBeInTheDocument();
  });
  it('should match snapshot with noResult', () => {
    const table = renderWithProps(props);
    expect(table.container.firstChild).toMatchSnapshot();
  });
});
