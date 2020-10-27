//this file is the reducers for city state management
//the state will remember up to 3 cities for comparison, initializing at either empty or ask for a location and use nearest city (to be implemented)

export const initialState = {
  cities: ['san diego', 'san francisco', 'norfolk', 'madison'],
  cityInfo: [],
  isFetching: false,
  markers: [],
  selected: {},
  alert: false,
};

export const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case 'SAVE_MARKER':
      return {
        ...state,
        markers: [...state.markers, action.payload],
      };
    case 'REMOVE_FIRST':
      return {
        ...state,
        alert: true,
        markers: state.markers.slice(1, 4),
      };
    case 'REMOVE_ALERT':
      return {
        ...state,
        alert: false,
      };
    case 'SAVE_DATA':
      return {
        ...state,
        cityInfo: action.payload,
      };
    case 'SAVE_CITY': //add cities to the array of cities to be compared
      let newList = state.cities;
      newList.append(action.payload.city);

      return {
        ...state,
        cities: newList,
      };
    case 'SET_SELECTED_DATA':
      return {
        ...state,
        selected: state.cityInfo.filter(city => {
          return city.city === action.payload;
        }),
      };
    case 'REMOVE_CITY':
      let firstHalf = state.cities;
      let secondHalf = state.cities;
      firstHalf.slice(0, action.payload.saveID - 1); //takes in a cityID which is the array index of the city. slices it out
      secondHalf.slice(action.payload.saveID); //slicing starts at deleted city
      newList = firstHalf.concat(secondHalf); //combines each half of the list using concatenating

      return {
        ...state,
        cities: newList,
      };
  }
};

export default cityReducer;
