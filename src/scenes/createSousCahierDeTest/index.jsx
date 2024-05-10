import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "../../componentsShadn/ui/form";
import React, { useEffect, useState } from "react";
import { FormControl } from "@mui/material";
import { Input } from "../../componentsShadn/ui/input";
import { DialogClose } from "../../componentsShadn/ui/dialog";
import { Button } from "../../componentsShadn/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../componentsShadn/ui/select";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDomaines,
  getSousDomaines,
} from "../../state/authentication/Action";
import { createSousCahier } from "../../state/SousCahierDeTest/Action";

const CreateSousCahierDeTestForm = () => {
  const domaines = useSelector((state) => state.auth.domaines);
  const sous_domaines = useSelector((state) => state.auth.sous_domaines);
  const [cahierDeTestGlobalId, setCahierDeTestGlobalId] = useState(null);
  const { projectId } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const domaineFromUrl = query.get("domaine");

  const dispatch = useDispatch();
  const form = useForm({
    // resolver:zod
    defaultValues: {
      name: "",
      domaine: domaineFromUrl,
      sousdomaine: "",
    },
  });
  useEffect(() => {
    dispatch(getDomaines());
  }, []);

  useEffect(() => {
    dispatch(getSousDomaines());
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(` http://localhost:8080/api/project/${projectId}`)
      .then((response) => {
        setCahierDeTestGlobalId(response.data.cahierDeTestGlobalId);
      })

      .catch((error) => {
        console.error("Error fetching project details:", error);
      });
  }, [projectId]);

  const onSubmit = (data) => {
    const sousCahierData = {
      projectId,
      cahierDeTestGlobalId,
      name: data.name,
      domaineId: data.domaine,
      sousDomaineId: data.sousdomaine,
    };
    dispatch(createSousCahier(sousCahierData));
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl className=" w-full">
                  <Input
                    {...field}
                    type="text"
                    className="border w-full py-5 px-5 "
                    placeholder="cahier de test nom"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="domaine"
            render={({ field }) => (
              <FormItem>
                <FormControl className=" w-full">
                  <Select
                    defaultValue="domaine 1"
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}

                    // className="border w-full py-5 px-5 "
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Domaine" />
                    </SelectTrigger>
                    <SelectContent>
                      {domaines.map((domaine) => (
                        <SelectItem key={domaine.id} value={domaine.id}>
                          {domaine.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="sousdomaine"
            render={({ field }) => (
              <FormItem>
                <FormControl className=" w-full">
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sous Domaine" />
                    </SelectTrigger>
                    <SelectContent>
                      {sous_domaines.map((sous_domaine) => (
                        <SelectItem
                          key={sous_domaine.name}
                          value={sous_domaine.id}
                        >
                          {sous_domaine.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose>
            <Button type="submit" className="w-full my-5">
              Creer Cahier De Test
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default CreateSousCahierDeTestForm;
