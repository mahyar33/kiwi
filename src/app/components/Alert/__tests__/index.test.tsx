import React from 'react';
import { render } from '@testing-library/react';

import { Alert } from '../index';

const renderWithProps = (props: Parameters<typeof Alert>[number]) =>
  render(<Alert {...props} />);

describe('<Alert />', () => {
  it('should render an <div> tag', () => {
    const alert = renderWithProps({ textAlert: 'hi' });
    expect(alert.container.querySelector('div')).toBeInTheDocument();
  });
  it('should match snapshot', () => {
    const alert = renderWithProps({ textAlert: 'hi' });
    expect(alert.container.firstChild).toMatchSnapshot();
  });
});
