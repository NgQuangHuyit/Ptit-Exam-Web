package com.ptit.ptitexam.service;

import com.ptit.ptitexam.entity.Role;
import com.ptit.ptitexam.entity.User;
import com.ptit.ptitexam.exceptions.CommonException;
import com.ptit.ptitexam.exceptions.NotFoundException;
import com.ptit.ptitexam.exceptions.UsernameOrEmailAlreadyExists;
import com.ptit.ptitexam.payload.ExamResultSumary;
import com.ptit.ptitexam.payload.request.RegisterRequest;
import com.ptit.ptitexam.payload.UserDetailDto;
import com.ptit.ptitexam.payload.request.UpdateUserInfo;
import com.ptit.ptitexam.repository.UserRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    public ModelMapper modelMapper;

//    private boolean checkPasswordPatten(String password) {
//        return true
//    }

    @Override
    public UserDetailDto registerUser(RegisterRequest registerRequest) {
        if(userRepository.existsByUsernameOrEmail(registerRequest.getUsername(), registerRequest.getEmail())) {
            throw new UsernameOrEmailAlreadyExists();
        }
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setIsActive(true);
        HashSet<Role> roles = new HashSet<>();
        roles.add(Role.USER);
        user.setRoles(roles);
        userRepository.save(user);
        return modelMapper.map(user, UserDetailDto.class);
    }


    @Override
    public UserDetailDto findAccountById(Long id) {
         User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User", "id", id));
         return modelMapper.map(user, UserDetailDto.class);
    }

//    @Override
//    public UserDetailDto updateUser(Long id, UserDetailDto userDetailDto) {
//        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("user", "id", id));
//        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
//        user.setPassword(passwordEncoder.encode(userDetailDto.getPassword()));
//        user.setEmail(userDetailDto.getEmail());
//        user.setFullname(userDetailDto.getFullname());
//        user.setDob(userDetailDto.getDob());
//        user.setIsActive(userDetailDto.getIsActive());
//        user.setPhoneNumber(userDetailDto.getPhoneNumber());
//        userRepository.save(user);
//        return modelMapper.map(user, UserDetailDto.class);
//    }

    @Override
    public UserDetailDto updateUserInfo(Long id, UpdateUserInfo updateUserInfo) {
        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("user", "id", id));
        user.setFullname(updateUserInfo.getFullname());
        user.setDob(updateUserInfo.getDob());
        user.setIsActive(updateUserInfo.getIsActive());
        user.setPhoneNumber(updateUserInfo.getPhoneNumber());
        user.setClassID(updateUserInfo.getClassID());
        userRepository.save(user);
        return modelMapper.map(user, UserDetailDto.class);
    }

    @Override
    public void deleteUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("user", "id", id));
        if (user.getRoles().contains(Role.ADMIN))
            throw new CommonException("can not delete admin");
        userRepository.deleteById(id);
    }

    @Override
    public List<UserDetailDto> findAll() {
        List<User> accounts = userRepository.findAll();
        return accounts.stream()
                .map((acc) -> this.modelMapper.map(acc, UserDetailDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<UserDetailDto> searchByFullName(String fullname) {
        return userRepository.findAllByFullnameContainingIgnoreCase(fullname).stream()
                .map((user) -> this.modelMapper.map(user, UserDetailDto.class))
                .toList();
    }

    @Override
    public UserDetailDto getMyInfo() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        System.out.println(securityContext.getAuthentication().getPrincipal());
        String name = securityContext.getAuthentication().getName();
        User user = userRepository.findByUsername(name);
        if (user == null) throw new NotFoundException("User", "name", name);
        return modelMapper.map(user, UserDetailDto.class);
    }

    @Override
    public UserDetailDto updateMyInfo(UpdateUserInfo updateUserInfo){
        SecurityContext securityContext = SecurityContextHolder.getContext();
        String name = securityContext.getAuthentication().getName();
        User user = userRepository.findByUsername(name);
        if (user == null) throw new NotFoundException("User", "name", name);
        user.setFullname(updateUserInfo.getFullname());
        user.setDob(updateUserInfo.getDob());
        user.setIsActive(updateUserInfo.getIsActive());
        user.setPhoneNumber(updateUserInfo.getPhoneNumber());
        user.setGender(updateUserInfo.getGender());
        user.setClassID(updateUserInfo.getClassID());
        userRepository.save(user);
        return modelMapper.map(user, UserDetailDto.class);
    }

    @Override
    public List<ExamResultSumary> getMyExamResultSumary(){
        SecurityContext securityContext = SecurityContextHolder.getContext();
        String name = securityContext.getAuthentication().getName();
        User user = userRepository.findByUsername(name);
        if (user == null) throw new NotFoundException("User", "name", name);
        return user.getExamResults().stream().map(result -> modelMapper.map(result, ExamResultSumary.class)).collect(Collectors.toList());
    }
}
