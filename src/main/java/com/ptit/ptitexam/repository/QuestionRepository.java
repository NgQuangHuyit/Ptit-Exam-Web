package com.ptit.ptitexam.repository;

import com.ptit.ptitexam.entity.Exam;
import com.ptit.ptitexam.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findAllByExam(Exam exam);
}
