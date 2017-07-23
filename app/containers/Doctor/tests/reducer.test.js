
import { fromJS } from 'immutable';
import doctorReducer from '../reducer';

describe('doctorReducer', () => {
  it('returns the initial state', () => {
    expect(doctorReducer(undefined, {})).toEqual(fromJS({}));
  });
});
