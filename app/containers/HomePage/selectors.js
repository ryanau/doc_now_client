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

const getIsLoading = createSelector(
  selectHomePage,
  (state) => state.get('isLoading'),
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

export {
  getDoctors,
  getIsLoading,
  getIsModalOpen,
  getDoctorSelected,
  getIsSubmitted,
  getBookingNumber,
};