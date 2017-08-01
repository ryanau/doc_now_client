import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Glyphicon, Button } from 'react-bootstrap';
import Experiment from 'react-ab-test/lib/Experiment';
import Variant from 'react-ab-test/lib/Variant';
import emitter from 'react-ab-test/lib/emitter';

import messages from './messages';

class ListItem extends React.PureComponent {
  handleButtonClicked = (d) => {
    emitter.emitWin('book_button_clicked');
    this.props.openModal(d);
  }
  render() {
    const d = this.props.doctor;
    return (
      <ItemWrapper>
        <ListGroupItem>
          <FixedView>
            <Description>
              {d.chinese_name}
            </Description>
            <Buttons>
              <InfoGroup>
                <Address>
                  <p><Glyphicon glyph="home" /> {d.chinese_address}</p>
                  <p><Glyphicon glyph="ok" /> {d.specialty}</p>
                </Address>
                <Experiment name="book_button_clicked">
                  <Variant name="next_step">
                    <Button
                      bsStyle="info"
                      bsSize="small"
                      onClick={() => this.handleButtonClicked(d)}
                    >
                      <FormattedMessage {...messages.nextStep} />
                    </Button>
                  </Variant>
                  <Variant name="book">
                    <Button
                      bsStyle="info"
                      bsSize="small"
                      onClick={() => this.handleButtonClicked(d)}
                    >
                      <FormattedMessage {...messages.book} />
                    </Button>
                  </Variant>
                </Experiment>
              </InfoGroup>
            </Buttons>
          </FixedView>
        </ListGroupItem>
      </ItemWrapper>
    );
  }
}

const Address = styled.div`
  margin-right: 2rem;
`;

const Description = styled.section`
  padding: 0.6rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
`;

const Buttons = styled.section`
  padding: 0.6rem;
  border-top: 1px solid #e8ebe9;
`;

const ItemWrapper = styled.div`
  width: 100%;
  padding: 0 0.2rem;
  margin-bottom: 0.6rem;
`;

const ListGroupItem = styled.div`
  border: 1px solid #e8ebe9;
  border-radius: 5px;
  background-color: white;
`;

const FixedView = styled.div`
`;

const InfoGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

ListItem.propTypes = {
  doctor: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ListItem;
