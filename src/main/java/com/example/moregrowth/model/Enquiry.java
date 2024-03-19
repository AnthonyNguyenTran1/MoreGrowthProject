package com.example.moregrowth.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Enquiry {
    
    private String emailContent;
    private String contactMethod;
    private String role;
    private String transactionResult;

    public String getemailContent() {
        return emailContent;
    }

    public String getcontactMethod() {
        return contactMethod;
    }

    public String getrole() {
        return role;
    }

    public String gettransactionResult() {
        return transactionResult;
    }

    public void setcontactMethod(String getcontactMethod) {
        this.contactMethod = getcontactMethod;
    }

    public void setemailContent(String getemailContent) {
        this.emailContent = getemailContent;
    }

    public void setrole(String getrole) {
        this.role = getrole;
    }

    public void settransactionResult(String gettransactionResult) {
        this.transactionResult = gettransactionResult;
    }
}
