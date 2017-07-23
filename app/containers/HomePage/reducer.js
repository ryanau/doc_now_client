/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';

const initialState = fromJS({});

function homePageReducer(state = initialState, { type }) {
  switch (type) {
    default:
      return state;
  }
}

export default homePageReducer;

