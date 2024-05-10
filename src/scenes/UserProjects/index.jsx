import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  ListItemText,
  NativeSelect,
  Select,
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
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  assignProjectToUser,
  getProjectRoles,
  getProjects,
} from "../../state/authentication/Action";
import { MenuItem } from "react-pro-sidebar";

const UserProjects = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const { projectRoles } = useSelector((state) => state.auth);

  const { userId } = useParams();

  const [selectedProjectRoles, setSelectedProjectRoles] = useState([]);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "nom",
      headerName: "Nom",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => (
        <FormControl fullWidth>
          <InputLabel htmlFor={`role-select-${params.id}`}>Role</InputLabel>
          <Select
            labelId={`role-select-label-${params.id}`}
            id={`role-select-${params.id}`}
            value={selectedProjectRoles[params.id] || ""}
            onChange={(event) => handleRoleChange(params.id, event)}
            onOpen={loadRoles}
            renderValue={(selected) => selected}
            MenuProps={{
              PaperProps: { style: { maxHeight: 48 * 4.5 + 8, width: 250 } },
            }}
          >
            {projectRoles.map((projectRole) => (
              <MenuItem key={projectRole} value={projectRole}>
                {projectRole}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    },

    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          // onClick={() => handleDeleteUser(params.id)}
          sx={{ backgroundColor: colors.primary[100] }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleRoleChange = (projectId, event) => {
    const { value } = event.target;
    setSelectedProjectRoles((prev) => ({
      ...prev,
      [projectId]: value,
    }));
  };
  const loadRoles = () => {
    dispatch(getProjectRoles());
  };

  const projects = useSelector((state) => state.auth.projects);

  useEffect(() => {
    console.log(projects);
    dispatch(getProjects());
  }, [dispatch]);

  const handleProjectSelection = (ids) => {
    setSelectedProjects(ids);
    console.log(ids);
  };

  const assignProjectsToUser = () => {
    console.log("hello");
    selectedProjects.forEach((projectId) => {
      const role = selectedProjectRoles[projectId];
      console.log(`Assigning role: ${role} to project ID: ${projectId}`);
      if (role) {
        dispatch(assignProjectToUser(userId, projectId, role));
      } else {
        console.log("No role selected for project:", projectId);
      }
    });
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Box m="20px">
      <Header
        title="Projets Utilisateurs"
        subtitle="Gestion des membres de l'equipe"
      />
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
          onSelectionModelChange={handleProjectSelection}
          checkboxSelection
          rows={projects}
          columns={columns}
          getRowId={(row) => row.uniqueId || row.id}
        />
        <Button
          onClick={assignProjectsToUser}
          sx={{ mt: 2 }}
          type="submit"
          color="secondary"
          variant="contained"
        >
          Affecter projet a lutilisateur
        </Button>
      </Box>
    </Box>
  );
};

export default UserProjects;
