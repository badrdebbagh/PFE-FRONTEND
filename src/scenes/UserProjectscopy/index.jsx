import { useEffect, useState } from "react";
import DataTable from "./data-table";

import {
  assignProjectToUser,
  getProjects,
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
import { getProjectRoles } from "../../state/authentication/Action";

const UserProjectsCopy = () => {
  const projects = useSelector((state) => state.auth.projects);
  const [rowSelection, setRowSelection] = useState({});
  const dispatch = useDispatch();
  const { projectRoles } = useSelector((state) => state.auth);
  const { userId } = useParams();

  const [selectedRoles, setSelectedRoles] = useState({});

  const handleRoleChange = (projectId, role) => {
    console.log(projectId);
    setSelectedRoles((prevRoles) => ({
      ...prevRoles,
      [projectId]: role,
    }));
  };

  const handleAssignProject = () => {
    Object.keys(selectedRoles).forEach((projectId) => {
      const role = selectedRoles[projectId];
      console.log(`Assigning role: ${role} to project ID: ${projectId}`);
      if (role) {
        dispatch(assignProjectToUser(userId, projectId, role));
      } else {
        console.log("No role selected for project:", projectId);
      }
    });
  };

  useEffect(() => {
    console.log(projects);
    dispatch(getProjects());
    dispatch(getProjectRoles());
  }, [dispatch]);

  const columns = [
    {
      accessorKey: "id",
      header: "id",
    },
    {
      accessorKey: "nom",
      header: "nom",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <Select
            value={selectedRoles[row.original.id] || ""}
            onValueChange={(value) => handleRoleChange(row.original.id, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              {projectRoles.map((projectRole) => (
                <SelectItem key={projectRole} value={projectRole}>
                  {projectRole}
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
      <div className=" flex items-center justify-center mt-6">
        <Button onClick={handleAssignProject} variant="secondary">
          Assign Project to user
        </Button>
      </div>
    </div>
  );
};

export default UserProjectsCopy;
