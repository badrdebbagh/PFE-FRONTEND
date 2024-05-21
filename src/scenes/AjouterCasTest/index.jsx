import React, { useEffect } from "react";
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
import {
  createCasTest,
  createFunctionnality,
} from "../../state/authentication/Action";
import { useDispatch, useSelector } from "react-redux";

const AjouterCasTest = ({ fonctionnaliteId }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const domaineId = query.get("domaine");
  const { projectId } = useParams();
  const cahierDeTestId = query.get("souscahierdetestid");
  const testCases = useSelector((state) => state.auth.testCases);

  useEffect(() => {
    console.log(
      "Received fonctionnaliteId in AjouterCasTest:",
      fonctionnaliteId
    ); // Debugging line
  }, [fonctionnaliteId]);

  const form = useForm({
    // resolver:zod
    defaultValues: {
      titre: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(
      createCasTest(
        data.titre,
        data.description,
        domaineId,
        fonctionnaliteId,
        projectId,
        cahierDeTestId
      )
    );
  };
  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="titre"
            render={({ field }) => (
              <FormItem>
                <FormControl className=" w-full">
                  <Input
                    {...field}
                    type="text"
                    className="border w-full py-5 px-5 "
                    placeholder="Titre"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl className=" w-full">
                  <Input
                    {...field}
                    type="text"
                    className="border w-full py-5 px-5 "
                    placeholder="Description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose>
            <Button type="submit" className="w-full my-5">
              Creer
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default AjouterCasTest;
