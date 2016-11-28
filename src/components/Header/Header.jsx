import React, { Component } from 'react';
import '../Header/Header.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-top">
          <h1>Digital Gypsy</h1>
          <div id="dropdown">
            <ul>
              <li className="detail">
                <button>Login/Sign Up</button>
                <ul>
                  <li><input type="text" placeholder="Username" /></li>
                  <li><input type="password" placeholder="Password" /></li>
                  <li><input type="submit" /></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
