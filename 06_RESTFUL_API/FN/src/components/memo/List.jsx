import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

const List = () => {

    const [n1,setN1] = useState(0);
    const [n2,setN2] = useState(0);

    const navigate = useNavigate();

    const handlerRequestList1=()=>{
        axios.get(`http://localhost:8085/memo/list1`)
        .then(resp => {console.log(resp)})
        .catch(err => {
            console.log(err.response);
            //
            navigate('/exception', {state: {message: err.response.data.message, status: err.response?.status}});
        })
    };
    const handlerRequestList2=()=>{
        axios.get(`http://localhost:8085/memo/list2`)
        .then(resp => {console.log(resp)})
        .catch(err => {
            console.log(err.response);
            //
            navigate('/exception', {state: {message: err.response.data.message, status: err.response?.status}});
        })
    };
    const handlerRequestList3=()=>{
        axios.get(`http://localhost:8085/memo/list3/${n1}/${n2}`)
        .then(resp => {console.log(resp)})
        .catch(err => {
            console.log(err.response);
            //
            navigate('/exception', {state: {message: err.response.data.message, status: err.response?.status}});
        })
    };

    return (
        <div>
            <h2>MEMO LIST</h2>
            <hr />
            <h3>임시 EXCEPTION TEST</h3>
            <button onClick={handlerRequestList1}>http://localhost:8085/memo/list1</button><br />
            <button onClick={handlerRequestList2}>http://localhost:8085/memo/list2</button><br />
            <hr />
            n1 : <input onChange={e=>{setN1(e.target.value)}}/> <br /> n2 : <input onChange={e=>{setN2(e.target.value)}}/> <br />
            <button onClick={handlerRequestList3}>http://localhost:8085/memo/list3</button><br />
        </div>
    )
}

export default List;