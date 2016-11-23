import React from 'react';
import 'Login.css';

const Login = props => {
  return(

    <div className="login-box">
      <form action="/signin" method="POST">
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
};
