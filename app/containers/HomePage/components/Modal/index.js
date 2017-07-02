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

const validate = {
  name: (name) => name.length > 0,
  phone: (phone) => phone.length === 8,
  hkid: (hkid) => !!hkid.match(/^[a-zA-Z]{1}\d{7}$/),
};

const validateFields = ({ name, phone, hkid }) =>
  validate.name(name) && validate.phone(phone) && validate.hkid(hkid);

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
    const value = this.state[type];
    if (validate[type](value)) return 'success';
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
          autoFocus
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
          placeholder="91234567"
          onChange={(e) => this.handleChange('phone', e)}
        />
        <FormControl.Feedback />
        <HelpBlock><FormattedMessage {...messages.phoneWhy} /></HelpBlock>
      </FormGroup>
      <FormGroup
        controlId="hkid"
        validationState={this.validate('hkid')}
      >
        <ControlLabel><FormattedMessage {...messages.hkid} /></ControlLabel>
        <FormControl
          type="text"
          placeholder="A1234567"
          onChange={(e) => this.handleChange('hkid', e)}
        />
        <FormControl.Feedback />
        <HelpBlock><FormattedMessage {...messages.hkidWhy} /></HelpBlock>
      </FormGroup>
    </form>
    )
  render() {
    const { doctor: d, isSubmitted } = this.props;
    const { name, phone, hkid } = this.state;
    const buttonText = isSubmitted ? 'outroButton' : 'reserve';
    const isButtonDisabled = !validateFields({ name, phone, hkid });

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
              disabled={isButtonDisabled}
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
