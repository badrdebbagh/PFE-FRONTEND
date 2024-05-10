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

const AjouterFonctionnalite = () => {
  const form = useForm({
    // resolver:zod
    defaultValues: {
      nom: "",
    },
  });

  const onSubmit = (data) => {
    console.log("onSubmit", data);
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
                    placeholder="Nom de la fonctionalité"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose>
            <Button type="submit" className="w-full my-5">
              Creer la Fonctionnalite
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default AjouterFonctionnalite;
