import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [user, setUser] = useState("");

  const HandleRoomChange = (e) => {
    setRoomId(e.target.value);
  };

  const HandleUserChange = (e) => {
    setUser(e.target.value);
  };

  const HandleCreateRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    toast.success("Room Created");
  };

  const joinRoom = (e) => {
    if (!roomId || !user) {
      toast.error("Room Id & Username is required");
      return;
    }
    e.preventDefault();
    navigate(`/editor/${roomId}`, { state: user });
  };

  const HandleInputEnter = (e) => {
    if (e.key === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="App">
      <div className="login-section">
        <h2 className="Login-logo">Code Sync</h2>
        <form className="form-section">
          <label for="room-id">Room Id</label>
          <input
            id="room-id"
            className="input-field"
            type="name"
            placeholder="ROOM ID"
            value={roomId}
            onChange={HandleRoomChange}
          />
          <label for="user">User</label>
          <input
            id="user"
            className="input-field"
            type="name"
            placeholder="USERNAME"
            value={user}
            onKeyUp={HandleInputEnter}
            onChange={HandleUserChange}
          />
          <button type="submit" onClick={joinRoom} className="btn">
            Join
          </button>
          <h4 className="createInfo">
            Create new room &nbsp;
            <span onClick={HandleCreateRoom} className="createNewRoom">
              New Room
            </span>
          </h4>
        </form>
      </div>
    </div>
  );
}

export default Login;
