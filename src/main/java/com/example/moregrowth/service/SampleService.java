package com.example.moregrowth.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.moregrowth.mapper.SampleRepository;
import com.example.moregrowth.model.Sample;

@Service
public class SampleService {
    
    @Autowired
    private static SampleRepository sampleRepository;

    public SampleService(SampleRepository sampleRepository) {
        this.sampleRepository= sampleRepository;
    }

    public List<Sample> getAllSamples() {
        return sampleRepository.findAll();
    }

}
