import axios from "axios";
import {useState} from "react";
import { useNavigatem, Link } from "react-router-dom";

const Kakao = () => {
    const [message, setMessage] = useState("");

    const handleProfile = () => {
        axios.get("http://localhost:8080/Kakao")
        .then(resp=>{console.log(resp)})
        .catch(err=>{console.log(err)})
    }
    const handleSendMessageMe = () => {
        const reqMessageMe = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/Kakao/message/me/${message}`)
                console.log(response);
            }catch(error) {
                console.log(error);
            }
        }
        reqMessageMe();
    }

    return (
        <div>
            <h1>KAKAO</h1>
            <div>
                {/* 로그인 요청 - 동기방식 */}
                <a href="http://localhost:8080/Kakao/login">로그인 요청(동기방식)</a>
                <hr />
                {/* 프로필 요청 - 비동기방식 */}
                <button onClick={handleProfile}>프로필 확인</button>
                <hr />
                {/* 메시지 권한 요청 - 동기방식 */}
                <a href="http://localhost:8080/Kakao/getMessageCode">메세지 권한 요청</a>
                <hr />
                <input type="text" onChange={e=>{setMessage(e.target.value)}} /><button onClick={handleSendMessageMe}>나에게 전송</button>
                <hr />
                {/* 로그아웃 요청 - 동기방식 */}
                <a href="http://localhost:8080/Kakao/logout3">로그아웃(동기방식)</a>
            </div>
        </div>
    )
}

export default Kakao;