import { createReducer } from "@reduxjs/toolkit";
import { openClusterLabelChart, openVehicleChart, openDetailedMetaphor } from '../actions/chartActions';

const initialState = {
    chartType: null,
    values: [],
    details: {
        isOpened: false,
        values: {},
    }
}

const chartReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(openClusterLabelChart, (state, action) => {
        state.chartType = 'label';
        state.values = action.payload;
    })
    .addCase(openVehicleChart, (state, action) => {
        state.chartType = 'vehicle';
        state.values = action.payload;
    })
    .addCase(openDetailedMetaphor, (state, action) => {
        state.details.isOpened = true;
        state.details.values = action;
    })
})

export default chartReducer;
