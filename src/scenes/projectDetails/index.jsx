import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { Card } from "../../componentsShadn/ui/card";
import { Button } from "../../componentsShadn/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../../state/authentication/Action";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../componentsShadn/ui/dialog";
import CreateSousCahierDeTestForm from "../createSousCahierDeTest";
import {
  fetchCahiers,
  fetchCahiersByDomain,
} from "../../state/SousCahierDeTest/Action";
import { ScrollArea } from "../../componentsShadn/ui/scroll-area";
import { Separator } from "../../componentsShadn/ui/separator";
import { clearSousCahier } from "../../state/SousCahierDeTest/Reducer";
import AjouterCahierDeTestGlobal from "../cahierdetestGlobalForm";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const sous_cahiers = useSelector((state) => state.sous_cahier.sous_cahiers);
  console.log(sous_cahiers);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const selectedDomaine = query.get("domaine");

  // const projects = useSelector((state) => state.auth.projects);
  useEffect(() => {
    dispatch(getProjects());
  }, []);
  useEffect(() => {
    axios
      .get(` http://localhost:8080/api/project/${projectId}`)
      .then((response) => {
        setProject(response.data);
        console.log(response.data);
      })

      .catch((error) => {
        console.error("Error fetching project details:", error);
      });
  }, [projectId]);

  useEffect(() => {
    dispatch(clearSousCahier());
    if (projectId && selectedDomaine) {
      dispatch(fetchCahiersByDomain(projectId, selectedDomaine));
    }
  }, [projectId, selectedDomaine, dispatch]);

  const handleClick = (souscahierdetestid) => {
    navigate(`/project/cahier/${souscahierdetestid}`);
  };

  return (
    <div className="space-y-5 ">
      {/* First Card */}
      {project ? (
        project.cahierDeTestGlobalId ? (
          <div className="ml-2">
            <h1 className="text-lg mb-4 font-bold">Cahier De Test global:</h1>
            <Card className="w-1/2 p-5">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-5">
                    <h1 className="cursor-pointer font-bold text-lg">
                      {project.cahierDeTestGlobalNom}
                    </h1>
                    <DotFilledIcon />
                  </div>
                </div>
                <p className="text-gray-500 text-sm">{project.description}</p>
              </div>
            </Card>
          </div>
        ) : (
          <div className="ml-2">
            <h1 className="text-lg mb-4 font-bold">Cahier De Test global:</h1>
            <Card className="w-1/2 p-5 flex flex-row justify-between items-center">
              <div className="text-gray-500 text-sm">
                No Cahier De Test Global ID detected for this project.
              </div>
              <div>
                <Dialog variant="secondary">
                  <DialogTrigger className=" rounded-md">
                    <Button className=" rounded-md">Ajouter un domaine</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      Creer nouveaux sous cahier de test
                    </DialogHeader>
                    <AjouterCahierDeTestGlobal projectId={project.id} />
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          </div>
        )
      ) : (
        <p>Loading project details...</p>
      )}

      {/* Sous Cahier De Tests Card */}

      <div className="space-y-5">
        <div className="ml-2">
          <h1 className="text-lg mb-4 font-bold">Sous Cahier De Tests</h1>
        </div>
        {sous_cahiers.length > 0 ? (
          sous_cahiers.map((sous_cahier) => (
            <Card key={sous_cahier.id} className="ml-2 p-5 w-1/2">
              <div>
                <h2
                  onClick={() => handleClick(sous_cahier.id)}
                  className="text-lg font-bold"
                >
                  {sous_cahier.name}
                </h2>
                <p>Domain: {sous_cahier.domaineId}</p>
                <p>Sub-domain: {sous_cahier.sousDomaineId || "None"}</p>
              </div>
            </Card>
          ))
        ) : (
          <div className="ml-2 font-bold">
            <p>No Cahiers de tests available for this domain yet.</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center">
        <div className="mt-4">
          <Dialog variant="secondary">
            <DialogTrigger>
              <Button variant="secondary">Nouveau</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Creer nouveaux sous cahier de test</DialogHeader>
              <CreateSousCahierDeTestForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
