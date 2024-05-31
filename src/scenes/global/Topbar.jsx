import { Box, IconButton, Menu, Typography, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { MenuItem } from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../state/authentication/Action";
import { Button } from "../../componentsShadn/ui/button";
import { jwtDecode } from "jwt-decode";

const Topbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout(navigate));
  };
  const jwt = localStorage.getItem("jwt");
  const decoded = jwtDecode(jwt);
  const userRole = decoded.authorities;

  return (
    // <Box
    //   display="flex"
    //   justifyContent="space-between"
    //   p={2}
    //   sx={{
    //     borderBottom: 1,
    //     borderColor: colors.primary[800],
    //   }}
    // >
    //   {/* SEARCH BAR */}
    //   {/* <Box
    //     display="flex"
    //     backgroundColor={colors.primary[400]}
    //     borderRadius="3px"
    //   >
    //     <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
    //     <IconButton type="button" sx={{ p: 1 }}>
    //       <SearchIcon />
    //     </IconButton>
    //   </Box> */}

    //   <Box></Box>

    //   {/* ICONS */}
    //   <Box display="flex">
    //     {/* <IconButton onClick={colorMode.toggleColorMode}>
    //       {theme.palette.mode === "dark" ? (
    //         <DarkModeOutlinedIcon />
    //       ) : (
    //         <LightModeOutlinedIcon />
    //       )}
    //     </IconButton> */}

    //     <IconButton>
    //       <PersonOutlinedIcon
    //         id="basic-button"
    //         aria-controls={open ? "basic-menu" : undefined}
    //         aria-haspopup="true"
    //         aria-expanded={open ? "true" : undefined}
    //         onClick={handleClick}
    //         sx={{ color: colors.primary[800] }}
    //       />
    //     </IconButton>
    //     <Menu
    //       id="basic-menu"
    //       anchorEl={anchorEl}
    //       open={open}
    //       onClose={handleClose}
    //       MenuListProps={{
    //         "aria-labelledby": "basic-button",
    //       }}
    //     >
    //       <MenuItem>
    //         <Typography sx={{ px: 2 }}>Profil</Typography>
    //       </MenuItem>
    //       <MenuItem>
    //         <Typography sx={{ px: 2 }}>Mon Compte</Typography>
    //       </MenuItem>
    //       <Button
    //         sx={{
    //           px: 2,
    //           mt: 1,
    //           color: "text.primary",
    //           backgroundColor: colors.primary[800],
    //         }}
    //
    //       >
    //         Déconnection
    //       </Button>
    //     </Menu>
    //   </Box>
    // </Box>
    <div className=" py-2 flex justify-center pr-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)] items-center">
      <h1 className="text-gray-600 font-bold text-2xl">
        Bonjour , {decoded.firstName} {decoded.lastName}
      </h1>
    </div>
  );
};

export default Topbar;
