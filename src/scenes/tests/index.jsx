import { jwtDecode } from "jwt-decode";
import {
  getProjectsByUserId,
  getTestCasesByUserId,
} from "../../state/authentication/Action";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Tests = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.auth.projects);
  const testCases = useSelector((state) => state.auth.testCases);

  const jwt = localStorage.getItem("jwt");
  const decoded = jwtDecode(jwt);
  const userId = decoded.userId;

  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    dispatch(getProjectsByUserId(jwt));
  }, [dispatch, jwt]);

  const handleProjetClick = (project) => {
    setSelectedProject(project);
    const projectId = project.projectId;

    dispatch(getTestCasesByUserId(userId, projectId));
    dispatch(getProjectsByUserId(jwt));
  };

  useEffect(() => {
    if (selectedProject) {
      console.log("Selected Project ID:", selectedProject.projectId);
    }
  }, [selectedProject]);
  useEffect(() => {
    console.log("Projects:", projects);
  }, [projects]);

  useEffect(() => {
    console.log("Test Cases:", testCases);
  }, [testCases]);

  // const handleTestCaseClick = (testCase) => {
  //   setSelectedTestCase(testCase);
  // };
  if (!Array.isArray(projects)) {
    console.error("Projects is not an array", projects);
    return <div>Error: Projects data is invalid</div>;
  }

  return (
    <div className="w-full h-screen bg-white flex">
      <div className="flex flex-col gap-2 border-r-6 border-gray-500 w-[400px] h-full p-2">
        {projects.map((project) => (
          <div
            key={project.project}
            className="bg-orange-800 py-2 rounded-md hover:bg-orange-700 transition ease-out px-2"
          >
            <h1
              className="text-black font-bold cursor-pointer"
              onClick={() => handleProjetClick(project)}
            >
              {project.projectName}
            </h1>
          </div>
        ))}
      </div>
      <div className="flex-1 p-4">
        {selectedProject && (
          <div className="text-black">
            <h1 className="text-2xl font-bold">{selectedProject.nom}</h1>
            <p>{selectedProject.description}</p>
            <h2 className="text-xl font-bold mt-4">Test Cases</h2>
            {testCases.length > 0 ? (
              testCases.map((testCase) => (
                <div key={testCase.id} className="border p-2 my-2">
                  <h3 className="text-lg font-bold">{testCase.titre}</h3>
                  <p>{testCase.description}</p>
                  {/* Add more details about the test case if needed */}
                </div>
              ))
            ) : (
              <p>No test cases available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tests;
