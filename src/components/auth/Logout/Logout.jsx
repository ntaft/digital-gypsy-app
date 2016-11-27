import React from 'react';
import './Logout.css';

const Logout = props => (
      <div className="login-box">
        <button
          id="logout-button"
          value="Log out"
          onClick={props.handleLogout}
        />
      </div>
);

export default Logout;
