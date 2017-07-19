import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, OverlayTrigger, Popover, Glyphicon } from 'react-bootstrap';

import messages from './messages';

class AllDistricts extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  trackOpen = () => {
    mixpanel.track('all_districts_button_clicked');
  }
  render() {
    const overlay = (
      <Popover id="all-districts" title={<FormattedMessage {...messages.popoverTitle} />}>
        <FormattedMessage {...messages.popoverContent} />
      </Popover>
    );
    return (
      <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={overlay}>
        <Button
          onClick={this.trackOpen}
          bsStyle="link"
        >
          <FormattedMessage {...messages.button} /> <Glyphicon glyph="chevron-right" />
        </Button>
      </OverlayTrigger>
    );
  }
}

AllDistricts.propTypes = {
};

export default AllDistricts;

