package com.example.moregrowth.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.moregrowth.model.Sample;
import com.example.moregrowth.service.SampleService;

@RestController
public class SampleController {

    @Autowired
    private SampleService sampleService;
    /*
     *
     * Search Functions
     */
    //view all the enquiries
    @GetMapping("/allUsers")
    public List<Sample> getAll() {
        return sampleService.getAllSamples();
    }
    
}
