import { type } from "@testing-library/user-event/dist/type";
import {
  ACTIVATE_USER_FAILURE,
  ACTIVATE_USER_REQUEST,
  ACTIVATE_USER_SUCCESS,
  ADD_PROJECT_FAILURE,
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_SUCCESS,
  ASSIGN_DOMAIN_FAILURE,
  ASSIGN_DOMAIN_REQUEST,
  ASSIGN_DOMAIN_SUCCESS,
  ASSIGN_PROJECT_FAILURE,
  ASSIGN_PROJECT_REQUEST,
  ASSIGN_PROJECT_SUCCESS,
  CREATE_CAHIER_TEST_GLOBAL_FAILURE,
  CREATE_CAHIER_TEST_GLOBAL_REQUEST,
  CREATE_CAHIER_TEST_GLOBAL_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
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
  LOGOUT,
  SUSPEND_USER_FAILURE,
  SUSPEND_USER_REQUEST,
  SUSPEND_USER_SUCCESS,
} from "./ActionType";
import axios from "axios";
import { API_URL, api } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { Api } from "@mui/icons-material";

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

export const getProjects = (jwt) => async (dispatch) => {
  dispatch({ type: "GET_PROJECT_REQUEST" });
  try {
    const { data } = await api.get("/api/allProjects");

    dispatch({ type: "GET_PROJECT_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_PROJECT_FAILURE", payload: error });
    console.log("failed with error", error);
  }
};

export const getProjectsByUserId = (jwt) => async (dispatch) => {
  dispatch({ type: GET_PROJECT_REQUEST });
  try {
    const { data } = await api.get("/api/userProjects", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

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

export const addProject = (projectData) => async (dispatch) => {
  dispatch({ type: ADD_PROJECT_REQUEST });
  const jwt = localStorage.getItem("jwt");

  console.log(projectData);
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
    console.log("Success");
  } catch (error) {
    dispatch({ type: ADD_PROJECT_FAILURE, payload: error });
    console.log("failed with error", error);
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
    console.log("receoived projectId before action", projectId);
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
    console.log(data);
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
        projectId: projectId, // Make sure projectId is passed here
      });
      dispatch({ type: ASSIGN_DOMAIN_SUCCESS, payload: response.data });
      console.log("assignement successfull", response.data);
    } catch (error) {
      dispatch({ type: ASSIGN_DOMAIN_FAILURE, payload: error });
    }
  };

export const logout = (navigate) => async (dispatch) => {
  dispatch({ type: LOGOUT }); // Ensure this action type is correctly defined somewhere
  try {
    localStorage.clear();
    navigate("/login");
    dispatch({ type: LOGOUT });
    console.log("logout success");
  } catch (error) {
    console.log("error", error);
  }
};
