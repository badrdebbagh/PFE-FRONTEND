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
import { useToast } from "../../componentsShadn/ui/use-toast";

const UserProjectsCopy = () => {
  const projects = useSelector((state) => state.auth.projects);

  const dispatch = useDispatch();

  const { userId } = useParams();
  const { toast } = useToast();
  const [selectedDomaines, setSelectedDomaines] = useState({});

  const handleRoleChange = (projectId, domaines) => {
    console.log("projectID", projectId);
    setSelectedDomaines((prevDomaines) => ({
      ...prevDomaines,
      [projectId]: domaines,
    }));
  };

  const handleAssignProject = () => {
    Object.keys(selectedDomaines).forEach((projectId) => {
      const domaineId = selectedDomaines[projectId];
      console.log(
        `Assigning domaine: ${domaineId} to project ID: ${projectId} to user ID: ${userId}`
      );
      if (domaineId) {
        dispatch(assignDomaineToProjectForUser(userId, domaineId, projectId));
        toast({
          description: "Projet assigné avec succès ",
        });
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
      accessorKey: "projectName",
      header: "Nom du projet",
    },
    {
      accessorKey: "description",
      header: "Description du projet",
    },
    {
      id: "domaines",
      accessorKey: "domaines",
      header: "Domaines",
      cell: ({ row }) => {
        const projectId = row.original.projectId;
        const domaines = row.original.domaines;

        return domaines.length === 0 ? (
          <span className="text-red-500 font-bold">
            Aucun domaine lié jusqu'a présent
          </span>
        ) : (
          <Select
            value={selectedDomaines[projectId] || ""}
            onValueChange={(value) => handleRoleChange(projectId, value)}
          >
            <SelectTrigger className=" bg-white border text-[#f2762a] font-bold border-[#f2762a] w-full">
              <SelectValue placeholder="Domaines" />
            </SelectTrigger>
            <SelectContent>
              {domaines.map((domaine) => (
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
      <div className="flex justify-center items-center">
        <Button variant="thirdly" onClick={handleAssignProject}>
          Affecter le projet
        </Button>
      </div>
    </div>
  );
};

export default UserProjectsCopy;
