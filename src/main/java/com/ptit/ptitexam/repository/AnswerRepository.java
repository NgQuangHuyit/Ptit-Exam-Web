package com.ptit.ptitexam.repository;

import com.ptit.ptitexam.entity.ExamResult;
import com.ptit.ptitexam.entity.Question;
import com.ptit.ptitexam.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    Boolean existsByQuestionAndExamResult(Question question, ExamResult examResult);

    List<Answer> findAllByExamResult(ExamResult examResult);

}
