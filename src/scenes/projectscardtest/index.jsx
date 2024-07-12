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

import AjouterSousDomaine from "../ajouterSousDomaine";
import AttribuerDomaine from "../attribuerDomaine";
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
    <div className="space-y-5  h-screen mt-4 " key={projects.length}>
      <div className=" w-full flex flex-row  items-center  justify-between  pl-10  h-[70px]  ">
        <div className="flex gap-4">
          <div>
            {" "}
            <Dialog variant="secondary">
              <DialogTrigger className=" rounded-lg">
                <Button variant="thirdly">Creer un domaine</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>Creer un domaine</DialogHeader>
                <AjouterDomaine />
              </DialogContent>
            </Dialog>
          </div>
          <div>
            {" "}
            <Dialog variant="secondary ">
              <DialogTrigger className=" rounded-md w-full">
                <Button variant="thirdly">Creer un sous domaine</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>Creer un Sous Domaine</DialogHeader>
                <AjouterSousDomaine />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className=" flex items-center justify-center mr-6">
          <Button variant="thirdly" onClick={handleAddUser}>
            Ajouter un projet
          </Button>
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
            <Card
              key={project.id}
              className="ml-2 p-5 w-[1000px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] border border-[#f2762a] "
            >
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-5 justify-center  ">
                    <h1
                      // onClick={() => handleNavigate(project.id)}
                      className=" font-bold text-lg"
                    >
                      {project.nom}
                    </h1>
                    <DotFilledIcon />
                    <p className="text-lg text-gray-400   ">
                      <span className="text-xl text-black font-bold mr-2 ">
                        Chef de Projet :
                      </span>
                      <span className="text-xl  text-slate-900">
                        {" "}
                        {project.chefDeProjet ? project.chefDeProjet : "anas"}
                      </span>
                    </p>
                    {/* <div className="bg-gray-200 p-2 rounded-md">
                      <p className=" text-lg">
                        {" "}
                        Status :{" "}
                        <span className="font-bold">{project.status}</span>
                      </p>
                    </div> */}
                  </div>
                  <div className="flex gap-4 ">
                    <div className="">
                      <Dialog variant="secondary">
                        <DialogTrigger className=" rounded-md">
                          <Button variant="thirdly">
                            Attribuer un domaine
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            Attribuer un domaine au projet
                          </DialogHeader>
                          <AttribuerDomaine projectId={project.id} />
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

export default ProjectCard;
