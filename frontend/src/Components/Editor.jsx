import React, { useState, useEffect } from "react";
import Client from "./Client";
import Ide from "./Ide";
import { initSocket } from "../socket";
import toast from "react-hot-toast";
import "./Editor.css";
import { useRef } from "react";
import {
  useLocation,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";

const Editor = () => {
  const reactNavigator = useNavigate();
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const [clients, setClients] = useState([]);
  console.log(clients);
  useEffect(() => {
    const init = async () => {
      // socketRef.current.on("connect_error", (err) => handleErrors(err));
      // socketRef.current.on("connect_failed", (err) => handleErrors(err));

      // function handleErrors(err) {
      //   console.log("socket error: " + err);
      //   toast.error("Socket connection failed, try again later!");
      //   reactNavigator("/");
      // }
      console.log(location.state.username);
      socketRef.current = await initSocket();
      socketRef.current.emit("join", {
        roomId,
        username: location.state?.username,
      });

      socketRef.current.on("joined", ({ clients, username, socketId }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} joined`);
          console.log(`${username} joined`);
        }
        setClients(clients);
      });

      socketRef.current.on("disconnected", ({ socketId, username }) => {
        toast.success(`${username} left room`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();
  }, []);

  if (!location.state) {
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
