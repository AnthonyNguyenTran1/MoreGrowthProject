package com.example.moregrowth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.moregrowth.service.CreditScoreService;

@RestController
public class CreditController {
    @Autowired
    private CreditScoreService creditScoreService;

    @GetMapping("/classify")
    public long[] getClassifiedScores() {
        return creditScoreService.classifyScoreRanges();
    }
}
