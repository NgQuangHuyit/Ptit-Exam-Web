package com.ptit.ptitexam.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.ptit.ptitexam.entity.User;
import com.ptit.ptitexam.payload.request.IntrospectRequest;
import com.ptit.ptitexam.payload.request.LoginRequest;
import com.ptit.ptitexam.payload.response.IntrospectResponse;
import com.ptit.ptitexam.payload.response.LoginResponse;
import com.ptit.ptitexam.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private static final Logger log = LoggerFactory.getLogger(AuthenticationService.class);
    private final UserRepository userRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @NonFinal
    private final String CIPHER_KEY = "4FjZJxfoDj0a36MxnMUb9IKrFNw0Rq0xSwNEeIvwkYr4pZ7OVJkGwJNTFiUYvgPV";

    public LoginResponse authenticate(LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername());
        if (user == null) return new LoginResponse(null, false, null, null, null, null);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        boolean result = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());
        if (!result) return new LoginResponse(null, false, null, null, null, null);
        else {
            String token = this.generateToken(user);
            return new LoginResponse(token, true, user.getUsername(), user.getId(), user.getEmail(), user.getFullname());
        }
    }

    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("huy")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(5, ChronoUnit.HOURS).toEpochMilli()))
                .claim("scope", buildScope(user))
                .claim("userId", user.getId())
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(CIPHER_KEY));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("could not generate token", e);
            throw new RuntimeException(e);
        }
    }

    public IntrospectResponse introspect(IntrospectRequest request)
            throws JOSEException, ParseException {
        String token = request.getToken();

        JWSVerifier verifier = new MACVerifier(CIPHER_KEY.getBytes());
        SignedJWT signedJWT = SignedJWT.parse(token);
        Date expirationTime = signedJWT.getJWTClaimsSet().getExpirationTime();
        return new IntrospectResponse(signedJWT.verify(verifier) && expirationTime.after(new Date()));
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        if (!user.getRoles().isEmpty()){
            user.getRoles().forEach(s -> stringJoiner.add(s.name()));
        }
        return stringJoiner.toString();
    }
}
