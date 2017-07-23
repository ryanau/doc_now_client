
import { fromJS } from 'immutable';
import areaReducer from '../reducer';

describe('areaReducer', () => {
  it('returns the initial state', () => {
    expect(areaReducer(undefined, {})).toEqual(fromJS({}));
  });
});
