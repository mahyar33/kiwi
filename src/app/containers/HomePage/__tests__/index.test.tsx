import React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { configureAppStore } from 'store/configureStore';
import { actions, initialState } from '../slice';
import { HomePage } from '..';
import { i18n, translations } from 'locales/i18n';
import userEvent from '@testing-library/user-event';
import { createRenderer } from 'react-test-renderer/shallow';
const shallowRenderer = createRenderer();

function* mockHomePageSaga() {}

jest.mock('../saga', () => ({
  bookingSaga: mockHomePageSaga,
}));

const renderHomePage = (store: Store) =>
  render(
    <Provider store={store}>
      <HelmetProvider>
        <HomePage />
      </HelmetProvider>
    </Provider>,
  );

describe('<renderHomePage />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let component: ReturnType<typeof renderHomePage>;

  beforeEach(() => {
    jest.useFakeTimers();
    store = configureAppStore();
    component = renderHomePage(store);
    expect(store.getState().booking).toEqual(initialState);
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    component.unmount();
  });
  it('should render and match the snapshot', () => {
    shallowRenderer.render(
      <Provider store={store}>
        <HomePage />
      </Provider>,
    );
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
  it('should display loading indicator when getting location is loading', () => {
    userEvent.type(component.container.querySelector('input')!, 'H');
    store.dispatch(actions.getLocationList('test'));
    expect(component.container.querySelector('circle')).toBeInTheDocument();
  });
  it('should display loading indicator when getting flight is loading', () => {
    store.dispatch(
      actions.getFlightList({
        flyFrom: 'tehran',
        flyTo: 'new york',
        dateFrom: '2021/1/1',
        dateTo: '2021/1/1',
        partner: 'skypicker',
      }),
    );
    expect(component.container.querySelector('circle')).toBeInTheDocument();
  });
  it('should display empty table', async () => {
    const t = await i18n;
    store.dispatch(
      actions.setFlightList({ loading: false, error: '', data: [] }),
    );
    expect(
      component.queryByText(t(translations.noResult)!),
    ).toBeInTheDocument();
  });
  it('should display table', () => {
    store.dispatch(
      actions.setFlightList({
        loading: false,
        error: '',
        data: [
          {
            dTime: { time: '10:30', date: '2021/1/1' },
            id: '1',
            cityTo: 'Tehran',
            cityFrom: 'New York',
            price: 1000,
          },
        ],
      }),
    );
    expect(component.queryByText('Tehran')).toBeInTheDocument();
  });
  it('should dispatch action on select change', () => {
    const select = component.container.querySelector('input');
    userEvent.type(select!, 'Hello, World!');
    jest.runAllTimers();
    expect(store.getState().booking.locations.loading).toBe(true);
  });
  it('should set value on select item', () => {
    const select = component.container.querySelector('input');
    userEvent.type(select!, 'Hello, World!');
    store.dispatch(
      actions.setLocationList({
        loading: false,
        error: '',
        data: [{ id: 1, code: 'teh', city: 'Tehran', countryName: 'Iran' }],
      }),
    );
    userEvent.click(component.getByText(`Iran , Tehran`));
    expect(component.getByDisplayValue('Tehran')).toBeInTheDocument();
  });
});
