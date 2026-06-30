# 📋 Todo 실습 문제 (01_PARAM · 02_VALIDATION · 03_EXCEPTION)

앞서 배운 **01~03 단계의 개념을 하나의 React Todo 앱**으로 묶은 실습입니다.
프론트엔드(React) 코드의 `TODO` 부분을 채워서 동작하게 만드세요.
백엔드(Spring Boot)는 **완성본**으로 제공됩니다.

---

## 🎯 학습 목표

| 단계 | 개념 | 이 실습에서 연습하는 것 |
|------|------|--------------------------|
| **01_PARAM** | axios 파라미터 전송 | `@RequestParam`(검색), 경로변수(상세보기), `@RequestBody`(등록) |
| **02_VALIDATION** | `@Valid` + `BindingResult` | 서버 유효성 오류(417)를 받아 **필드별 에러 메시지** 표시 |
| **03_EXCEPTION** | `@ExceptionHandler` | 호출 실패 시 `catch` → **에러 페이지로 navigate** |

---

## 🗂 폴더 구조

```
01_03EX_문제/
├── README.md                         ← 이 파일(문제지)
├── BN/                               ← 백엔드 REST 프로젝트 (완성본, 단독 실행)
│   ├── build.gradle / gradlew ...
│   └── src/main/java/com/example/demo/
│       ├── DemoApplication.java
│       ├── controller/TodoController.java
│       └── domain/dto/TodoDto.java
└── FN/                               ← 프론트엔드 Todo (TODO 채우기)
    ├── package.json
    ├── public/index.html
    └── src/
        ├── App.js                    (완성)
        ├── api/todoApi.js            ← [문제 1] axios 3종
        └── components/
            ├── ErrorPage.jsx         (완성)
            └── todo/
                ├── TodoAdd.jsx       ← [문제 2] 유효성 + 등록
                └── TodoList.jsx      ← [문제 3] 목록/상세 + 예외
```

---

## ⚙️ 실행 방법

### 1) 백엔드 (포트 8085)
`BN` 폴더 자체가 **독립 실행 가능한 Spring Boot REST 프로젝트**입니다. 복사 필요 없음.

```bash
cd BN
gradlew bootRun        # Windows
# ./gradlew bootRun    # mac/linux
```
→ `http://localhost:8085` 에서 `/todo/...` REST API 동작

### 2) 프론트엔드 (포트 3000)
```bash
cd FN
npm install
npm start
```

---

## ✅ 풀어야 할 TODO 목록

### [문제 1] `src/api/todoApi.js` — 01_PARAM
- **1-1** `searchTodos(keyword)` : `GET /todo/list?keyword=...` (axios `params` 사용)
- **1-2** `getTodo(id)` : `GET /todo/detail/{id}` (경로변수)
- **1-3** `addTodo(todo)` : `POST /todo/add` (JSON 바디)

### [문제 2] `src/components/todo/TodoAdd.jsx` — 02_VALIDATION + 01(POST)
- **2-1** `addTodo` 호출 후 성공 메시지 표시
- **2-2** 실패 시 `err.response.data`(필드별 메시지)를 `setErrors` 로 저장
- **2-3** 각 입력칸 아래 `errors.필드명` 메시지 출력

### [문제 3] `src/components/todo/TodoList.jsx` — 01(GET) + 03_EXCEPTION
- **3-1** `searchTodos(keyword)` 결과를 `setTodos`
- **3-2** `getTodo(id)` 로 상세보기 (없는 id → 404 → 에러페이지)
- **3-3** 예외 테스트 버튼: 실패 시 `goError(err)` 호출

---

## 🧪 동작 확인 시나리오
1. 첫 진입 → 목록 2건 표시 (01: GET 검색)
2. 검색어 "리액트" → 1건 필터링 (01: @RequestParam)
3. "상세" 버튼 → alert 제목 (01: 경로변수)
4. 등록 화면에서 빈값 제출 → 각 칸 밑 빨간 메시지 (02: 유효성)
5. 올바른 값 등록 → 성공 메시지 (01: @RequestBody)
6. "예외 테스트(10/0)" → 에러 페이지로 이동 (03: 예외처리)

> 정답과 자세한 해설은 **`01_03EX_답`** 폴더를 참고하세요.
