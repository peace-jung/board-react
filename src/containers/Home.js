import React from 'react';
import { CardList } from 'components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCardsRequest } from '../actions/card';

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCardsRequest().then(() => {
      if (this.props.status === "SUCCESS") {
        console.log("SUCCESS");
      } else {
        console.log("FAILURE");
      }
    });
  }

  render() {
    return (
      <div>
        <CardList data={ this.props.cards } />
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.card.getCards.status,
    cards: state.card.getCards.cards
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCardsRequest: () => {
      return dispatch(getCardsRequest());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));