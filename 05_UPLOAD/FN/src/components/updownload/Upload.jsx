import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Upload = () => {
    const navigate = useNavigate();
    const [files,setFiles] = useState();    

    const fileChangeHandler = (e) => {
        // console.log(e);
        // console.log(e.target);
        // console.log(e.target.files);

        setFiles(e.target.files);
    }
    const uploadHandler = () => {
        console.log("files",files);
        const formData = new FormData();
        for(let idx in files)
            formData.append("files", files[idx])
        axios.post((`http://localhost:8080/upload`),
        formData,
        {headers: {'Content-Type' : 'multipart/form-data'}})
        .then(response=> {
            console.log(response.data);
        })
        .catch(error=>{
            console.log('error.response.data', error.response.data);
            navigate('/exception',{state: {message: error.response.data.message, status: error.response}});
        })
    }
    return (
        <div>
            <h1>파일 업로드 TEST(REACT-SPRINGBOOG)</h1>
            <input type="file" name="files" onChange={fileChangeHandler} multiple />
            <button onClick={uploadHandler}>UPLOAD</button>
        </div>
    )
}

export default Upload;