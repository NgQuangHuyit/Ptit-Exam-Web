package com.ptit.ptitexam.service;

import com.ptit.ptitexam.payload.QuestionDto;

import java.util.List;

public interface IQuestionService {
    List<QuestionDto> getAllQuestionByExam(Long examID);

    QuestionDto getQuestionById(Long id);

    QuestionDto createQuestion(QuestionDto questionDto, Long examID);

    QuestionDto updateQuestion(Long questionId, QuestionDto questionDto);

    void deleteQuestion(Long questionId);

    List<QuestionDto> getQuestList(Long examID);
}
