import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoadingIndicator } from '../index';

const renderWithProps = (
  props: Parameters<typeof LoadingIndicator>[number] = {},
) => render(<LoadingIndicator {...props} />);

describe('<LoadingIndicator />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = renderWithProps();
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });

  it('should match snapshot when props changed', () => {
    const loadingIndicator = renderWithProps({ small: true });
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
