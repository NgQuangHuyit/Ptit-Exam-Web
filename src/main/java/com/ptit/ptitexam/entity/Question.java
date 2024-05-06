package com.ptit.ptitexam.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 300)
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp lastModified;

    @Column(length = 300)
    private String choiceA;
    @Column(length = 300)
    private String choiceB;
    @Column(length = 300)
    private String choiceC;
    @Column(length = 300)
    private String choiceD;

    @Enumerated(EnumType.STRING)
    private Choice rightChoice = Choice.A;

    @ManyToOne
    @JoinColumn(name = "exam_id", updatable = false, nullable = false)
    private Exam exam;

    @PreUpdate
    public void updateLastModified() {
        this.lastModified = new Timestamp(System.currentTimeMillis());
    }

    @PrePersist
    public void prePersist() {
        this.lastModified = new Timestamp(System.currentTimeMillis());
    }

    @PostPersist
    public void postPersist() {
        this.exam.updateQuestionCnt();
    }

    @PostRemove
    public void postRemove() {
        this.exam.updateQuestionCnt();
    }


}
