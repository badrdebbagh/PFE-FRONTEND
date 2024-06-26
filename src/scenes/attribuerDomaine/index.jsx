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
  getDomaines,
} from "../../state/authentication/Action";

const AttribuerDomaine = ({ projectId }) => {
  const dispatch = useDispatch();
  const domaines = useSelector((state) => state.auth.domaines);
  const projects = useSelector((state) => state.auth.projects);

  const form = useForm({
    // resolver:zod
    defaultValues: {
      domaine: "",
    },
  });

  const onSubmit = (data) => {
    const domaineId = data.domaine;
    console.log("assignmenet info", domaineId, projectId);
    dispatch(assignDomainToProject(projectId, domaineId));
  };

  useEffect(() => {
    dispatch(getDomaines());
  }, []);

  useEffect(() => {
    console.log("Projects updated, force re-render if necessary", projects);
  }, [projects]);

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
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
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Domaine" />
                    </SelectTrigger>
                    <SelectContent>
                      {domaines.map((domaine) => (
                        <SelectItem key={domaine.id} value={domaine.id}>
                          {domaine.nom}
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
              Confimer
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default AttribuerDomaine;
