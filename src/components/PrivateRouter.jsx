import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import Dashboard from "../scenes/dashboard";
import Team from "../scenes/team";
import Form from "../scenes/form";
import Project, { CardWithForm } from "../scenes/projectForm";
import ProjectForm from "../scenes/projects";
import { useDispatch, useSelector } from "react-redux";
import UserProjects from "../scenes/UserProjects";
import { useEffect } from "react";
import { getRoles } from "@testing-library/react";

const PrivateRouter = ({ children }) => {
  const jwt = localStorage.getItem("jwt");
  const isAuthenticated = Boolean(jwt); // Simple check. Adjust according to your auth logic.
  // const userRole = useSelector((store) => store.auth.user.roles);

  const roles = useSelector((state) => state.auth.roles);
  console.log(roles);

  return isAuthenticated ? (
    <MainLayout>
      <Routes>
        {/* {userRole === "admin" && ( */}
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/form" element={<Form />} />
          <Route path="/addproject" element={<Project />} />
          <Route path="/projects" element={<ProjectForm />} />
          <Route path="/userProjects" element={<UserProjects />} />
        </>
        {/* )} */}
        {/* {userRole === "user" && ( */}
        <>
          <Route path="/" element={<Dashboard />} />
          {/* Add routes specific to regular users */}
        </>
        {/* )} */}
      </Routes>
    </MainLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRouter;
