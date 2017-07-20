/**
*
* Modal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Modal as BModal, Button } from 'react-bootstrap';
import InputMask from 'react-input-mask';

import messages from './messages';

const validate = {
  name: (name) => name.length > 0,
  phone: (phone) => !!phone.match(/^\+{1}\d{3}\s{1}\d{4}-\d{4}$/),
  hkid: (hkid) => !!hkid.match(/^[a-zA-Z]{1}\d{6}\(\d{1}\)$/),
};

const validateFields = ({ name, phone }) =>
  validate.name(name) && validate.phone(phone);

class Modal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      hkid: '',
    };
  }
  handleKeydown = (e) => {
    const { name, phone } = this.state;
    const { submitBooking, doctor } = this.props;

    if (e.which === 13 && validateFields({ name, phone })) {
      submitBooking({ ...this.state, doctor_id: doctor.get('id') });
    }
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
      mixpanel.track('booking_submitted');
      submitBooking({ ...this.state, doctor_id: doctor.get('id') });
    }
  }
  handleModalHide = () => {
    mixpanel.track('doctor_modal_closed');
    this.props.closeModal();
  }
  renderSubmittedView = () => (
    <section>
      <p><FormattedMessage {...messages.outro} /></p>
      <p><FormattedMessage {...messages.bookingNumber} /> {this.props.bookingNumber}</p>
    </section>
  )
  renderNormalView = () => (
    <Form>
      <p><FormattedMessage {...messages.intro} /></p>
      <InputGroup>
        <label htmlFor="modal__input--name"><FormattedMessage {...messages.name} /></label>
        <Input
          autoFocus
          type="text"
          id="modal__input--name"
          onChange={(e) => this.handleChange('name', e)}
          onKeyDown={this.handleKeydown}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="modal__input--phone"><FormattedMessage {...messages.phone} /></label>
        <StyledInput
          alwaysShowMask
          id="modal__input--phone"
          mask="+852 9999-9999"
          onChange={(e) => this.handleChange('phone', e)}
          onKeyDown={this.handleKeydown}
        />
        <Why><FormattedMessage {...messages.phoneWhy} /></Why>
      </InputGroup>
      <InputGroup>
        <label htmlFor="modal__input--hkid"><FormattedMessage {...messages.hkid} /></label>
        <StyledInput
          alwaysShowMask
          id="modal__input--hkid"
          mask="a999999(9)"
          onChange={(e) => this.handleChange('hkid', e)}
          onKeyDown={this.handleKeydown}
        />
        <Why><FormattedMessage {...messages.hkidWhy} /></Why>
      </InputGroup>
    </Form>
  );
  render() {
    const { doctor: d, isSubmitted } = this.props;
    const { name, phone, hkid } = this.state;
    const buttonText = isSubmitted ? 'outroButton' : 'reserve';
    const isButtonDisabled = !validateFields({ name, phone, hkid });

    return (
      <div>
        <BModal show onHide={this.handleModalHide}>
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
              bsStyle="info"
              disabled={isButtonDisabled}
            >
              <FormattedMessage {...messages[buttonText]} />
            </Button>
          </BModal.Footer>
        </BModal>
      </div>
    );
  }
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const Input = styled.input`
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledInput = styled(InputMask)`
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Why = styled.p`
  margin-top: 0.5rem;
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
