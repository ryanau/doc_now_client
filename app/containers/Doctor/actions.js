/*
 *
 * Doctor actions
 *
 */

import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SUBMIT_BOOKING,
  BOOKING_SUBMITTED,
} from './constants';

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

