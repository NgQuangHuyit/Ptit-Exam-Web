package com.ptit.ptitexam.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @Enumerated(EnumType.STRING)
    private Choice selectedChoice;

    private Boolean isCorrect;

    @ManyToOne
    @JoinColumn(name = "result_id")
    private ExamResult examResult;

    public void updateIsCorrect() {
        this.isCorrect = this.selectedChoice.equals(this.question.getRightChoice());
    }

    @PrePersist
    protected void onCreate() {
        updateIsCorrect();
    }

}

