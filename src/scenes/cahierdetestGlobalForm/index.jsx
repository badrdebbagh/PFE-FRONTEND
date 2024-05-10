import { Input } from "../../componentsShadn/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../componentsShadn/ui/form";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DialogClose } from "../../componentsShadn/ui/dialog";
import { Button } from "../../componentsShadn/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../componentsShadn/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  assignDomainToProject,
  createCahierDeTestGlobal,
  getDomaines,
} from "../../state/authentication/Action";
import { Textarea } from "../../componentsShadn/ui/textarea";
import { useParams } from "react-router-dom";

const AjouterCahierDeTestGlobal = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  console.log("projectiD", projectId);
  const form = useForm({
    // resolver:zod
    defaultValues: {
      nom: "",
    },
  });

  const onSubmit = (data) => {
    const cahierDeTest = {
      projectId,
      nom: data.nom,
    };

    dispatch(createCahierDeTestGlobal(cahierDeTest));
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
                    placeholder="cahier de test global nom"
                  />
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

export default AjouterCahierDeTestGlobal;
