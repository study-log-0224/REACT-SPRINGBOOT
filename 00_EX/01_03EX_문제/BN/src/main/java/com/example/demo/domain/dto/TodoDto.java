package com.example.demo.domain.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
 * Todo 데이터 + 02_VALIDATION 제약조건 (완성본)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TodoDto {

    private Integer id; // 등록 시에는 서버가 채움

    @NotBlank(message = "제목을 입력하세요")
    @Size(min = 2, max = 30, message = "제목은 2~30자로 입력하세요")
    private String title;        // 할 일 제목

    @NotBlank(message = "작성자를 입력하세요")
    private String writer;       // 작성자

    @NotNull(message = "우선순위를 선택하세요")
    @Min(value = 1, message = "우선순위는 1 이상이어야 합니다")
    @Max(value = 5, message = "우선순위는 5 이하여야 합니다")
    private Integer priority;    // 1(높음) ~ 5(낮음)

    @NotBlank(message = "마감일을 입력하세요")
    private String dueDate;      // yyyy-MM-dd
}
