import React from 'react';
import 'SignUp.css'

const SignUp = props => {
  return(
    <div className="signup-box" >
      <form action="/signup" method="POST" >
        <input type="text"
          value=""
          name="user[username]"
          placeholder="username"
        />
        <input type="text"
          value=""
          name="user[email]"
          placeholder="email address"
        />
        <input type="text"
          value=""
          name="user[password]"
          placeholder="password"
        />
        <input
          type="submit"
          name="Sign Up"
        />
      </form>
    </div>
  )
};
