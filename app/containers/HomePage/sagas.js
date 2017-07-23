import { fork, take, call, put } from 'redux-saga/effects';

import { post } from 'utils/request';
import apiEndpoints from 'utils/apiEndpoints';
import { SUBMIT_BOOKING } from './constants';
import { bookingSubmitted } from './actions';

export function* submitBooking({ payload }) {
  try {
    const url = apiEndpoints.bookings.create;
    const data = yield call(post, url, payload);
    yield put(bookingSubmitted(data));
  } catch (error) {
    console.log(error);
  }
}

export function* bookingFlow() {
  while (true) {
    const bookingAction = yield take([SUBMIT_BOOKING]);
    yield fork(submitBooking, bookingAction);
  }
}


export default [
  bookingFlow,
];

