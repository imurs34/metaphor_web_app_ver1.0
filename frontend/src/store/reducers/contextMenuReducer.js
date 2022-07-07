import { createReducer } from "@reduxjs/toolkit";
import {
  showContextMenu,
  hideContextMenu,
} from "../actions/contextMenuActions";

const initialState = {
  display: false,
  selectedText: "",
  coords: {
    x: 0,
    y: 0,
  },
};

const contextMenuReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(showContextMenu, (state, action) => {
      state.display = true;
      state.selectedText = action.payload.text;
      state.coords = action.payload.coords;
    })
    .addCase(hideContextMenu, (state, action) => {
      state.display = false;
      state.coords = { x: 0, y: 0 };
    });
});

export default contextMenuReducer;
