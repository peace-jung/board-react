import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Header, Page404 } from 'components';
import { Home, Login, Register, Content, Write } from 'containers';
import { connect } from 'react-redux';
import { logoutRequest, getStatusRequest } from '../actions/auth';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logoutRequest().then(() => {
      let loginData = {
        isLoggedIn: false,
        username: ""
      }
      document.cookie = "key=" + btoa(JSON.stringify(loginData));
      Materialize.toast("안녕히가세요~", 2000);
    });

  }

  componentDidMount() {
    function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    }

    let loginData = getCookie('key');

    if (typeof loginData === "undefined") return;

    loginData = JSON.parse(atob(loginData));

    if (!loginData.isLoggedIn) return;

    this.props.getStatusRequest()
      .then(() => {
        if (!this.props.status.valid) {
          loginData = {
            isLoggedIn: false,
            username: ''
          };
          document.cookie = "key=" + btoa(JSON.stringify(loginData));
        }
      });
  }

  render() {
    return (
      <div>
        <Header isLoggedIn={ this.props.status.isLoggedIn } onLogout={ this.handleLogout } />
        <div className="container wrapper">
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/home" component={ Home } />
            <Route path="/login" component={ Login } />
            <Route path="/register" component={ Register } />
            <Route exact path="/content/:id" component={ Content } />
            <Route path="/write" component={ Write } />
            <Route component={ Page404 } />
          </Switch>
        </div>
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.auth.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
    logoutRequest: () => {
      return dispatch(logoutRequest());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));