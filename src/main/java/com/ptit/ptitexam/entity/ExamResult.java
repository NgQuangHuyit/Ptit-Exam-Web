package com.ptit.ptitexam.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
public class ExamResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp startTime;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp endTime;

    private Float point;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User user;

    @ManyToOne
    @JoinColumn(name = "exam_id", nullable = false, updatable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Exam exam;

    @OneToMany(mappedBy = "examResult", cascade = CascadeType.ALL)
    private List<Answer> answers;

    public void updatePoint() {
        int totalQuestions = exam.getQuestions().size();
        int correctAnswersCnt = 0;
        for (Answer answer : answers) {
            if (answer.getIsCorrect()) {
                correctAnswersCnt++;
            }
        }
        this.point = (float) correctAnswersCnt / (float) totalQuestions * 10f;
    }
}
