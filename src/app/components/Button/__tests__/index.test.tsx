import React from 'react';
import { render } from '@testing-library/react';

import { Button } from '../index';
import userEvent from '@testing-library/user-event';

const renderWithProps = (props: Parameters<typeof Button>[number]) =>
  render(<Button {...props} />);

describe('<Button />', () => {
  const props: Parameters<typeof Button>[number] = {
    text: 'hi',
    btnColor: 'red',
    onClick: jest.fn(),
  };
  it('should render an <button> tag', () => {
    const button = renderWithProps(props);
    expect(button.container.querySelector('button')).toBeInTheDocument();
  });
  it('should match snapshot', () => {
    const button = renderWithProps(props);
    expect(button.container.firstChild).toMatchSnapshot();
  });
  it('should render props', () => {
    const button = renderWithProps(props);
    expect(
      button.queryByText(props.text, { exact: false }),
    ).toBeInTheDocument();
  });
  it('should call onClick', () => {
    const button = renderWithProps(props);
    userEvent.click(button.getByText(props.text, { exact: false }));
    expect(props.onClick).toHaveBeenCalled();
  });
});
