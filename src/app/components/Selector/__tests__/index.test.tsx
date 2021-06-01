import React from 'react';
import { prettyDOM, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Selector } from '../index';

const renderWithProps = (props: Parameters<typeof Selector>[number]) =>
  render(<Selector {...props} />);

describe('<Selector />', () => {
  const props: Parameters<typeof Selector>[number] = {
    placeholder: 'placeholder',
    name: 'Selector',
    options: [
      { text: 'yes', value: 'yes', id: 0 },
      { text: 'no', value: 'no', id: 1 },
    ],
    onChange: jest.fn(),
    onSelectItem: jest.fn(),
  };
  it('should render an <input> tag', () => {
    const selector = renderWithProps(props);
    expect(selector.container.querySelector('input')).toBeInTheDocument();
  });
  it('should render an loading indicator', () => {
    props.loading = true;
    props.expanded = true;
    const selector = renderWithProps(props);
    expect(selector.container.querySelector('svg')).toBeInTheDocument();
  });
  it('should match snapshot', () => {
    const selector = renderWithProps(props);
    expect(selector.container.firstChild).toMatchSnapshot();
  });
  it('should have props', () => {
    const selector = renderWithProps(props);
    expect(selector.container.querySelector('input')).toHaveAttribute(
      'placeholder',
      props.placeholder,
    );
  });
  it('should call onSelectItem', () => {
    props.loading = false;
    const selector = renderWithProps(props);
    userEvent.click(selector.getByText('yes', { exact: false }));
    expect(props.onSelectItem).toHaveBeenCalledTimes(1);
  });
  it('should call onChange', () => {
    const selector = renderWithProps(props);
    userEvent.type(selector.container.querySelector('input')!, 'H');
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });
  it('should have 2 options', () => {
    const selector = renderWithProps(props);
    expect(
      selector.container.querySelectorAll('div > div > div>div ').length,
    ).toBe(2);
  });
});
