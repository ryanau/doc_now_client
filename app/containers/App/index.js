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
import styled from 'styled-components';

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
  };
  componentWillMount() {
    if (process.env.NODE_ENV === 'production' && window.location.protocol === 'http:') {
      window.location.replace('https://www.doctornow.io');
    }
  }
  render() {
    return (
      <div>
        <Navbar>
          <Brand>
            <span>DoctorNow</span>
          </Brand>
        </Navbar>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

const Brand = styled.div`
  text-align: center;
  font-size: 26px;
  letter-spacing: -0.5px;
  color: #31b0d5;
  margin-top: 0.75rem;
`;
