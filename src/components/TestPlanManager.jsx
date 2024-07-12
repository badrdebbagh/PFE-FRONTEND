import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../componentsShadn/ui/card";
import { Button } from "../componentsShadn/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../componentsShadn/ui/popover";

const TestPlanManager = () => {
  const [selectedIteration, setSelectedIteration] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const testPlans = [
    {
      id: 1,
      name: "Campagne 1.0.0",
      iterations: [
        { id: 1, name: "1.0.0.RC1 - Iteration 1" },
        { id: 2, name: "1.0.0.RC2 - Iteration 2" },
        { id: 3, name: "1.0.0.RC3 - Iteration 3" },
      ],
    },
    {
      id: 2,
      name: "Campagne 2.0.0",
      iterations: [
        { id: 4, name: "2.0.0.RC1 - Iteration 1" },
        { id: 5, name: "2.0.0.RC2 - Iteration 2" },
      ],
    },
  ];

  const handleIterationClick = (iteration) => {
    setSelectedIteration(iteration);
    setPopoverOpen(false);
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Ajouter la sélection à un plan d'exécution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="secondary">Sélectionner Iteration</Button>
              </PopoverTrigger>
              <PopoverContent className="w-96">
                <div className="grid gap-4 p-4">
                  {testPlans.map((plan) => (
                    <div key={plan.id}>
                      <div className="font-bold">{plan.name}</div>
                      <div className="ml-4">
                        {plan.iterations.map((iteration) => (
                          <div
                            key={iteration.id}
                            className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                            onClick={() => handleIterationClick(iteration)}
                          >
                            {iteration.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            {selectedIteration && (
              <div className="p-4 border rounded">
                <div className="font-bold">Selected Iteration:</div>
                <div>{selectedIteration.name}</div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="primary">Ajouter</Button>
          <Button variant="secondary" className="ml-2">
            Annuler
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TestPlanManager;
