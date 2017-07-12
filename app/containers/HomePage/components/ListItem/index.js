import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Label, Glyphicon, Button } from 'react-bootstrap';

import messages from './messages';

class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }
  handleToggleExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  }
  // renderExpanded() {
  //   return (
  //     <Expanded>
  //     </Expanded>
  //   );
  // }
  render() {
    const d = this.props.doctor;
    // const buttonText = this.state.isExpanded ?
    //   'lessInfoButton' :
    //   'moreInfoButton';
    return (
      <ItemWrapper>
        <ListGroupItem>
          <FixedView>
            <Description>
              {d.get('chinese_name')} <Label bsStyle="info"><FormattedMessage {...messages.walk} /> {d.get('walk')} <FormattedMessage {...messages.min} /></Label>
            </Description>
            <Buttons>
              <ButtonGroup>
                <Address>
                  <p><Glyphicon glyph="home" /> {d.get('chinese_address')}</p>
                </Address>
                <Button
                  bsStyle="success"
                  bsSize="small"
                  onClick={() => this.props.openModal(d)}
                >
                  <FormattedMessage {...messages.reserveButton} />
                </Button>
              </ButtonGroup>
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

const Expanded = styled.section`
  padding: 0.6rem;
  border-top: 1px solid #e8ebe9;
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

ListItem.propTypes = {
  doctor: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ListItem;
