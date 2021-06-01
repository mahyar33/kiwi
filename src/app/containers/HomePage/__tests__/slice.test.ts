import * as slice from '../slice';
import { BookingState } from '../types';

describe('Todos slice', () => {
  let state: BookingState;

  beforeEach(() => {
    state = slice.initialState;
  });

  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: '' })).toEqual(state);
  });

  it('should handle setLocationList', () => {
    const data = {
      loading: false,
      error: '',
      data: [{ id: 1, code: 'teh', city: 'Tehran', countryName: 'Iran' }],
    };
    expect(slice.reducer(state, slice.actions.setLocationList(data))).toEqual<
      BookingState
    >({
      ...slice.initialState,
      locations: data,
    });
  });
  it('should handle getLocationList', () => {
    const data = {
      loading: true,
      error: '',
      data: [],
    };

    expect(
      slice.reducer(state, slice.actions.getLocationList('tehran')),
    ).toEqual<BookingState>({
      ...slice.initialState,
      locations: data,
    });
  });
  it('should handle setFlightList', () => {
    const data = {
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
    };
    expect(slice.reducer(state, slice.actions.setFlightList(data))).toEqual<
      BookingState
    >({
      ...slice.initialState,
      flights: data,
    });
  });
  it('should handle getFlightList', () => {
    const data = {
      loading: true,
      error: '',
      data: [],
    };

    expect(
      slice.reducer(
        state,
        slice.actions.getFlightList({
          flyFrom: 'tehran',
          flyTo: 'new york',
          dateFrom: '2021/1/1',
          dateTo: '2021/1/1',
          partner: 'skypicker',
        }),
      ),
    ).toEqual<BookingState>({
      ...slice.initialState,
      flights: data,
    });
  });
});
