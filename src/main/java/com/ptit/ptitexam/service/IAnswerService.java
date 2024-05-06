package com.ptit.ptitexam.service;

import com.ptit.ptitexam.payload.AnswerDto;
import com.ptit.ptitexam.payload.request.SelectAnswerRequest;

public interface IAnswerService {

    AnswerDto createSelectedAnswer(SelectAnswerRequest selectAnswerRequest, Long resultId);

}
