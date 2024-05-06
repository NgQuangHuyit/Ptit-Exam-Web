package com.ptit.ptitexam.controller;

import com.nimbusds.jose.JOSEException;
import com.ptit.ptitexam.payload.request.IntrospectRequest;
import com.ptit.ptitexam.payload.request.LoginRequest;
import com.ptit.ptitexam.payload.response.IntrospectResponse;
import com.ptit.ptitexam.payload.response.LoginResponse;
import com.ptit.ptitexam.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;


    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequest loginRequest) {
        LoginResponse loginResponse = authenticationService.authenticate(loginRequest);
        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }

    @PostMapping("/introspect")
    public ResponseEntity<?> introspect(@RequestBody IntrospectRequest introspectRequest) {
        try {
            IntrospectResponse introspectResponse = authenticationService.introspect(introspectRequest);
            return new ResponseEntity<>(introspectResponse, HttpStatus.OK);
        } catch (JOSEException | ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
