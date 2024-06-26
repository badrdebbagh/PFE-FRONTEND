import React from "react";
import { Input } from "../../componentsShadn/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../componentsShadn/ui/form";
import { Button } from "../../componentsShadn/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../componentsShadn/ui/select";
import { DialogClose } from "../../componentsShadn/ui/dialog";
import { useForm } from "react-hook-form";
import { Diversity1 } from "@mui/icons-material";
import { useLocation, useParams } from "react-router-dom";
import { createFunctionnality } from "../../state/authentication/Action";
import { useDispatch } from "react-redux";

const AjouterFonctionnalite = ({ buttonText }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const domaineId = query.get("domaine");
  const { projectId } = useParams();
  const cahierDeTestId = query.get("souscahierdetestid");

  const form = useForm({
    // resolver:zod
    defaultValues: {
      nom: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(
      createFunctionnality(data.nom, domaineId, projectId, cahierDeTestId)
    );
  };
  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormControl className=" w-full">
                  <Input
                    {...field}
                    type="text"
                    className="border w-full py-5 px-5 "
                    placeholder="Nom de la fonctionalité"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose>
            <Button type="submit" className="w-full my-5">
              {buttonText}
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default AjouterFonctionnalite;
