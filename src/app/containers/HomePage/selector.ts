import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from './slice';

const selectBooking = (state: RootState) => state.booking || initialState;

export const selectFlightList = createSelector(
  [selectBooking],
  bookingState => bookingState.flights,
);
export const selectLocationList = createSelector(
  [selectBooking],
  bookingState => bookingState.locations,
);
