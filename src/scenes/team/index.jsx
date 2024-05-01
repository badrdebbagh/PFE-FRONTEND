import { Box, Button, Typography, useTheme } from "@mui/material";
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
  getUser,
  suspendUser,
} from "../../state/authentication/Action";

const Team = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const jwt = localStorage.getItem("jwt");
  const { user } = useSelector((state) => state.auth);
  const utilisateurOnly = user.filter((user) => user.role === "USER");
  console.log("user only", utilisateurOnly);
  console.log("uieuirr", user);
  const handleSuspendUser = (id) => {
    dispatch(suspendUser(id, jwt));
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "firstName",
      headerName: "Prenom",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Nom",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "suspended",
      headerName: "État",
      flex: 1,
      renderCell: (params) =>
        params.row.suspended ? (
          <Typography color="error">Suspended</Typography>
        ) : (
          <Typography color="secondary">Active</Typography>
        ),
    },

    {
      field: "Action",
      headerName: "Suspendre",
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={(event) => {
            event.stopPropagation();
            if (params.row.suspended) {
              handleSuspendUser(params.id);
            } else {
              handleSuspendUser(params.id);
            }
          }}
          sx={{ backgroundColor: colors.primary[100], width: 200 }}
        >
          {params.row.suspended ? "Activer" : "Suspendre"}
        </Button>
      ),
    },

    // {
    //   field: "accessLevel",
    //   headerName: "Access Level",
    //   flex: 1,
    //   renderCell: ({ row: { access } }) => {
    //     return (
    //       <Box
    //         width="60%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           access === "admin"
    //             ? colors.greenAccent[600]
    //             : access === "manager"
    //             ? colors.greenAccent[700]
    //             : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >
    //         {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
    //         {access === "manager" && <SecurityOutlinedIcon />}
    //         {access === "user" && <LockOpenOutlinedIcon />}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {access}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
  ];

  useEffect(() => {
    dispatch(getUser(jwt));
  }, []);

  const handleAddUser = () => {
    navigate("/form");
  };
  return (
    <Box m="20px">
      <Header title="Equipe" subtitle="Gestion des membres de l'equipe" />
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
        <DataGrid checkboxSelection rows={user} columns={columns} />
        <Button
          onClick={handleAddUser}
          sx={{ mt: 2 }}
          type="submit"
          color="secondary"
          variant="contained"
        >
          Create New User
        </Button>
      </Box>
    </Box>
  );
};

export default Team;
