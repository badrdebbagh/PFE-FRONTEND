import {
  ACTIVATE_USER_FAILURE,
  ACTIVATE_USER_REQUEST,
  ACTIVATE_USER_SUCCESS,
  ADD_PROJECT_FAILURE,
  ADD_PROJECT_SUCCESS,
  ADD_TEST_CASE_DESCRIPTION_FAILURE,
  ADD_TEST_CASE_DESCRIPTION_REQUEST,
  ADD_TEST_CASE_DESCRIPTION_SUCCESS,
  ASSIGN_DOMAIN_FAILURE,
  ASSIGN_DOMAIN_REQUEST,
  ASSIGN_DOMAIN_SUCCESS,
  ASSIGN_PROJECT_FAILURE,
  ASSIGN_PROJECT_REQUEST,
  ASSIGN_PROJECT_SUCCESS,
  ASSIGN_TEST_CASE_SUCCESS,
  CREATE_CAHIER_TEST_GLOBAL_FAILURE,
  CREATE_CAHIER_TEST_GLOBAL_REQUEST,
  CREATE_CAHIER_TEST_GLOBAL_SUCCESS,
  CREATE_CAS_TEST_FAILURE,
  CREATE_CAS_TEST_REQUEST,
  CREATE_CAS_TEST_SUCCESS,
  CREATE_FUNCTIONNALITY_FAILURE,
  CREATE_FUNCTIONNALITY_REQUEST,
  CREATE_FUNCTIONNALITY_SUCCESS,
  CREATE_SOUS_DOMAINE_FAILURE,
  CREATE_SOUS_DOMAINE_REQUEST,
  CREATE_SOUS_DOMAINE_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  EXECUTE_TEST_CASE_SUCCESS,
  FETCH_USER_PROJECTS_FAILURE,
  FETCH_USER_PROJECTS_REQUEST,
  FETCH_USER_PROJECTS_SUCCESS,
  GET_DOMAINE_FAILURE,
  GET_DOMAINE_REQUEST,
  GET_DOMAINE_SUCCESS,
  GET_FUNCTIONNALITY_FAILURE,
  GET_FUNCTIONNALITY_REQUEST,
  GET_FUNCTIONNALITY_SUCCESS,
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
  GET_STEPS_FAILURE,
  GET_STEPS_REQUEST,
  GET_STEPS_SUCCESS,
  GET_TEST_CASE_FAILURE,
  GET_TEST_CASE_REQUEST,
  GET_TEST_CASE_SUCCESS,
  GET_TEST_RESULT_FAILURE,
  GET_TEST_RESULT_REQUEST,
  GET_TEST_RESULT_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SUBMIT_TEST_RESULT_FAILURE,
  SUBMIT_TEST_RESULT_REQUEST,
  SUBMIT_TEST_RESULT_SUCCESS,
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
  fonctionnalite: [],
  testCases: [],
  etapes: [],
  message: "",
  projectsData: {
    projets: [],
    cahierDeTests: [],
    fonctionnalites: [],
    casTests: [],
  },
  testResults: {},
  testSuccessfull: null,
  testError: null,
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
    case GET_FUNCTIONNALITY_REQUEST:
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

    case GET_PROJECT_SUCCESS:
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
      console.log("Received updated project:", action.payload);
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.projectId
            ? action.payload // Directly replace the project with updated one
            : project
        ),
      };
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
        isLoading: true,
        error: null,
      };
    case GET_DOMAINE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        domaines: action.payload,
        error: null,
      };
    case GET_DOMAINE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload, // Assuming payload contains error information
      };
    case GET_SOUS_DOMAINE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_SOUS_DOMAINE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sous_domaines: action.payload, // Assuming payload contains the array of domaines
        error: null,
      };
    case GET_SOUS_DOMAINE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload, // Assuming payload contains error information
      };

    case GET_FUNCTIONNALITY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fonctionnalite: action.payload,
        success: "functionnality fetched Success",
      };

    case GET_FUNCTIONNALITY_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case CREATE_FUNCTIONNALITY_REQUEST:
      return { ...state, isLoading: true, error: null };
    case CREATE_FUNCTIONNALITY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fonctionnalite: [...state.fonctionnalite, action.payload],
        error: null,
      };
    case CREATE_FUNCTIONNALITY_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case GET_TEST_CASE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_TEST_CASE_SUCCESS:
      console.log("Reducer GET_TEST_CASE_SUCCESS", action.payload);
      return {
        isLoading: false,
        testCases: action.payload,
        success: "fetched cas de test successfull",
      };
    case GET_TEST_CASE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case ADD_TEST_CASE_DESCRIPTION_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: false,
      };
    case ADD_TEST_CASE_DESCRIPTION_SUCCESS:
      console.log("action etapes", action.payload);
      return {
        ...state,
        isLoading: false,
        etapes: [...state.etapes, action.payload],
        error: null,
        success: true,
      };
    case ADD_TEST_CASE_DESCRIPTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: false,
      };

    case GET_STEPS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_STEPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        etapes: action.payload,
        error: null,
        success: "fetched steps successfully",
      };
    case GET_STEPS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case ASSIGN_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ASSIGN_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.projectId === action.payload.projectId
            ? { ...project, domaines: action.payload.domaines }
            : project
        ),
        isLoading: false,
      };
    case ASSIGN_PROJECT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case ASSIGN_TEST_CASE_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
      };
    case EXECUTE_TEST_CASE_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
      };

    case CREATE_CAS_TEST_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CREATE_CAS_TEST_SUCCESS:
      console.log("added cas test", action.payload);
      return {
        ...state,
        isLoading: false,
        fonctionnalite: state.fonctionnalite.map((fonc) =>
          fonc.id === action.payload.fonctionnalite.id
            ? {
                ...fonc,
                casTests: [...fonc.casTests, action.payload],
              }
            : fonc
        ),
      };
    case CREATE_CAS_TEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case FETCH_USER_PROJECTS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_USER_PROJECTS_SUCCESS:
      return { ...state, isLoading: false, projectsData: action.payload };
    case FETCH_USER_PROJECTS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case SUBMIT_TEST_RESULT_REQUEST:
      return { ...state, isLoading: true };
    case SUBMIT_TEST_RESULT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        testSuccessfull: "Test Reussi",
        testError: null,
      };
    case SUBMIT_TEST_RESULT_FAILURE:
      return {
        ...state,
        isLoading: false,
        testError: "Test Non Reussi",
        testSuccessfull: null,
      };

    case GET_TEST_RESULT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TEST_RESULT_SUCCESS:
      const updatedTestResults = action.payload.reduce(
        (acc, result) => {
          acc[result.testCaseDescriptionId] = result;
          return acc;
        },
        { ...state.testResults }
      );
      return {
        ...state,
        isLoading: false,
        testResults: updatedTestResults,
      };
    case GET_TEST_RESULT_FAILURE:
      return {
        ...state,
        isLoading: false,
        testError: action.payload,
      };

    case CREATE_SOUS_DOMAINE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CREATE_SOUS_DOMAINE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sous_domaines: action.payload,
        error: null,
      };
    case CREATE_SOUS_DOMAINE_FAILURE:
      return {
        ...state,
        loading: false,
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
