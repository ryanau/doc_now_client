/**
*
* Modal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Modal as BModal, Button, FormGroup, ControlLabel, HelpBlock, FormControl } from 'react-bootstrap';

import messages from './messages';

const MIN = {
  name: 1,
  phone: 8,
  hkid: 8,
};

class Modal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      hkid: '',
    };
  }
  validate = (type) => {
    const length = this.state[type].length;
    if (length >= MIN[type]) return 'success';
    return 'error';
  }
  handleChange = (type, e) => {
    this.setState({
      [type]: e.target.value,
    });
  }
  handleButtonClicked = () => {
    const { closeModal, isSubmitted, submitBooking, doctor } = this.props;
    if (isSubmitted) {
      closeModal();
    } else {
      submitBooking({ ...this.state, doctor_id: doctor.get('id') });
    }
  }
  renderSubmittedView = () => (
    <section>
      <p><FormattedMessage {...messages.outro} /></p>
      <p><FormattedMessage {...messages.bookingNumber} /> {this.props.bookingNumber}</p>
    </section>
    )
  renderNormalView = () => (
    <form>
      <FormGroup
        controlId="name"
        validationState={this.validate('name')}
      >
        <ControlLabel><FormattedMessage {...messages.name} /></ControlLabel>
        <FormControl
          type="text"
          placeholder="Enter text"
          onChange={(e) => this.handleChange('name', e)}
        />
        <FormControl.Feedback />
        <HelpBlock><FormattedMessage {...messages.required} /></HelpBlock>
      </FormGroup>
      <FormGroup
        controlId="phone"
        validationState={this.validate('phone')}
      >
        <ControlLabel><FormattedMessage {...messages.phone} /></ControlLabel>
        <FormControl
          type="number"
          placeholder="e.g. 31006974"
          onChange={(e) => this.handleChange('phone', e)}
        />
        <FormControl.Feedback />
        <HelpBlock><FormattedMessage {...messages.required} /></HelpBlock>
      </FormGroup>
      <FormGroup
        controlId="hkid"
        validationState={this.validate('hkid')}
      >
        <ControlLabel><FormattedMessage {...messages.hkid} /></ControlLabel>
        <FormControl
          type="text"
          placeholder="e.g. A12345678"
          onChange={(e) => this.handleChange('hkid', e)}
        />
        <FormControl.Feedback />
        <HelpBlock><FormattedMessage {...messages.required} /></HelpBlock>
      </FormGroup>
    </form>
    )
  render() {
    const d = this.props.doctor;
    const buttonText = this.props.isSubmitted ? 'outroButton' : 'reserve';
    return (
      <ModalOverlay>
        <BModal show onHide={this.props.closeModal}>
          <BModal.Header closeButton>
            <BModal.Title>
              {`${d.get('chinese_name')} | ${d.get('english_name')}`}
            </BModal.Title>
          </BModal.Header>
          <BModal.Body>
            {this.props.isSubmitted ? this.renderSubmittedView() : this.renderNormalView()}
          </BModal.Body>
          <BModal.Footer>
            <Button
              onClick={this.handleButtonClicked}
              bsStyle="success"
            >
              <FormattedMessage {...messages[buttonText]} />
            </Button>
          </BModal.Footer>
        </BModal>
      </ModalOverlay>
    );
  }
}

const ModalOverlay = styled.div`
`;

const { object, func, bool, string } = PropTypes;

Modal.propTypes = {
  doctor: object.isRequired,
  closeModal: func.isRequired,
  isSubmitted: bool.isRequired,
  submitBooking: func.isRequired,
  bookingNumber: string,
};

export default Modal;
