package com.ptit.ptitexam.payload;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
public class ExamStatistic {

    @JsonIgnore
    private final String[] ListRange = {"0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", "9-10"};

    @JsonIgnore
    private List<Float> points;

    private String examName;
    private float avgPoint;
    private float maxPoint;
    private float minPoint;
    private int cnt;

    private HashMap<String, Integer> scoreSpectrum;

    public ExamStatistic(String examName) {
        this.scoreSpectrum = new HashMap<>();
        Arrays.stream(ListRange).forEach(r -> scoreSpectrum.put(r, 0));
        avgPoint = 0;
        maxPoint = 0;
        minPoint = 0;
        cnt = 0;
        points = new ArrayList<>();
        this.examName = examName;
    }

    public void addPoint(Float point) {
        this.points.add(point);
    }

    private String calculatePointRange(Float point) {
        for (int i = 0; i < ListRange.length; i++) {
            if (point < i + 1) {
                return ListRange[i];
            }
        }
        return "9-10";
    }

    public void calculate() {
        if (points.isEmpty()) {
            return;
        }
        this.cnt = points.size();
        this.maxPoint = Collections.max(points);
        this.minPoint = Collections.min(points);
        float total = 0f;
        for (Float point : points) {
            String range = this.calculatePointRange(point);
            total = total + point;
            this.scoreSpectrum.put(range, scoreSpectrum.getOrDefault(range, 0) + 1);
        }
        this.avgPoint = Float.parseFloat(String.format("%.2f", total / (float) points.size()));

    }
}
