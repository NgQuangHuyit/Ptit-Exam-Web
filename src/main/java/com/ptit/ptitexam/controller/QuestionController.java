package com.ptit.ptitexam.controller;

import com.ptit.ptitexam.payload.response.ApiResponse;
import com.ptit.ptitexam.payload.QuestionDto;
import com.ptit.ptitexam.service.QuestionServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class QuestionController {
    @Autowired
    private QuestionServiceImpl questionService;

    // get all questions that belong to specific exam
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/exams/{examID}/questionDetails")
    public ResponseEntity<?> getQuestionByExam(@PathVariable("examID") Long examID) {
        return ResponseEntity.ok(questionService.getAllQuestionByExam(examID));
    }

    @GetMapping("/exams/{examID}/questions")
    public ResponseEntity<?> getQuestList(@PathVariable("examID") Long examID) {
        return ResponseEntity.ok(questionService.getQuestList(examID));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/questions/{id}")
    public ResponseEntity<?> getQuestionById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(questionService.getQuestionById(id));
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/exams/{examID}/questions")
    public ResponseEntity<?> addQuestion(@PathVariable("examID") Long examID, @RequestBody QuestionDto questionDto) {
        QuestionDto ques = questionService.createQuestion(questionDto, examID);
        return ResponseEntity.ok(new ApiResponse<>("Question was created successfully", true, ques));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/questions/{quesId}")
    public ResponseEntity<?> updateQuestion(@PathVariable("quesId") Long quesId, @RequestBody QuestionDto questionDto) {
        QuestionDto ques = questionService.updateQuestion(quesId, questionDto);
        return ResponseEntity.ok(new ApiResponse<>("Question was updated successfully", true, ques));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/questions/{quesId}")
    public ResponseEntity<?> deleteQuestion(@PathVariable("quesId") Long questionId) {
        questionService.deleteQuestion(questionId);
        return ResponseEntity.ok(new ApiResponse<>("Question was deleted successfully", true));
    }


}
