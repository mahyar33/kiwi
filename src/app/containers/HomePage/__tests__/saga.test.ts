import { put, takeLatest } from 'redux-saga/effects';
import * as slice from '../slice';
import { getFlightList, getLocationList, bookingSaga } from '../saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { Booking } from '../types';

describe('getFlightList Saga', () => {
  let data: any;
  let getFlightListIterator: ReturnType<typeof getFlightList>;

  beforeEach(() => {
    const getFlightListParams: Partial<PayloadAction<Booking<string>>> = {
      payload: {
        flyFrom: 'tehran',
        flyTo: 'new york',
        dateFrom: '2021/1/1',
        dateTo: '2021/1/1',
        partner: 'skypicker',
      },
    };
    getFlightListIterator = getFlightList(
      getFlightListParams as PayloadAction<Booking<string>>,
    );
  });

  it('should dispatch action if it requests the data successfully', () => {
    data = [];
    const requestDescriptor = getFlightListIterator.next().value;
    const convertDescriptor = getFlightListIterator.next(data).value;
    const putDescriptor = getFlightListIterator.next(data).value;
    expect(putDescriptor).toEqual(
      put(
        slice.actions.setFlightList({ loading: false, error: '', data: data }),
      ),
    );
    const iteration = getFlightListIterator.next();
    expect(iteration.done).toBe(true);
  });
  it('should dispatch error', () => {
    const error = new Error('error');
    const requestDescriptor = getFlightListIterator.next().value;
    const putDescriptor = getFlightListIterator.throw(error).value;
    expect(putDescriptor).toEqual(
      put(
        slice.actions.setFlightList({
          loading: false,
          error: error.message,
          data: [],
        }),
      ),
    );
  });
});
describe('getLocationList Saga', () => {
  let data: any;
  let getLocationListIterator: ReturnType<typeof getLocationList>;

  beforeEach(() => {
    const getLocationListParams: Partial<PayloadAction<string>> = {
      payload: 'tehran',
    };
    getLocationListIterator = getLocationList(
      getLocationListParams as PayloadAction<string>,
    );
  });
  it('should dispatch action if it requests the data successfully', () => {
    data = [];
    const requestDescriptor = getLocationListIterator.next().value;
    const convertDescriptor = getLocationListIterator.next(data).value;
    const putDescriptor = getLocationListIterator.next(data).value;
    expect(putDescriptor).toEqual(
      put(
        slice.actions.setLocationList({
          loading: false,
          error: '',
          data: data,
        }),
      ),
    );
    const iteration = getLocationListIterator.next();
    expect(iteration.done).toBe(true);
  });
  it('should dispatch error', () => {
    const error = new Error('error');
    const requestDescriptor = getLocationListIterator.next().value;
    const putDescriptor = getLocationListIterator.throw(error).value;
    expect(putDescriptor).toEqual(
      put(
        slice.actions.setLocationList({
          loading: false,
          error: error.message,
          data: [],
        }),
      ),
    );
  });
});

describe('todosSaga Saga', () => {
  const bookingSagaIterator = bookingSaga();
  it('should start task to watch for bookingSaga action', () => {
    let takeLatestDescriptor = bookingSagaIterator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(slice.actions.getFlightList, getFlightList),
    );
    takeLatestDescriptor = bookingSagaIterator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(slice.actions.getLocationList, getLocationList),
    );
  });
});
