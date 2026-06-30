import { useState } from "react";
import { addTodo } from "../../api/todoApi";

/*
 * ============================================================
 *  [문제 2] 02_VALIDATION + 01_PARAM(POST)
 *  - 입력폼을 만들어 POST /todo/add 로 등록한다.
 *  - 서버가 유효성 오류(417)를 주면 "필드별 에러 메시지"를 화면에 표시한다.
 *
 *  서버 검증 규칙(TodoDto):
 *    title    : 2~30자, 빈값 불가
 *    writer   : 빈값 불가
 *    priority : 1~5 정수
 *    dueDate  : 빈값 불가 (yyyy-MM-dd)
 *
 *  서버 오류 응답 예: { "title": "제목을 입력하세요", "priority": "..." }
 * ============================================================
 */
const TodoAdd = () => {
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  // 필드별 에러 메시지 { title, writer, priority, dueDate }
  const [errors, setErrors] = useState({});
  const [okMsg, setOkMsg] = useState("");

  const handleSubmit = async () => {
    setOkMsg("");
    setErrors({});

    const todo = {
      title,
      writer,
      priority: priority === "" ? null : Number(priority),
      dueDate,
    };

    try {
      // TODO 2-1) addTodo(todo) 를 호출(await)하고 성공 시 okMsg 를 설정하세요.
      //           예) setOkMsg("등록 성공! id=" + resp.data.id)
      // const resp = await addTodo(todo);
      // setOkMsg(...);
      const resp = await addTodo(todo);
      setOkMsg(`${title} 등록성공! id=` + resp.data.id);
    } catch (err) {
      // TODO 2-2) 유효성 오류(HTTP 417) 처리:
      //   - 서버는 err.response.data 에 { 필드명: 메시지 } 형태로 내려준다.
      //   - 이 데이터를 그대로 setErrors(...) 에 넣어 각 필드 밑에 표시되게 하세요.
      // setErrors(...);
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      }
    }
  };

  return (
    <div className="card">
      <h2>할 일 등록</h2>
      {okMsg && <p style={{ color: "green" }}>{okMsg}</p>}

      <div className="field">
        <label>제목</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        {/* TODO 2-3) errors.title 이 있으면 <p className="err">{...}</p> 로 표시 */}
        {errors.title && <p className="err">{errors.title}</p>}
      </div>

      <div className="field">
        <label>작성자</label>
        <input value={writer} onChange={(e) => setWriter(e.target.value)} />
        {/* TODO 2-3) errors.writer 표시 */}
        {errors.writer && <p className="err">{errors.writer}</p>}
      </div>

      <div className="field">
        <label>우선순위 (1~5)</label>
        <input
          type="number"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        {/* TODO 2-3) errors.priority 표시 */}
        {errors.priority && <p className="err">{errors.priority}</p>}
      </div>

      <div className="field">
        <label>마감일</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        {/* TODO 2-3) errors.dueDate 표시 */}
        {errors.dueDate && <p className="err">{errors.dueDate}</p>}
      </div>

      <button onClick={handleSubmit}>등록</button>
    </div>
  );
};

export default TodoAdd;
