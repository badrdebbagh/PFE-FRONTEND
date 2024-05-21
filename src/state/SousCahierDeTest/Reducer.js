import {
  CLEAR_SOUS_CAHIER,
  CREATE_SOUS_CAHIER_DE_TEST_FAILURE,
  CREATE_SOUS_CAHIER_DE_TEST_REQUEST,
  CREATE_SOUS_CAHIER_DE_TEST_SUCCESS,
  GET_SOUS_CAHIER_DE_TESTS_FAILURE,
  GET_SOUS_CAHIER_DE_TESTS_REQUEST,
  GET_SOUS_CAHIER_DE_TESTS_SUCCESS,
} from "./ActionType";

const initialState = {
  sous_cahiers: [],
  isLoading: false,
  error: null,
};

export const clearSousCahier = () => ({
  type: CLEAR_SOUS_CAHIER,
});

export const sous_cahierReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SOUS_CAHIER_DE_TEST_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };
    case CREATE_SOUS_CAHIER_DE_TEST_SUCCESS:
      
      return {
        ...state,
        isLoading: false,
        sous_cahiers: [...state.sous_cahiers, action.payload],
        success: "Sous-cahier created successfully!",
      };
    case CREATE_SOUS_CAHIER_DE_TEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case GET_SOUS_CAHIER_DE_TESTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_SOUS_CAHIER_DE_TESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sous_cahiers: action.payload,
      };
    case GET_SOUS_CAHIER_DE_TESTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CLEAR_SOUS_CAHIER:
      return {
        ...state,
        sous_cahiers: [],
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};
