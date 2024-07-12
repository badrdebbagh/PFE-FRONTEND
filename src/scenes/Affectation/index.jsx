import { useSelector } from "react-redux";
import { DataTable } from "../../components/data-table";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
const Affectation = () => {
  const navigate = useNavigate(); // Get navigate function for navigation

  const handleRowClick = (params) => {
    if (params.field === "firstName" || params.field === "lastName") {
      const userId = params.row.id;
      navigate(`/user/${userId}`);
    }
  };
  const { user } = useSelector((state) => state.auth);

  const onlyUser = user.filter((user) => user.role === "USER");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "firstName",
      headerName: "Prenom",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Button
          color="secondary"
          onClick={() => navigate(`/affectation/${params.id}`)} // Navigate on click
        >
          {params.value}
        </Button>
      ),
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
  ];
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
        <DataGrid
          onRowClick={handleRowClick}
          checkboxSelection
          rows={onlyUser}
          columns={columns}
          getRowId={(row) => row.uniqueId || row.id}
        />
      </Box>
    </Box>
  );
};

export default Affectation;
