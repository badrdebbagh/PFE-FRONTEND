import axios from "axios";
import { API_URL, api } from "../../config/api";
import {
  FETCH_COMPLETED_PROJECTS_COUNT_FAILURE,
  FETCH_COMPLETED_PROJECTS_COUNT_REQUEST,
  FETCH_COMPLETED_PROJECTS_COUNT_SUCCESS,
  FETCH_IN_PROGRESS_PROJECTS_COUNT_FAILURE,
  FETCH_IN_PROGRESS_PROJECTS_COUNT_REQUEST,
  FETCH_IN_PROGRESS_PROJECTS_COUNT_SUCCESS,
  GET_LAST_LOGINS_FAILURE,
  GET_LAST_LOGINS_REQUEST,
  GET_LAST_LOGINS_SUCCESS,
  GET_PROJECT_COUNTS_FAILURE,
  GET_PROJECT_COUNTS_REQUEST,
  GET_PROJECT_COUNTS_SUCCESS,
  GET_PROJECT_TEST_CASE_COUNTS_FAILURE,
  GET_PROJECT_TEST_CASE_COUNTS_REQUEST,
  GET_PROJECT_TEST_CASE_COUNTS_SUCCESS,
  GET_TOTAL_PROJECTS_FAILURE,
  GET_TOTAL_PROJECTS_REQUEST,
  GET_TOTAL_PROJECTS_SUCCESS,
  GET_TOTAL_USERS_FAILURE,
  GET_TOTAL_USERS_REQUEST,
  GET_TOTAL_USERS_SUCCESS,
} from "./ActionType";
import { computeFlexColumnsWidth } from "@mui/x-data-grid/hooks/features/columns/gridColumnsUtils";
export const getTotalUsers = () => async (dispatch) => {
  dispatch({ type: GET_TOTAL_USERS_REQUEST });
  try {
    const { data } = await axios.get(`${API_URL}/api/admin/totalUsers`);
    console.log("totla", data);
    dispatch({ type: GET_TOTAL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_TOTAL_USERS_FAILURE, payload: error.message });
  }
};

export const getTotalProjects = () => async (dispatch) => {
  dispatch({ type: GET_TOTAL_PROJECTS_REQUEST });
  try {
    const { data } = await api.get(`/api/projects/count`);
    console.log("totla", data);
    dispatch({ type: GET_TOTAL_PROJECTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_TOTAL_PROJECTS_FAILURE, payload: error.message });
  }
};

// export const fetchCompletedProjectsCount = () => async (dispatch) => {
//   dispatch({ type: FETCH_COMPLETED_PROJECTS_COUNT_REQUEST });
//   try {
//     const { data } = await api.get(`api/projects/count/completed`);
//     dispatch({ type: FETCH_COMPLETED_PROJECTS_COUNT_SUCCESS, payload: data });
//     console.log("total completed", data);
//   } catch (error) {
//     dispatch({
//       type: FETCH_COMPLETED_PROJECTS_COUNT_FAILURE,
//       payload: error.message,
//     });
//   }
// };

// export const fetchInProgressProjectsCount = () => async (dispatch) => {
//   dispatch({ type: FETCH_IN_PROGRESS_PROJECTS_COUNT_REQUEST });
//   try {
//     const { data } = await api.get(`/projects/count/in-progress`);
//     dispatch({ type: FETCH_IN_PROGRESS_PROJECTS_COUNT_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: FETCH_IN_PROGRESS_PROJECTS_COUNT_FAILURE,
//       payload: error.message,
//     });
//   }
// };

export const getProjectCounts = () => async (dispatch) => {
  dispatch({ type: GET_PROJECT_COUNTS_REQUEST });
  try {
    const completedResponse = await api.get(`api/projects/count/completed`);
    const inProgressResponse = await api.get(`api/projects/count/in-progress`);

    dispatch({
      type: GET_PROJECT_COUNTS_SUCCESS,
      payload: {
        completedCount: completedResponse.data.count,
        completedProjects: completedResponse.data.projects,
        inProgressCount: inProgressResponse.data.count,
        inProgressProjects: inProgressResponse.data.projects,
      },
    });
    console.log(completedResponse.data);
  } catch (error) {
    dispatch({
      type: GET_PROJECT_COUNTS_FAILURE,
      payload: error.message,
    });
  }
};

export const getLastLogins = () => async (dispatch) => {
  dispatch({ type: GET_LAST_LOGINS_REQUEST });
  try {
    const { data } = await api.get("api/users/last-logins");
    dispatch({ type: GET_LAST_LOGINS_SUCCESS, payload: data });
    console.log("login", data);
  } catch (error) {
    dispatch({ type: GET_LAST_LOGINS_FAILURE, payload: error.message });
  }
};

export const getAllProjectTestCaseCounts = () => async (dispatch) => {
  dispatch({ type: GET_PROJECT_TEST_CASE_COUNTS_REQUEST });
  try {
    const response = await api.get("/api/test-cases/counts");
    dispatch({
      type: GET_PROJECT_TEST_CASE_COUNTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROJECT_TEST_CASE_COUNTS_FAILURE,
      payload: error.message,
    });
  }
};
