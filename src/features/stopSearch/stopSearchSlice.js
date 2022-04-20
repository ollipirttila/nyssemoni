import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import journeyApi from "../../api/journeyApi";

const initialState = {
  stopDataSet: [],
  status: "idle",
  selectedStop: null,
  stopMonitoringData: [],
};

// Fetches a list of all Tampere area bus stops
export const fetchStopDataSet = createAsyncThunk(
  "stopSearch/fetchStopDataSet",
  async () => {
    const response = await journeyApi.get("/stop-points");
    return response.data.body;
  }
);

// Fetches monitoring data of a given bus stop
export const fetchStopMonitoringData = createAsyncThunk(
  "stopSearch/fetchStopMonitoringData",
  async (stopShortName) => {
    const response = await journeyApi.get("/stop-monitoring", {
      params: {
        stops: stopShortName,
      },
    });
    // API returns objects that have stopShortName as key and array of busses as its value
    // so we want to return the array only.
    return response.data.body[stopShortName];
  }
);

export const stopSearchSlice = createSlice({
  name: "stopSearch",
  initialState,
  reducers: {
    setSelectedStop: (state, action) => {
      state.selectedStop = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchStopDataSet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStopDataSet.fulfilled, (state, action) => {
        state.status = "idle";
        state.stopDataSet = action.payload;
      })
      .addCase(fetchStopMonitoringData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStopMonitoringData.fulfilled, (state, action) => {
        state.status = "idle";
        state.stopMonitoringData = action.payload;
      });
  },
});

export const { setSelectedStop } = stopSearchSlice.actions;

export const getStopDataSet = (state) => state.stopSearch.stopDataSet;
export const getStatus = (state) => state.stopSearch.status;
export const getSelectedStop = (state) => state.stopSearch.selectedStop;
export const getStopMonitoringData = (state) =>
  state.stopSearch.stopMonitoringData;

export default stopSearchSlice.reducer;
