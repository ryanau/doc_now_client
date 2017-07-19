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
  declineError: {
    id: 'app.components.homepage.declineError',
    defaultMessage: 'Sorry, we cannot obtain your geolocation. Please refresh the page and permit us in obtaining your geolocation.',
  },
  noSupportError: {
    id: 'app.components.homepage.noSupportError',
    defaultMessage: 'Sorry, since your browser does not support geolocation functionality, we are unable to locate your nearby doctors.',
  },
  noDoctors: {
    id: 'app.components.HomePage.noDoctors',
    defaultMessage: 'There are no doctors nearby',
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
