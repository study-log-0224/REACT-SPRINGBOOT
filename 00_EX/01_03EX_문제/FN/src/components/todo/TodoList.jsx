import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchTodos, getTodo, divide } from "../../api/todoApi";

/*
 * ============================================================
 *  [문제 3] 01_PARAM(GET) + 03_EXCEPTION
 *  - 목록/검색: searchTodos(keyword) 결과를 화면에 렌더링
 *  - 상세보기: getTodo(id)
 *  - 예외처리: 호출 실패 시 catch 에서 /error 페이지로 navigate
 *             (state 로 status, message 전달)
 * ============================================================
 */
const TodoList = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [todos, setTodos] = useState([]);

  // 에러를 /error 페이지로 보내는 공통 함수 (완성본)
  const goError = (err) => {
    const data = err.response?.data || {};
    navigate("/error", {
      state: {
        status: data.status || err.response?.status,
        message: data.message || err.message,
      },
    });
  };

  const fetchList = async () => {
    try {
      // TODO 3-1) searchTodos(keyword) 를 await 하고 결과를 setTodos 에 담으세요.
      // const resp = await searchTodos(keyword);
      // setTodos(resp.data);
      const resp = await searchTodos(keyword);
      setTodos(resp.data);
    } catch (err) {
      goError(err);
    }
  };

  // 처음 진입 시 전체 목록 로드
  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDetail = async (id) => {
    try {
      // TODO 3-2) getTodo(id) 를 await 하고 alert 로 제목을 보여주세요.
      //   존재하지 않는 id 면 서버가 404 예외 → catch 로 들어옵니다.
      // const resp = await getTodo(id);
      // alert("상세: " + resp.data.title);
      const resp = await getTodo(id);
      alert("상세: " + resp.data.title);
    } catch (err) {
      goError(err);
    }
  };

  // 03_EXCEPTION 데모: 10/0 호출 → 서버 ArithmeticException → 에러페이지
  const handleDivideZero = async () => {
    try {
      await divide(10, 0);
    } catch (err) {
      // TODO 3-3) goError(err) 를 호출해 /error 페이지로 이동시키세요.
      goError(err);
    }
  };

  return (
    <div className="card">
      <h2>할 일 목록</h2>

      <div className="field">
        <input
          placeholder="제목 검색어"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={fetchList}>검색</button>
        <button onClick={handleDivideZero} style={{ marginLeft: 8, background: "#e84118" }}>
          예외 테스트(10/0)
        </button>
      </div>

      {todos.length === 0 && <p>데이터가 없습니다.</p>}
      {todos.map((t) => (
        <div className="todo-item" key={t.id}>
          <span>
            #{t.id} [{t.priority}] {t.title} - {t.writer} ({t.dueDate})
          </span>
          <button onClick={() => handleDetail(t.id)}>상세</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
