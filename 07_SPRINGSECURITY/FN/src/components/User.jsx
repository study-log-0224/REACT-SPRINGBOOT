import { useState, useEffect } from "react";
import axios from "axios";

const User = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    useEffect(()=>{
        const fetchUserInfo = async() => {
            try{
                const resp = await axios.get("http://localhost:8080/user", {withCredentials:  true});
                setUserInfo(resp.data);
                setError(null);
            }catch(err) {
                console.error("user info fetch error:", err);
                setError("사용자 경로를 가져오는데 실패했습니다.");
            }
        }
        fetchUserInfo();
    },[])
    return (
        <div>
            <h1>USER PAGE</h1>
            {error && <p style={{color: "red"}}>{error}</p>}
            {userInfo && (
                <div>
                    <p>Username : {userInfo.username}</p>
                    <p>Role : {userInfo.role}</p>
                </div>
            )}
        </div>
    )
}

export default User;