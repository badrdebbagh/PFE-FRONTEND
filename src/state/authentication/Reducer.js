import {
  ADD_PROJECT_FAILURE,
  ADD_PROJECT_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_PROJECT_FAILURE,
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
  GET_ROLE_FAILURE,
  GET_ROLE_REQUEST,
  GET_ROLE_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SUSPEND_USER_FAILURE,
  SUSPEND_USER_REQUEST,
  SUSPEND_USER_SUCCESS,
} from "./ActionType";

import { jwtDecode } from "jwt-decode";

const initialState = {
  roles: [],
  users: [],
  isLoading: false,
  error: null,
  jwt: null,
  success: null,
  projects: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case GET_ROLE_REQUEST:
    case GET_USER_REQUEST:
    case GET_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };
    case LOGIN_SUCCESS:
      try {
        const decoded = jwtDecode(action.payload); // Decode JWT string directly from action.payload
        console.log("Decoded JWT:", decoded);
        return {
          ...state,
          isLoading: false,
          jwt: action.payload, // Store the JWT string
          users: {
            ...state.users,
            email: decoded.email,
            role: decoded.authorities, // Store role information
          },
          success: "Login Success",
        };
      } catch (error) {
        console.error("Error decoding JWT:", error);
        return {
          ...state,
          error: error.toString(),
          isLoading: false,
        };
      }

    case DELETE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ROLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        roles: action.payload,
        success: "roles fetched Success",
      };

    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projects: action.payload,
        success: "Projects fetched Success",
      };

    case GET_PROJECT_SUCCESS: // Case to handle successfully fetched projects
      return {
        ...state,
        isLoading: false,
        projects: action.payload, // Update the projects array with the payload
        success: "Projects fetched successfully",
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
        success: "Fetched Success",
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: null,
        success: "User deleted successfully",
      };
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case ADD_PROJECT_FAILURE:
    case GET_ROLE_FAILURE:
    case GET_PROJECT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: null,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case SUSPEND_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SUSPEND_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload ? { ...user, suspended: true } : user
        ),
      };
    case SUSPEND_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
