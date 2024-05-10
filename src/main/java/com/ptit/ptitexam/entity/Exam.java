package com.ptit.ptitexam.entity;

import com.ptit.ptitexam.payload.ExamStatistic;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    private String subject;

    private Integer timeAmt;

    @Column()
    private Boolean isActive = true;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp updatedAt;

    @Column
    private Integer questionCount = 0;


    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<ExamResult> examResults;

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL)
    private List<Question> questions;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
        this.updatedAt = new Timestamp(System.currentTimeMillis());
        this.questionCount = 0;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Timestamp(System.currentTimeMillis());
    }

    public void updateQuestionCnt() {
        this.questionCount = this.questions.size();
    }

}
