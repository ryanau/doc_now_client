import { fork, take, call, put } from 'redux-saga/effects';

import { get } from 'utils/request';
import apiEndpoints from 'utils/apiEndpoints';
import { LOAD_DOCTORS } from './constants';
import { doctorsLoaded } from './actions';

export function* loadDoctors(action) {
  try {
    const url = apiEndpoints.doctors.collection;
    const data = yield call(get, url, action.payload);
    mixpanel.track('doctors_loaded', { number: data.doctors.length });
    yield put(doctorsLoaded(data));
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

