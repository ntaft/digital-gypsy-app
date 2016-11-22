import React from 'react';
import 'Login.css';

const Login = props => {
  return(

    <div className="login-box">
      <form action="/signin" method="POST">
        <input type="text"
          value=""
          name="username"
          placeholder="username"
        />
        <input type="text"
          value=""
          name="password"
          placeholder="password"
        />
      </form>
    </div>
  )
};
