import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const List = () => {
    const [fileList, setFileList] = useState([]);
    useEffect(()=>{
        // 여러번의 요청/기능 사용예정 function + async / await 사용
        const requestServer = async() => {
            axios.get("http://localhost:8080/upload/list")
                .then(resp=>{
                    // console.log(resp);
                    setFileList(resp.data);
                })
                .catch(error=>{console.log(error)})
            console.log("fileList : " + fileList);
        }
        requestServer();
        
    },[])
    
    const handleDownload = (e) => {
        const filePath = e.target.getAttribute('data-filename');
        console.log('filePath', filePath);
        axios.get("http://localhost:8080/download",
            {params:{"filePath":filePath}, responseType:'blob',headers:{"Content-Type":"application/json"}}
        )
                .then(resp=>{
                    console.log(resp);
                    // 전달받은 파일 Download 처리하기
                    const filename = filePath.split("/").pop();
                    const url = window.URL.createObjectURL(new Blob([resp.data]));
                    console.log("url", url);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                })
                .catch(error=>{console.log(error)})
    }

    return (
        <div>
            <h1>파일 목록 확인(React-Springboot)</h1>
            {fileList && (
                fileList.map((el, idx) => {
                    return (
                        <div key={idx}>
                           <Link onClick={handleDownload} data-filename={el}>{el}</Link>
                        </div>
                    )
                })
            )}
        </div>
    )
}

export default List;