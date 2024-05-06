package com.example.moregrowth.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.moregrowth.mapper.EnquiryRepository;
import com.example.moregrowth.model.Enquiry;

@Service
public class CreditScoreService {
    @Autowired
    private EnquiryRepository enquiryRepository;

    public long[] classifyScoreRanges() {
        List<ScoreRange> scoreRanges = new ArrayList<>();
        List<Enquiry> enquiries = enquiryRepository.findAll(); // 直接使用List<Document>
        //MongoCollection<Document> collection = (MongoCollection<Document>) enquiryRepository.findAll();
        for (Enquiry enquiry : enquiries) {
            String range = enquiry.getCreditScoreRange();
            scoreRanges.add(new ScoreRange(range));
        }
        long[] ScoreRange = new long[4];
        for (int i=0;i<scoreRanges.size();i++){
            ScoreRange scoreRange2 =scoreRanges.get(i);
            if (scoreRange2.getClassification().equals("Excellent")){
                ScoreRange[0]++;
            }
            else if(scoreRange2.getClassification().equals("Very Good")){
                ScoreRange[1]++;
            }
            else if(scoreRange2.getClassification().equals("Average")){
                ScoreRange[2]++;
            }
            else if(scoreRange2.getClassification().equals("Fair")){
                ScoreRange[3]++;   
            }
            else if(scoreRange2.getClassification().equals("Low")){
                ScoreRange[4]++;
            }
        }
        return ScoreRange;
    }

    public class ScoreRange {
        String range;
        String classification;

        public ScoreRange(String range) {
            this.range = range;
            this.classification = classifyRange(range);
        }
        

        private static String classifyRange(String range) {
            if (range == null || range.equals("N/A")||range.equals("Credit Score Range")) {
                return "Unknown";
            }
            String[] parts = range.split("-");
            int minScore = Integer.parseInt(parts[0]);
            int maxScore = Integer.parseInt(parts[1]);
            int Score = (minScore +maxScore)/2;
            if (Score >= 800) {
                return "Excellent";
            } else if (Score >= 700 && Score < 800) {
                return "Very Good";
            } else if (Score >= 500 && Score < 700) {
                return "Average";
            } else if (Score >= 300 && Score < 500) {
                return "Fair";
            } else if (Score < 300 && Score >=0 ) {
                return "Low";
            } else {
                return "Unknown";
            }
        }

        public String getRange() {
            return range;
        }

        public String getClassification() {
            return classification;
        }
    }
}
