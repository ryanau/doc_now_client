import { fromJS } from 'immutable';
import normalize from 'utils/normalizeEntities';

import { DOCTORS_LOADED } from './constants';

const initialState = fromJS({
  allIds: [],
  byId: {},
});

function doctorsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case DOCTORS_LOADED: {
      return state.merge(normalize(payload.doctors));
    }
    default:
      return state;
  }
}

export default doctorsReducer;

