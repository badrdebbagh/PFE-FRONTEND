import {
  GET_TOTAL_USERS_FAILURE,
  GET_TOTAL_USERS_REQUEST,
  GET_TOTAL_USERS_SUCCESS,
  FETCH_COMPLETED_PROJECTS_COUNT_FAILURE,
  FETCH_COMPLETED_PROJECTS_COUNT_REQUEST,
  FETCH_COMPLETED_PROJECTS_COUNT_SUCCESS,
  FETCH_IN_PROGRESS_PROJECTS_COUNT_FAILURE,
  FETCH_IN_PROGRESS_PROJECTS_COUNT_REQUEST,
  FETCH_IN_PROGRESS_PROJECTS_COUNT_SUCCESS,
  GET_TOTAL_PROJECTS_REQUEST,
  GET_TOTAL_PROJECTS_SUCCESS,
  GET_TOTAL_PROJECTS_FAILURE,
  GET_PROJECT_COUNTS_REQUEST,
  GET_PROJECT_COUNTS_SUCCESS,
  GET_PROJECT_COUNTS_FAILURE,
  GET_LAST_LOGINS_REQUEST,
  GET_LAST_LOGINS_SUCCESS,
  GET_LAST_LOGINS_FAILURE,
  GET_PROJECT_TEST_CASE_COUNTS_REQUEST,
  GET_PROJECT_TEST_CASE_COUNTS_SUCCESS,
  GET_PROJECT_TEST_CASE_COUNTS_FAILURE,
} from "./ActionType";

const initialState = {
  totalUsers: 0,
  totalProjects: 0,
  loading: false,
  error: null,
  completedCount: 0,
  completedProjects: [],
  inProgressCount: 0,
  inProgressProjects: [],
  lastLogins: [],
  projectTestCaseCounts: [],
};

export const adminDashboard = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOTAL_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_TOTAL_USERS_SUCCESS:
      return { ...state, loading: false, totalUsers: action.payload };
    case GET_TOTAL_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_TOTAL_PROJECTS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_TOTAL_PROJECTS_SUCCESS:
      return { ...state, loading: false, totalProjects: action.payload };
    case GET_TOTAL_PROJECTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

      return {
        ...state,
        loadingInProgress: false,
        errorInProgress: action.payload,
      };

    case GET_PROJECT_COUNTS_REQUEST:
      return { ...state, loading: true };
    case GET_PROJECT_COUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        completedCount: action.payload.completedCount,
        completedProjects: action.payload.completedProjects,
        inProgressCount: action.payload.inProgressCount,
        inProgressProjects: action.payload.inProgressProjects,
      };
    case GET_PROJECT_COUNTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    //last login

    case GET_LAST_LOGINS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_LAST_LOGINS_SUCCESS:
      return { ...state, loading: false, lastLogins: action.payload };
    case GET_LAST_LOGINS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // TESTCASESS COUNT
    case GET_PROJECT_TEST_CASE_COUNTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PROJECT_TEST_CASE_COUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projectTestCaseCounts: action.payload,
      };
    case GET_PROJECT_TEST_CASE_COUNTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
