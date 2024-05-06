package com.ptit.ptitexam.payload;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ptit.ptitexam.entity.Choice;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerDto {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    private QuestionDto question;

    @Enumerated(EnumType.STRING)
    private Choice selectedChoice;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Boolean isCorrect;

}
