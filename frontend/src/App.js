import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";

function App() {
  const [text, setText] = useState("Some body once told me the world is gonna roll me...");
  const [selectedText, setSelectedText] = useState("");
  const [contextMenuPosition, setContextMenuPosition] = useState({x: 0, y: 0});

  const openContextMenu = (event) => {
    const text = window.getSelection()?.toString();
    if (!text) {
      setSelectedText('');
      return; 
    };
    setContextMenuPosition({x: event.clientX, y: event.clientY + 10})
    setSelectedText(text);
  };

  const ContextMenu = ({x, y}) => (
    <div className="position-absolute bg-" style={{top: `${y}px`, left: `${x}px`}}>
      <button>Main metaphor</button>
      <button>Sub-metaphor</button>
    </div>
  );

  return (
    <div className="container pt-5">
      <h1>Science Article Writing</h1>
      <div className="row">
        <div className="col-6">
          <MDEditor
            value={text}
            onChange={setText}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
            preview="edit"
            onMouseUp={openContextMenu}
          />
          {selectedText && <ContextMenu {...contextMenuPosition} />}
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-4">Concept</div>
            <div className="col-8">. . .</div>

            <div className="col-4">Property</div>
            <div className="col-8">. . .</div>

            <div className="col-4">Vehicle</div>
            <div className="col-8">. . .</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
