/*
 * Welcome Messages
 *
 * This contains all the text for the Welcome component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  intro: {
    id: 'app.components.Welcome.intro',
    defaultMessage: 'Doctornow shows you avaiable doctors nearby',
  },
  bullet1: {
    id: 'app.components.Welcome.bullet1',
    defaultMessage: "You can now reserve a doctor's appointment nearby easily through Doctornow.",
  },
  bullet2: {
    id: 'app.components.Welcome.bullet2',
    defaultMessage: 'Click below to get started now!',
  },
  bullet3: {
    id: 'app.components.Welcome.bullet3',
    defaultMessage: 'Click below to get started now!',
  },
  loadDoctors: {
    id: 'app.components.Welcome.loadDoctors',
    defaultMessage: 'Search for nearby doctors now!',
  },
  buttonReminder: {
    id: 'app.components.Welcome.buttonReminder',
    defaultMessage: 'Your browser will ask for your geolocation. Please accept it so we can obtain your location to find your nearest doctors.',
  },
});

