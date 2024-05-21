import { Button } from "../../componentsShadn/ui/button";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../componentsShadn/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faList,
  faMagnifyingGlass,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AjouterFonctionnalite from "./ajouterFonctionnalite";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../componentsShadn/ui/tooltip";
import { useDispatch, useSelector } from "react-redux";
import {
  addTestCaseDescription,
  fetchTestCases,
  getFunctionnalities,
  getSteps,
  getUser,
} from "../../state/authentication/Action";
import { Card } from "../../componentsShadn/ui/card";
import DataTable from "./data-table";
import { DotFilledIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../componentsShadn/ui/select";
import AjouterCahierDeTestGlobal from "../cahierdetestGlobalForm";
import RichText from "../../components/RichText";
import { Input } from "../../componentsShadn/ui/input";
import { Textarea } from "../../componentsShadn/ui/textarea";
import { act } from "react";
import AjouterCasTest from "../AjouterCasTest";

const CahierDetails = () => {
  const testCases = useSelector((state) => state.auth.testCases);
  console.log("ccede", testCases);
  const navigate = useNavigate();
  const [fonctionnaliteId, setFonctionnaliteId] = useState(null);

  const [selectedTestCase, setSelectedTestCase] = useState(null);
  const [openFonctionnaliteDialog, setOpenFonctionnaliteDialog] =
    useState(false);
  const [openCasTestDialog, setOpenCasTestDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const jwt = localStorage.getItem("jwt");
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const fonctionnalités = useSelector((state) => state.auth.fonctionnalite);
  console.log("new fonctionalite object ", fonctionnalités);
  const steps = useSelector((state) => state.auth.etapes);
  console.log("steps", steps);
  const domaineId = query.get("domaine");
  const cahierDeTestId = query.get("souscahierdetestid");
  const testCaseId = query.get("testcase");
  const [mappedFonctionnalites, setMappedFonctionnalites] = useState([]);

  const { projectId } = useParams();

  const [activeButton, setActiveButton] = useState("button2");

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };
  useEffect(() => {
    dispatch(getUser(jwt));
  }, []);

  useEffect(() => {
    if (testCaseId && fonctionnalités.length > 0) {
      const testCase = fonctionnalités
        .flatMap((fonctionnalité) => fonctionnalité.casTests)
        .find((testCase) => testCase.id === parseInt(testCaseId));

      if (testCase) {
        setSelectedTestCase(testCase);
      }
    }
  }, [testCaseId, fonctionnalités]);

  useEffect(() => {
    dispatch(getFunctionnalities(domaineId, projectId, cahierDeTestId));
  }, [dispatch, domaineId, projectId, cahierDeTestId]);
  useEffect(() => {
    if (testCaseId) {
      setDescriptions([]);
      dispatch(getSteps(testCaseId));
    }
  }, [dispatch, testCaseId]);

  useEffect(() => {
    // Save selected test case to localStorage whenever it changes
    if (selectedTestCase) {
      localStorage.setItem(
        "selectedTestCase",
        JSON.stringify(selectedTestCase)
      );
    }
  }, [selectedTestCase]);
  useEffect(() => {
    if (steps.length > 0) {
      setDescriptions(steps);
    }
  }, [steps]);
  const handleTestCaseTitleClick = () => {
    if (selectedTestCase) {
      navigate({
        search: `?domaine=${domaineId}&souscahierdetestid=${cahierDeTestId}&testcase=${selectedTestCase.id}`,
      });
    }
  };

  const handleTestCaseClick = (testCase) => {
    setSelectedTestCase(testCase);
    navigate({
      search: `?domaine=${domaineId}&souscahierdetestid=${cahierDeTestId}&testcase=${testCase.id}`,
    });
    // Clear steps when a new test case is selected
    setDescriptions([]);
  };

  const handleFonctionnaliteClick = (fonctionnaliteId) => {
    setFonctionnaliteId(fonctionnaliteId);

    navigate({
      search: `?domaine=${domaineId}&souscahierdetestid=${cahierDeTestId}&fonctionnalite=${fonctionnaliteId}`,
    });
  };

  const [actionText, setActionText] = useState("");
  const [expectedResultText, setExpectedResultText] = useState("");
  const [descriptions, setDescriptions] = useState([]);
  const handleConfirm = () => {
    if (!testCaseId) return;

    const descriptionData = {
      description: actionText,
      resultatAttendu: expectedResultText,
    };

    setDescriptions((prevDescriptions) => [
      ...prevDescriptions,
      descriptionData,
    ]);

    dispatch(addTestCaseDescription(testCaseId, descriptionData));
    setActionText("");
    setExpectedResultText("");
  };

  return (
    <div className=" pt-4 bg-white h-screen  ">
      <div className=" flex flex-row h-[100vh] pt-4 ">
        <div className=" w-1/3  border-r-2 border-inherit ">
          {" "}
          <div className=" flex flex-row justify-around bg-red-900">
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      className="rounded-md text-sm "
                      onClick={() => setOpenFonctionnaliteDialog(true)}
                    >
                      <FontAwesomeIcon
                        className="text-black text-xs"
                        icon={faPlus}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="ml-10">
                    <p>Ajouter fonctionnalité</p>
                  </TooltipContent>
                </Tooltip>
                <Dialog
                  open={openFonctionnaliteDialog}
                  onOpenChange={setOpenFonctionnaliteDialog}
                  variant="secondary"
                >
                  <DialogContent>
                    <DialogHeader>
                      Creer une nouvelle fonctionnalité
                    </DialogHeader>
                    <AjouterFonctionnalite
                      fonctionnaliteId={fonctionnaliteId}
                      buttonText="Ajouter"
                    />
                  </DialogContent>
                </Dialog>
              </TooltipProvider>
            </div>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="  " asChild>
                    <Button
                      variant="secondary"
                      className="rounded-md text-sm "
                      onClick={() => setOpen(true)}
                    >
                      <FontAwesomeIcon
                        className="text-black text-xs"
                        icon={faTrash}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="ml-10">
                    <p>Archiver fonctionnalité</p>
                  </TooltipContent>
                </Tooltip>
                {/* <Dialog open={open} onOpenChange={setOpen} variant="secondary">
                  <DialogContent>
                    <DialogHeader>Archiver fonctionnalité</DialogHeader>
                    <AjouterFonctionnalite buttonText="Archiver la Fonctionnalite" />
                  </DialogContent>
                </Dialog> */}
              </TooltipProvider>
            </div>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="  " asChild>
                    <Button
                      variant="secondary"
                      className="rounded-md text-sm "
                      onClick={() => setOpen(true)}
                    >
                      <FontAwesomeIcon
                        className="text-blue text-xs"
                        icon={faMagnifyingGlass}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="ml-10">
                    <p>Rechercher fonctionnalité</p>
                  </TooltipContent>
                </Tooltip>
                {/* <Dialog open={open} onOpenChange={setOpen} variant="secondary">
                  <DialogContent>
                    <DialogHeader>Supprimer Fonctonnalite</DialogHeader>
                    <AjouterFonctionnalite buttonText="Recherche une Fonctionnalite" />
                  </DialogContent>
                </Dialog> */}
              </TooltipProvider>
            </div>
          </div>
          <div>
            {fonctionnalités.length > 0 ? (
              fonctionnalités.map((fonctionnalité) => (
                <div
                  key={fonctionnalité.id}
                  className="ml-4 mt-4 text-black flex flex-col h-full  border-b-4  "
                >
                  <div className="flex flex-row items-center  ">
                    <div>
                      <DotFilledIcon className="text-black" />
                    </div>
                    <div className="">
                      <h1
                        className="cursor-pointer"
                        onClick={() =>
                          handleFonctionnaliteClick(fonctionnalité.id)
                        }
                      >
                        {fonctionnalité.nom}
                      </h1>
                    </div>
                  </div>
                  <div className="ml-8 space-y-2 p-1 ">
                    {fonctionnalité.casTests.length > 0 ? (
                      fonctionnalité.casTests.map((testCase) => (
                        <Button
                          onClick={() => handleTestCaseClick(testCase)}
                          key={testCase.id}
                          className=" w-full justify-start"
                        >
                          {testCase.titre}
                        </Button>
                      ))
                    ) : (
                      <Button className="text-start w-full  justify-start">
                        Pas de cas de test
                      </Button>
                    )}
                  </div>
                  <div className=" flex items-center justify-center bg-red-900">
                    {" "}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="primary"
                            className="rounded-md text-sm "
                            onClick={() => setOpenCasTestDialog(true)}
                          >
                            <FontAwesomeIcon
                              className="text-black text-xs"
                              icon={faPlus}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="ml-10">
                          <p>Ajouter cas de test </p>
                        </TooltipContent>
                        <Dialog
                          open={openCasTestDialog}
                          onOpenChange={setOpenCasTestDialog}
                          variant="secondary"
                        >
                          <DialogContent>
                            <DialogHeader>Creer un cas de test</DialogHeader>
                            <AjouterCasTest
                              fonctionnaliteId={fonctionnaliteId}
                            />
                          </DialogContent>
                        </Dialog>
                      </Tooltip>{" "}
                    </TooltipProvider>
                  </div>
                </div>
              ))
            ) : (
              <p>No fonctionnalités available</p>
            )}
          </div>
        </div>
        <div className=" w-full text-black bg-gray-100 ">
          {selectedTestCase ? (
            <div>
              <div className="pl-4 space-y-4 font-bold mt-2 ">
                <div>
                  <h1
                    onClick={handleTestCaseTitleClick}
                    className="text-[30px]"
                  >
                    {selectedTestCase.titre}
                  </h1>
                </div>
                <div>
                  <Button>Status</Button>
                </div>
              </div>

              <div className="border-y-2 mt-4 flex flex-row p-2   ">
                {" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="rounded text-sm ml-4 bg-white border-2 "
                        onClick={() => handleButtonClick("button1")}
                      >
                        <FontAwesomeIcon
                          className="text-black text-xs"
                          icon={faCircleInfo}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="ml-10">
                      Informations
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="rounded text-sm ml-4 bg-white border-2 "
                        onClick={() => handleButtonClick("button2")}
                      >
                        <FontAwesomeIcon
                          className="text-black text-xs"
                          icon={faList}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="ml-10">Étapes</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="   w-full rounded-md border-2 mt-4 ml-4 mr-4">
                {" "}
                {activeButton === "button1" && (
                  <div>
                    {/* UI for Button 1 Click */}
                    <div className=" border-b-4 mb-4  ">
                      {" "}
                      <h2 className="font-bold text-xl ml-4">
                        Information sur le cas de test
                      </h2>
                    </div>
                    <div>
                      <p>Status : </p>
                      <p> Crée le : ..... (admin) </p>
                    </div>
                    <div className="mt-4">
                      <h1 className="font-bold text-[20px]">Description</h1>
                      <p>{selectedTestCase.description}</p>
                    </div>
                  </div>
                )}
                <div>
                  {steps.map(() => (
                    <div>{steps.description}</div>
                  ))}
                </div>
                {activeButton === "button2" && (
                  <div className=" space-y-4  ">
                    {descriptions.map((description, index) => (
                      <div
                        key={index}
                        className="h-full flex justify-evenly mb-4 bg-white rounded-md w-full pb-4 "
                      >
                        <p className="basis-32  flex justify-center items-center text-xl font-bold text-gray-600 ">
                          {index + 1}
                        </p>

                        <div className="w-1/2">
                          <h1 className="text-base font-bold  ">Action</h1>

                          <p className="">{description.description}</p>
                        </div>
                        <div className="w-1/2">
                          <h1 className="text-base font-bold">
                            Résultat attendu:
                          </h1>
                          <p>{description.resultatAttendu}</p>
                        </div>
                      </div>
                    ))}
                    <div className="h-full flex mb-4 bg-white flex-col pb-4 ">
                      <div className=" w-full flex">
                        <div className="w-1/2">
                          <h1 className="text-[20px] font-bold p-4">Action</h1>
                          <div className="mt-2 p-4">
                            <Textarea
                              placeholder="Action"
                              value={actionText}
                              onChange={(e) => setActionText(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="w-1/2">
                          <h1 className="text-[20px] font-bold p-4">
                            Résultat attendu
                          </h1>
                          <div className="mt-2 p-4">
                            <Textarea
                              placeholder="Résultat Attendu"
                              value={expectedResultText}
                              onChange={(e) =>
                                setExpectedResultText(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button className="ml-4" onClick={handleConfirm}>
                          Confirmer
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full bg-white h-[100vh]">
              Selectionner un cas de test
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CahierDetails;
