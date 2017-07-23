/*
 *
 * Doctor reducer
 *
 */

import { fromJS } from 'immutable';

import { RESET_DOCTORS, DOCTORS_LOADED } from 'entities/doctors/constants';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  BOOKING_SUBMITTED,
} from './constants';

const initialState = fromJS({
  isLoaded: false,
  isSubmitted: false,
  isModalOpen: false,
  doctorSelected: null,
  bookingNumber: null,
  error: null,
});

function doctorReducer(state = initialState, { type, payload }) {
  switch (type) {
    case DOCTORS_LOADED: {
      return state.set('isLoaded', true);
    }
    case OPEN_MODAL: {
      return state.merge({ doctorSelected: payload, isModalOpen: true });
    }
    case CLOSE_MODAL: {
      return state.merge({
        isSubmitted: false,
        doctorSelected: null,
        isModalOpen: false,
      });
    }
    case BOOKING_SUBMITTED: {
      return state.merge({ isSubmitted: true, bookingNumber: payload.booking_number });
    }
    case RESET_DOCTORS: {
      return state.merge(initialState);
    }
    default:
      return state;
  }
}

export default doctorReducer;

