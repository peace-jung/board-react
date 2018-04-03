import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { writeCommentRequest } from '../actions/comment';
import { getSelectedPostRequest } from '../actions/card';

class CommentWrite extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      wcomment: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleWriteComment = this.handleWriteComment.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleWriteComment() {
    let comment = this.state.wcomment;
    let id = this.props.post._id;

    this.props.writeCommentRequest(id, comment)
      .then(() => {
        if (this.props.status === "SUCCESS") {
          Materialize.toast("댓글이 작성되었습니다.", 2000);
          this.props.getSelectedPostRequest(id); // 글 다시 불러오기
          this.setState({
            wcomment: ""
          });
        } else {
          Materialize.toast("댓글 작성 실패", 2000);
        }
      });
  }

  render() {

    return (
      <div className="row comment">
        <form className="col m12 s12">
          <div className="wcomment">
            <div className="input-field col m10 s12">
              <i className="material-icons prefix">textsms</i>
              <textarea name="wcomment" className="materialize-textarea"
              onChange={ this.handleChange }
              value={ this.state.wcomment }></textarea>
              <label htmlFor="wcomment">Write Comment</label>
            </div>
            <div className="wcomment col m2 s12">
              <a className="waves-effect waves-light btn brown"
              onClick={ this.handleWriteComment }>Upload</a>
            </div>
          </div>
        </form>
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.comment.comment.status,
    post: state.card.selectedPost.post
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    writeCommentRequest: (id, comment) => {
      return dispatch(writeCommentRequest(id, comment));
    },
    getSelectedPostRequest: (id) => {
      return dispatch(getSelectedPostRequest(id));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentWrite));