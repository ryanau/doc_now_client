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
import { Glyphicon, Jumbotron, Alert, Button } from 'react-bootstrap';

import { changeLocale } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import Spinner from 'components/Spinner';
import ListItem from './components/ListItem';
import Modal from './components/Modal';
import messages from './messages';
import {
  loadDoctors,
  openModal,
  closeModal,
  submitBooking,
  changeStatus,
  displayError,
} from './actions';
import {
  getDoctorSelected,
  getDoctors,
  getStatus,
  getIsModalOpen,
  getIsSubmitted,
  getBookingNumber,
  getError,
} from './selectors';
import {
  INITIAL,
  LOCATING,
  FETCHING,
  LOADED,
} from './constants';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  storePosition = (position) => {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;

    const params = { lat: this.lat, lng: this.lng };

    this.props.handleLoadDoctors(params);
  }
  loadGeo = () => {
    const { triggerChangeStatus, triggerDisplayError } = this.props;
    const geoError = () => triggerDisplayError('declineError');
    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.storePosition, geoError, geoOptions);
    } else {
      return triggerDisplayError('noSupportError');
    }
    return triggerChangeStatus(LOCATING);
  }
  handleChangeLocale = (locale) => {
    this.props.triggerChangeLocale(locale);
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
          <h1><FormattedMessage {...messages.header} /></h1>
        </Intro>
        <ListGroup>
          {doctors}
        </ListGroup>
      </div>
    );
  }
  renderSpinner(text) {
    return (
      <Center>
        <Spinner loadingText={<FormattedMessage {...messages[text]} />} />
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
  renderWelcome = () => (
    <div>
      <StyledJumbotron>
        <p>
          <FormattedMessage {...messages.intro} />
        </p>
        <Button
          onClick={this.loadGeo}
          bsStyle="success"
        >
          <FormattedMessage {...messages.loadDoctors} /> <Glyphicon glyph="screenshot" />
        </Button>
      </StyledJumbotron>
    </div>
    )
  renderError = (type) => (
    <Alert bsStyle="danger">
      <FormattedMessage {...messages[type]} />
    </Alert>
    )
  render() {
    const { error, status, isModalOpen } = this.props;
    const toRender = () => {
      switch (status) {
        case INITIAL: {
          return this.renderWelcome();
        }
        case LOCATING: {
          return this.renderSpinner('locatingText');
        }
        case FETCHING: {
          return this.renderSpinner('fetchingText');
        }
        case LOADED: {
          return this.renderDoctors();
        }
        default: {
          return null;
        }
      }
    };
    return (
      <Container>
        {error && this.renderError(error)}
        {!error && toRender()}
        {isModalOpen && this.renderModal()}
      </Container>
    );
  }
}

const StyledJumbotron = styled(Jumbotron)`
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 5px;
`;

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
  triggerChangeStatus: func.isRequired,
  triggerChangeLocale: func.isRequired,
  triggerDisplayError: func.isRequired,
  status: string.isRequired,
  isModalOpen: bool.isRequired,
  isSubmitted: bool.isRequired,
  error: string,
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
    triggerChangeStatus: (data) => dispatch(changeStatus(data)),
    triggerChangeLocale: (data) => dispatch(changeLocale(data)),
    triggerDisplayError: (error) => dispatch(displayError(error)),
  };
}

const mapStateToProps = (state) => ({
  doctors: getDoctors(state),
  doctorSelected: getDoctorSelected(state),
  status: getStatus(state),
  isModalOpen: getIsModalOpen(state),
  isSubmitted: getIsSubmitted(state),
  bookingNumber: getBookingNumber(state),
  locale: makeSelectLocale(state),
  error: getError(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
