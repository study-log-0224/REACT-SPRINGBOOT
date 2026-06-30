import axios from "axios";

/*
 * ============================================================
 *  [문제 1] 01_PARAM : axios 파라미터 전송 3가지 방식
 *  아래 TODO 를 채워서 함수를 완성하세요.
 *  백엔드 주소: http://localhost:8085
 * ============================================================
 */

const BASE = "http://localhost:8085";

// -------- TODO 1-1) @RequestParam : 쿼리스트링으로 검색 --------
// 요구사항: GET /todo/list?keyword=검색어
// 힌트: axios.get(url, { params: { ... } })
export const searchTodos = (keyword) => {
  // TODO: keyword 를 쿼리 파라미터로 보내는 GET 요청을 반환하세요.
  // return axios.get( ... );
  return axios.get(`http://localhost:8085/todo/list`, {params: {keyword}})
};

// -------- TODO 1-2) 경로변수(@PathVariable) : 상세보기 --------
// 요구사항: GET /todo/detail/{id}
// 힌트: 템플릿 리터럴 `${id}` 로 URL 경로에 값을 끼워 넣습니다.
export const getTodo = (id) => {
  // TODO: id 를 경로에 넣은 GET 요청을 반환하세요.
  // return axios.get( ... );
  return axios.get(`http://localhost:8085/todo/detail/${id}`)
};

// -------- TODO 1-3) @RequestBody : JSON 바디로 등록 --------
// 요구사항: POST /todo/add  (body 는 JSON)
// 힌트: axios.post(url, data, { headers: { 'Content-Type': 'application/json' } })
export const addTodo = (todo) => {
  // TODO: todo 객체를 JSON 바디로 보내는 POST 요청을 반환하세요.
  // return axios.post( ... );
  return axios.post(`http://localhost:8085/todo/add`, todo, {headers : {'Content-Type': 'application/json'}});
};

// -------- (참고용 완성본) 03_EXCEPTION 테스트용 나눗셈 호출 --------
// GET /todo/divide/{n1}/{n2}  (n2=0 이면 서버에서 ArithmeticException 발생)
export const divide = (n1, n2) => {
  return axios.get(`${BASE}/todo/divide/${n1}/${n2}`);
};
