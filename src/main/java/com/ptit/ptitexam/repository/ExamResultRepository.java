package com.ptit.ptitexam.repository;

import com.ptit.ptitexam.entity.Exam;
import com.ptit.ptitexam.entity.ExamResult;
import com.ptit.ptitexam.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {
    List<ExamResult> findAllByUser(User user);

    List<ExamResult> findAllByExam(Exam exam);
}
