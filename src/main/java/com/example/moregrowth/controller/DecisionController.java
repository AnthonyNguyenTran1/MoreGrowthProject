package com.example.moregrowth.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.moregrowth.service.DecisionService;

@RestController
public class DecisionController {
    @Autowired
    private DecisionService decisionService;

    @GetMapping("/TimeFrame")
    public long[] getClassifiedScores() {
        return decisionService.getTimeFrame();
    }
}
