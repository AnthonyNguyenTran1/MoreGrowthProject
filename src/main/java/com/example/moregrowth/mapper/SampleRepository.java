package com.example.moregrowth.mapper;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.moregrowth.model.Sample;

@Repository
public interface SampleRepository extends MongoRepository<Sample, ObjectId> { 
    

}

