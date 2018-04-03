import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/auth';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleLogin() {
    let id = this.state.username;
    let pw = this.state.password;

    this.props.loginRequest(id, pw)
      .then(() => {
        if (this.props.status === "SUCCESS") {
          let loginData = {
            isLoggedIn: true,
            username: id
          };

          document.cookie = 'key=' + btoa(JSON.stringify(loginData));
          Materialize.toast(id+"님 환영합니다!", 2000);
          this.props.history.push('/home');
          return true;
        } else {
          Materialize.toast("로그인 실패", 2000);
          return false;
        }
      });
  }

  handleKeyPress(e) {
    if (e.charCode == 13) {
      this.handleLogin();
    }
  }

  render() {

    return (
      <div className="auth">
        <Link className="logo brown-text" to="/home">LOGIN</Link>
        <div className="input-field">
          <input name="username" type="text" className="validate"
          onChange={ this.handleChange }
          value={ this.state.username } />
          <label htmlFor="username">User Name</label>
        </div>
        <div className="input-field">
          <input name="password" type="password" className="validate"
          onChange={ this.handleChange }
          value={ this.state.password }
          onKeyPress={ this.handleKeyPress } />
          <label htmlFor="password">Password</label>
        </div>
        <div className="input-field">
          <a className="waves-effect waves-light btn brown"
          onClick={ this.handleLogin }>Login</a>
        </div>
        <div className="input-field">
          <Link className="waves-effect waves-light btn deep-orange" to="/register">Register</Link>
        </div>
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.auth.login.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (id, pw) => {
      return dispatch(loginRequest(id, pw));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));