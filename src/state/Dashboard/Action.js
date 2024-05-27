
import axios from "axios";
import { API_URL, api } from "../../config/api";
import { GET_TOTAL_USERS_FAILURE, GET_TOTAL_USERS_REQUEST, GET_TOTAL_USERS_SUCCESS } from "./ActionType";
export const getTotalUsers = () => async (dispatch) => {
  dispatch({ type: GET_TOTAL_USERS_REQUEST });
  try {
    const { data } = await axios.get(`${API_URL}/api/admin/totalUsers`);
    console.log('totla', data);
    dispatch({ type: GET_TOTAL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_TOTAL_USERS_FAILURE, payload: error.message });
  }
};
