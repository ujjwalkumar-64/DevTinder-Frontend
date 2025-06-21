import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as monaco from "monaco-editor";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const SandboxCollaborative = () => {
  const { roomId } = useParams(); 
  const editorRef = useRef(null);
  const editorDivRef = useRef(null);
  const socketRef = useRef(null);

  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isEditorReady, setIsEditorReady] = useState(false);

  const user = useSelector((store) => store.user);
  const username = user?.firstName || "Anonymous";

  useEffect(() => {
    if (!editorDivRef.current) return;

    editorRef.current = monaco.editor.create(editorDivRef.current, {
      value: "// Write your code here...",
      language,
      theme: "vs-dark",
      automaticLayout: true,
    });
    setIsEditorReady(true);

    const socket = createSocketConnection();
    socketRef.current = socket;
    socket.emit("joinCodeRoom", { roomId, username });

    socket.on("contentChanged", (data) => {
      if (editorRef.current && editorRef.current.getValue() !== data.content) {
        editorRef.current.setValue(data.content);
      }
    });

    socket.on("codeOutput", (data) => {
      setOutput(data.success ? data.output : data.error);
    });

     socket.on("languageChanged", (data) => {
      setLanguage(data.language); 
     });

    return () => {
      editorRef.current && editorRef.current.dispose();
      socket.disconnect();
    };
  }, [roomId, username]);

  useEffect(() => {
    if (!isEditorReady) return;
    const modelListener = editorRef.current.onDidChangeModelContent(() => {
      const content = editorRef.current.getValue();
      socketRef.current.emit("contentChanged", { content, roomId });
    });
    return () => modelListener && modelListener.dispose();
  }, [isEditorReady, roomId]);

  useEffect(() => {
    if (editorRef.current) {
      monaco.editor.setModelLanguage(editorRef.current.getModel(), language);
    }
  }, [language]);

  const handleRunCode = () => {
    const code = editorRef.current.getValue();
    socketRef.current.emit("runCode", { code, language, roomId });
  };

  const handleLanguageChange = (e) => {
  const newLang = e.target.value;
  setLanguage(newLang);
  socketRef.current.emit("languageChanged", { language: newLang, roomId });
};

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Collaborative Sandbox - Room: {roomId}
      </h1>
      <div
        id="editor"
        ref={editorDivRef}
        className="w-4/5 h-96 border border-gray-300 shadow-md rounded-md"
      ></div>
      <div className="flex items-center mt-4 space-x-4">
        <select
          id="language"
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
        <button
          id="runCode"
          onClick={handleRunCode}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Run Code
        </button>
      </div>
      <pre
        id="output"
        className="w-4/5 bg-gray-900 text-white p-4 mt-6 rounded-md shadow-md overflow-x-auto"
      >
        {output}
      </pre>
    </div>
  );
};

export default SandboxCollaborative;