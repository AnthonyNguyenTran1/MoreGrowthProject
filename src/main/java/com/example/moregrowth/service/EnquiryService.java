package com.example.moregrowth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.moregrowth.mapper.EnquiryRepository;
import com.example.moregrowth.model.Enquiry;

import java.util.List;

public class EnquiryService {
    
    private final EnquiryRepository enquiryRepository;

    @Autowired
    public EnquiryService(EnquiryRepository enquiryRepository) {
        this.enquiryRepository = enquiryRepository;
    }

    public List<Enquiry> getAllEnquiries() {
        return enquiryRepository.findAll();
    }

}
