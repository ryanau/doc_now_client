/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.HomePage.header',
    defaultMessage: 'Your nearest doctors',
  },
  fetchingText: {
    id: 'app.components.HomePage.fetchingText',
    defaultMessage: 'Finding nearby doctors...',
  },
  locatingText: {
    id: 'app.components.HomePage.locatingText',
    defaultMessage: 'We need your location to find nearby doctors.',
  },
  loadDoctors: {
    id: 'app.components.HomePage.loadDoctors',
    defaultMessage: 'Search for nearby doctors now!',
  },
  errorText: {
    id: 'app.components.HomePage.errorText',
    defaultMessage: 'We cannot obtain your geolocation, please try again.',
  },
  intro: {
    id: 'app.components.HomePage.intro',
    defaultMessage: "You can now reserve a doctor's appointment nearby easily through Doctornow.",
  },
  intro2: {
    id: 'app.components.HomePage.intro2',
    defaultMessage: 'Click below to get started now!',
  },
  english: {
    id: 'app.components.HomePage.english',
    defaultMessage: 'En',
  },
  traditional: {
    id: 'app.components.HomePage.traditional',
    defaultMessage: '繁',
  },
  simplified: {
    id: 'app.components.HomePage.simplified',
    defaultMessage: '简',
  },
});
