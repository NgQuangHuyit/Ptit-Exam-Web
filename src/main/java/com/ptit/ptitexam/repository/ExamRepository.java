package com.ptit.ptitexam.repository;

import com.ptit.ptitexam.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {

    List<Exam> findAllByIsActiveAndSubject(Boolean isActive, String subject);

    List<Exam> findAllByIsActive(Boolean isActive);

    List<Exam> findAllBySubject(String subject);

    List<Exam> findAllByTitleContaining(String title);

}
