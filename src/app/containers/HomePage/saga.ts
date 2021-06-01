import { put, takeLatest, call } from 'redux-saga/effects';
import { actions } from './slice';
import { request } from 'utils/request';
import { PayloadAction } from '@reduxjs/toolkit';
import { Booking, Flight, Location } from './types';
import { convertTimestamp } from '../../../utils/general';

const baseUrl = 'https://api.skypicker.com/';

const locationConverter = (data): Array<Location> => {
  return data.map(item => {
    const { id, code, city, country } = item;
    return {
      id: id,
      code: code,
      city: city.name,
      countryName: city.country ? city.country.name : country.name,
    };
  });
};

const flightConverter = (data): Array<Flight> => {
  return data.map(item => {
    const { id, price, dTime, cityFrom, cityTo } = item;
    return {
      id: id,
      cityFrom: cityFrom,
      cityTo: cityTo,
      dTime: convertTimestamp(dTime),
      price: price,
    };
  });
};

export function* getFlightList({ payload }: PayloadAction<Booking<string>>) {
  try {
    const { partner, flyFrom, flyTo, dateFrom, dateTo } = payload;
    const url = new URL(baseUrl + 'flights');
    url.search = new URLSearchParams({
      curr: 'EUR',
      partner,
      flyFrom,
      to: flyTo,
      dateFrom,
      dateTo,
    }).toString();
    let flights = yield call(request, url.toString(), { method: 'GET' });
    flights = yield call(flightConverter, flights.data);
    yield put(
      actions.setFlightList({ loading: false, error: '', data: flights }),
    );
  } catch (err) {
    yield put(
      actions.setFlightList({ loading: false, error: err.message, data: [] }),
    );
  }
  return;
}

export function* getLocationList({ payload }: PayloadAction<string>) {
  try {
    const url = new URL(baseUrl + 'locations');
    url.search = new URLSearchParams({
      location_types: 'airport',
      term: payload,
    }).toString();
    let result = yield call(request, url.toString(), { method: 'GET' });
    result = yield call(locationConverter, result.locations);
    yield put(
      actions.setLocationList({
        loading: false,
        error: '',
        data: result,
      }),
    );
  } catch (err) {
    yield put(
      actions.setLocationList({
        loading: false,
        error: err.message,
        data: [],
      }),
    );
  }
  return;
}

/**
 * Root saga manages watcher lifecycle
 */
export function* bookingSaga() {
  yield takeLatest(actions.getFlightList, getFlightList);
  yield takeLatest(actions.getLocationList, getLocationList);
}
