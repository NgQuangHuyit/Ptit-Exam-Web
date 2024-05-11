package com.ptit.ptitexam.payload.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class SubmitRequest {
    private String examId;
    private List<SelectAnswerRequest> answers;
}
