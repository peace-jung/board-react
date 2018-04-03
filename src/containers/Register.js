import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerRequest } from '../actions/auth';

class Register extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleRegister() {
    let id = this.state.username;
    let pw = this.state.password;

    this.props.registerRequest(id, pw).then(() => {
        if (this.props.status === "SUCCESS") {
          Materialize.toast("회원가입을 축하합니다!!", 2000);
          this.props.history.push('/login');
          return true;
        } else {
          Materialize.toast("회원가입 실패: this.props.errorCode - 1", 2000);
          return false;
        }
      });
  }

  handleKeyPress(e) {
    if (e.charCode == 13) {
      this.handleRegister();
    }
  }

  render() {

    return (
      <div className="auth">
        <Link className="logo brown-text" to="/home">REGISTER</Link>
        <div className="input-field">
          <input name="username" type="text" className="validate"           onChange={ this.handleChange }
          value={ this.state.username }/>
          <label htmlFor="username">User Name</label>
        </div>
        <div className="input-field">
          <input name="password" type="password" className="validate"           onChange={ this.handleChange }
          value={ this.state.password }
          onKeyPress={ this.handleKeyPress } />
          <label htmlFor="password">Password</label>
        </div>
        <div className="input-field">
          <a className="waves-effect waves-light btn brown"
          onClick={this.handleRegister}>Register</a>
        </div>
        <div className="input-field">
          <Link className="waves-effect waves-light btn deep-orange" to="/login">Login</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.auth.register.status,
    errorCode: state.auth.register.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerRequest: (id, pw) => {
      return dispatch(registerRequest(id, pw));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));