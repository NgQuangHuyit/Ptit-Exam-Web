package com.ptit.ptitexam.service;

import com.ptit.ptitexam.entity.Exam;
import com.ptit.ptitexam.entity.Question;
import com.ptit.ptitexam.exceptions.NotFoundException;
import com.ptit.ptitexam.payload.QuestionDto;
import com.ptit.ptitexam.repository.ExamRepository;
import com.ptit.ptitexam.repository.QuestionRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements IQuestionService{
    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    ModelMapper modelMapper;


    @Override
    public List<QuestionDto> getAllQuestionByExam(Long examID) {
        Exam exam = examRepository.findById(examID).orElseThrow(() -> new NotFoundException("Exam", "id", examID));
        return questionRepository.findAllByExam(exam).stream().map((ques) -> this.modelMapper.map(ques, QuestionDto.class)).toList();
    }

    @Override
    public List<QuestionDto> getQuestList(Long examID){
        Exam exam = examRepository.findById(examID).orElseThrow(() -> new NotFoundException("Exam", "id", examID));
        List<Question> questions = questionRepository.findAllByExam(exam);
        questions.forEach(question -> question.setRightChoice(null));
        return questions.stream().map((question) -> this.modelMapper.map(question, QuestionDto.class)).toList();
    }

    @Override
    public QuestionDto getQuestionById(Long id) {
        Question ques = questionRepository.findById(id).orElseThrow(() -> new NotFoundException("Question", "id", id));
        return modelMapper.map(ques, QuestionDto.class);
    }

    @Override
    public QuestionDto createQuestion(QuestionDto questionDto, Long examID) {
        Exam exam = examRepository.findById(examID).orElseThrow(() -> new NotFoundException("Exam", "id", examID));
        Question question = modelMapper.map(questionDto, Question.class);
        question.setExam(exam);
        questionRepository.save(question);
        return modelMapper.map(question, QuestionDto.class);
    }

    @Override
    public QuestionDto updateQuestion(Long questionID, QuestionDto questionDto) {
        Question ques = questionRepository.findById(questionID).orElseThrow(() -> new NotFoundException("Question", "id", questionID));
        ques.setContent(questionDto.getContent());
        ques.setChoiceA(questionDto.getChoiceA());
        ques.setChoiceB(questionDto.getChoiceB());
        ques.setChoiceC(questionDto.getChoiceC());
        ques.setChoiceD(questionDto.getChoiceD());
        ques.setRightChoice(questionDto.getRightChoice());
        questionRepository.save(ques);
        return modelMapper.map(ques, QuestionDto.class);
    }

    @Override
    public void deleteQuestion(Long id) {
        Question ques = questionRepository.findById(id).orElseThrow(() -> new NotFoundException("Question", "id", id));
        Exam exam = ques.getExam();
        questionRepository.delete(ques);
        exam.updateQuestionCnt();
        examRepository.save(exam);
    }

}
