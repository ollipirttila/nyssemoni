import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import journeyApi from "../../api/journeyApi";

const initialState = {
  stopDataSet: [],
  status: "idle",
  selectedStop: null,
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
export const fetchStopMonitoring = createAsyncThunk(
  "stopSearch/fetchStopMonitoring",
  async () => {
    const response = await journeyApi.get("/stop-points");
    return response.data.body;
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
      });
  },
});

export const { setSelectedStop } = stopSearchSlice.actions;

export const getStopDataSet = (state) => state.stopSearch.stopDataSet;
export const getStatus = (state) => state.stopSearch.status;
export const getSelectedStop = (state) => state.stopSearch.selectedStop;

export default stopSearchSlice.reducer;
