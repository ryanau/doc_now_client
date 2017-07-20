import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Glyphicon, Jumbotron, Button } from 'react-bootstrap';
import Experiment from 'react-ab-test/lib/Experiment';
import Variant from 'react-ab-test/lib/Variant';
import emitter from 'react-ab-test/lib/emitter';

import messages from './messages';

class Welcome extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleLoadButtonClicked = () => {
    emitter.emitWin('load_html_geolocation');
    this.props.loadGeo();
  }
  render() {
    return (
      <Container>
        <Blurb>
          <FormattedMessage {...messages.intro} />
        </Blurb>
        <StyledJumbotron>
          <p><Glyphicon glyph="ok" /> <FormattedMessage {...messages.bullet1} /></p>
          <p><Glyphicon glyph="ok" /> <FormattedMessage {...messages.bullet2} /></p>
          <p className="u-m--n"><Glyphicon glyph="ok" /> <FormattedMessage {...messages.bullet3} /></p>
        </StyledJumbotron>
        <CallToAction>
          <Experiment name="load_html_geolocation">
            <Variant name="search_now">
              <Button
                onClick={this.handleLoadButtonClicked}
                bsStyle="info"
                bsSize="large"
              >
                <FormattedMessage {...messages.loadDoctors} /> <Glyphicon glyph="screenshot" />
              </Button>
            </Variant>
            <Variant name="use_my_location_to_search">
              <Button
                onClick={this.handleLoadButtonClicked}
                bsStyle="info"
                bsSize="large"
              >
                <FormattedMessage {...messages.useMyLocation} /> <Glyphicon glyph="screenshot" />
              </Button>
            </Variant>
          </Experiment>
          <ButtonReminder>
            <p><FormattedMessage {...messages.buttonReminder} /></p>
          </ButtonReminder>
        </CallToAction>
      </Container>
    );
  }
}

const CallToAction = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 75px);
`;

const ButtonReminder = styled.section`
  text-align: center;
  margin-top: 1rem;
`;

const Blurb = styled.section`
  font-size: 16px;
  margin-top: 1rem;
`;

const StyledJumbotron = styled(Jumbotron)`
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 5px;
`;

const { func } = PropTypes;

Welcome.propTypes = {
  loadGeo: func.isRequired,
};

export default Welcome;

