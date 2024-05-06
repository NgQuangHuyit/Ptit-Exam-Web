package com.ptit.ptitexam.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private boolean success;
    private String username;
    private Long userId;
    private String email;
    private String fullname;
}
