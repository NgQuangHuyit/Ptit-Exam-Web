package com.ptit.ptitexam.payload;

import lombok.Data;

@Data
public class Session {
    private Long accountId;
    private String accessToken;
}
