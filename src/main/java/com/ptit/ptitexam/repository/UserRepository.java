package com.ptit.ptitexam.repository;

import com.ptit.ptitexam.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);
    boolean existsByUsernameOrEmail(String username, String email);
    User findByUsernameAndPassword(String username, String password);
    List<User> findAllByFullnameContainingIgnoreCase(String fullname);

    User findByUsername(String username);
}
