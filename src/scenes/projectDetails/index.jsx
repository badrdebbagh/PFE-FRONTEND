import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { Card } from "../../componentsShadn/ui/card";
import { Button } from "../../componentsShadn/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../../state/authentication/Action";
import axios from "axios";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const projects = useSelector((state) => state.auth.projects);
  useEffect(() => {
    dispatch(getProjects());
  }, []);
  useEffect(() => {
    // Axios automatically handles JSON data transformation
    axios
      .get(` http://localhost:8080/api/project/${projectId}`)
      .then((response) => {
        setProject(response.data);
        console.log(";dwdw", response.data); // response.data is the data received from the server
      })

      .catch((error) => {
        console.error("Error fetching project details:", error);
        // You can handle errors more specifically based on error.response.status etc.
      });
  }, [projectId]);

  const handleAddUser = () => {
    navigate("/addProject");
  };

  return (
    <div className="space-y-5">
      {project ? (
        project.cahierDeTestGlobalId ? (
          <Card className="ml-2 p-5 w-1/2">
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center gap-5">
                  <h1
                    onClick={() => navigate(`/project/${projectId}`)}
                    className="cursor-pointer font-bold text-lg"
                  >
                    {project.cahierDeTestGlobalNom ||
                      "Cahier de Test Information"}
                  </h1>
                  <DotFilledIcon />
                </div>
              </div>
              <p className="text-gray-500 text-sm">{project.description}</p>
            </div>
          </Card>
        ) : (
          <Card className="ml-2 p-5 w-1/2">
            <div className="space-y-2">
              <div className="flex items-center gap-5">
                <h1
                  onClick={() => navigate(`/project/${projectId}`)}
                  className="cursor-pointer font-bold text-lg"
                >
                  Pas de cahier de test
                </h1>
              </div>
            </div>
          </Card>
        )
      ) : (
        <p>Loading project details...</p>
      )}
    </div>
  );
};

export default ProjectDetails;
