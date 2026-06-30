package com.example.demo.controller;

import com.example.demo.domain.dto.TodoDto;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/*
 * ============================================================
 *  Todo REST 컨트롤러 (완성본)
 *  - 01_PARAM     : @RequestParam / @PathVariable / @RequestBody
 *  - 02_VALIDATION: @Valid + BindingResult → 필드별 에러
 *  - 03_EXCEPTION : @ExceptionHandler
 *  실행 포트: 8085 (application.properties)
 * ============================================================
 */
@RestController
@Slf4j
@RequestMapping("/todo")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class TodoController {

    // 메모리 저장소 (DB 대신)
    private final List<TodoDto> store = new ArrayList<>(List.of(
            new TodoDto(1, "리액트 공부", "홍길동", 3, "2026-07-01"),
            new TodoDto(2, "스프링 복습", "김철수", 1, "2026-07-02")
    ));

    // ---------- 03_EXCEPTION : 예외 처리기 ----------
    @ExceptionHandler(ArithmeticException.class)
    public ResponseEntity<Map<String, Object>> handleArithmetic(Exception ex) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("status", 417);
        map.put("message", "계산 오류: " + ex.getMessage());
        return new ResponseEntity<>(map, HttpStatus.EXPECTATION_FAILED);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(Exception ex) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("status", 404);
        map.put("message", "데이터 없음: " + ex.getMessage());
        return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleAll(Exception ex) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("status", 500);
        map.put("message", "서버 오류: " + ex.getMessage());
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // ---------- 01_PARAM (1) : @RequestParam (쿼리스트링 검색) ----------
    // GET /todo/list?keyword=리액트
    @GetMapping(value = "/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TodoDto>> list(
            @RequestParam(value = "keyword", required = false, defaultValue = "") String keyword) {
        log.info("GET /todo/list keyword=" + keyword);
        List<TodoDto> result = new ArrayList<>();
        for (TodoDto t : store) {
            if (keyword.isEmpty() || t.getTitle().contains(keyword)) result.add(t);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // ---------- 01_PARAM (2) : 경로변수 (@PathVariable) 상세보기 ----------
    // GET /todo/detail/1
    @GetMapping(value = "/detail/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TodoDto> detail(@PathVariable int id) {
        log.info("GET /todo/detail/" + id);
        TodoDto found = store.stream()
                .filter(t -> t.getId() == id)
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("id=" + id)); // 03 예외 유발
        return new ResponseEntity<>(found, HttpStatus.OK);
    }

    // ---------- 01_PARAM (3) + 02_VALIDATION : @RequestBody + @Valid 등록 ----------
    // POST /todo/add  (JSON body)
    @PostMapping(value = "/add",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> add(@RequestBody @Valid TodoDto dto,
                                                    BindingResult bindingResult) {
        Map<String, Object> map = new LinkedHashMap<>();
        log.info("POST /todo/add " + dto);

        // 02_VALIDATION : 유효성 오류 → 필드별 메시지 반환
        if (bindingResult.hasFieldErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                map.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(map, HttpStatus.EXPECTATION_FAILED); // 417
        }

        int newId = store.stream().mapToInt(TodoDto::getId).max().orElse(0) + 1;
        dto.setId(newId);
        store.add(dto);
        map.put("status", "success");
        map.put("id", newId);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    // ---------- 03_EXCEPTION : 일부러 예외 발생 (나눗셈) ----------
    // GET /todo/divide/10/0  → ArithmeticException
    @GetMapping("/divide/{n1}/{n2}")
    public ResponseEntity<Map<String, Object>> divide(@PathVariable int n1, @PathVariable int n2) {
        log.info("GET /todo/divide " + n1 + "/" + n2);
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("result", n1 / n2); // n2=0 이면 ArithmeticException → handleArithmetic
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
