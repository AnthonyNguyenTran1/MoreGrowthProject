package com.example.moregrowth.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "users")
public class Sample {
    @Id
    private ObjectId _id;
    @Field
    private String name;
    @Field
    private String email;
    @Field
    private String password;

    public Sample(ObjectId _id, String name, String email, String password) {
        
    } 


}
