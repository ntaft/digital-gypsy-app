import React from 'react';
import './Login.css';

const Login = props => {
  // if (window.location.pathname === '/login') {
    return (
      <div className="login-box">
          <input
            type="text"
            value={props.loginName}
            name="loginName"
            placeholder="username"
            onChange={props.updateAuthForms}
          />
          <input
            type="text"
            value={props.loginPass}
            name="loginPass"
            placeholder="password"
            onChange={props.updateAuthForms}
          />
          <button
            id='login-button'
            onClick={props.handleLogin}
          >
            Log in
          </button>
      </div>
    );
  // }
  // return (<span />);
};

export default Login;
