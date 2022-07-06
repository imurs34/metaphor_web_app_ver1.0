import { configureStore } from '@reduxjs/toolkit';
import chartReducer from './reducers/chartReducer';

const store = configureStore({
  reducer: {
    charts: chartReducer,
  }
});

export default store;
