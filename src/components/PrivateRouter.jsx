import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import Dashboard from "../scenes/dashboard";
import Team from "../scenes/team";
import Form from "../scenes/form";
import ProjectForm, { CardWithForm } from "../scenes/projectForm";
// import ProjectForm from "../scenes/projects";
import { useDispatch, useSelector } from "react-redux";
import UserProjects from "../scenes/UserProjects";
import { useEffect } from "react";
import { getRoles } from "@testing-library/react";
import Affectation from "../scenes/Affectation";
import CahierDeTestGlobal from "../scenes/cahierDeTestGlobal";
import { jwtDecode } from "jwt-decode";
import Projects from "../scenes/projects";
import ChefProjects from "../scenes/chefProjects";
import ProjectsAdmin from "../scenes/projectsAdmin";
import ProjectCard from "../scenes/projectscardtest";
import ProjectDetails from "../scenes/projectDetails";

const PrivateRouter = ({ children }) => {
  const jwt = localStorage.getItem("jwt");
  const isAuthenticated = Boolean(jwt); // Simple check. Adjust according to your auth logic.
  const decoded = jwtDecode(jwt); // Assuming JWT is in action.payload.jwt
  console.log("decodeddewdfe", decoded);
  const userRole = decoded.authorities;
  console.log("Role:", userRole);

  return isAuthenticated ? (
    <MainLayout>
      <Routes>
        {userRole === "ADMIN" && (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/form" element={<Form />} />
            <Route path="/addproject" element={<ProjectForm />} />
            <Route path="/projects" element={<ProjectCard />} />
            <Route path="/projecttest" element={<ProjectCard />} />
            <Route path="/cahierglobal" element={<CahierDeTestGlobal />} />
            <Route path="/affectation" element={<Affectation />} />
            <Route path="/affectation/:userId" element={<UserProjects />} />
            <Route path="/project/:projectId" element={<ProjectDetails />} />
          </>
        )}
        {userRole === "CHEF_DE_PROJECT" && (
          <>
            <Route path="/affectation" element={<Affectation />} />
            <Route path="/affectation/:userId" element={<UserProjects />} />
            <Route path="/projects" element={<Projects />} />
          </>
        )}
        {userRole === "USER" && (
          <>
            <Route path="/projects" element={<Projects />} />
            <Route path="/cahierglobal" element={<CahierDeTestGlobal />} />
          </>
        )}
      </Routes>
    </MainLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRouter;
