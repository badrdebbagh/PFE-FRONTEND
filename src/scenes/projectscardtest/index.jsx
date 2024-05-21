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
import { getProjects } from "../../state/authentication/Action";
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
import AjouterDomaine from "../ajouterDomaine";

const ProjectCard = ({ onSelectDomaine }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.auth.projects);

  const [selectedDomaines, setSelectedDomaines] = useState({});
  console.log(projects);
  useEffect(() => {
    dispatch(getProjects());
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
      <div className=" w-full flex flex-row  space-x-5 pl-10 shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-[70px]  items-center  ">
        <div>
          {" "}
          <Dialog variant="secondary">
            <DialogTrigger className=" rounded-lg">
              <Button variant="secondary" className=" rounded-md">
                Creer un domaine
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Creer un domaine</DialogHeader>
              {/* <AjouterCahierDeTestGlobal projectId={project.id} /> */}
            </DialogContent>
          </Dialog>
        </div>
        <div>
          {" "}
          <Dialog variant="secondary ">
            <DialogTrigger className=" rounded-md w-full">
              <Button variant="secondary" className=" rounded-md">
                Creer un sous domaine
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Creer un Sous Domaine</DialogHeader>
              {/* <AjouterCahierDeTestGlobal projectId={project.id} /> */}
            </DialogContent>
          </Dialog>
        </div>
      </div>
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
            <Card key={project.id} className="ml-2 p-5 w-[1000px]">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-5 ">
                    <h1
                      onClick={() => handleNavigate(project.id)}
                      className="cursor-pointer font-bold text-lg"
                    >
                      {project.nom}
                    </h1>
                    <DotFilledIcon />
                    <p className="text-md text-gray-400  ">
                      <span className="text-xl text-black font-bold mr-2 ">
                        Chef de Projet :
                      </span>
                      <span className="text-xl font-bold text-slate-900">
                        {" "}
                        {project.chefDeProjet ? project.chefDeProjet : "anas"}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-4 ">
                    <div className="">
                      <Dialog variant="secondary">
                        <DialogTrigger className=" rounded-md">
                          <Button className=" rounded-md">
                            Attribuer un domaine
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            Creer nouveaux sous cahier de test
                          </DialogHeader>
                          <AjouterDomaine projectId={project.id} />
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div>
                      <Select
                        value={selectedDomaines[project.id] || ""}
                        onValueChange={(value) =>
                          handleSelectDomaine(value, project.id)
                        }
                      >
                        <SelectTrigger className="w-full">
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
      <div className=" flex items-center justify-center">
        <Button onClick={handleAddUser} variant="secondary">
          Ajouter un projet
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
