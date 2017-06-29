/*
 *
 * HomePage actions
 *
 */

import {
  LOAD_DOCTORS,
  DOCTORS_LOADED,
  OPEN_MODAL,
  CLOSE_MODAL,
  SUBMIT_BOOKING,
  BOOKING_SUBMITTED,
} from './constants';

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

export function openModal(data) {
  return {
    type: OPEN_MODAL,
    payload: data,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}

export function submitBooking(data) {
  return {
    type: SUBMIT_BOOKING,
    payload: data,
  };
}

export function bookingSubmitted(data) {
  return {
    type: BOOKING_SUBMITTED,
    payload: data,
  };
}
