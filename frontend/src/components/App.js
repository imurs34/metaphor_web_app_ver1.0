import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import MetaphorIdea from "./MetaphorIdea";
import { useSelector, useDispatch } from "react-redux";
import ContextMenu from "./ContextMenu";
import "../styles/index.css";
import MetaphorDetails from "./MetaphorDetails";
import {
  showContextMenu,
  hideContextMenu,
} from "../store/actions/contextMenuActions";
import "beautiful-react-diagrams/styles.css";

function App() {
  const [text, setText] = useState(
    "Some body once told me the world is gonna roll me..."
  );

  const {
    chartType,
    details: { isOpened },
  } = useSelector((state) => state?.charts);
  const { display, selectedText } = useSelector((state) => state?.contextMenu);

  const dispatch = useDispatch();

  const openContextMenu = (event) => {
    const text = window.getSelection()?.toString();
    if (!text) {
      dispatch(hideContextMenu());
      return;
    }
    dispatch(
      showContextMenu({
        text: selectedText,
        coords: {
          x: event.clientX,
          y: event.clientY + 10,
        },
      })
    );
  };

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
          {display && <ContextMenu />}
        </div>
        <div className="col-6">
          {chartType && !isOpened && <MetaphorIdea />}
          {isOpened && <MetaphorDetails />}
        </div>
      </div>
    </div>
  );
}

export default App;
