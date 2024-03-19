package com.example.moregrowth.mapper;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.cdi.MongoRepositoryBean;

import com.example.moregrowth.model.Enquiry;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface EnquiryRepository extends MongoRepository<Enquiry,String>{
    //seems all the methods are already exist in MangoDB



    //enquiryRepository.insert(enquiryInstance)


    
   /*  Enquiry selectById(Long id);

    Boolean insert(Enquiry data);

    long update(Enquiry data); */
}
