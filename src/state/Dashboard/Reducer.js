import { GET_TOTAL_USERS_FAILURE, GET_TOTAL_USERS_REQUEST, GET_TOTAL_USERS_SUCCESS } from "./ActionType";

const initialState = {
  totalUsers: 0,
  loading: false,
  error: null,
};

export const adminDashboard = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOTAL_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_TOTAL_USERS_SUCCESS:
      return { ...state, loading: false, totalUsers: action.payload };
    case GET_TOTAL_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
