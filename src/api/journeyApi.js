import axios from "axios";

const journeyApi = axios.create({
  baseURL: "https://data.itsfactory.fi/journeys/api/1",
});

export default journeyApi;
