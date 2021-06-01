import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Booking, BookingState } from './types';

export const initialState: BookingState = {
  flights: {
    loading: false,
    error: '',
    data: null,
  },
  locations: {
    loading: false,
    error: '',
    data: [],
  },
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setFlightList(state, action: PayloadAction<BookingState['flights']>) {
      const { payload } = action;
      state.flights.loading = payload.loading;
      state.flights.error = payload.error;
      state.flights.data = payload.data;
    },
    getFlightList(state, action: PayloadAction<Booking<string>>) {
      state.flights.loading = true;
      state.flights.error = '';
      state.flights.data = [];
    },
    setLocationList(state, action: PayloadAction<BookingState['locations']>) {
      const { payload } = action;
      state.locations.loading = payload.loading;
      state.locations.error = payload.error;
      state.locations.data = payload.data;
    },
    getLocationList(state, action: PayloadAction<string>) {
      state.locations.loading = true;
      state.locations.error = '';
      state.locations.data = [];
    },
  },
});

export const { actions, reducer, name: sliceKey } = bookingSlice;
