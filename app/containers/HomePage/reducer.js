/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';

import {
  DOCTORS_LOADED,
  OPEN_MODAL,
  CLOSE_MODAL,
  BOOKING_SUBMITTED,
} from './constants';

const initialState = fromJS({
  isLoading: true,
  isSubmitted: false,
  isModalOpen: false,
  doctorSelected: null,
  bookingNumber: null,
});

function homePageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case DOCTORS_LOADED: {
      return state.merge({ doctors: payload.doctors, isLoading: false });
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
    default:
      return state;
  }
}

export default homePageReducer;

