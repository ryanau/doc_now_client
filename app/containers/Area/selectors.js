import { createSelector } from 'reselect';

/**
 * Direct selector to the area state domain
 */
const selectAreaDomain = () => (state) => state.get('area');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Area
 */

const makeSelectArea = () => createSelector(
  selectAreaDomain(),
  (substate) => substate.toJS()
);

export default makeSelectArea;
export {
  selectAreaDomain,
};
