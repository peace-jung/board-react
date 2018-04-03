import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { writePostRequest } from '../actions/write';

class Writing extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      contents: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleWrite = this.handleWrite.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleWrite() {
    let title = this.state.title;
    let contents = this.state.contents;

    this.props.writePostRequest(title, contents)
      .then(() => {
        if (this.props.status === "SUCCESS") {
          Materialize.toast("글쓰기 성공", 2000);
          this.props.history.push(`/content/${this.props.post._id}`);
        } else {
          Materialize.toast("실패", 2000);
        }
      });
  }

  render() {
    return (
      <div className="post">
        <div className="section">
          <div className="input-field col s12">
            <input name="title" type="text" className="validate"
              onChange={ this.handleChange }
              value={ this.state.title } />
            <label htmlFor="title">Title</label>
          </div>
          <div className="input-field col s12">
            <textarea name="contents" className="materialize-textarea"
              onChange={ this.handleChange }
              value={ this.state.contents } />
            <label htmlFor="contents">Content</label>
          </div>
          <div className="input-field">
            <a className="waves-effect waves-light btn brown"
            onClick={ this.handleWrite }>Upload</a>
          </div>
        </div>
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.write.write.status,
    post: state.write.write.post
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    writePostRequest: (id, pw) => {
      return dispatch(writePostRequest(id, pw));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Writing));