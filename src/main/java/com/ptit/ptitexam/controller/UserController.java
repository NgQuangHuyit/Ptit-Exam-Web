package com.ptit.ptitexam.controller;

import com.ptit.ptitexam.payload.request.RegisterRequest;
import com.ptit.ptitexam.payload.UserDetailDto;
import com.ptit.ptitexam.payload.request.UpdateUserInfo;
import com.ptit.ptitexam.payload.response.ApiResponse;
import com.ptit.ptitexam.service.UserServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController()
@Slf4j
public class UserController {

    @Autowired
    private UserServiceImpl userService;

//    @PostMapping("users/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
//        Session session = userService.loginAccount(loginRequest);
//        if(session == null) {
//            return new ResponseEntity<>(new ApiResponse<>("Wrong username or password", false, null), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(new ApiResponse<>("Login successful", true, session), HttpStatus.OK);
//        }
//    }

    @PostMapping("users/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        UserDetailDto acc = userService.registerUser(registerRequest);
        return ResponseEntity.ok(new ApiResponse<>("User registered successfully", true, acc));
    }


    @GetMapping("/users/myInfo")
    public ResponseEntity<?> getMyInfo() {
        return ResponseEntity.ok(userService.getMyInfo());
    }

    @PostAuthorize("hasRole('ADMIN') or returnObject.getBody().username == authentication.name")
    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findAccountById(id));
    }


    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable Long id, @RequestBody UpdateUserInfo updateUserInfo) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailDto user = userService.updateUserInfo(id, updateUserInfo);
        return new ResponseEntity<>(new ApiResponse<>("User was updated successfully", true, user), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable Long id) {
        userService.deleteUserById(id);
        return new ResponseEntity<>(new ApiResponse<>("User was deleted successfully", true), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<?> getAllAccounts() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication.getPrincipal());
        log.info("User logged in: {}", authentication.getName());
        authentication.getAuthorities()
                .forEach(grantedAuthority -> log.info("GrantedAuthority: {}", grantedAuthority));
        List<UserDetailDto> accountDtos = userService.findAll();
        return ResponseEntity.ok(accountDtos);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users/search")
    public ResponseEntity<?> searchUser(@RequestParam String searchValue) {
        return ResponseEntity.ok(userService.searchByFullName(searchValue));
    }

    @PutMapping("/users/myInfo")
    public ResponseEntity<?> updateMyInfo(@RequestBody UpdateUserInfo updateUserInfo) {
        UserDetailDto user = userService.updateMyInfo(updateUserInfo);
        return new ResponseEntity<>(new ApiResponse<>("User was updated successfully", true, user), HttpStatus.OK);
    }

}
