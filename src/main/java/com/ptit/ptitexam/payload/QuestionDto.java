package com.ptit.ptitexam.payload;

import com.fasterxml.jackson.annotation.JsonProperty;

import com.ptit.ptitexam.entity.Choice;
import com.ptit.ptitexam.entity.Exam;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDto {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    private String content;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Timestamp lastModified;

    private String choiceA;

    private String choiceB;

    private String choiceC;

    private String choiceD;

    private Choice rightChoice = Choice.A;

}
