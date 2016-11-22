import React from 'react';
import 'SignUp.css'

const SignUp = props => {
  return(
    <div className="signup-box">
      <form action="submit">
        <input type="text"
          value=""
          name="username"
          placeholder="username"
        />
        <input type="text"
          value=""
          name="email"
          placeholder="email address"
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
