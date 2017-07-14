/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Navbar } from 'react-bootstrap';

import initializeMixpanel from 'utils/mixpanel';

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
  };
  componentWillMount() {
    if (process.env.NODE_ENV === 'production' && window.location.protocol === 'http:') {
      window.location.replace('https://www.doctornow.io');
    }
    initializeMixpanel(document, window, process.env.NODE_ENV);
  }
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <span>DoctorNow</span>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}
