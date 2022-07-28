import React, { useState, useEffect } from "react";
import Client from "./Client";
import Ide from "./Ide";
import { initSocket } from "../socket";
import toast from "react-hot-toast";
import "./Editor.css";
import { useRef } from "react";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";

const Editor = () => {
  const reactNavigator = useNavigate();
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  useEffect(() => {
    const init = async () => {
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(err) {
        console.log("socket error: " + err.message);
        toast.error("Socket connection failed, try again later!");
        reactNavigator("/");
      }
      socketRef.current = await initSocket();
      socketRef.current.emit("join", {
        roomId,
        username: location.state?.username,
      });
    };
    init();
  }, []);
  const [clients, setClients] = useState([
    { socketId: 1, username: "Rajnish K" },
    { socketId: 2, username: "Ankit K" },
  ]);
  if (!location.state.username) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <h1>Code Sync</h1>
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn">Copy ROOM ID</button>
        <button className="btn leaveBtn">Leave</button>
      </div>
      <div className="editorwrap">
        <Ide />
      </div>
    </div>
  );
};

export default Editor;
