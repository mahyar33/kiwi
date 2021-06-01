import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../index';

const renderWithProps = (props: Parameters<typeof Input>[number]) =>
  render(<Input {...props} />);

describe('<Input />', () => {
  const props: Parameters<typeof Input>[number] = {
    type: 'text',
    placeholder: 'searchP',
  };
  it('should render an <input> tag', () => {
    const input = renderWithProps(props);
    expect(input.container.querySelector('input')).toBeInTheDocument();
  });
  it('should match snapshot', () => {
    const input = renderWithProps(props);
    expect(input.container.firstChild).toMatchSnapshot();
  });
  it('should have props', () => {
    const input = renderWithProps(props);
    expect(input.container.querySelector('input')).toHaveAttribute(
      'type',
      props.type,
    );
    expect(input.container.querySelector('input')).toHaveAttribute(
      'placeholder',
      props.placeholder,
    );
  });
  it('types inside input', () => {
    const input = renderWithProps(props);
    userEvent.type(input.container.querySelector('input')!, 'Hello, World!');
    expect(input.container.querySelector('input')!).toHaveValue(
      'Hello, World!',
    );
  });
  it('should call onChange', () => {
    props.onChange = jest.fn();
    const input = renderWithProps(props);
    userEvent.type(input.container.querySelector('input')!, 'Hello, World!');
    expect(props.onChange).toHaveBeenCalled();
  });
});
