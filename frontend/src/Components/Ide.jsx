import React from "react";
import { useState, useEffect } from "react";
import "./Ide.css";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

const Ide = () => {
  const [currentLang, setCurrentLang] = useState("");

  const HandleLangChane = (e) => {
    setCurrentLang(e.target.value);
  };

  useEffect(() => {
    async function init() {
      CodeMirror.fromTextArea(document.getElementById("ide"), {
        mode: { name: "javascript", json: true },
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      });
    }
    init();
  }, []);

  return (
    <>
      <header>
        <form>
          <select
            className="langSelect"
            onChange={HandleLangChane}
            value={currentLang}
          >
            <option value="Javascript">JavaScript</option>
            <option value="C++">C++</option>
            <option value="Python">Python</option>
          </select>
        </form>
      </header>
      <textarea id="ide"></textarea>
    </>
  );
};

export default Ide;
