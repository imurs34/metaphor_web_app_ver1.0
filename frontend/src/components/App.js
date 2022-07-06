import React, { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import { dna } from '../data';
import MetaphorIdea from './MetaphorIdea';
import { useSelector, useDispatch } from 'react-redux';
import { openClusterLabelChart } from '../store/actions/chartActions';

import 'beautiful-react-diagrams/styles.css';
import '../styles/index.css';

function App() {
  const [text, setText] = useState("Some body once told me the world is gonna roll me...");
  const [selectedText, setSelectedText] = useState("");
  const [contextMenuPosition, setContextMenuPosition] = useState({x: 0, y: 0});

  const chartType = useSelector(state => state?.charts?.chartType)
  const dispatch = useDispatch();

  const openContextMenu = (event) => {
    const text = window.getSelection()?.toString();
    if (!text) {
      setSelectedText('');
      return; 
    };
    setContextMenuPosition({x: event.clientX, y: event.clientY + 10})
    setSelectedText(text);
  };

  const getClusterData = () => {
    // TODO: make request to backend, fetch cluster data
    dispatch(openClusterLabelChart(dna));
  }

  const ContextMenu = ({x, y}) => (
    <div className="position-absolute bg-peach rounded" style={{top: `${y}px`, left: `${x}px`}}>
      <button onClick={getClusterData} className="btn btn-primary p-1 m-1 rounded">Main metaphor</button>
      <button className="btn btn-primary p-1 m-1 rounded">Sub-metaphor</button>
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
          {chartType && <MetaphorIdea />}
        </div>
      </div>
    </div>
  );
}

export default App;
