package com.ptit.ptitexam.service;

import com.ptit.ptitexam.payload.ExamResultDto;
import com.ptit.ptitexam.payload.ExamResultSumary;

import java.util.List;

public interface IExamResultService {
    List<ExamResultSumary> getAllByUser(Long userId);

    List<ExamResultSumary> getAllByExam(Long examId);

    void deleteResult(Long examResultId);

    ExamResultDto createResult(Long examId);

    ExamResultDto submitResult(Long resultId);

    ExamResultDto getResult(Long resultId);
}
