import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {

    const loggedIn = (
      <div className="nav-wrapper brown darken-1">
        <Link to="/home" className="brand-logo">QnA Board</Link>
        <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/write">글쓰기</Link></li>
          <li><a onClick={this.props.onLogout}>로그아웃</a></li>
        </ul>
        <ul className="side-nav" id="mobile-demo">
          <li><Link to="/write">글쓰기</Link></li>
          <li><a onClick={this.props.onLogout}>로그아웃</a></li>
        </ul>
      </div>
    );

    const loggedOut = (
      <div className="nav-wrapper brown darken-1">
        <Link to="/home" className="brand-logo">QnA Board</Link>
        <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/login">로그인</Link></li>
        </ul>
        <ul className="side-nav" id="mobile-demo">
          <li><Link to="/login">로그인</Link></li>
        </ul>
      </div>
    );

    return (
      <nav>
        {this.props.isLoggedIn ? loggedIn : loggedOut}
      </nav>
    );
  }
}

Header.defaultProps = {
  isLoggedIn: false
};

export default Header;