import { createSelector } from 'reselect';

const selectDoctor = (state) => state.get('doctor');

const getIsLoaded = createSelector(
  selectDoctor,
  (state) => state.get('isLoaded'),
);

const getIsModalOpen = createSelector(
  selectDoctor,
  (state) => state.get('isModalOpen'),
);

const getDoctorSelected = createSelector(
  selectDoctor,
  (state) => state.get('doctorSelected'),
);

const getIsSubmitted = createSelector(
  selectDoctor,
  (state) => state.get('isSubmitted'),
);

const getBookingNumber = createSelector(
  selectDoctor,
  (state) => state.get('bookingNumber'),
);

export {
  getIsModalOpen,
  getDoctorSelected,
  getIsSubmitted,
  getBookingNumber,
  getIsLoaded,
};
