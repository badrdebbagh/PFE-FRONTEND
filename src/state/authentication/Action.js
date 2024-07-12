import { type } from "@testing-library/user-event/dist/type";
import {
  ACTIVATE_USER_FAILURE,
  ACTIVATE_USER_REQUEST,
  ACTIVATE_USER_SUCCESS,
  ADD_PROJECT_FAILURE,
  ADD_PROJECT_REQUEST,
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
  CREATE_DOMAINE_FAILURE,
  CREATE_DOMAINE_REQUEST,
  CREATE_DOMAINE_SUCCESS,
  CREATE_FUNCTIONNALITY_FAILURE,
  CREATE_FUNCTIONNALITY_REQUEST,
  CREATE_FUNCTIONNALITY_SUCCESS,
  CREATE_SOUS_DOMAINE_FAILURE,
  CREATE_SOUS_DOMAINE_REQUEST,
  CREATE_SOUS_DOMAINE_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  EXECUTE_TEST_CASE_SUCCESS,
  FETCH_TEST_ITERATIONS_FAILURE,
  FETCH_TEST_ITERATIONS_REQUEST,
  FETCH_TEST_ITERATIONS_SUCCESS,
  FETCH_TEST_PLANS_FAILURE,
  FETCH_TEST_PLANS_REQUEST,
  FETCH_TEST_PLANS_SUCCESS,
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
  LOGOUT,
  SUBMIT_TEST_RESULT_FAILURE,
  SUBMIT_TEST_RESULT_REQUEST,
  SUBMIT_TEST_RESULT_SUCCESS,
  SUSPEND_USER_FAILURE,
  SUSPEND_USER_REQUEST,
  SUSPEND_USER_SUCCESS,
} from "./ActionType";
import axios from "axios";
import { API_URL, api } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { Api } from "@mui/icons-material";
import {
  CREATE_SOUS_CAHIER_DE_TEST_FAILURE,
  CREATE_SOUS_CAHIER_DE_TEST_REQUEST,
  CREATE_SOUS_CAHIER_DE_TEST_SUCCESS,
} from "../SousCahierDeTest/ActionType";

export const loginUser = (reqData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_URL}/auth/signin`,
      reqData.userData
    );

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
    }

    reqData.navigate("/");
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });
    console.log("error", error);
  }
};

export const getProjects = () => async (dispatch) => {
  dispatch({ type: "GET_PROJECT_REQUEST" });
  try {
    const { data } = await api.get("/api/allProjects");

    dispatch({ type: "GET_PROJECT_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_PROJECT_FAILURE", payload: error });
    console.log("failed with error", error);
  }
};

export const getProjectsByUserIdAndDomain = (jwt) => async (dispatch) => {
  dispatch({ type: GET_PROJECT_REQUEST });
  try {
    const { data } = await api.get("/api/userProjects", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({ type: GET_PROJECT_SUCCESS, payload: data });
    console.log("success", data);
  } catch (error) {
    console.log("Error fetching user projects with roles", error);
    dispatch({ type: GET_PROJECT_FAILURE, payload: error });
  }
};

export const getProjectsByUserId = (jwt) => async (dispatch) => {
  dispatch({ type: GET_PROJECT_REQUEST });
  try {
    console.log("Dispatching getProjectsByUserId");
    const { data } = await api.get("/api/userProjects2", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    console.log("projects API Response", data);
    dispatch({ type: GET_PROJECT_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error fetching user projects with roles", error);
    dispatch({ type: GET_PROJECT_FAILURE, payload: error });
  }
};

export const assignProjectToUser =
  (userId, projectId, role) => async (dispatch) => {
    console.log("function called");
    dispatch({ type: ASSIGN_PROJECT_REQUEST });
    const jwt = localStorage.getItem("jwt");

    try {
      const { data } = await api.put(
        `api/user/${userId}/project/${projectId}`,
        JSON.stringify(role),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({ type: ASSIGN_PROJECT_SUCCESS, payload: data });
      console.log("Project assigned successfully", data);
    } catch (error) {
      dispatch({ type: ASSIGN_PROJECT_FAILURE, payload: error });
      console.log("Failed to assign project with error", error);
    }
  };

export const assignDomaineToProjectForUser =
  (userId, domaineId, projectId) => async (dispatch) => {
    dispatch({ type: ASSIGN_PROJECT_REQUEST });
    try {
      const response = await axios.post(
        `${API_URL}/api/${userId}/domaines/${domaineId}/projects/${projectId}`
      );
      dispatch({
        type: ASSIGN_PROJECT_SUCCESS,
        payload: response.data,
      });
      console.log("domaine assigned successfully", response.data);
    } catch (error) {
      dispatch({ type: ASSIGN_PROJECT_FAILURE, payload: error });

      // Handle error if necessary
    }
  };

export const addProject = (projectData) => async (dispatch) => {
  console.log("recceived data", projectData);
  dispatch({ type: ADD_PROJECT_REQUEST });
  const jwt = localStorage.getItem("jwt");

  try {
    const { data } = await axios.post(
      `${API_URL}/api/createProjectWithDomaine`,
      projectData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({ type: ADD_PROJECT_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: ADD_PROJECT_FAILURE, payload: error });
    throw error;
  }
};
export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const { data } = await api.get("/api/allUsers", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error });
    console.log("Failed with error", error);
  }
};

export const suspendUser = (id, jwt) => async (dispatch) => {
  dispatch({ type: SUSPEND_USER_REQUEST });
  try {
    await api.put(
      `/api/suspendUser/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
    dispatch({ type: SUSPEND_USER_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: SUSPEND_USER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const activateUser = (id, jwt) => async (dispatch) => {
  dispatch({ type: ACTIVATE_USER_REQUEST });
  try {
    await api.put(
      `/api/activateUser/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
    dispatch({ type: ACTIVATE_USER_SUCCESS, payload: id });
    console.log("Activated user");
  } catch (error) {
    dispatch({
      type: ACTIVATE_USER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = (id, jwt) => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });

  try {
    const response = await api.delete(`/api/deleteUser/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAILURE, payload: error });
    console.error("Failed to delete user", error);
  }
};

export const fetchActiveUsers = () => async (dispatch) => {
  dispatch({ type: "FETCH_USERS_REQUEST" });
  try {
    const response = await api.get("/api/users/");
    dispatch({ type: "FETCH_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_USERS_FAILURE", payload: error });
  }
};

export const getRoles = () => async (dispatch) => {
  dispatch({ type: GET_ROLE_REQUEST });
  try {
    const { data } = await api.get("/api/roles");
    dispatch({ type: GET_ROLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ROLE_FAILURE, payload: error });
  }
};

export const createCahierDeTestGlobal =
  (cahierDeTestGlobal) => async (dispatch) => {
    const { projectId, nom } = cahierDeTestGlobal;

    dispatch({ type: CREATE_CAHIER_TEST_GLOBAL_REQUEST });
    try {
      const response = await api.post(`/api/create/${projectId}`, { nom });
      dispatch({
        type: CREATE_CAHIER_TEST_GLOBAL_SUCCESS,
        payload: response.data,
      });
      console.log("created cahier de test ", response.data);
    } catch (error) {
      dispatch({ type: CREATE_CAHIER_TEST_GLOBAL_FAILURE, payload: error });
    }
  };

export const getProjectRoles = () => async (dispatch) => {
  dispatch({ type: GET_PROJECT_ROLE_REQUEST });
  try {
    const { data } = await api.get("/api/userRoles");
    console.log("roooooooels", data);
    dispatch({ type: GET_PROJECT_ROLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PROJECT_ROLE_FAILURE, payload: error });
  }
};

export const getDomaines = () => async (dispatch) => {
  dispatch({ type: GET_DOMAINE_REQUEST });
  try {
    const { data } = await api.get("/api/domaines");
    dispatch({ type: GET_DOMAINE_SUCCESS, payload: data });
    console.log("fetched comaines", data);
  } catch (error) {
    dispatch({ type: GET_DOMAINE_FAILURE, payload: error });
  }
};
export const getSousDomaines = () => async (dispatch) => {
  dispatch({ type: GET_SOUS_DOMAINE_REQUEST });
  try {
    const { data } = await api.get("/api/sousDomaines");
    dispatch({ type: GET_SOUS_DOMAINE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_SOUS_DOMAINE_FAILURE, payload: error });
  }
};

export const assignDomainToProject =
  (projectId, domaineId) => async (dispatch) => {
    dispatch({ type: ASSIGN_DOMAIN_REQUEST });
    try {
      const response = await axios.post(
        `${API_URL}/api/${projectId}/assignDomaine`,
        null,
        {
          params: { domaineId },
        }
      );
      dispatch({
        type: ASSIGN_DOMAIN_SUCCESS,
        payload: response.data,
        projectId: projectId,
      });

      console.log("assignement successfull", response.data);
    } catch (error) {
      dispatch({ type: ASSIGN_DOMAIN_FAILURE, payload: error });
    }
  };

export const getFunctionnalities =
  (domaineId, projectId, cahierDeTestId) => async (dispatch) => {
    dispatch({ type: GET_FUNCTIONNALITY_REQUEST });
    try {
      const { data } = await api.get("/api/functionalities", {
        params: { domaineId, projectId, cahierDeTestId },
      });
      console.log("API Response:", data);

      dispatch({ type: GET_FUNCTIONNALITY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_FUNCTIONNALITY_FAILURE, payload: error });
    }
  };

export const createFunctionnality = (
  nom,
  domaineId,
  projectId,
  cahierDeTestId
) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_FUNCTIONNALITY_REQUEST });
    try {
      const response = await api.post(
        `${API_URL}/api/createFunctionnality`,
        null,
        {
          params: { nom, domaineId, projectId, cahierDeTestId },
        }
      );
      dispatch({ type: CREATE_FUNCTIONNALITY_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_FUNCTIONNALITY_FAILURE, payload: error });
    }
  };
};

export const fetchTestCases =
  (domaineId, projectId, cahierDeTestId, fonctionnaliteId) =>
  async (dispatch) => {
    dispatch({ type: GET_TEST_CASE_REQUEST });
    try {
      const jwt = localStorage.getItem("jwt");

      const response = await api.get("/casTests", {
        params: {
          domaineId,
          projectId,
          cahierDeTestId,
          fonctionnaliteId,
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({ type: GET_TEST_CASE_SUCCESS, payload: response.data });
      console.log("fetched cad de test", response.data);
    } catch (error) {
      dispatch({ type: GET_TEST_CASE_FAILURE, payload: error });
    }
  };

export const addTestCaseDescription =
  (testCaseId, descriptionData) => async (dispatch) => {
    console.log("received data", testCaseId, descriptionData);
    dispatch({ type: ADD_TEST_CASE_DESCRIPTION_REQUEST });
    try {
      const response = await api.post(
        `/api/testcases/${testCaseId}`,
        descriptionData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      dispatch({
        type: ADD_TEST_CASE_DESCRIPTION_SUCCESS,
        payload: response.data,
      });
      console.log(
        "Test case description added/updated successfully",
        response.data
      );
    } catch (error) {
      dispatch({
        type: ADD_TEST_CASE_DESCRIPTION_FAILURE,
        payload: error.response
          ? error.response.data
          : "Could not connect to API",
      });
      console.error("Failed to add/update test case description", error);
    }
  };

export const getSteps = (testCaseId) => async (dispatch) => {
  dispatch({ type: GET_STEPS_REQUEST });
  try {
    const { data } = await api.get(`/api/etape/${testCaseId}`);
    dispatch({ type: GET_STEPS_SUCCESS, payload: data });
    console.log("Test case fetched", data);
  } catch (error) {
    dispatch({ type: GET_STEPS_FAILURE, payload: error });
  }
};

export const assignTestCase =
  (testCaseId, username, jwt) => async (dispatch) => {
    try {
      const response = await axios.post(
        `/admin/testcases/${testCaseId}/assign`,
        { username },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: ASSIGN_TEST_CASE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error assigning test case", error);
    }
  };

export const executeTestCase = (testCaseId, jwt) => async (dispatch) => {
  try {
    const response = await axios.post(
      `/user/testcases/${testCaseId}/execute`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch({
      type: EXECUTE_TEST_CASE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error executing test case", error);
  }
};

export const getTestCasesByUserId = (userId, projectId) => async (dispatch) => {
  dispatch({ type: GET_TEST_CASE_REQUEST });
  try {
    const { data } = await api.get(
      `/api/user/${userId}/projects/${projectId}/testcases`
    );

    dispatch({ type: GET_TEST_CASE_SUCCESS, payload: data });
    console.log("Getting test cases", data);
  } catch (error) {
    dispatch({ type: GET_TEST_CASE_FAILURE, payload: error });
  }
};

export const createCasTest =
  (
    titre,
    description,
    domaineId,
    fonctionnaliteId,
    projectId,
    cahierDeTestId
  ) =>
  async (dispatch) => {
    console.log(
      "received cas",
      titre,
      description,
      domaineId,
      fonctionnaliteId,
      projectId,
      cahierDeTestId
    );
    dispatch({ type: CREATE_CAS_TEST_REQUEST });
    try {
      const { data } = await axios.post(`${API_URL}/api/createCasTest`, null, {
        params: {
          titre,
          description,
          domaineId,
          fonctionnaliteId,
          projectId,
          cahierDeTestId,
        },
      });
      dispatch({ type: CREATE_CAS_TEST_SUCCESS, payload: data });
      console.log("dwd3w", data);
    } catch (error) {
      dispatch({ type: CREATE_CAS_TEST_FAILURE, payload: error });
    }
  };

export const fetchUserProjects = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_USER_PROJECTS_REQUEST });

  try {
    const response = await api.get(`/api/user/${userId}/projects`);
    dispatch({ type: FETCH_USER_PROJECTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_USER_PROJECTS_FAILURE, payload: error.message });
  }
};

export const submitTestResult = (testResultData) => async (dispatch) => {
  console.log("RECEIVED", testResultData);
  dispatch({ type: SUBMIT_TEST_RESULT_REQUEST });

  try {
    const response = await axios.post(
      `${API_URL}/api/test-results`,
      testResultData
    );
    dispatch({
      type: SUBMIT_TEST_RESULT_SUCCESS,
      payload: response.data,
    });
    console.log("TEST RESULTr32r23r23 ", response.data);
  } catch (error) {
    dispatch({
      type: SUBMIT_TEST_RESULT_FAILURE,
      payload: error.message,
    });
  }
};

export const getTestResults =
  (testCaseDescriptionId, cahierDeTestId) => async (dispatch) => {
    console.log(
      "receiveddefeiughdfw3ugqfde",
      testCaseDescriptionId,
      cahierDeTestId
    );
    dispatch({ type: GET_TEST_RESULT_REQUEST });
    try {
      const response = await api.get(`/api/test-results`, {
        params: { testCaseDescriptionId, cahierDeTestId },
      });
      dispatch({
        type: GET_TEST_RESULT_SUCCESS,
        payload: response.data,
      });
      console.log("received resulsts", response.data);
    } catch (error) {
      dispatch({ type: GET_TEST_RESULT_FAILURE, payload: error.message });
    }
  };

export const addSousDomaine = (sousDomaineData) => async (dispatch) => {
  console.log("received sous domaine", sousDomaineData);
  dispatch({ type: CREATE_SOUS_DOMAINE_REQUEST });

  try {
    const { data } = await axios.post(
      `${API_URL}/api/sousDomaines/create`,
      sousDomaineData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: CREATE_SOUS_DOMAINE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_SOUS_DOMAINE_FAILURE, payload: error });
  }
};

export const addDomaine = (domaineData) => async (dispatch) => {
  console.log("received sous domaine", domaineData);
  dispatch({ type: CREATE_DOMAINE_REQUEST });

  try {
    const { data } = await axios.post(
      `${API_URL}/api/domaines/create`,
      domaineData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: CREATE_DOMAINE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_DOMAINE_FAILURE, payload: error });
  }
};

export const fetchTestPlans = (projectId) => async (dispatch) => {
  dispatch({ type: FETCH_TEST_PLANS_REQUEST });
  try {
    const { data } = await api.get(`/api/test-plans/project/${projectId}`);
    dispatch({ type: FETCH_TEST_PLANS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_TEST_PLANS_FAILURE, payload: error.message });
  }
};

export const fetchTestIterations = (testPlanId) => async (dispatch) => {
  dispatch({ type: FETCH_TEST_ITERATIONS_REQUEST });
  try {
    const { data } = await api.get(`/api/test-plans/${testPlanId}/iterations`);
    dispatch({ type: FETCH_TEST_ITERATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_TEST_ITERATIONS_FAILURE, payload: error.message });
  }
};

export const logout = (navigate) => async (dispatch) => {
  dispatch({ type: LOGOUT });
  try {
    localStorage.clear();
    navigate("/login");
    dispatch({ type: LOGOUT });
    console.log("logout success");
  } catch (error) {
    console.log("error", error);
  }
};
