package com.ptit.ptitexam.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExamStatistic {
    private String examName;
    private float avgPoint;
    private float maxPoint;
    private float minPoint;
    private int cnt;
}
