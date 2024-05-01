import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getProjects,
  getProjectsByUserId,
} from "../../state/authentication/Action";

const ProjectsAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const jwt = localStorage.getItem("jwt");
  const isLoading = useSelector((state) => state.auth.isLoading);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "nom",
      headerName: "Nom du projet",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Button
          color="secondary"
          onClick={() => navigate(`/project/${params.id}`)} // Navigate on click
        >
          {params.value}
        </Button>
      ),
    },

    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "chefDeProjet",
      headerName: "Chef De Projet",
      flex: 1,
    },
  ];

  const projects = useSelector((state) => state.auth.projects);
  console.log("projeecfetecdte", projects);

  // useEffect(() => {
  //   const loadJWT = async () => {
  //     const token = await localStorage.getItem("jwt");
  //     if (token) {
  //       dispatch(getProjectsByUserId(token));
  //     }
  //   };

  //   loadJWT();
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="75vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleAddUser = () => {
    navigate("/addProject");
  };

  return (
    <Box m="20px">
      <Header title="Projets" subtitle="Gestion des membres de l'equipe" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          getRowId={(row) => row.id}
          checkboxSelection
          rows={projects}
          columns={columns}
        />
        <Button
          onClick={handleAddUser}
          sx={{ mt: 2 }}
          type="submit"
          color="secondary"
          variant="contained"
        >
          Creer nouveau projet
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectsAdmin;
