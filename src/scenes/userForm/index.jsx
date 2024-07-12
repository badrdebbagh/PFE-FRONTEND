import axios from "axios";
import { useState } from "react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoles } from "../../state/authentication/Action";
import { useToast } from "../../componentsShadn/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../componentsShadn/ui/form";
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
import { useForm } from "react-hook-form";
import { Button } from "../../componentsShadn/ui/button";

const NewForm = () => {
  const roles = useSelector((store) => store.auth.roles).filter(
    (role) => role !== "ADMIN"
  );
  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleFetchRoles = () => {
    if (roles.length === 0) {
      dispatch(getRoles());
    }
    console.log(roles);
  };
  const roleDisplayNames = {
    USER: "Testeur",
    ADMIN: "Admin",
    CHEF_DE_PROJECT: "Chef de Projet",
  };


  const onSubmit = async (data) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    try {
      const endpoint = "http://localhost:8080/api/createUser";
      const response = await axios.post(endpoint, userData);

      console.log("User created successfully:", response.userData);
      toast({
        description: "Utilisateur Ajouté avec succès",
      });

      form.reset();
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    },
  });

  return (
    <div className=" px-6 flex flex-col justify-center items-center h-screen w-full ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-8 w-[700px] ">
            <div className="flex gap-6">
              {/* field for firstName */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <Input
                        className="bg-white  border-[#f2762a] border placeholder:text-[#f2762a]  font-bold"
                        {...field}
                        type="text"
                        placeholder="Prénom"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* field for lastname */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <Input
                        className="bg-white border-[#f2762a] border placeholder:text-[#f2762a]  font-bold"
                        {...field}
                        type="text"
                        placeholder="Nom"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-6">
              {/* field for email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <Input
                        className="bg-white border-[#f2762a] border placeholder:text-[#f2762a]  font-bold"
                        {...field}
                        type="text"
                        placeholder="Email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* field for role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <Select
                        onOpenChange={handleFetchRoles}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="bg-white border-[#f2762a] border text-[#f2762a] font-bold">
                          <SelectValue placeholder="Selectionner le role" />
                        </SelectTrigger>

                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem value={role}>
                              {" "}
                              {roleDisplayNames[role]}
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
            <div>
              {/* field for password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <Input
                        className="bg-white border-[#f2762a] border placeholder:text-[#f2762a] font-bold"
                        {...field}
                        type="text"
                        placeholder="Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center items-center ">
              <Button type="submit" variant="thirdly">
                Ajouter utilisateur
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewForm;
