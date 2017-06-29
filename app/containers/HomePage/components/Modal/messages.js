/*
 * Modal Messages
 *
 * This contains all the text for the Modal component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
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
});
