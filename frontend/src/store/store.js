import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "./reducers/chartReducer";
import contextMenuReducer from "./reducers/contextMenuReducer";

const store = configureStore({
  reducer: {
    charts: chartReducer,
    contextMenu: contextMenuReducer,
  },
});

export default store;
