import React from "react";
import { Input } from "../../componentsShadn/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../componentsShadn/ui/form";

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
import { addSousDomaine } from "../../state/authentication/Action";

const AjouterSousDomaine = () => {
  const dispatch = useDispatch();
  const form = useForm({
    // resolver:zod
    defaultValues: {
      nom: "",
    },
  });

  const onSubmit = (data) => {
    const sousDomaineData = {
      name: data.nom,
    };
    dispatch(addSousDomaine(sousDomaineData))
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
                    placeholder="Nom du sous domaine"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose>
            <Button type="submit" className="w-full my-5">
              Ajouter
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default AjouterSousDomaine;
