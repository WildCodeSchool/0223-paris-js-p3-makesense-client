import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function FormPost (){
    const [value, setValue] = useState ('');
    var toolbarOptions = [
        ['bold', 'italic', 'underline'], 
        ['image'],
        [{'list': 'ordered'}, {'list': 'bullet'}]
    ];
    const module = {
        toolbar: toolbarOptions,
    };
    return (
        <div class="formpost">
    <ReactQuill className="quill" modules={module} theme="snow" value={value} onChange={setValue} />
    </div>
    );
}

export default FormPost;