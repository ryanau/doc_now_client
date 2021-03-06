import { RESET_DOCTORS, LOAD_DOCTORS, DOCTORS_LOADED } from './constants';

export function loadDoctors(params) {
  return {
    type: LOAD_DOCTORS,
    payload: params,
  };
}

export function doctorsLoaded(data) {
  return {
    type: DOCTORS_LOADED,
    payload: data,
  };
}

export function resetDoctors() {
  return {
    type: RESET_DOCTORS,
  };
}
