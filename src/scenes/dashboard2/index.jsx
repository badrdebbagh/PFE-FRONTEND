import React, { useEffect } from "react";
import { Search } from "lucide-react";

import { Button } from "../../componentsShadn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../componentsShadn/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../componentsShadn/ui/dropdown-menu";
import { Input } from "../../componentsShadn/ui/input";

import { Progress } from "../../componentsShadn/ui/progress";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalProjects,
  getLastLogins,
  getProjectCounts,
  getTotalUsers,
  getAllProjectTestCaseCounts,
} from "../../state/Dashboard/Action";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../componentsShadn/ui/table";
ChartJS.register(ArcElement, Tooltip, Legend);
const Dashboard2 = () => {
  const dispatch = useDispatch();
  const completedCount = useSelector(
    (state) => state.adminDashboard.completedCount
  );
  const completedProjects = useSelector(
    (state) => state.adminDashboard.completedProjects
  );
  const inProgressCount = useSelector(
    (state) => state.adminDashboard.inProgressCount
  );
  const inProgressProjects = useSelector(
    (state) => state.adminDashboard.inProgressProjects
  );
  const totalUsers = useSelector((state) => state.adminDashboard.totalUsers);
  const totalProjects = useSelector(
    (state) => state.adminDashboard.totalProjects
  );
  const lastLogins = useSelector((state) => state.adminDashboard.lastLogins);
  console.log("lastLogins", lastLogins);
  const projectTestCaseCounts = useSelector(
    (state) => state.adminDashboard.projectTestCaseCounts
  );

  useEffect(() => {
    dispatch(getAllProjectTestCaseCounts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getTotalProjects());
  }, []);
  useEffect(() => {
    dispatch(getTotalUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProjectCounts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLastLogins());
  }, [dispatch]);
  const data = {
    labels: ["Projets complets", "Projets incomplets"],
    datasets: [
      {
        data: [completedCount, inProgressCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
          },
          color: "black",
        },
      },
    },
  };

  return (
    <div className=" grid gap-[32px] grid-rows-2 mt-2 p-6 ">
      <div className="grid grid-cols-2 gap-[32px] ">
        <div>
          <Card className="h-full">
            <CardHeader className="pb-2 font-bold text-2xl">
              Status des projets
            </CardHeader>
            <CardContent>
              <div>
                <div className="  h-[400px]">
                  <Pie data={data} options={options} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-xl font-bold">
                    Projets complets: {completedCount}
                  </div>
                  <div className="text-xl font-bold">
                    Projets incomplets: {inProgressCount}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-[32px] grid-rows-3 h-full ">
          <Card className=" row-span-1 flex items-center  justify-center text-2xl font-bold">
            {/* <CardHeader className="pb-2"></CardHeader>
            <CardContent>
              <div>
                <h2 className=" text-xl">
                  Nombre total d'utilisateur :{" "}
                  <span className="font-bold">{totalUsers}</span>
                </h2>
              </div>
              <div>
                <h2 className=" text-xl">
                  Nombre total de projets :{" "}
                  <span className="font-bold">{totalProjects}</span>
                </h2>
              </div>
            </CardContent> */}
            A Déterminer
          </Card>
          <Card className=" flex justify-center items-center row-span-2 text-2xl font-bold">
            A Déterminer
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[32px]">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription></CardDescription>
            <CardTitle className="text-4xl">Projets</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Status</TableHead>
                  <TableHead>Nom du projet</TableHead>
                  <TableHead>Chef de Projet</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedProjects.map((project, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">Completed</TableCell>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.chefDeProjet}</TableCell>
                  </TableRow>
                ))}
                {inProgressProjects.map((project, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">In Progress</TableCell>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.chefDeProjet}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="w-full">
                <TableRow>
                  <TableCell className="font-extrabold">
                    Total des projets complets
                  </TableCell>
                  <TableCell>{completedCount}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-extrabold">
                    Total des projets en progrès
                  </TableCell>
                  <TableCell>{inProgressCount}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">Dernières connexions</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">First Name</TableHead>
                <TableHead className="w-[150px]">Last Name</TableHead>
                <TableHead>Last Login</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lastLogins.map((login, index) => (
                <TableRow key={index}>
                  <TableCell className="font-extrabold">
                    {login.firstName}
                  </TableCell>
                  <TableCell className="font-extrabold">
                    {login.lastName}
                  </TableCell>
                  <TableCell>
                    {new Date(login.lastLogin).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Card className="h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">
              {" "}
              Cas de tests par projets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Nom du projet</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Passé</TableHead>
                  <TableHead>Échoué</TableHead>
                  <TableHead>Non testé</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectTestCaseCounts.map((project, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {project.projectName}
                    </TableCell>
                    <TableCell>{project.totalTestCases}</TableCell>
                    <TableCell>{project.passedTestCases}</TableCell>
                    <TableCell>{project.failedTestCases}</TableCell>
                    <TableCell>{project.notTestedTestCases}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Dashboard2;
