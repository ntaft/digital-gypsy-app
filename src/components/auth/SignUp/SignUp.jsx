import React from 'react';
import './SignUp.css';

const SignUp = props => (
      <div className="login-box">
        <input
          type="text"
          value={props.signupName}
          name="signupName"
          placeholder="username"
        />
        <input
          type="text"
          value={props.signupPass}
          name="signupPass"
          placeholder="password"
          onChange={() => props.updateAuthForms()}
        />
        <button
          id="signup-button"
          onClick={props.handleSignup}
        />
      </div>
);

export default SignUp;
