import { fork, take, call, put } from 'redux-saga/effects';

import { get, post } from 'utils/request';
import apiEndpoints from 'utils/apiEndpoints';
import {
  LOAD_DOCTORS,
  SUBMIT_BOOKING,
} from './constants';
import { doctorsLoaded, bookingSubmitted } from './actions';

export function* loadDoctors(action) {
  try {
    const url = apiEndpoints.doctors.collection;
    const data = yield call(get, url, action.payload);
    yield put(doctorsLoaded(data));
  } catch (error) {
    console.log(error);
  }
}

export function* submitBooking({ payload }) {
  try {
    const url = apiEndpoints.bookings.create;
    const data = yield call(post, url, payload);
    yield put(bookingSubmitted(data));
  } catch (error) {
    console.log(error);
  }
}

export function* doctorFlow() {
  while (true) {
    const action = yield take(LOAD_DOCTORS);
    yield fork(loadDoctors, action);
  }
}

export function* bookingFlow() {
  while (true) {
    const bookingAction = yield take([SUBMIT_BOOKING]);
    yield fork(submitBooking, bookingAction);
  }
}


export default [
  doctorFlow,
  bookingFlow,
];

