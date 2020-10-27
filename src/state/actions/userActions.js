import axios from 'axios';

export const openDrawer = () => {
  return dispatch => {
    dispatch({ type: 'OPEN_DRAWER' });
  };
};

export const closeDrawer = () => {
  return dispatch => {
    dispatch({ type: 'CLOSE_DRAWER' });
  };
};

export const addCityCompare = cityName => {
  return dispatch => {
    dispatch({ type: 'ADD_CITY', payload: cityName });
  };
};

export const getCityMetrics = id => {};
