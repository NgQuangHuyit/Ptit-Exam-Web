package com.ptit.ptitexam.configuration;

import com.ptit.ptitexam.entity.Role;
import com.ptit.ptitexam.entity.User;
import com.ptit.ptitexam.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class ApplicationInitConfig {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository) {
        return args -> {
            if (userRepository.findByUsername("admin") == null) {
                User user = new User();
                user.setUsername("admin");
                user.setPassword(passwordEncoder.encode("admin"));
                user.setIsActive(true);
                HashSet<Role> roles = new HashSet<>();
                roles.add(Role.USER);
                roles.add(Role.ADMIN);
                user.setEmail("admin@ptit.com");
                user.setRoles(roles);
                userRepository.save(user);
                log.warn("default admin account was created with default password admin");
            }
        };
    }
}
