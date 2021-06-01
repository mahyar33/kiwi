import * as selectors from '../selector';
import { RootState } from 'types/RootState';
import { initialState } from '../slice';

describe('Booking selectors', () => {
  let state: RootState = {};

  beforeEach(() => {
    state = {
      booking: {
        ...initialState,
      },
    };
  });

  it('should select the initial state', () => {
    expect(selectors.selectLocationList(state)).toEqual(initialState.locations);
    expect(selectors.selectFlightList(state)).toEqual(initialState.flights);
  });

  it('should select locations', () => {
    const locations = {
      data: [{ id: 1, code: 'teh', city: 'Tehran', countryName: 'Iran' }],
      loading: false,
      error: '',
    };
    state = {
      booking: {
        ...state.booking!,
        locations,
      },
    };
    expect(selectors.selectLocationList(state)).toEqual(locations);
  });

  it('should select flights', () => {
    const flights = {
      data: [
        {
          dTime: { time: '10:30', date: '2021/1/1' },
          id: '1',
          cityTo: 'Tehran',
          cityFrom: 'New York',
          price: 1000,
        },
      ],
      loading: false,
      error: '',
    };
    state = {
      booking: {
        ...state.booking!,
        flights,
      },
    };
    console.log('state', state);
    expect(selectors.selectFlightList(state)).toEqual(flights);
  });
});
