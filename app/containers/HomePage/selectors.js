import { createSelector } from 'reselect';

const selectHomePage = (state) => state.get('homePage');

const getIsModalOpen = createSelector(
  selectHomePage,
  (state) => state.get('isModalOpen'),
);

const getDoctors = createSelector(
  selectHomePage,
  (state) => state.get('doctors'),
);

const getStatus = createSelector(
  selectHomePage,
  (state) => state.get('status'),
);

const getDoctorSelected = createSelector(
  selectHomePage,
  (state) => state.get('doctorSelected'),
);

const getIsSubmitted = createSelector(
  selectHomePage,
  (state) => state.get('isSubmitted'),
);

const getBookingNumber = createSelector(
  selectHomePage,
  (state) => state.get('bookingNumber'),
);

const getError = createSelector(
  selectHomePage,
  (state) => state.get('error'),
);

export {
  getDoctors,
  getStatus,
  getIsModalOpen,
  getDoctorSelected,
  getIsSubmitted,
  getBookingNumber,
  getError,
};
