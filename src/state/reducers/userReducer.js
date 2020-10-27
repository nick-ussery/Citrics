//reducer for User Info
export const initialState = {
  userName: '',
  avatar: '',
  comparison: [],
  city_metrics: [],
  profileIsOpen: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case 'OPEN_DRAWER':
      return {
        ...state,
        profileIsOpen: true,
      };
    case 'CLOSE_DRAWER':
      return {
        ...state,
        profileIsOpen: false,
      };
    case 'ADD_CITY':
      return {
        ...state,
        comparison: [...state.comparison, action.payload],
      };
    case 'GET_CITY_METRICS':
      return {
        ...state,
        city_metrics: [...state.city_metrics, action.payload],
      };
  }
};
