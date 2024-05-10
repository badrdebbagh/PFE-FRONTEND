import { Button } from "../../componentsShadn/ui/button";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../componentsShadn/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AjouterFonctionnalite from "./ajouterFonctionnalite";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../componentsShadn/ui/tooltip";

const CahierDetails = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* <Button variant="secondary" className="text-[100px] h-[150px]">
        Mnin ghadi nbda db hadi hhhhhhh
      </Button> */}
      <div className="pl-12 drop-shadow-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                className="rounded-md"
                onClick={() => setOpen(true)}
              >
                <FontAwesomeIcon className="text-black" icon={faPlus} />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="ml-10">
              <p>Ajouter fonctionnalité</p>
            </TooltipContent>
          </Tooltip>
          <Dialog open={open} onOpenChange={setOpen} variant="secondary">
            <DialogContent>
              <DialogHeader>Creer une nouvelle fonctionnalité</DialogHeader>
              <AjouterFonctionnalite />
            </DialogContent>
          </Dialog>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default CahierDetails;
