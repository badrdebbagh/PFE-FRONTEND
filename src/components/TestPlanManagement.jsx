import React, { useState } from "react";
import { projects, testPlans } from "./mockData";

const TestPlanComponent = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTestPlan, setSelectedTestPlan] = useState(null);
  const [selectedIteration, setSelectedIteration] = useState(null);

  const handleProjectChange = (e) => {
    const projectId = e.target.value;
    setSelectedProject(projectId);
    setSelectedTestPlan(null); // Reset selected test plan
    setSelectedIteration(null); // Reset selected iteration
  };

  const handleTestPlanChange = (e) => {
    const testPlanId = e.target.value;
    setSelectedTestPlan(testPlanId);
    setSelectedIteration(null); // Reset selected iteration
  };

  const handleIterationChange = (e) => {
    const iterationId = e.target.value;
    setSelectedIteration(iterationId);
  };

  return (
    <div className="bg-black text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Test Plan Management</h2>
      <div className="mb-4">
        <label className="block mb-2">Select Project:</label>
        <select
          className="p-2 border bg-white text-black"
          value={selectedProject || ""}
          onChange={handleProjectChange}
        >
          <option value="" disabled>
            Select a project
          </option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {selectedProject && (
        <div className="mb-4">
          <label className="block mb-2">Select Test Plan:</label>
          <select
            className="p-2 border bg-white text-black"
            value={selectedTestPlan || ""}
            onChange={handleTestPlanChange}
          >
            <option value="" disabled>
              Select a test plan
            </option>
            {testPlans
              .filter((plan) => plan.projectId === parseInt(selectedProject))
              .map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
          </select>
        </div>
      )}

      {selectedTestPlan && (
        <div className="mb-4">
          <label className="block mb-2">Select Iteration:</label>
          <select
            className="p-2 border bg-white text-black"
            value={selectedIteration || ""}
            onChange={handleIterationChange}
          >
            <option value="" disabled>
              Select an iteration
            </option>
            {testPlans
              .find((plan) => plan.id === parseInt(selectedTestPlan))
              .iterations.map((iteration) => (
                <option key={iteration.id} value={iteration.id}>
                  {iteration.name}
                </option>
              ))}
          </select>
        </div>
      )}

      {selectedIteration && (
        <div>
          <h3 className="text-xl font-bold mb-2">Test Cases:</h3>
          <ul className="list-disc list-inside">
            {testPlans
              .find((plan) => plan.id === parseInt(selectedTestPlan))
              .iterations.find(
                (iteration) => iteration.id === parseInt(selectedIteration)
              )
              .testCases.map((testCase) => (
                <li key={testCase.id} className="mb-1">
                  {testCase.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TestPlanComponent;
