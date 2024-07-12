import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { Card } from "../../componentsShadn/ui/card";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../componentsShadn/ui/dropdown-menu";
import { Button } from "../../componentsShadn/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getProjects,
  getProjectsByUserIdAndDomain,
} from "../../state/authentication/Action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../componentsShadn/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../componentsShadn/ui/form";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../componentsShadn/ui/dialog";
import AjouterDomaine from "../attribuerDomaine";

const ProjectsTesteur = ({ onSelectDomaine }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.auth.projects);
  console.log(projects);
  const [selectedDomaines, setSelectedDomaines] = useState({});
  console.log(projects);
  //   useEffect(() => {
  //     dispatch(getProjects());
  //   }, [dispatch]);

  useEffect(() => {
    const loadJWT = async () => {
      const token = await localStorage.getItem("jwt");
      if (token) {
        dispatch(getProjectsByUserIdAndDomain(token));
      }
    };

    loadJWT();
  }, [dispatch]);

  const handleAddUser = () => {
    navigate("/addProject");
  };

  const handleSelectDomaine = (domaine, projectId) => {
    console.log("domaine", domaine, "for project", projectId);
    setSelectedDomaines((prev) => ({ ...prev, [projectId]: domaine }));
    if (onSelectDomaine) {
      onSelectDomaine(domaine);
    }
  };

  // if (projects.length === 0) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="space-y-5 mt-10 " key={projects.length}>
      <div className="flex items-center justify-center flex-col space-y-5">
        {projects.map((project) => {
          const handleNavigate = (projectId) => {
            const selectedDomaine = selectedDomaines[projectId];
            if (!selectedDomaine) {
              alert("Veuillez selectionner le domaine a consulter.");
              return;
            }
            navigate(`/project/${projectId}?domaine=${selectedDomaine}`);
          };

          return (
            <Card
              key={project.projectId}
              className="ml-2 p-5 w-[1000px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] border border-[#f2762a]"
            >
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-5 ">
                    <h1
                      onClick={() => handleNavigate(project.projectId)}
                      className="cursor-pointer font-bold text-lg"
                    >
                      {project.projectName}
                    </h1>
                    <DotFilledIcon />
                    <p className="text-md text-gray-400  ">
                      <span className="text-xl text-black font-bold mr-2 ">
                        Chef de Projet :
                      </span>
                      <span className="text-xl font-bold text-slate-900">
                        {" "}
                        {project.chefDeProjet ? project.chefDeProjet : "CHEF"}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-4 ">
                    <div>
                      <Select
                        value={selectedDomaines[project.projectId] || ""}
                        onValueChange={(value) =>
                          handleSelectDomaine(value, project.projectId)
                        }
                      >
                        <SelectTrigger className=" bg-white border text-[#f2762a] font-bold border-[#f2762a] w-full">
                          <SelectValue placeholder="Domaine" />
                        </SelectTrigger>
                        <SelectContent>
                          {project.domaines.length > 0 ? (
                            project.domaines.map((domaine) => (
                              <SelectItem key={domaine.id} value={domaine.id}>
                                {domaine.nom}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem disabled className="text-left p-2 ">
                              Veuillez attribuer un domaine
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">{project.description}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsTesteur;
