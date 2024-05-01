import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { Card } from "../../componentsShadn/ui/card";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../componentsShadn/ui/dropdown-menu";
import { Button } from "../../componentsShadn/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../../state/authentication/Action";

const ProjectCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.auth.projects);
  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const handleAddUser = () => {
    navigate("/addProject");
  };

  return (
    <div className="space-y-5 mt-10">
      {projects.map((project) => (
        <Card key={project.id} className="ml-2 p-5 w-1/2 ">
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="flex items-center gap-5">
                <h1
                  onClick={() => navigate(`/project/${project.id}`)}
                  className="cursor-pointer font-bold text-lg"
                >
                  {project.nom}
                </h1>
                <DotFilledIcon />
                <p className="text-md text-gray-400">
                  {" "}
                  <span className="text-lg text-black font-bold">
                    {" "}
                    Chef de Projet :
                  </span>{" "}
                  {project.chefDeProjet}
                </p>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      className="rounded-full"
                      variant="ghost"
                      size="icon"
                    >
                      <DotsVerticalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Modifier</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <p className="text-gray-500 text-sm">{project.description}</p>
          </div>
        </Card>
      ))}

      <div className=" ">
        <div className="flex items-center justify-center mt-12">
          <Button onClick={handleAddUser} variant="secondary">
            Ajouter un projet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
