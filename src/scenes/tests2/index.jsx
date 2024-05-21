import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../componentsShadn/ui/select";
import { Label } from "../../componentsShadn/ui/label";
import { Input } from "../../componentsShadn/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../componentsShadn/ui/popover";
import { Button } from "../../componentsShadn/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProjects,
  submitTestResult,
} from "../../state/authentication/Action";
import { jwtDecode } from "jwt-decode";

const Test2 = () => {
  // return (
  //   <div>
  // <div className="bg-gray-100 h-screen">
  //   <div className=" flex justify-end">
  //     {/* <Select>
  //       <SelectTrigger className=" w-[200px] h-[30px]">
  //         <SelectValue placeholder=" projet" />
  //       </SelectTrigger>
  //       <SelectContent>
  //         <SelectItem value="project1">Project 1</SelectItem>
  //         <SelectItem value="project2">Project 2</SelectItem>
  //         <SelectItem value="project3">Project 3</SelectItem>
  //       </SelectContent>
  //     </Select> */}
  //     <div className="mr-12">
  //       <Popover>
  //         <PopoverTrigger className=" " asChild>
  //           <Button className="bg-slate-700">Determiner </Button>
  //         </PopoverTrigger>
  //         <PopoverContent className="w-80">
  //           <div className="grid gap-4">
  //             <div className="space-y-2">
  //               <h4 className="font-medium leading-none">Dimensions</h4>
  //               <p className="text-sm text-muted-foreground">
  //                 Selectionner
  //               </p>
  //             </div>
  //             <div className="grid gap-2">
  //               <div className="grid grid-cols-3 items-center gap-4  ">
  //                 <Label htmlFor="Projects">Projets</Label>

  //                 <Select>
  //                   <SelectTrigger className="col-span-2 h-8">
  //                     <SelectValue placeholder="Projet" />
  //                   </SelectTrigger>
  //                   <SelectContent>
  //                     <SelectItem value="projet 1">Projet 1</SelectItem>
  //                     <SelectItem value="projet 2">Projet 2</SelectItem>
  //                     <SelectItem value="projet 3">Projet 3</SelectItem>
  //                   </SelectContent>
  //                 </Select>
  //               </div>
  //               <div className="grid grid-cols-3 items-center gap-4">
  //                 <Label htmlFor="maxWidth">Domaines</Label>
  //                 <Select>
  //                   <SelectTrigger className="col-span-2 h-8">
  //                     <SelectValue placeholder="Domaines" />
  //                   </SelectTrigger>
  //                   <SelectContent>
  //                     <SelectItem value="domaine 1">Domaine 1</SelectItem>
  //                     <SelectItem value="domaine 2 ">Domaine 2</SelectItem>
  //                     <SelectItem value="domaine 3">Domaine 3</SelectItem>
  //                   </SelectContent>
  //                 </Select>
  //               </div>
  //             </div>
  //             <div className=" flex justify-end items-center">
  //               <Button>Confirmer</Button>
  //             </div>
  //           </div>
  //         </PopoverContent>
  //       </Popover>
  //     </div>
  //   </div>
  // </div>
  //   </div>
  // );
  const dispatch = useDispatch();

  const projectsData = useSelector((state) => state.auth.projectsData);
  console.log("fefeefdef", projectsData);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedCahierDeTest, setSelectedCahierDeTest] = useState(null);

  const [filteredCahierDeTests, setFilteredCahierDeTests] = useState([]);
  const [selectedFonctionnalites, setSelectedFonctionnalites] = useState([]);
  const [showFunctionalities, setShowFunctionalities] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const [testResults, setTestResults] = useState({});
  const error = useSelector((state) => state.auth.testError);
  console.error("ERROR", error);
  const success = useSelector((state) => state.auth.testSuccessfull);
  console.error("sucess", success);

  const jwt = localStorage.getItem("jwt");

  const decoded = jwtDecode(jwt);

  const userId = decoded.userId;

  useEffect(() => {
    dispatch(fetchUserProjects(userId));
  }, [dispatch, userId]);
  const handleCahierDeTestChange = (cahierDeTestId) => {
    console.log("Selected Cahier de Test ID:", cahierDeTestId);
    setSelectedCahierDeTest(cahierDeTestId);
  };

  const handleProjectChange = (projectId) => {
    const project = projectsData.projets.find(
      (project) => project.id === parseInt(projectId)
    );

    setSelectedProject(project);
    setShowFunctionalities(false);
    setSelectedDomain(null);
    setFilteredCahierDeTests([]);
    setSelectedCahierDeTest(null);
  };

  const handleDomainChange = (domainId) => {
    console.log("Selected Domain ID:", domainId);
    const cahierDeTests = projectsData.cahierDeTests.filter(
      (cdt) => cdt.domaine && cdt.domaine.id === parseInt(domainId)
    );
    console.log("Filtered Cahier de Tests:", cahierDeTests);
    setSelectedDomain(domainId);
    setFilteredCahierDeTests(cahierDeTests);
    setShowFunctionalities(false);
  };

  const handleConfirm = () => {
    console.log("called");
    if (selectedCahierDeTest) {
      console.log(selectedCahierDeTest);
      const cahierDeTest = filteredCahierDeTests.find(
        (cdt) => cdt.id === selectedCahierDeTest
      );
      console.log("Found Cahier de Test:", cahierDeTest);
      setSelectedFonctionnalites(
        cahierDeTest ? cahierDeTest.fonctionnalites : []
      );
      setShowFunctionalities(true);
      setPopoverOpen(false);
    }
  };

  const handleTestResult = (descriptionId, status) => {
    const testResultData = {
      status,
      testCaseDescriptionId: descriptionId,
    };

    dispatch(submitTestResult(testResultData));

    // Update local state with the result
    setTestResults((prevResults) => ({
      ...prevResults,
      [descriptionId]: status,
    }));
  };
  return (
    <div className="bg-white min-h-screen ">
      <div className="m">
        {/* confirmer div */}
        <div className="bg-gray-100 ">
          <div className="flex justify-end p-2  mt-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div className="mr-12  ">
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button className="bg-slate-700">Determiner </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Selectionner
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="Projects">Projets</Label>
                        <Select onValueChange={handleProjectChange}>
                          <SelectTrigger className="col-span-2 h-8">
                            <SelectValue placeholder="Projet" />
                          </SelectTrigger>
                          <SelectContent>
                            {projectsData?.projets?.length > 0 ? (
                              projectsData.projets.map((project) => (
                                <SelectItem
                                  key={project.id}
                                  value={String(project.id)}
                                >
                                  {project.nom}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="no project avaialble" disabled>
                                No projects available
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="Domains">Domaines</Label>
                        <Select
                          onValueChange={handleDomainChange}
                          disabled={!selectedProject}
                        >
                          <SelectTrigger className="col-span-2 h-8">
                            <SelectValue placeholder="Domaines" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedProject?.domaines?.length > 0 ? (
                              selectedProject.domaines.map((domaine) => (
                                <SelectItem key={domaine.id} value={domaine.id}>
                                  {domaine.nom}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="no domains avaialble" disabled>
                                No domains available
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="CahierDeTests">Cahier de Tests</Label>
                        <Select
                          onValueChange={handleCahierDeTestChange}
                          disabled={!selectedDomain}
                        >
                          <SelectTrigger className="col-span-2 h-8">
                            <SelectValue placeholder="Cahier de Tests" />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredCahierDeTests?.length > 0 ? (
                              filteredCahierDeTests.map((cdt) => (
                                <SelectItem key={cdt.id} value={cdt.id}>
                                  {cdt.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem
                                value="no cahier de tests available"
                                disabled
                              >
                                No cahier de tests available
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end items-center">
                      <Button onClick={handleConfirm}>Confirmer</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {showFunctionalities && (
          <div className="mt-10  ">
            {selectedFonctionnalites.length > 0 ? (
              selectedFonctionnalites.map((fonctionnalite) => (
                <div
                  key={fonctionnalite.id}
                  className=" p-6 rounded-lg shadow mb-6 text-black bg-gray-200 mx-4  "
                >
                  <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-gray-100 flex flex-row items-center justify-center rounded-lg p-2 ">
                    <h3 className="text-2xl font-semibold ">
                      {fonctionnalite.nom}
                    </h3>
                  </div>

                  <h4 className="text-xl font-semibold mt-4">Test Cases</h4>
                  <ul className="list-disc list-inside">
                    {fonctionnalite.casTests?.length > 0 ? (
                      fonctionnalite.casTests.map((test) => (
                        <li key={test.id} className="mb-2 list-none">
                          <span className="text-black uppercase text-lg underline ">
                            {test.titre}
                          </span>
                          {/* <Button className="ml-4 px-2 py-1  rounded">
                            Execute Test
                          </Button> */}
                          <ul className="ml-6 mt-2   ">
                            {test.testCaseDescriptions?.length > 0 ? (
                              test.testCaseDescriptions.map((desc) => (
                                <li
                                  key={desc.id}
                                  className="text-black  flex justify-between border border-amber-700 rounded-lg mb-2 py-6 px-2 "
                                >
                                  <div className="flex gap-6   ">
                                    <div>
                                      <span className="uppercase text-gray-400 font-bold mr-4">
                                        {" "}
                                        Action:
                                      </span>{" "}
                                      {desc.description}
                                    </div>
                                    <div>
                                      <span className="uppercase text-gray-400 font-bold mr-4">
                                        {" "}
                                        Resultat Attendu:
                                      </span>{" "}
                                      {desc.resultatAttendu}
                                    </div>
                                  </div>

                                  <div className="flex gap-4">
                                    {testResults[desc.id] ? (
                                      testResults[desc.id] === "OK" ? (
                                        <div className="text-green-800">
                                          Test Reussi
                                        </div>
                                      ) : (
                                        <div className="text-red-800">
                                          Test Non Reussi
                                        </div>
                                      )
                                    ) : (
                                      <>
                                        <Button
                                          onClick={() =>
                                            handleTestResult(desc.id, "OK")
                                          }
                                        >
                                          OK
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            handleTestResult(desc.id, "KO")
                                          }
                                        >
                                          KO
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li className="text-gray-500">
                                No steps available
                              </li>
                            )}
                          </ul>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">No test cases</li>
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No functionalities available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Test2;
