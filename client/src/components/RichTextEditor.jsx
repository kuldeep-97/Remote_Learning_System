// npm i react-quill 
import { Description } from "@radix-ui/react-dialog";
import React, { useState } from "react";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css";


const RichTextEditor = ({inpute , setInpute}) => {
    // const [value, setValue] = useState('')

    const handleChange = (content) => {
        setInpute({...inpute, description:content});
    }
    return <ReactQuill theme='snow' value={inpute.description} onChange={handleChange} />
}

export default RichTextEditor;    