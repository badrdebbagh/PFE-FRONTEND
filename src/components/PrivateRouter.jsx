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
import CahierDeTestGlobal from "../scenes/tests";
import { jwtDecode } from "jwt-decode";
import Projects from "../scenes/projects";
import ChefProjects from "../scenes/chefProjects";
import ProjectsAdmin from "../scenes/projectsAdmin";
import ProjectCard from "../scenes/projectscardtest";
import ProjectDetails from "../scenes/projectDetails";
import UserProjectsCopy from "../scenes/UserProjectscopy";
import Projects2 from "../scenes/projects";
import TeamCopy from "../scenes/team";
import CahierDetails from "../scenes/souscahierdetestDetails";
import Test2 from "../scenes/tests2";
import ProjectsTesteur from "../scenes/projectsTesteur";
import NewForm from "../scenes/userForm";
import Affectation2 from "../scenes/Affectation/index2";
import Dashboard2 from "../scenes/dashboard2";

const PrivateRouter = ({ children }) => {
  const jwt = localStorage.getItem("jwt");
  const isAuthenticated = Boolean(jwt); // Simple check. Adjust according to your auth logic.
  const decoded = jwtDecode(jwt); // Assuming JWT is in action.payload.jwt
  console.log(decoded);

  const userRole = decoded.authorities;

  return isAuthenticated ? (
    <Routes>
      {userRole === "ADMIN" && (
        <>
          <Route path="/" element={<Dashboard2 />} />
          <Route path="/team" element={<Team />} />
          <Route path="/form" element={<NewForm />} />
          <Route path="/form2" element={<Form />} />
          <Route path="/addproject" element={<ProjectForm />} />
          <Route path="/projects" element={<ProjectCard />} />
          <Route path="/projecttest" element={<ProjectCard />} />
          <Route path="/cahierglobal" element={<CahierDeTestGlobal />} />
          <Route path="/affectation" element={<Affectation />} />
          <Route path="/affectation/:userId" element={<UserProjects />} />
          {/* <Route path="/project/:projectId" element={<ProjectDetails />} />
            <Route path="/projects/:projectId" element={<CahierDetails />} /> */}
        </>
      )}
      {userRole === "CHEF_DE_PROJECT" && (
        <>
          {/* <Route path="/affectation" element={<Affectation />} /> */}
          <Route path="/affectation" element={<Affectation2 />} />
          <Route path="/affectation/:userId" element={<UserProjectsCopy />} />
          <Route path="/projects" element={<Projects />} />
        </>
      )}
      {userRole === "USER" && (
        <>
          <Route path="/projects2" element={<Projects2 />} />
          <Route path="/project23" element={<Projects />} />
          {/* <Route path="/tests" element={<CahierDeTestGlobal />} /> */}
          <Route path="/tests" element={<Test2 />} />

          <Route path="/saisieProjets" element={<ProjectsTesteur />} />
          <Route path="/project/:projectId" element={<ProjectDetails />} />
          <Route path="/projects/:projectId" element={<CahierDetails />} />
        </>
      )}
    </Routes>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRouter;
