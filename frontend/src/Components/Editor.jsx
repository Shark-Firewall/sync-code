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
  useNavigate,
  useParams,
} from "react-router-dom";

const Editor = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const reactNavigator = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();
  const [clients, setClients] = useState([]);
  useEffect(() => {
    const init = async () => {
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
        socketRef.current.emit("code_sync", {
          code: codeRef.current,
          socketId,
        });
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

  const copyHandler = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("RoomId copy successfully");
    } catch (e) {
      toast.error("Error While coping Clipboard");
    }
  };

  const leaveHandler = () => {
    reactNavigator("/");
  };

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
        <button className="btn copyBtn" onClick={copyHandler}>
          Copy ROOM ID
        </button>
        <button className="btn leaveBtn" onClick={leaveHandler}>
          Leave
        </button>
      </div>
      <div className="editorwrap">
        <Ide
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
