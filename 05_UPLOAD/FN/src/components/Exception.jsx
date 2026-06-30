import {useLocation} from 'react-router-dom';

const Exception = () => {
    const location = useLocation();
    const {message, status} = location.state || {}; // 예외정보 가저오기

    return (
        <div>
            <h1>EXCEPTION</h1>
            {status && <p>Status Code: {status}</p>}
            {message && <p>Status Code: {message}</p>}
        </div>
    )
}

export default Exception;