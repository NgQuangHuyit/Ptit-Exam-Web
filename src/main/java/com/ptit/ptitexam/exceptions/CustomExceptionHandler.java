package com.ptit.ptitexam.exceptions;


import com.ptit.ptitexam.payload.response.ApiResponse;
import com.ptit.ptitexam.payload.response.ErrorResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponse<ErrorResponse> handleNotFoundException(NotFoundException e) {

        return new ApiResponse<>("Failed", false, new ErrorResponse(HttpStatus.NOT_FOUND, e.getMessage()));
    }

    @ExceptionHandler(UsernameOrEmailAlreadyExists.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ApiResponse<ErrorResponse> handleUsernameOrEmailAlreadyExists(UsernameOrEmailAlreadyExists e) {
        return new ApiResponse<>("Failed", false, new ErrorResponse(HttpStatus.CONFLICT, e.getMessage()));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse<ErrorResponse> handleConstraintViolationException(ConstraintViolationException e) {
        e.getConstraintViolations().forEach(a -> System.out.println(a.getConstraintDescriptor()));
        return new ApiResponse<>("Failed", false,
                new ErrorResponse(HttpStatus.BAD_REQUEST, "Validation Failed " +
                "(username must be at least 5 characters, at most 20 characters, " +
                "and start with a character)"));
    }

    @ExceptionHandler({CommonException.class, ResouceAlreadyExists.class})
    @ResponseStatus(HttpStatus.CONFLICT)
    public ApiResponse<ErrorResponse> handleCommonException(RuntimeException e) {
        return new ApiResponse<>("Failed", false, new ErrorResponse(HttpStatus.CONFLICT, e.getMessage()));
    }
}
