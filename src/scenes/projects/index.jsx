import { useEffect, useState } from "react";
import DataTable from "./data-table";

import {
  assignProjectToUser,
  getProjects,
  getProjectsByUserId,
  getProjectsByUserIdAndDomain,
} from "../../state/authentication/Action";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../../componentsShadn/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../componentsShadn/ui/select";
import { getProjectRoles } from "../../state/authentication/Action";
import { jwtDecode } from "jwt-decode";

const Projects2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.auth.projects);

  useEffect(() => {
    const loadJWT = async () => {
      const token = await localStorage.getItem("jwt");
      if (token) {
        dispatch(getProjectsByUserIdAndDomain(token));
      }
    };

    loadJWT();
  }, [dispatch]);

  const [selectedDomaines, setSelectedDomaines] = useState({});

  const handleRoleChange = (projectId, domaines) => {
    console.log("projectID", projectId);
    setSelectedDomaines((prevDomaines) => ({
      ...prevDomaines,
      [projectId]: domaines,
    }));
  };

  const columns = [
    {
      accessorKey: "projectName",
      header: "Nom du projet",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
  ];
  return (
    <div>
      <div className="px-8">
        <DataTable columns={columns} data={projects} />
      </div>

      {/* <div className="flex items-center justify-center mt-6">
        <Button variant="secondary">Assign Project to user</Button>
      </div> */}
    </div>
  );
};

export default Projects2;
