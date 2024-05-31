import { Input } from "../componentsShadn/ui/input";
import { Button } from "../componentsShadn/ui/button";
import axios from "axios";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../componentsShadn/ui/card";
import { Label } from "../componentsShadn/ui/label";

const UploadExcel = ({ projectId, selectedDomaine }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `http://localhost:8080/api/upload/${projectId}/${selectedDomaine}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    }
  };

  return (
    <div className="flex items-center justify-center mt-4 flex-col">
      {/* <Input className="bg-gray-100" type="file" onChange={handleFileChange} />
      <Button onClick={handleFileUpload}>Upload Excel</Button> */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Charger votre fichier</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-y-4">
          <div className="w-full grid gap-0.5  mr-4">
            <Label htmlFor="file">Choisir un fichier</Label>
            <Input
              className="file:bg-gray-200 file:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] file:px-4 file:rounded-xl file:mr-4 file:hover:bg-slate-900 file:ease-in file:transition file:hover:text-white "
              id="file"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <Button className="" onClick={handleFileUpload}>
            Soumettre
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadExcel;
