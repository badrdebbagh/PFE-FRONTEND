import axios from "axios";
import { API_URL, api } from "../../config/api";
import { useDispatch } from "react-redux";
import {
  CREATE_SOUS_CAHIER_DE_TEST_FAILURE,
  CREATE_SOUS_CAHIER_DE_TEST_REQUEST,
  CREATE_SOUS_CAHIER_DE_TEST_SUCCESS,
  GET_SOUS_CAHIER_DE_TESTS_FAILURE,
  GET_SOUS_CAHIER_DE_TESTS_REQUEST,
  GET_SOUS_CAHIER_DE_TESTS_SUCCESS,
} from "./ActionType";

export const fetchCahiers = (cahierDeTestGlobalId) => async (dispatch) => {
  dispatch({ type: GET_SOUS_CAHIER_DE_TESTS_REQUEST });
  try {
    const response = await api.get(
      `http://localhost:8080/api/cahierDeTestGlobal/${cahierDeTestGlobalId}/cahiers`
    );
    dispatch({
      type: GET_SOUS_CAHIER_DE_TESTS_SUCCESS,
      payload: response.data,
    });
    console.log("cahier de test ", response.data);
  } catch (error) {
    dispatch({
      type: GET_SOUS_CAHIER_DE_TESTS_FAILURE,
      payload: error.response.data,
    });
  }
};
export const fetchCahiersByDomain =
  (projectId, domaineId) => async (dispatch) => {
    console.log("Fetching ", projectId, domaineId);
    dispatch({ type: GET_SOUS_CAHIER_DE_TESTS_REQUEST });
    try {
      const response = await api.get(`/api/cahiers/${projectId}/${domaineId}`);

      dispatch({
        type: GET_SOUS_CAHIER_DE_TESTS_SUCCESS,
        payload: response.data,
      });
      console.log(
        "Dispatched GET_SOUS_CAHIER_DE_TESTS_SUCCESS with payload:",
        response.data
      );
    } catch (error) {
      dispatch({
        type: GET_SOUS_CAHIER_DE_TESTS_FAILURE,
        payload: error.message,
      });
    }
  };

// export const createSousCahier = (sousCahierData) => async (dispatch) => {
//   console.log("Posting data:", sousCahierData);
//   dispatch({ type: CREATE_SOUS_CAHIER_DE_TEST_REQUEST });

//   try {
//     const response = await axios.post(
//       `${API_URL}/api/createWithDomain`,
//       sousCahierData
//     );

//     dispatch({
//       type: CREATE_SOUS_CAHIER_DE_TEST_SUCCESS,
//       payload: response.data,
//     });
//     console.log("created cahier de test ", response.data);
//   } catch (error) {
//     dispatch({
//       type: CREATE_SOUS_CAHIER_DE_TEST_FAILURE,
//       payload: error.response
//         ? error.response.data
//         : "Unexpected error occurred",
//     });
//   }
// };
export const createSousCahier = (sousCahierData) => async (dispatch) => {
  console.log("received cahier", sousCahierData);
  dispatch({ type: CREATE_SOUS_CAHIER_DE_TEST_REQUEST });

  try {
    const response = await axios.post(
      `${API_URL}/api/createSousCahierDeTest`,
      sousCahierData
    );

    dispatch({
      type: CREATE_SOUS_CAHIER_DE_TEST_SUCCESS,
      payload: response.data,
    });

    console.log("Created Cahier de Test:", response.data);
  } catch (error) {
    dispatch({
      type: CREATE_SOUS_CAHIER_DE_TEST_FAILURE,
      payload: error,
    });
  }
};
