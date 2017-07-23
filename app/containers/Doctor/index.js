/*
 *
 * Doctor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import Uri from 'jsuri';
import styled from 'styled-components';
import { Alert } from 'react-bootstrap';

import { getDoctors } from 'entities/doctors/selectors';
import { loadDoctors, resetDoctors } from 'entities/doctors/actions';
import areaMessages from 'containers/Area/messages';
import AllDistricts from 'components/buttons/AllDistricts';
import Spinner from 'components/Spinner';
import messages from './messages';
import ListItem from './components/ListItem';
import Modal from './components/Modal';
import { openModal, closeModal, submitBooking } from './actions';
import {
  getDoctorSelected,
  getIsModalOpen,
  getIsSubmitted,
  getBookingNumber,
  getIsLoaded,
} from './selectors';

export class Doctor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const uri = new Uri(window.location);
    this.state = {
      location: uri.getQueryParamValue('location'),
    };
  }
  componentWillMount() {
    const uri = new Uri(window.location);
    const params = {
      lat: uri.getQueryParamValue('lat'),
      lng: uri.getQueryParamValue('lng'),
    };
    this.props.handleLoadDoctors(params);
  }
  componentWillUnmount() {
    this.props.handleResetDoctors();
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
  renderDoctors = () => {
    const { doctors, handleOpenModal, router } = this.props;
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
          key={d.id}
          doctor={d}
          openModal={handleOpenModal}
        />
      ));
    }
    return (
      <div>
        <Intro>
          <FormattedMessage {...areaMessages[this.state.location]} />
          <FormattedMessage {...messages.doctors} />
          <AllDistricts router={router} />
        </Intro>
        <ListGroup>
          {doctorsList}
        </ListGroup>
      </div>
    );
  }
  renderSpinner() {
    return (
      <Spinner />
    );
  }
  render() {
    const { isModalOpen, isLoaded } = this.props;
    return (
      <div>
        <Helmet
          title="Doctor"
          meta={[
            { name: 'description', content: 'List of doctors in the area' },
          ]}
        />
        <Container>
          {isLoaded && this.renderDoctors()}
          {isModalOpen && this.renderModal()}
          {!isLoaded && this.renderSpinner()}
        </Container>
      </div>
    );
  }
}

const ListGroup = styled.div`
  display: flex;
  flex: 0 1 auto;
  flex-wrap: wrap;
`;

const StyledAlert = styled(Alert)`
  width: 100%;
`;

const Intro = styled.div`
  font-size: 20px;
  margin-left: 0.2rem;
  margin-bottom: 0.6rem;
`;

const Container = styled.section`
  margin: 0 1rem;
  height: calc(100vh - 75px);
`;

const { object, func, bool, string } = PropTypes;

Doctor.propTypes = {
  handleOpenModal: func.isRequired,
  handleCloseModal: func.isRequired,
  handleLoadDoctors: func.isRequired,
  handleSubmitBooking: func.isRequired,
  handleResetDoctors: func.isRequired,
  isModalOpen: bool.isRequired,
  isSubmitted: bool.isRequired,
  doctors: object,
  doctorSelected: object,
  bookingNumber: string,
  isLoaded: bool.isRequired,
  router: object.isRequired,
};

const mapStateToProps = (state) => ({
  doctors: getDoctors(state),
  doctorSelected: getDoctorSelected(state),
  isModalOpen: getIsModalOpen(state),
  isSubmitted: getIsSubmitted(state),
  bookingNumber: getBookingNumber(state),
  isLoaded: getIsLoaded(state),
});

function mapDispatchToProps(dispatch) {
  return {
    handleLoadDoctors: (params) => dispatch(loadDoctors(params)),
    handleResetDoctors: (params) => dispatch(resetDoctors(params)),
    handleOpenModal: (data) => dispatch(openModal(data)),
    handleCloseModal: () => dispatch(closeModal()),
    handleSubmitBooking: (data) => dispatch(submitBooking(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
