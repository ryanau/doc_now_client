/*
 * Doctor Messages
 *
 * This contains all the text for the Doctor component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  doctors: {
    id: 'app.components.Doctor.doctors',
    defaultMessage: 'Your nearest doctors',
  },
  noDoctors: {
    id: 'app.components.Doctor.noDoctors',
    defaultMessage: 'Sorry. There is not doctor in your selected area.',
  },
});
