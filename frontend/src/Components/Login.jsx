import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="App">
      <div className="login-section">
        <h2 className="Login-logo">Code Sync</h2>
        <form className="form-section">
          <label for="user">User</label>
          <input
            id="user"
            className="input-field"
            type="name"
            placeholder="Enter your Name"
            name="name"
          />
          <label for="room-id">Room Id</label>
          <input
            id="room-id"
            className="input-field"
            type="name"
            placeholder="Enter your Room Id"
            name="name"
          />
          <button type="submit" className="btn-1">
            Join
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
