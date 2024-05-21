import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichText = () => {
  const [value, setValue] = useState("");
  return (
    <ReactQuill
      className=" min-h-[1000px] max-h-[300px] "
      theme="snow"
      value={value}
      onChange={setValue}
    />
  );
};

export default RichText;
