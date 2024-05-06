package com.ptit.ptitexam.service;

import com.ptit.ptitexam.payload.ExamResultSumary;
import com.ptit.ptitexam.payload.request.RegisterRequest;
import com.ptit.ptitexam.payload.UserDetailDto;
import com.ptit.ptitexam.payload.request.UpdateUserInfo;

import java.util.List;

public interface IUserService {

    List<UserDetailDto> findAll();

    UserDetailDto registerUser(RegisterRequest registerRequest);


    void deleteUserById(Long id);

//    UserDetailDto updateUser(Long id, UserDetailDto userDetailDto);

    UserDetailDto findAccountById(Long id);

    List<UserDetailDto> searchByFullName(String fullName);

    UserDetailDto updateUserInfo(Long id, UpdateUserInfo updateUserInfo);

    UserDetailDto getMyInfo();

    UserDetailDto updateMyInfo(UpdateUserInfo updateUserInfo);

    List<ExamResultSumary> getMyExamResultSumary();
}
