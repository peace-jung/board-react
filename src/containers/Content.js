import React from 'react';
import { Post } from 'components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSelectedPostRequest } from '../actions/card';

class Content extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    let cards = this.props.cards;
    let card = cards.filter((e) => {
      return e._id == id;
    });

    this.props.getSelectedPostRequest(id);
  }

  render() {
    return (
      <div className="content">
        { this.props.post ?
          <Post data={ this.props.post } />
          : "404" }
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.card.getCards.cards,
    post: state.card.selectedPost.post
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSelectedPostRequest: (id) => {
      return dispatch(getSelectedPostRequest(id));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Content));