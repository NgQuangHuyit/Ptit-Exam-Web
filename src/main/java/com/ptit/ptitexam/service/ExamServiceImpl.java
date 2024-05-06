package com.ptit.ptitexam.service;

import com.ptit.ptitexam.entity.Exam;
import com.ptit.ptitexam.exceptions.NotFoundException;
import com.ptit.ptitexam.payload.ExamDto;
import com.ptit.ptitexam.payload.ExamStatistic;
import com.ptit.ptitexam.repository.ExamRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExamServiceImpl implements IExamService{
    @Autowired
    private ExamRepository examRepository;


    @Autowired
    private ModelMapper modelMapper;

    private Exam DtoToExam(ExamDto examDto) {
        return modelMapper.map(examDto, Exam.class);
    }

    private ExamDto ExamToExamDto(Exam exam) {
        return modelMapper.map(exam, ExamDto.class);
    }

    @Override
    public List<ExamDto> getAll() {
        List<Exam> examList = examRepository.findAll();
        return examList.stream().map((exam) -> this.modelMapper.map(exam, ExamDto.class)).collect(Collectors.toList());
    }

    @Override
    public ExamDto getById(Long id) {
        Optional<Exam> exam = examRepository.findById(id);
        if (exam.isPresent()) {
            return ExamToExamDto(exam.get());
        }
        else throw new NotFoundException("Exam", "id", id);
    }

    @Override
    public ExamDto createExam(ExamDto examDto) {
        Exam exam = modelMapper.map(examDto, Exam.class);
        if (exam.getIsActive() == null) exam.setIsActive(false);
        examRepository.save(exam);
        return ExamToExamDto(exam);
    }

    @Override
    public List<ExamDto> filterExams(Boolean status, String subject) {
        if (status == null && subject.isEmpty()) {
            return this.getAll();
        }
        else if (status == null) {
            System.out.println("status null");
            return examRepository.findAllBySubject(subject).stream().map(this::ExamToExamDto).collect(Collectors.toList());
        }
        else if (subject.isEmpty()) {
            System.out.println("subject null");
            return examRepository.findAllByIsActive(status).stream().map(this::ExamToExamDto).collect(Collectors.toList());
        }
        return examRepository.findAllByIsActiveAndSubject(status, subject).stream().map(this::ExamToExamDto).collect(Collectors.toList());
    }

    @Override
    public List<ExamDto> searchExamsByTitle(String title) {
        List<Exam> examList = examRepository.findAllByTitleContaining(title);
        return examList.stream().map(this::ExamToExamDto).collect(Collectors.toList());
    }

    @Override
    public ExamDto updateExam(Long id, ExamDto examDto) {
        Exam exam = examRepository.findById(id).orElseThrow(() -> new NotFoundException("Exam", "id", id));
        exam. setTitle(examDto.getTitle());
        exam.setSubject(examDto.getSubject());
        exam.setIsActive(examDto.getIsActive());
        exam.setDescription(examDto.getDescription());
        exam.setTimeAmt(examDto.getTimeAmt());
        Exam updatedExam = examRepository.save(exam);
        return ExamToExamDto(updatedExam);
    }

    @Override
    public void deleteExam(Long id) {
        Exam exam = examRepository.findById(id).orElseThrow(() -> new NotFoundException("Exam", "id", id));
        examRepository.delete(exam);
    }

    @Override
    public ExamStatistic getStatistic(Long id) {
        Exam exam = examRepository.findById(id).orElseThrow(() -> new NotFoundException("Exam", "id", id));
        return exam.getStatistic();
    }
}
