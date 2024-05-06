package com.ptit.ptitexam.controller;

import com.ptit.ptitexam.payload.request.SelectAnswerRequest;
import com.ptit.ptitexam.payload.response.ApiResponse;
import com.ptit.ptitexam.service.AnswerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AnswerController {
    @Autowired
    private AnswerServiceImpl selectedAnswerService;

    @PostMapping("/results/{resultId}/answers")
    private ResponseEntity<?> selectAnswer(
            @PathVariable Long resultId,
            @RequestBody SelectAnswerRequest selectAnswerRequest) {
        return new ResponseEntity<>(
                new ApiResponse<>("Success", true,
                        selectedAnswerService.createSelectedAnswer(selectAnswerRequest, resultId)),
                HttpStatus.OK);
    }
}
