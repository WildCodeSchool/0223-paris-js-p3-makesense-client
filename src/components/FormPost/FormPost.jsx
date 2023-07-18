import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function FormPost({value, onChange}) {
  console.log("value", value)
  const handleChange = (e) => {
    onChange(e)
  }
  var toolbarOptions = [
    ["bold", "italic", "underline"],
    ["image"],
    [{ list: "ordered" }, { list: "bullet" }],
  ];
  const module = {
    toolbar: toolbarOptions,
  };
  return (
    <div className="formpost">
      <ReactQuill
        modules={module}
        theme="snow"
        value={value}
        onChange={e => handleChange(e)}
      />
    </div>
  );
}

export default FormPost;
