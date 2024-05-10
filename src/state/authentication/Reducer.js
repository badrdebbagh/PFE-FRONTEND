import {
  ACTIVATE_USER_FAILURE,
  ACTIVATE_USER_REQUEST,
  ACTIVATE_USER_SUCCESS,
  ADD_PROJECT_FAILURE,
  ADD_PROJECT_SUCCESS,
  ASSIGN_DOMAIN_FAILURE,
  ASSIGN_DOMAIN_REQUEST,
  ASSIGN_DOMAIN_SUCCESS,
  CREATE_CAHIER_TEST_GLOBAL_FAILURE,
  CREATE_CAHIER_TEST_GLOBAL_REQUEST,
  CREATE_CAHIER_TEST_GLOBAL_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_DOMAINE_FAILURE,
  GET_DOMAINE_REQUEST,
  GET_DOMAINE_SUCCESS,
  GET_PROJECT_FAILURE,
  GET_PROJECT_REQUEST,
  GET_PROJECT_ROLE_FAILURE,
  GET_PROJECT_ROLE_REQUEST,
  GET_PROJECT_ROLE_SUCCESS,
  GET_PROJECT_SUCCESS,
  GET_ROLE_FAILURE,
  GET_ROLE_REQUEST,
  GET_ROLE_SUCCESS,
  GET_SOUS_DOMAINE_FAILURE,
  GET_SOUS_DOMAINE_REQUEST,
  GET_SOUS_DOMAINE_SUCCESS,
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
  domaines: [],
  sous_domaines: [],
  assignedDomains: [],
  cahierDeTests: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case GET_ROLE_REQUEST:
    case GET_USER_REQUEST:
    case GET_PROJECT_REQUEST:
    case GET_PROJECT_ROLE_REQUEST:
    case ACTIVATE_USER_REQUEST:
    case ASSIGN_DOMAIN_REQUEST:
    case CREATE_CAHIER_TEST_GLOBAL_REQUEST:
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
    case ACTIVATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: state.user.map((user) =>
          user.id === action.payload ? { ...user, suspended: false } : user
        ),
        success: "User activated successfully",
      };
    // case ASSIGN_DOMAIN_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     domaines: [...state.domaines, action.payload],
    //     success: "Domain assigned successfully",
    //   };
    case ASSIGN_DOMAIN_SUCCESS:
      console.log("Initial projects:", state.projects);
      console.log("Action payload:", action.payload);
      console.log("Project ID:", action.projectId);

      const updatedProjects = state.projects.map((project) => {
        if (project.id === action.projectId) {
          console.log("Original domaines:", project.domaines);
          const updatedDomaines = [...project.domaines, action.payload];
          console.log("Updated domaines:", updatedDomaines);
          return { ...project, domaines: updatedDomaines };
        }
        return project;
      });

      console.log("Updated projects:", updatedProjects);
      return { ...state, isLoading: false, projects: updatedProjects };
    case ASSIGN_DOMAIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case CREATE_CAHIER_TEST_GLOBAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cahierDeTests: [...state.cahierDeTests, action.payload],
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
    case ACTIVATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: null,
      };
    case SUSPEND_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_CAHIER_TEST_GLOBAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
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
    case GET_DOMAINE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_DOMAINE_SUCCESS:
      return {
        ...state,
        loading: false,
        domaines: action.payload,
        error: null,
      };
    case GET_DOMAINE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Assuming payload contains error information
      };
    case GET_SOUS_DOMAINE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_SOUS_DOMAINE_SUCCESS:
      return {
        ...state,
        loading: false,
        sous_domaines: action.payload, // Assuming payload contains the array of domaines
        error: null,
      };
    case GET_SOUS_DOMAINE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Assuming payload contains error information
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
