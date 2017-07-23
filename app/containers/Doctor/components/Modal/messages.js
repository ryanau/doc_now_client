/*
 * Modal Messages
 *
 * This contains all the text for the Modal component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  intro: {
    id: 'app.components.Modal.intro',
    defaultMessage: 'Please fill in the following form. The information provided will only be used for reservation purposes only.',
  },
  reserve: {
    id: 'app.components.Modal.reserve',
    defaultMessage: 'Submit Booking',
  },
  required: {
    id: 'app.components.Modal.required',
    defaultMessage: 'Required',
  },
  outroButton: {
    id: 'app.components.Modal.outroButton',
    defaultMessage: 'Got it',
  },
  name: {
    id: 'app.components.Modal.name',
    defaultMessage: 'Name',
  },
  phone: {
    id: 'app.components.Modal.phone',
    defaultMessage: 'Phone',
  },
  hkid: {
    id: 'app.components.Modal.hkid',
    defaultMessage: 'HKID',
  },
  outro: {
    id: 'app.components.Modal.outro',
    defaultMessage: 'Booking submitted! Please wait for a confirmation text message to complete the booking process.',
  },
  bookingNumber: {
    id: 'app.components.Modal.bookingNumber',
    defaultMessage: 'Booking number:',
  },
  hkidWhy: {
    id: 'app.components.Modal.hkidWhy',
    defaultMessage: 'Clinics need this for verfication purposes',
  },
  phoneWhy: {
    id: 'app.components.Modal.phoneWhy',
    defaultMessage: "We'll send you a SMS to complete the booking",
  },
});
