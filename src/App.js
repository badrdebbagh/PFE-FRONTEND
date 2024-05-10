import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Login from "./scenes/login";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";

import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./state/authentication/Action";
import Project from "./scenes/projectForm";
import PrivateRouter from "./components/PrivateRouter";
import { Toaster } from "./componentsShadn/ui/toaster";
import { LOGIN_SUCCESS } from "./state/authentication/ActionType";

function App() {
  const [theme, colorMode] = useMode();
  const dispatch = useDispatch();

  useEffect(() => {
    const jwtFromStorage = localStorage.getItem("jwt");
    if (jwtFromStorage) {
      dispatch({ type: LOGIN_SUCCESS, payload: jwtFromStorage });
    }
  }, [dispatch]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Private (Authenticated) Routes */}
          <Route path="*" element={<PrivateRouter />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
