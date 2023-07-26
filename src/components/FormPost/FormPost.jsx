// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useDispatch, useSelector } from 'react-redux';

// function FormPost(toto, setOne, oui) {
//   const dispatch = useDispatch();
//   oui = useSelector((state) => state.project);
//   const handleChange = (e) => {
//     dispatch({setOne}(e.target.value));
//   };
//   // const handleChange = (e) => {
//   //   onChange(e)
//   // }
//   var toolbarOptions = [
//     ["bold", "italic", "underline"],
//     ["image"],
//     [{ list: "ordered" }, { list: "bullet" }],
//   ];
//   const module = {
//     toolbar: toolbarOptions,
//   };
//   return (
//     <div className="formpost">
//       <ReactQuill
//         modules={module}
//         theme="snow"
//         value={toto}
//         onChange={handleChange}
//         // onChange={e => handleChange(e)}
//       />
//     </div>
//   );
// }

// export default FormPost;

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
