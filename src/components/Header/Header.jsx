import React, { Component } from 'react';
import '../Header/Header.css';

class Header extends Component {
render() {
    return (
      <div className="header">
        <div className="header-top">
          <h1>Digital Gypsy</h1>
          <button className="login">Login/Sign Up</button>
        </div>
      </div>
    );
  }
}

export default Header;
