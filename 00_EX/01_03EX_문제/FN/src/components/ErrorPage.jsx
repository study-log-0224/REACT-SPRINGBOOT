import { useLocation, useNavigate } from "react-router-dom";

/*
 * 03_EXCEPTION : 에러 표시 페이지 (완성본)
 *  - TodoList 에서 catch 시 navigate("/error", { state: {...} }) 로 넘어옵니다.
 *  - 참고: 03_EXCEPTION/FN/components/Exception.jsx 와 같은 패턴
 */
const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { status, message } = location.state || {};

  return (
    <div className="card">
      <h2>⚠️ 예외 발생</h2>
      {status && <p>Status Code: {status}</p>}
      {message && <p>Message: {message}</p>}
      {!status && !message && <p>전달된 에러 정보가 없습니다.</p>}
      <button onClick={() => navigate("/list")}>목록으로</button>
    </div>
  );
};

export default ErrorPage;
