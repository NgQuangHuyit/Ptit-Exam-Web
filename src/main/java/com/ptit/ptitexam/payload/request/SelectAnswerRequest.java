package com.ptit.ptitexam.payload.request;

import com.ptit.ptitexam.entity.Choice;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SelectAnswerRequest {
    private Long question_id;
    private Choice selected_choice;
}
