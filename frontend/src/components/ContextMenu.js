import React from "react";
import {  useDispatch, useSelector } from "react-redux";
import { dna } from "../data";
import { openClusterLabelChart } from "../store/actions/chartActions";
import { hideContextMenu } from "../store/actions/contextMenuActions";


const ContextMenu = () => {
  const { coords: { x, y } } = useSelector(
    (state) => state?.contextMenu
  );
  const dispatch = useDispatch();

  const getClusterData = () => {
    // TODO: make request to backend, fetch cluster data
    dispatch(openClusterLabelChart(dna));
    dispatch(hideContextMenu())
  };

  return (
    <div
      className="position-absolute bg-peach p-2 big-rounded"
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      <button
        onClick={getClusterData}
        className="btn btn-light p-1 m-1 small-rounded"
      >
        Main metaphor
      </button>
      <button className="btn btn-light p-1 m-1 small-rounded">
        Sub-metaphor
      </button>
    </div>
  );
};

export default ContextMenu;
