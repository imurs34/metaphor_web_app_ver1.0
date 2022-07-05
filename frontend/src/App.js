import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";

function App() {
  const [text, setText] = useState();

  const openContextMenu = () => {}

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
