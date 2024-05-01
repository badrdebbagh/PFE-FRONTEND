import {
  Box,
  Fade,
  FormControl,
  FormLabel,
  InputLabel,
  Menu,
  OutlinedInput,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { MenuItem } from "react-pro-sidebar";
import { useTheme } from "@emotion/react";
import { Textarea } from "../../componentsShadn/ui/textarea";
import { ColorModeContext, tokens } from "../../theme";

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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../componentsShadn/ui/select";
import { Input } from "../../componentsShadn/ui/input";
import { Label } from "../../componentsShadn/ui/label";
import { addProject, getUser } from "../../state/authentication/Action";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../componentsShadn/ui/use-toast";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../componentsShadn/ui/form";
import { useForm } from "react-hook-form";

const ProjectForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const user = useSelector((state) =>
    state.auth.user.filter((user) => user.role === "CHEF_DE_PROJECT")
  );
  console.log("dweodw", user);

  const role = user.role;
  console.log("jfioejfdoie ", role);

  const form = useForm({
    defaultValues: {
      description: "",
    },
  });

  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleAddProject = () => {
    const projectData = {
      userId: selectedUserId,
      nom: projectName,
      description: projectDescription,
      role: "CHEF_DE_PROJECT",
    };
    dispatch(addProject(projectData));
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleSelectChange = (value) => {
    setSelectedUserId(value);
    console.log("Selected User ID:", value);
  };

  function getStyles(name, project, theme) {
    return {
      fontWeight:
        project.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (
    <div className=" flex flex-col justify-center items-center  ">
      <div>
        <Header title="Projets" />
      </div>
      <Card className="w-[1000px] border-none mx-auto ">
        <CardHeader>
          <CardTitle className="">Creer un projet</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Nom du projet"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Type your message here."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Label htmlFor="description">Utilisateur</Label>
                        <Select
                          onValueChange={handleSelectChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Selectionner utilisateur" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {user.map((user) => (
                              <SelectItem key={user.id} value={user.id}>
                                {user.firstName} {user.lastName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button
            onClick={handleAddProject}
            // onClick={() => {
            //   toast({
            //     title: "Scheduled: Catch up",
            //     description: "Friday, February 10, 2023 at 5:57 PM",
            //   });
            // }}
            variant="outline"
          >
            Ajouter
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectForm;
