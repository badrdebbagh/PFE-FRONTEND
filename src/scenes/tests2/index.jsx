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
  getTestResults,
  submitTestResult,
} from "../../state/authentication/Action";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { Textarea } from "../../componentsShadn/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../componentsShadn/ui/card";

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
  const location = useLocation();
  const navigate = useNavigate();
  const projectsData = useSelector((state) => state.auth.projectsData);

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedCahierDeTest, setSelectedCahierDeTest] = useState(null);

  const [filteredCahierDeTests, setFilteredCahierDeTests] = useState([]);
  const [selectedFonctionnalites, setSelectedFonctionnalites] = useState([]);
  const [showFunctionalities, setShowFunctionalities] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const [tempSelectedProject, setTempSelectedProject] = useState(null);
  const [tempSelectedDomain, setTempSelectedDomain] = useState(null);
  const [tempFilteredCahierDeTests, setTempFilteredCahierDeTests] = useState(
    []
  );
  const [tempSelectedCahierDeTest, setTempSelectedCahierDeTest] =
    useState(null);

  // const [testResults, setTestResults] = useState({});
  const [commentText, setCommentText] = useState("");
  const [activeDescriptionId, setActiveDescriptionId] = useState(null);

  const error = useSelector((state) => state.auth.testError);

  const success = useSelector((state) => state.auth.testSuccessfull);

  const testResults = useSelector((state) => state.auth.testResults);
  console.log("fefefe", testResults);
  const jwt = localStorage.getItem("jwt");

  const decoded = jwtDecode(jwt);

  const userId = decoded.userId;

  const updateURLParams = (projectId, domainId, cahierDeTestId) => {
    const params = new URLSearchParams();
    if (projectId) params.set("project", projectId);
    if (domainId) params.set("domain", domainId);
    if (cahierDeTestId) params.set("cahierDeTest", cahierDeTestId);
    return params.toString();
  };

  useEffect(() => {
    dispatch(fetchUserProjects(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (projectsData && projectsData.projets && projectsData.cahierDeTests) {
      const params = new URLSearchParams(location.search);
      const projectId = params.get("project");
      const domainId = params.get("domain");
      const cahierDeTestId = params.get("cahierDeTest");

      if (projectId) {
        const project = projectsData.projets.find(
          (project) => project.id === parseInt(projectId)
        );

        if (project) {
          setSelectedProject(project);

          if (domainId) {
            const cahierDeTests = projectsData.cahierDeTests.filter(
              (cdt) => cdt.domaine && cdt.domaine.id === parseInt(domainId)
            );

            if (cahierDeTests.length > 0) {
              setSelectedDomain(domainId);
              setFilteredCahierDeTests(cahierDeTests);

              if (cahierDeTestId) {
                const selectedCahier = cahierDeTests.find(
                  (cdt) => cdt.id === parseInt(cahierDeTestId)
                );
                if (selectedCahier) {
                  setSelectedCahierDeTest(cahierDeTestId);
                  setSelectedFonctionnalites(selectedCahier.fonctionnalites);
                  setShowFunctionalities(true);
                } else {
                  console.warn("Cahier de Test not found:", cahierDeTestId);
                }
              }
            } else {
              console.warn("No Cahier de Tests found for domain:", domainId);
            }
          }
        } else {
          console.warn("Project not found:", projectId);
        }
      }
    }
  }, [location.search, projectsData, dispatch]);

  useEffect(() => {
    if (selectedCahierDeTest) {
      dispatch(getTestResults(null, selectedCahierDeTest));
    }
  }, [selectedCahierDeTest, dispatch]);

  useEffect(() => {
    if (selectedCahierDeTest) {
      const cahierDeTest = filteredCahierDeTests.find(
        (cdt) => cdt.id === parseInt(selectedCahierDeTest)
      );
      setSelectedFonctionnalites(
        cahierDeTest ? cahierDeTest.fonctionnalites : []
      );
    }
  }, [selectedCahierDeTest, filteredCahierDeTests]);

  const handleCahierDeTestChange = (cahierDeTestId) => {
    setTempSelectedCahierDeTest(cahierDeTestId);
  };

  const handleProjectChange = (projectId) => {
    const project = projectsData.projets.find(
      (project) => project.id === parseInt(projectId)
    );

    setTempSelectedProject(project);
    setTempSelectedDomain(null); // Reset domain and cahier de tests related state
    setTempFilteredCahierDeTests([]);
    setTempSelectedCahierDeTest(null);
  };

  const handleDomainChange = (domainId) => {
    const cahierDeTests = projectsData.cahierDeTests.filter(
      (cdt) => cdt.domaine && cdt.domaine.id === parseInt(domainId)
    );

    setTempSelectedDomain(domainId);
    setTempFilteredCahierDeTests(cahierDeTests);
    setTempSelectedCahierDeTest(null); // Reset cahier de tests and functionalities
  };

  const handleConfirm = () => {
    if (tempSelectedCahierDeTest) {
      const cahierDeTest = tempFilteredCahierDeTests.find(
        (cdt) => cdt.id === tempSelectedCahierDeTest
      );

      setSelectedFonctionnalites(
        cahierDeTest ? cahierDeTest.fonctionnalites : []
      );
      setShowFunctionalities(true);
      setPopoverOpen(false);

      setSelectedProject(tempSelectedProject);
      setSelectedDomain(tempSelectedDomain);
      setSelectedCahierDeTest(tempSelectedCahierDeTest);

      const newUrl = updateURLParams(
        tempSelectedProject.id,
        tempSelectedDomain,
        tempSelectedCahierDeTest
      );
      navigate(`?${newUrl}`);
    }
  };

  const handleTestResult = async (descriptionId, status) => {
    if (status === "KO") {
      setActiveDescriptionId(descriptionId);
    } else {
      const testResultData = {
        status,
        testCaseDescriptionId: descriptionId,
        comment: null,
        cahierDeTestId: selectedCahierDeTest, // No comment for OK status
      };
      await dispatch(submitTestResult(testResultData));
      await dispatch(getTestResults(descriptionId, selectedCahierDeTest));
    }
  };

  const handleCommentSubmit = async (descriptionId) => {
    const testResultData = {
      status: "KO",
      comment: commentText,
      testCaseDescriptionId: descriptionId,
      cahierDeTestId: selectedCahierDeTest,
    };

    await dispatch(submitTestResult(testResultData));
    await dispatch(getTestResults(descriptionId, selectedCahierDeTest));

    // Reset comment text and active description ID
    setCommentText("");
    setActiveDescriptionId(null);
  };

  return (
    <div className=" bg-white h-screen ">
      <div className="h-full">
        {/* confirmer div */}
        <div className="bg-gray-100 ">
          <div className="flex items-center justify-center p-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div>
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button className="bg-slate-700">Choisir </Button>
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
                          disabled={!tempSelectedProject}
                        >
                          <SelectTrigger className="col-span-2 h-8">
                            <SelectValue placeholder="Domaines" />
                          </SelectTrigger>
                          <SelectContent>
                            {tempSelectedProject?.domaines?.length > 0 ? (
                              tempSelectedProject.domaines.map((domaine) => (
                                <SelectItem key={domaine.id} value={domaine.id}>
                                  {domaine.nom}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="no domains available" disabled>
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
                          disabled={!tempSelectedDomain}
                        >
                          <SelectTrigger className="col-span-2 h-8">
                            <SelectValue placeholder="Cahier de Tests" />
                          </SelectTrigger>
                          <SelectContent>
                            {tempFilteredCahierDeTests?.length > 0 ? (
                              tempFilteredCahierDeTests.map((cdt) => (
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
          <div className="mt-10 bg-full ">
            {selectedFonctionnalites && selectedFonctionnalites.length > 0 ? (
              selectedFonctionnalites.map((fonctionnalite) => (
                <div
                  key={fonctionnalite.id}
                  className=" p-6 rounded-lg shadow mb-6 text-black bg-gray-200 mx-4  "
                >
                  <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-gray-100 flex flex-row items-center justify-center rounded-lg p-2 ">
                    <h1 className="text-3xl font-bold mr-4">
                      Fonctionnalité :{" "}
                    </h1>
                    <h3 className="text-2xl font-semibold ">
                      {fonctionnalite.nom}
                    </h3>
                  </div>

                  <h4 className="text-3xl font-semibold mt-4 mb-2">
                    Test Cases
                  </h4>
                  <ul className="list-disc list-inside ">
                    {fonctionnalite.casTests?.length > 0 ? (
                      fonctionnalite.casTests.map((test) => (
                        <li key={test.id} className="mb-2 list-none">
                          <div className="flex gap-6 items-center">
                            <p className="text-xl font-bold">Cas de test :</p>
                            <span className="text-black uppercase text-lg underline ">
                              {test.titre}
                            </span>
                          </div>

                          {/* <Button className="ml-4 px-2 py-1  rounded">
                            Execute Test
                          </Button> */}
                          <ul className="ml-6 mt-2  ">
                            {test.testCaseDescriptions?.length > 0 ? (
                              test.testCaseDescriptions.map((desc) => (
                                <div
                                  key={desc.id}
                                  className="text-black flex border border-amber-700 rounded-lg mb-2 py-6 px-4 justify-between  "
                                >
                                  <div className="flex w-1/2 border-6 ">
                                    <div className="w-full h-full   ">
                                      <span className="uppercase text-gray-400 font-bold mr-4 text-2xl">
                                        Action:
                                      </span>
                                      <div className=" text-md px-4 whitespace-pre-wrap bg-white/45 w-full rounded-xl py-2">
                                        {desc.description}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-4  items-center ml-6  w-1/2  ">
                                    {testResults[desc.id] ? (
                                      testResults[desc.id].status === "OK" ? (
                                        <div className="text-green-800 text-xl font-bold">
                                          Test Reussi
                                        </div>
                                      ) : (
                                        <div className=" text-xl font-bold  ">
                                          <div className="flex gap-6 items-center  ">
                                            <h1 className="text-2xl text-gray-400">
                                              Status :
                                            </h1>
                                            <span className="text-red-900">
                                              {" "}
                                              Test Non Reussi.
                                            </span>
                                          </div>

                                          {testResults[desc.id].comment && (
                                            <div className="mt-2  p-2 w-full overflow-hidden  ">
                                              <h1 className="text-slate-500 underline">
                                                Commentaire:
                                              </h1>
                                              <div className=" overflow-auto h-full bg-white/45 rounded-xl p-4 mt-4">
                                                <p
                                                  placeholder="Commentaire"
                                                  className="break-words"
                                                >
                                                  {" "}
                                                  {testResults[desc.id].comment}
                                                </p>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      )
                                    ) : (
                                      <div className="w-full  ">
                                        {activeDescriptionId === desc.id ? (
                                          <div className="pt-8  flex justify-end flex-col ">
                                            <div>
                                              {" "}
                                              <Textarea
                                                className="whitespace-pre-wrap"
                                                placeholder="Enter comment"
                                                value={commentText}
                                                onChange={(e) =>
                                                  setCommentText(e.target.value)
                                                }
                                              />
                                            </div>
                                            <div className="flex justify-end mt-4">
                                              <Button
                                                onClick={() =>
                                                  handleCommentSubmit(desc.id)
                                                }
                                              >
                                                Submit Comment
                                              </Button>
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="flex justify-end gap-6  w-full">
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
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
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
              <div className=" bg-gray-200 shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-screen">
                <div className="flex justify-center items-center flex-col gap-4 py-4">
                  <div>
                    {" "}
                    <p className="text-black text-xl font-bold ">
                      Pas de fonctionnalités encore disponible
                    </p>{" "}
                  </div>

                  <div className="bg-white">
                    <Button
                      className="bg-red-900 text-white"
                      onClick={() =>
                        navigate(
                          `/projects/${selectedProject?.id}?domaine=${selectedDomain}&souscahierdetestid=${selectedCahierDeTest}`
                        )
                      }
                    >
                      Creer des fonctionnalités
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Test2;
