import { createSlice } from '@reduxjs/toolkit';
import { sortData } from '../../utils';

const initialState = {
  loading: false,
  error: false,
  covidData: [],
  countryData: [],
  historicalData: [],
  coordinates: { lat: 51, lng: 9, zoom: 3 },
};

const appSlice = createSlice({
  name: 'covidData',
  initialState,
  reducers: {
    getAppdata: (state) => {
      state.loading = true;
    },
    getAppDataSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.covidData = payload;
    },
    getAppDataSuccessByCountryCode: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.countryData = payload;
    },
    getHistoricalDataSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.historicalData = payload;
    },
    getCoordinates: (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.coordinates = payload;
    },
    getAppDataFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  getAppdata,
  getAppDataSuccess,
  getAppDataSuccessByCountryCode,
  getHistoricalDataSuccess,
  getCoordinates,
  getAppDataFail,
} = appSlice.actions;
export const appdataSelector = (state) => state.covidData;

export default appSlice.reducer;

export const getCountriesData = () => async (dispatch) => {
  const BASE_URL = 'https://disease.sh/';

  dispatch(getAppdata());

  try {
    const response = await fetch(`${BASE_URL}v3/covid-19/countries`);
    const data = await response.json();
    const sortedData = sortData(data);

    dispatch(getAppDataSuccess(sortedData));
  } catch (err) {
    dispatch(getAppDataFail());
  }
};

export const getCountriesDataByCountryCode = (countryCode) => async (dispatch) => {
  const BASE_URL = 'https://disease.sh/';
  const url =
    countryCode === 'Worldwide' ? `${BASE_URL}v3/covid-19/all` : `${BASE_URL}v3/covid-19/countries/${countryCode}`;

  dispatch(getAppdata());

  try {
    const response = await fetch(url);
    const data = await response.json();
    dispatch(getAppDataSuccessByCountryCode(data));
  } catch (err) {
    dispatch(getAppDataFail());
  }
};

export const getHistoricalData = (countryCode = 'all', casesType = 'cases') => async (dispatch) => {
  const BASE_URL = 'https://disease.sh/';

  dispatch(getAppdata());

  try {
    const response = await fetch(`${BASE_URL}v3/covid-19/historical/${countryCode}?lastdays=120`);
    const data = await response.json();

    dispatch(getHistoricalDataSuccess(buildChartData(data, casesType)));
  } catch (err) {
    dispatch(getAppDataFail());
  }
};

export const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  const cases = data[casesType];

  for (let item in cases) {
    if (lastDataPoint) {
      const graphObject = {
        x: item,
        y: cases[item] - lastDataPoint,
      };
      chartData.push(graphObject);
    }

    lastDataPoint = cases[item];
  }
  return chartData;
};

export const setCoordinates = (data) => (dispatch) => {
  dispatch(getAppdata());

  try {
    data && dispatch(getCoordinates(data));
  } catch (err) {
    dispatch(getAppDataFail());
  }
}

// /v3/cdiov-19/all;
// /v3/cdiov-19/countries/{ country };
