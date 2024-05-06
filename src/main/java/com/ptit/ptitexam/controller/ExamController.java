package com.ptit.ptitexam.controller;


import com.ptit.ptitexam.payload.response.ApiResponse;
import com.ptit.ptitexam.payload.ExamDto;
import com.ptit.ptitexam.service.ExamServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ExamController {
    @Autowired
    private ExamServiceImpl examService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/exams")
    public ResponseEntity<?> getAllExams() {
        List<ExamDto> exams = examService.getAll();
        return ResponseEntity.ok(exams);
    }


    @GetMapping("/exams/{id}")
    public ResponseEntity<?> getExamById(@PathVariable(required = true) Long id) {
        return ResponseEntity.ok(examService.getById(id));
    }


    @GetMapping("/exams/filter")
    public ResponseEntity<?> getExamsByFilter(
            @RequestParam(name = "status", defaultValue = "") Boolean status,
            @RequestParam(name = "subject", defaultValue = "") String subject) {
        System.out.println(status);
        System.out.println(subject);
        return ResponseEntity.ok(examService.filterExams(status, subject));
    }

    @GetMapping("/exams/search")
    public ResponseEntity<?> searchExamsByTitle(
            @RequestParam(name = "searchValue", required = true, defaultValue = "") String searchValue) {
        return ResponseEntity.ok(examService.searchExamsByTitle(searchValue));
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/exams")
    public ResponseEntity<?> createExam(@RequestBody ExamDto examDto) {
        ExamDto exam = examService.createExam(examDto);
        return ResponseEntity.ok(new ApiResponse<>("Exam was created successfully", true, exam));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/exams/{id}")
    public ResponseEntity<?> updateExam(@PathVariable(required = true) Long id, @RequestBody ExamDto examDto) {
        ExamDto exam = examService.updateExam(id, examDto);
        return ResponseEntity.ok(new ApiResponse<>("Exam was updated successfully", true, exam));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/exams/{id}")
    public ResponseEntity<?> deleteExam(@PathVariable(required = true) Long id) {
        examService.deleteExam(id);
        return new ResponseEntity<>(new ApiResponse<>("Exam was deleted successfully", true), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("exams/{id}/statistics")
    public ResponseEntity<?> getStatistics(@PathVariable(required = true) Long id) {
        return ResponseEntity.ok(examService.getStatistic(id));
    }
}
