import { fromJS } from 'immutable';
import normalize from 'utils/normalizeEntities';

import { RESET_DOCTORS, DOCTORS_LOADED } from './constants';

const initialState = fromJS({
  allIds: [],
  byId: {},
});

function doctorsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case DOCTORS_LOADED: {
      return state.merge(normalize(payload.doctors));
    }
    case RESET_DOCTORS: {
      return state.merge(initialState);
    }
    default:
      return state;
  }
}

export default doctorsReducer;

