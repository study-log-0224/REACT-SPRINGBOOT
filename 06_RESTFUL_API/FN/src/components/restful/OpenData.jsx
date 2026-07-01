import axios from "axios";
import {useState,useEffect} from "react";
import {useNavigate,Link} from "react-router-dom";

const OpenData = () => {

    const handleWeather = () => {
        axios.get(`http://localhost:8080/Open/Weather`)
        .then(resp=>{console.log(resp)})
        .catch(err=>{console.log(err)})
    }
    const handleBusInfo = () => {
        axios.get(`http://localhost:8080/Open/Bus/7001001600/649`)
        .then(resp=>{console.log(resp)})
        .catch(err=>{console.log(err)})
    }

    return (
        <div>
            <button onClick={handleWeather}>날씨요청</button>
            <button onClick={handleBusInfo}>버스노선요청</button>
        </div>
    )
}

export default OpenData;