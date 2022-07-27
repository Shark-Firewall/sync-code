import React, { useState } from "react";
import Client from "./Client";
import Ide from "./Ide";
import "./Editor.css";

const Editor = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: "Rajnish K" },
    { socketId: 2, username: "Ankit K" },
  ]);
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
