import { useEffect, useState } from "react";
import DataTable from "./data-table";

import {
  assignDomaineToProjectForUser,
  assignProjectToUser,
  getProjects,
  getProjectsByUserId,
} from "../../state/authentication/Action";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../../componentsShadn/ui/button";
import { useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../componentsShadn/ui/select";
import { getProjectDomaines } from "../../state/authentication/Action";

const UserProjectsCopy = () => {
  const projects = useSelector((state) => state.auth.projects);

  const dispatch = useDispatch();

  const { userId } = useParams();

  const [selectedDomaines, setSelectedDomaines] = useState({});

  const handleRoleChange = (projectId, domaines) => {
    console.log("projectID", projectId);
    setSelectedDomaines((prevDomaines) => ({
      ...prevDomaines,
      [projectId]: domaines,
    }));
  };

  const handleAssignDomaine = () => {
    Object.keys(selectedDomaines).forEach((projectId) => {
      const role = selectedDomaines[projectId];
      console.log(`Assigning role: ${role} to project ID: ${projectId}`);
      if (role) {
        dispatch(assignProjectToUser(userId, projectId, role));
      } else {
        console.log("No role selected for project:", projectId);
      }
    });
  };
  const handleAssignProject = () => {
    Object.keys(selectedDomaines).forEach((projectId) => {
      const domaineId = selectedDomaines[projectId];
      console.log(
        `Assigning domaine: ${domaineId} to project ID: ${projectId} to user ID: ${userId}`
      );
      if (domaineId) {
        dispatch(assignDomaineToProjectForUser(userId, domaineId, projectId));
      } else {
        console.log("No role selected for project:", projectId);
      }
    });
  };

  useEffect(() => {
    const loadJWT = async () => {
      const token = await localStorage.getItem("jwt");
      if (token) {
        dispatch(getProjectsByUserId(token));
      }
    };

    loadJWT();
  }, [dispatch]);
  const columns = [
    {
      accessorKey: "projectId",
      header: "id",
    },
    {
      accessorKey: "projectName",
      header: "nom",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      id: "domaines",
      accessorKey: "domaines",
      header: "Domaines",
      cell: ({ row }) => {
        const projectId = row.original.projectId;

        return (
          <Select
            value={selectedDomaines[projectId] || ""}
            onValueChange={(value) => handleRoleChange(projectId, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Domaines" />
            </SelectTrigger>
            <SelectContent>
              {row.original.domaines.map((domaine) => (
                <SelectItem key={domaine.id} value={domaine.id}>
                  {domaine.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      },
    },
  ];
  return (
    <div>
      <div className="">
        <DataTable columns={columns} data={projects} />
      </div>
      <div>
        <Button variant="secondary" onClick={handleAssignProject}>
          Assign
        </Button>
      </div>
    </div>
  );
};

export default UserProjectsCopy;
