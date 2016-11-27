import React from 'react';
import './Login.css';

const Login = props => {
  // if (window.location.pathname === '/login') {
    return (
      <div className="login-box">
        <form action="/login" method="POST">
          <input
            type="text"
            value={props.loginName}
            name="loginName"
            placeholder="username"
          />
          <input
            type="text"
            value={props.loginPass}
            name="loginPass"
            placeholder="password"
            onChange={() => props.updateAuthForms()}
          />
          <button
            id='login-button'
            onClick={props.handleLogin}
          />
        </form>
      </div>
    );
  // }
  // return (<span />);
};

export default Login;
