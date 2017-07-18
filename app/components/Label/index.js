import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Label extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <LabelWrapper>
        {this.props.children}
      </LabelWrapper>
    );
  }
}

const LabelWrapper = styled.div`
  border: 1px solid #777;
  color: #777;
  border-radius: 3px;
  padding: 0.2rem 1rem 0.1rem 0.8rem;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const { node } = PropTypes;

Label.propTypes = {
  children: node.isRequired,
};

export default Label;

