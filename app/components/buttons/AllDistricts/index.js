import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Glyphicon } from 'react-bootstrap';

import messages from './messages';

class AllDistricts extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleButtonClicked = () => {
    mixpanel.track('all_districts_button_clicked');
    this.props.router.push('/areas');
  }
  render() {
    return (
      <Button
        onClick={this.handleButtonClicked}
        bsStyle="link"
      >
        <FormattedMessage {...messages.button} /> <Glyphicon glyph="chevron-right" />
      </Button>
    );
  }
}

const { object } = PropTypes;

AllDistricts.propTypes = {
  router: object.isRequired,
};

export default AllDistricts;

