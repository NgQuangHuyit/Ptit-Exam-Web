package com.ptit.ptitexam.payload;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExamResultDto {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    private Timestamp startTime;

    private Timestamp endTime;

    private Float point;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private List<AnswerDto> answers;

    @JsonIgnore
    private ExamDto exam;

    @JsonIgnore
    private UserDetailDto user;

    @JsonGetter("examTitle")
    public String getExamTitle() {
        return exam.getTitle();
    }

    @JsonGetter("username")
    public String getUsername() {
        return user.getUsername();
    }

    @JsonGetter("examId")
    public Long getExamId() {
        return exam.getId();
    }

    @JsonGetter("userId")
    public Long getUserId() {
        return user.getId();
    }
    
    @JsonGetter("fullname")
    public String getFullname() {
        return user.getFullname();
    }
}
