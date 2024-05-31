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
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const users = useSelector((state) =>
    state.auth.user.filter((user) => user.role === "CHEF_DE_PROJECT")
  );

  const form = useForm({
    defaultValues: {
      description: "",
      role: "",
    },
  });

  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleAddProject = async () => {
    const projectData = {
      userId: selectedUserId,
      projectName: projectName,
      description: projectDescription,
      role: "CHEF_DE_PROJECT",
    };

    try {
      await dispatch(addProject(projectData));
      toast({
        description: "Projet Ajouté avec succés",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Echec de creation de projet",
      });
    }
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
    <div className=" flex flex-col justify-center items-center mt-6 ">
      <div className="mb-4">
        <h1 className="text-2xl text-[#f2762a] font-bold">Projets</h1>
      </div>
      <Card className="w-[1000px] border-[#f2762a] border mx-auto ">
        <CardHeader>
          <CardTitle className="">Creer un projet</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Nom du projet</Label>
                  <Input
                    id="name"
                    placeholder="Nom du projet"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description du projet</Label>
                  <Textarea
                    id="description"
                    placeholder="Decrire le projet ici"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl className="w-full">
                          <Label className="mb-2" htmlFor="description">
                            Chef de projet
                          </Label>
                          <Select
                            value={field.value}
                            onValueChange={handleSelectChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selectionner chef de projet" />
                            </SelectTrigger>

                            <SelectContent>
                              {users.map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                  {user.firstName} {user.lastName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
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
          <Button onClick={handleAddProject} variant="outline">
            Ajouter
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectForm;
