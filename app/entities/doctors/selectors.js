import { createSelector } from 'reselect';

const selectDoctors = (state) => state.getIn(['entities', 'doctors']);

const getDoctors = createSelector(
  selectDoctors,
  (doctors) => doctors.get('allIds').map((id) => doctors.getIn(['byId', id]))
);

const getDcotorsById = createSelector(
  selectDoctors,
  (doctors) => doctors.get('byId'),
);

export {
  getDoctors,
  getDcotorsById,
};

