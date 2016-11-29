import React, { Component } from 'react';
import '../Header/Header.css';

const Header = props => (
  <div className="header">
    <div className="header-top">
      <div id="logo-container">
        <div id="plane">
          <img className="plane-image" src="http://i.imgur.com/gwGHVJE.png" alt=""/>
        </div>
        <h1>Digital Gypsy</h1>
      </div>
      <div id="button-holder">
        <div id="dropdown">
          <ul>
            <li className="detail">
              <button className="login-buttons">Sign Up</button>
              <ul>
                <li>
                  <input
                    type="text"
                    value={props.signupName}
                    name="signupName"
                    placeholder="Username"
                    onChange={props.updateAuthForms}
                  />
                </li>
                <li>
                  <input
                    type="text"
                    value={props.signupPass}
                    name="signupPass"
                    placeholder="Password"
                    onChange={props.updateAuthForms}
                  />
                </li>
                <button
                  id="signup-button"
                  onClick={props.handleSignup}
                >
                  Sign up!
                </button>
              </ul>
            </li>
          </ul>
        </div>
        <div id="dropdown">
          <ul>
            <li className="detail">
              <button className="login-buttons">Login</button>
              <ul>
                <li>
                  <input
                      type="text"
                      value={props.loginName}
                      name="loginName"
                      placeholder="Username"
                      onChange={props.updateAuthForms}
                    />
                </li>
                <li>
                  <input
                    type="text"
                    value={props.loginPass}
                    name="loginPass"
                    placeholder="Password"
                    onChange={props.updateAuthForms}
                  />
                </li>
                <li>
                  <button
                    id="login-button"
                    onClick={props.handleLogin}
                  >
                    Log in!
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div id="dropdown">
          <button className="login-buttons"
            id="logout-button"
            value="Log out"
            onClick={props.handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
