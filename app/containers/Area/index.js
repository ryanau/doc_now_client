/*
 *
 * Area
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Button, Col } from 'react-bootstrap';
import Uri from 'jsuri';
import styled from 'styled-components';

import makeSelectArea from './selectors';
import messages from './messages';
import areaList from './areaList';

export class Area extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    mixpanel.track('area_page_loaded');
  }
  handleButtonClicked = (area) => {
    const params =
      new Uri()
      .addQueryParam('lat', areaList[area].lat)
      .addQueryParam('lng', areaList[area].lng)
      .addQueryParam('location', area);
    mixpanel.track('area_button_clicked', { area });
    this.props.router.push(`/doctors${params}`);
  }
  renderButtons = () => Object.keys(areaList).map(((area) => (
    <StyledCol key={area} xs={6}>
      <Button
        block
        onClick={() => this.handleButtonClicked(area)}
        bsStyle="info"
      >
        <FormattedMessage {...messages[area]} />
      </Button>
    </StyledCol>
  )))
  render() {
    return (
      <div>
        <Helmet
          title="Area"
          meta={[
            { name: 'description', content: 'Find doctors in your desired area' },
          ]}
        />
        <Container>
          <p><FormattedMessage {...messages.intro} /></p>
          <ButtonsWrapper>
            {this.renderButtons()}
          </ButtonsWrapper>
        </Container>
      </div>
    );
  }
}

const Container = styled.div`
  margin: 0 1rem;
`;

const ButtonsWrapper = styled.section`
  margin-top: 4rem;
`;

const StyledCol = styled(Col)`
  margin-bottom: 1rem;
`;

const { object } = PropTypes;

Area.propTypes = {
  router: object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Area: makeSelectArea(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Area);
