import { useEffect, useState } from "react";
import DataTable from "./data-table";

import {
  assignProjectToUser,
  getProjects,
  getProjectsByUserId,
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

const Projects2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.auth.projects);
  useEffect(() => {
    const loadJWT = async () => {
      const token = await localStorage.getItem("jwt");
      if (token) {
        dispatch(getProjectsByUserId(token));
      }
    };

    loadJWT();
  }, [dispatch]);

  const handleAddProject = () => {
    navigate("/addProject");
  };

  const columns = [
    {
      accessorKey: "projectId",
      header: "ID",
    },
    {
      accessorKey: "projectName",
      header: "Nom du projet",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "userRole",
      header: "Role",
    },
  ];
  return (
    <div>
      <div className="">
        <DataTable columns={columns} data={projects} />
      </div>
      <div className=" flex items-center justify-center mt-6">
        <Button onClick={handleAddProject} variant="secondary">
          Assign Project to user
        </Button>
      </div>
    </div>
  );
};

export default Projects2;
