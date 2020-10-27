//this page stores the actions for the state management, specifically the searched cities

import axios from 'axios';
import { useHistory } from 'react-router-dom';

export const getCityInfo = () => {
  return dispatch => {
    dispatch({ type: 'FETCH_START' });
    axios
      .get('https://labs27-b-citrics-api.herokuapp.com/cities/city/id/2')
      .then(res => {
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
      })
      .catch(err => {
        dispatch({ type: 'FETCH_FAIL', payload: `${err}` });
      });
  };
};

export const addCity = input => {
  return dispatch => {
    console.log('save city request:', input);
    dispatch({ type: 'SAVE_CITY', payload: input });
  };
};

export const addMarker = ({ lat, lng, cityName, stateName, address }) => {
  return dispatch => {
    console.log(
      `City Marked: lat: ${lat}, lng: ${lng}, cityName: ${cityName}, stateName: ${stateName}`
    );
    dispatch({
      type: 'SAVE_MARKER',
      payload: { lat, lng, cityName, stateName, address },
    });
  };
};

export const SaveCity = cities => {
  return dispatch => {
    dispatch({ type: 'SAVE_DATA', payload: cities });
  };
};

export const setSelectedData = selected => dispatch => {
  dispatch({ type: 'SET_SELECTED_DATA', payload: selected });
};

export const RemoveFirstMarker = () => dispatch => {
  console.log('Only 3 cities may be compared');
  dispatch({ type: 'REMOVE_FIRST', payload: {} });
};

export const RemoveAlerts = () => dispatch => {
  dispatch({ type: 'REMOVE_ALERT', payload: {} });
};
