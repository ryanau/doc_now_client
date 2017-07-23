/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';

import { LOAD_DOCTORS, DOCTORS_LOADED } from 'entities/doctors/constants';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  BOOKING_SUBMITTED,
  CHANGE_STATUS,
  INITIAL,
  FETCHING,
  LOADED,
  DISPLAY_ERROR,
} from './constants';

const initialState = fromJS({
  status: INITIAL,
  isSubmitted: false,
  isModalOpen: false,
  doctorSelected: null,
  bookingNumber: null,
  error: null,
});

function homePageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_DOCTORS: {
      return state.set('status', FETCHING);
    }
    case DOCTORS_LOADED: {
      return state.merge({ status: LOADED });
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
    case CHANGE_STATUS: {
      return state.set('status', payload);
    }
    case DISPLAY_ERROR: {
      return state.set('error', payload);
    }
    default:
      return state;
  }
}

export default homePageReducer;

