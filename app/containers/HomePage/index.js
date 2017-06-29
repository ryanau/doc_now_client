/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Spinner from 'components/Spinner';
import ListItem from './components/ListItem';
import Modal from './components/Modal';
import messages from './messages';
import {
  loadDoctors,
  openModal,
  closeModal,
  submitBooking,
} from './actions';
import {
  getDoctorSelected,
  getDoctors,
  getIsLoading,
  getIsModalOpen,
  getIsSubmitted,
  getBookingNumber,
} from './selectors';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.storePosition);
  }
  storePosition = (position) => {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;

    const params = { lat: this.lat, lng: this.lng };

    this.props.handleLoadDoctors(params);
  }
  renderDoctors = () => {
    const doctors = this.props.doctors.map((d) => (
      <ListItem
        key={d.get('id')}
        doctor={d}
        openModal={this.props.handleOpenModal}
      />
      ));

    return (
      <div>
        <Intro>
          <h1>Your nearest doctors</h1>
        </Intro>
        <ListGroup>
          {doctors}
        </ListGroup>
      </div>
    );
  }
  renderSpinner() {
    return (
      <Center>
        <Spinner loadingText={<FormattedMessage {...messages.loadingText} />} />
      </Center>
    );
  }
  renderModal = () => {
    const {
      handleCloseModal,
      handleSubmitBooking,
      doctorSelected,
      isSubmitted,
      bookingNumber,
    } = this.props;
    return (
      <Modal
        closeModal={handleCloseModal}
        submitBooking={handleSubmitBooking}
        doctor={doctorSelected}
        isSubmitted={isSubmitted}
        bookingNumber={bookingNumber}
      />
    );
  }
  render() {
    return (
      <Container>
        {this.props.isLoading ? this.renderSpinner() : this.renderDoctors()}
        {this.props.isModalOpen && this.renderModal()}
      </Container>
    );
  }
}

const Intro = styled.div`
  margin-left: 0.2rem;
`;

const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const ListGroup = styled.div`
  display: flex;
  flex: 0 1 auto;
  flex-wrap: wrap;
`;

const Container = styled.section`
  margin: 0 1rem;
`;

const { object, func, bool, string } = PropTypes;

HomePage.propTypes = {
  handleOpenModal: func.isRequired,
  handleCloseModal: func.isRequired,
  handleLoadDoctors: func.isRequired,
  handleSubmitBooking: func.isRequired,
  isLoading: bool.isRequired,
  isModalOpen: bool.isRequired,
  isSubmitted: bool.isRequired,
  doctors: object,
  doctorSelected: object,
  bookingNumber: string,
};

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadDoctors: (params) => dispatch(loadDoctors(params)),
    handleOpenModal: (data) => dispatch(openModal(data)),
    handleCloseModal: () => dispatch(closeModal()),
    handleSubmitBooking: (data) => dispatch(submitBooking(data)),
  };
}

const mapStateToProps = (state) => ({
  doctors: getDoctors(state),
  doctorSelected: getDoctorSelected(state),
  isLoading: getIsLoading(state),
  isModalOpen: getIsModalOpen(state),
  isSubmitted: getIsSubmitted(state),
  bookingNumber: getBookingNumber(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
