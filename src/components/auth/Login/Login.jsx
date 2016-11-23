import React from 'react';
import './Login.css';

const Login = props => {
  if (window.location.pathname === '/login') {
    return (

      <div className="login-box">
        <form action="/login" method="POST">
          <input
            type="text"
            value=""
            name="user[username]"
            placeholder="username"
          />
          <input
            type="text"
            value=""
            name="user[password]"
            placeholder="password"
          />
          <input
            type="submit"
            name="Login"
          />
        </form>
      </div>
    );
  }
  return (<span />);
};

export default Login;
