import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import journeyApi from "../../api/journeyApi";

const initialState = {
  stopDataSet: [],
  status: "idle",
  selectedStop: null,
  stopMonitoringData: [],
  stopDialogOpen: false,
};

// Initialize the app, if there is URL Query string
export const initializeAppState = createAsyncThunk(
  "stopSearch/initializeAppState",
  async (urlStopQuery) => {
    const stopsResponse = await journeyApi.get("/stop-points");
    const monitoringResponse = await journeyApi.get("/stop-monitoring", {
      params: {
        stops: urlStopQuery,
      },
    });
    const payload = {
      shortName: urlStopQuery,
      stops: stopsResponse.data.body,
      monitoringData: monitoringResponse.data.body[urlStopQuery]
        ? monitoringResponse.data.body[urlStopQuery]
        : [],
    };
    return payload;
  }
);

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
    }).data.body;
    // API returns objects that have stopShortName as key and array of busses as its value
    // so we want to return the array only.
    return response ? response[stopShortName] : [];
  }
);

export const stopSearchSlice = createSlice({
  name: "stopSearch",
  initialState,
  reducers: {
    setSelectedStop: (state, action) => {
      state.selectedStop = action.payload;
      // Clear stopMonitoringData if stop is deselected to avoid "flickering" when re-selecting a stop
      if (action.payload === null) {
        state.stopMonitoringData = [];
      }
    },
    setStopDialogOpen: (state) => {
      state.stopDialogOpen = !state.stopDialogOpen;
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
        state.stopMonitoringData = action.payload;
        state.status = "idle";
      })
      .addCase(initializeAppState.pending, (state) => {
        state.status = "loading";
      })
      .addCase(initializeAppState.fulfilled, (state, action) => {
        state.selectedStop = action.payload.stops.find(
          (item) => item.shortName === action.payload.shortName
        );
        state.stopMonitoringData = action.payload.monitoringData;
        state.status = "idle";
      });
  },
});

export const { setSelectedStop, setStopDialogOpen } = stopSearchSlice.actions;

export const getStopDataSet = (state) => state.stopSearch.stopDataSet;
export const getStatus = (state) => state.stopSearch.status;
export const getSelectedStop = (state) => state.stopSearch.selectedStop;
export const getStopDialogOpen = (state) => state.stopSearch.stopDialogOpen;
export const getStopMonitoringData = (state) =>
  state.stopSearch.stopMonitoringData;

export default stopSearchSlice.reducer;
