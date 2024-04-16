package com.example.moregrowth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.moregrowth.dto.PredictionRequest;
import com.example.moregrowth.service.PredictionService;

@RestController
public class PredictionController {

    @Autowired
    private final PredictionService predictionService;

    public PredictionController(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @PostMapping("/prediction")
    public ResponseEntity<String> callPython(@RequestBody PredictionRequest request) {
        String predictionResult = predictionService.runPythonScript(request);
        return ResponseEntity.ok(predictionResult);
    }
}

