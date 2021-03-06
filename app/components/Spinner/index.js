import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import messages from './messages';

class Spinner extends React.PureComponent {
  static defaultProps = {
    loadingText: <FormattedMessage {...messages.loading} />,
  }
  render() {
    return (
      <Center>
        <svg width="120px" height="120px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="uil-ripple">
          <rect x="0" y="0" width="100" height="100" fill="none" className="bk"></rect>
          <g>
            <animate attributeName="opacity" dur="2s" repeatCount="indefinite" begin="-1s" keyTimes="0;0.33;1" values="1;1;0"></animate>
            <circle cx="50" cy="50" r="40" stroke="#afafb7" fill="none" strokeWidth="6" strokeLinecap="round">
              <animate attributeName="r" dur="2s" repeatCount="indefinite" begin="-1s" keyTimes="0;0.33;1" values="0;22;44"></animate>
            </circle>
          </g>
          <g>
            <animate attributeName="opacity" dur="2s" repeatCount="indefinite" begin="0s" keyTimes="0;0.33;1" values="1;1;0"></animate>
            <circle cx="50" cy="50" r="40" stroke="#5bc0de" fill="none" strokeWidth="6" strokeLinecap="round">
              <animate attributeName="r" dur="2s" repeatCount="indefinite" begin="0s" keyTimes="0;0.33;1" values="0;22;44"></animate>
            </circle>
          </g>
        </svg>
        <p>{this.props.loadingText}</p>
      </Center>
    );
  }
}

const Center = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

Spinner.propTypes = {
  loadingText: PropTypes.element,
};

export default Spinner;
