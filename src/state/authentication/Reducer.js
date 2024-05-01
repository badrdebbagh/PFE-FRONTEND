import {
  ADD_PROJECT_FAILURE,
  ADD_PROJECT_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_PROJECT_FAILURE,
  GET_PROJECT_REQUEST,
  GET_PROJECT_ROLE_FAILURE,
  GET_PROJECT_ROLE_REQUEST,
  GET_PROJECT_ROLE_SUCCESS,
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
  user: [],
  isLoading: false,
  error: null,
  jwt: null,
  success: null,
  projects: [],
  projectRoles: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case GET_ROLE_REQUEST:
    case GET_USER_REQUEST:
    case GET_PROJECT_REQUEST:
    case GET_PROJECT_ROLE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };
    case LOGIN_SUCCESS:
      // return {
      //   ...state,
      //   isLoading: false,
      //   error: null,
      //   jwt: action.payload.jwt,
      //   success : "login success"
      // };
      try {
        const decoded = jwtDecode(action.payload.jwt); // Assuming JWT is in action.payload.jwt
        console.log("decoded", decoded);

        const newUser = {
          id: decoded.userId, // Assuming userId is the unique identifier in your decoded JWT
          firstName: decoded.firstName,
          lastName: decoded.lastName, // Assuming these fields exist in your JWT
          role: decoded.authorities, // This should be an array or a string
        };

        // Check if the user already exists
        const existingUserIndex = state.user.findIndex(
          (user) => user.id === newUser.id
        );

        const updatedUsers =
          existingUserIndex !== -1
            ? state.user.map((user) =>
                user.id === newUser.id ? { ...user, ...newUser } : user
              )
            : [...state.user, newUser]; // If user does not exist, add new user

        return {
          ...state,
          isLoading: false,
          jwt: action.payload.jwt, // Store JWT
          user: updatedUsers,
          success: "Login successful",
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

    case GET_PROJECT_ROLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projectRoles: action.payload,
        success: "Project roles fetched Success",
      };
    case GET_ROLE_SUCCESS:
      console.log("action", action.payload);
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
        projects: action.payload,
        success: "Projects fetched successfully",
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        success: "Fetched Success",
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: null,
        success: "User deleted successfully",
      };
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case ADD_PROJECT_FAILURE:
    case GET_ROLE_FAILURE:
    case GET_PROJECT_FAILURE:
    case GET_PROJECT_ROLE_FAILURE:
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
        user: state.user.map((user) =>
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
export const getRolesSuccess = (roles) => {
  console.log("Roles payload:", roles); // Log the payload
  return {
    type: GET_ROLE_SUCCESS,
    payload: roles,
  };
};
