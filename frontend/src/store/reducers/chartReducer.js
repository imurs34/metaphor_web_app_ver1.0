import { createReducer } from "@reduxjs/toolkit";
import { openClusterLabelChart, openVehicleChart, openDetailedMetaphor } from '../actions/chartActions';

const initialState = {
    chartType: null,
    values: []
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
})

export default chartReducer;
