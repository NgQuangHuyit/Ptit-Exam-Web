package com.ptit.ptitexam.controller;

import com.ptit.ptitexam.payload.ExamResultDto;
import com.ptit.ptitexam.payload.response.ApiResponse;
import com.ptit.ptitexam.service.ExamResultService;
import com.ptit.ptitexam.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
public class ExamResultController {
    @Autowired
    private ExamResultService examResultService;

    @Autowired
    private UserServiceImpl userService;

    @PostAuthorize("hasRole('ADMIN')")
    @GetMapping("/users/{userId}/results")
    public ResponseEntity<?> getAllExamResultByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(examResultService.getAllByUser(userId));
    }

    @GetMapping("/myresults")
    public ResponseEntity<?> getMyExamResults() {
        return ResponseEntity.ok(userService.getMyExamResultSumary());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/exams/{examId}/results")
    public ResponseEntity<?> getAllExamResultByExamId(@PathVariable Long examId) {
        return ResponseEntity.ok(examResultService.getAllByExam(examId));
    }

    @PostAuthorize("hasRole('ADMIN') or returnObject.body.username == authentication.name")
    @GetMapping("/results/{id}")
    public ResponseEntity<?> getExamResultById(@PathVariable Long id) {
        return ResponseEntity.ok(examResultService.getResult(id));
    }

    @PostMapping("/results")
    public ResponseEntity<?> addExamResult(
            @RequestParam(name = "examId") Long examId) {
        return new ResponseEntity<>(new ApiResponse<>("Success", true, examResultService.createResult(examId)), HttpStatus.OK);
    }

    @PostMapping("/results/submissions")
    public ResponseEntity<?> submitResult(@RequestParam Long resultId) {
        ExamResultDto data = examResultService.submitResult(resultId);
        return ResponseEntity.ok(new ApiResponse<>("Success", true, data));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/results/{id}")
    public ResponseEntity<?> deleteExamResult(@PathVariable Long id) {
        examResultService.deleteResult(id);
        return ResponseEntity.ok().build();
    }


}
