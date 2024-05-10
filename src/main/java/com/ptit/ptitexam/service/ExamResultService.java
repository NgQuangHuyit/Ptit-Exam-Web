package com.ptit.ptitexam.service;

import com.ptit.ptitexam.entity.Exam;
import com.ptit.ptitexam.entity.ExamResult;
import com.ptit.ptitexam.entity.User;
import com.ptit.ptitexam.exceptions.CustomForbiddenException;
import com.ptit.ptitexam.exceptions.NotFoundException;
import com.ptit.ptitexam.exceptions.ResouceAlreadyExists;
import com.ptit.ptitexam.payload.ExamResultDto;
import com.ptit.ptitexam.payload.ExamResultSumary;
import com.ptit.ptitexam.repository.ExamRepository;
import com.ptit.ptitexam.repository.ExamResultRepository;
import com.ptit.ptitexam.repository.UserRepository;
import jakarta.ws.rs.ForbiddenException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Objects;

@Service
public class ExamResultService implements IExamResultService{
    @Autowired
    private ExamResultRepository examResultRepository;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<ExamResultSumary> getAllByUser(Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Jwt jwt = (Jwt) authentication.getPrincipal();
        Long asd = (Long) jwt.getClaims().get("userId");
        System.out.println(asd);
        System.out.println(userId);
        if (!Objects.equals(asd, userId) && !authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) throw new CustomForbiddenException("");
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User", "id", userId));
        List<ExamResult> examResultList = examResultRepository.findAllByUser(user);
        return examResultList.stream().map((result) -> this.modelMapper.map(result, ExamResultSumary.class)).toList();
    }

    @Override
    public List<ExamResultSumary> getAllByExam(Long examId) {
        Exam exam = examRepository.findById(examId).orElseThrow(() -> new NotFoundException("Exam", "id", examId));
        List<ExamResult> examResultList = examResultRepository.findAllByExam(exam);
        return examResultList.stream().map((result) -> this.modelMapper.map(result, ExamResultSumary.class)).toList();
    }

    @Override
    public void deleteResult(Long examResultId) {
        ExamResult result = examResultRepository.findById(examResultId).orElseThrow(() -> new NotFoundException("ExamResult", "id", examResultId));
        examResultRepository.delete(result);
    }

    @Override
    public ExamResultDto createResult(Long examId) {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        String name = securityContext.getAuthentication().getName();
        User user = userRepository.findByUsername(name);
        if (user == null) throw new NotFoundException("User", "name", name);
        Exam exam = examRepository.findById(examId).orElseThrow(() -> new NotFoundException("Exam", "id", examId));
        ExamResult examResult = new ExamResult();
        examResult.setUser(user);
        examResult.setExam(exam);
        examResult.setPoint(0f);
        examResult.setStartTime(new Timestamp(System.currentTimeMillis()));
        examResultRepository.save(examResult);
        return this.modelMapper.map(examResult, ExamResultDto.class);
    }

    @Override
    public ExamResultDto submitResult(Long examResultId) {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        String name = securityContext.getAuthentication().getName();
        User user = userRepository.findByUsername(name);
        if (user == null) throw new NotFoundException("User", "name", name);

        ExamResult result = examResultRepository.findById(examResultId).orElseThrow(() -> new NotFoundException("ExamResult", "id", examResultId));
        if (!Objects.equals(result.getUser().getId(), user.getId())) {
            throw new ForbiddenException("");
        }
        if (result.getEndTime() != null)
            throw new ResouceAlreadyExists("ExamResult was already submitted! Cannot submit result");
        result.setEndTime(new Timestamp(System.currentTimeMillis()));
        result.updatePoint();
        examResultRepository.save(result);
        return this.modelMapper.map(examResultRepository.save(result), ExamResultDto.class);
    }

    @Override
    public ExamResultDto getResult(Long id) {
        ExamResult result = examResultRepository.findById(id).orElseThrow(() -> new NotFoundException("ExamResult", "id", id));

        return this.modelMapper.map(result, ExamResultDto.class);
    }

}
