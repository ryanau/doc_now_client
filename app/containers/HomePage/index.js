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
import { Alert } from 'react-bootstrap';

import Spinner from 'components/Spinner';
import AllDistricts from 'components/buttons/AllDistricts';
import ListItem from './components/ListItem';
import Modal from './components/Modal';
import Welcome from './components/Welcome';
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
  componentDidMount() {
    mixpanel.track('home_page_landed');
  }
  storePosition = (position) => {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;

    const params = { lat: this.lat, lng: this.lng };

    this.props.handleLoadDoctors(params);
  }
  loadGeo = () => {
    const { triggerChangeStatus, triggerDisplayError } = this.props;
    const geoError = () => {
      mixpanel.track('user_declined_geo');
      triggerDisplayError('declineError');
    };
    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.storePosition, geoError, geoOptions);
    } else {
      mixpanel.track('browser_no_geo_support');
      return triggerDisplayError('noSupportError');
    }
    return triggerChangeStatus(LOCATING);
  }
  renderDoctors = () => {
    const { doctors, handleOpenModal } = this.props;
    let doctorsList;
    if (doctors.size === 0) {
      doctorsList = (
        <StyledAlert bsStyle="info">
          <FormattedMessage {...messages.noDoctors} />
        </StyledAlert>
      );
    } else {
      doctorsList = doctors.map((d) => (
        <ListItem
          key={d.get('id')}
          doctor={d}
          openModal={handleOpenModal}
        />
      ));
    }
    return (
      <div>
        <Intro>
          <FormattedMessage {...messages.header} /> <AllDistricts />
        </Intro>
        <ListGroup>
          {doctorsList}
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
  renderError = (type) => (
    <Alert bsStyle="danger">
      <FormattedMessage {...messages[type]} />
    </Alert>
    )
  renderWelcome = () => <Welcome loadGeo={this.loadGeo} />;
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

const Intro = styled.div`
  font-size: 20px;
  margin-left: 0.2rem;
  margin-bottom: 0.6rem;
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
  height: calc(100vh - 75px);
`;

const StyledAlert = styled(Alert)`
  width: 100%;
`;

const { object, func, bool, string } = PropTypes;

HomePage.propTypes = {
  handleOpenModal: func.isRequired,
  handleCloseModal: func.isRequired,
  handleLoadDoctors: func.isRequired,
  handleSubmitBooking: func.isRequired,
  triggerChangeStatus: func.isRequired,
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
  error: getError(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
