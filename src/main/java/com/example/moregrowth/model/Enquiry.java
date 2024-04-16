package com.example.moregrowth.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "Enquiry")
public class Enquiry {

    @Id
    private String id;

    @Field("Text")
    private String text;

    public void setText(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    @Field("Contact Method")
    private String contactMethod;

    public String getContactMethod() {
        return contactMethod;
    }

    public void setContactMethod(String contactMethod) {
        this.contactMethod = contactMethod;
    }

    @Field("Customer Identity")
    private String customerIdentity;

    public String getCustomerIdentity() {
        return customerIdentity;
    }

    public void setCustomerIdentity(String customerIdentity) {
        this.customerIdentity = customerIdentity;
    }

    @Field("Customer Age")
    private String customerAge;

    public String getCustomerAge() {
        return customerAge;
    }

    public void setCustomerAge(String customerAge) {
        this.customerAge = customerAge;
    }

    @Field("Area of Residence")
    private String areaOfResidence;

    public String getAreaOfResidence() {
        return areaOfResidence;
    }

    public void setAreaOfResidence(String areaOfResidence) {
        this.areaOfResidence = areaOfResidence;
    }

    @Field("Income Level")
    private String incomeLevel;

    public String getIncomeLevel() {
        return incomeLevel;
    }

    public void setIncomeLevel(String incomeLevel) {
        this.incomeLevel = incomeLevel;
    }

    @Field("Expenditure Situation")
    private String expenditureSituation;

    public String getExpenditureSituation() {
        return expenditureSituation;
    }

    public void setExpenditureSituation(String expenditureSituation) {
        this.expenditureSituation = expenditureSituation;
    }

    @Field("Employment Status")
    private String employmentStatus;

    public String getEmploymentStatus() {
        return employmentStatus;
    }

    public void setEmploymentStatus(String employmentStatus) {
        this.employmentStatus = employmentStatus;
    }

    @Field("Property Ownership Status")
    private String propertyOwnershipStatus;

    public String getPropertyOwnershipStatus() {
        return propertyOwnershipStatus;
    }

    public void setPropertyOwnershipStatus(String propertyOwnershipStatus) {
        this.propertyOwnershipStatus = propertyOwnershipStatus;
    }

    @Field("Investment Intent")
    private String investmentIntent;

    public String getInvestmentIntent() {
        return investmentIntent;
    }

    public void setInvestmentIntent(String investmentIntent) {
        this.investmentIntent = investmentIntent;
    }

    @Field("Previous Transaction Experience")
    private String previousTransactionExperience;

    public String getPreviousTransactionExperience() {
        return previousTransactionExperience;
    }

    public void setPreviousTransactionExperience(String previousTransactionExperience) {
        this.previousTransactionExperience = previousTransactionExperience;
    }

    @Field("Family Situation")
    private String familySituation;

    public String getFamilySituation() {
        return familySituation;
    }

    public void setFamilySituation(String familySituation) {
        this.familySituation = familySituation;
    }

    @Field("Financial Readiness")
    private String financialReadiness;

    public String getFinancialReadiness() {
        return financialReadiness;
    }

    public void setFinancialReadiness(String financialReadiness) {
        this.financialReadiness = financialReadiness;
    }

    @Field("Preferred Communication Method")
    private String preferredCommunicationMethod;

    public String getPreferredCommunicationMethod() {
        return preferredCommunicationMethod;
    }

    public void setPreferredCommunicationMethod(String preferredCommunicationMethod) {
        this.preferredCommunicationMethod = preferredCommunicationMethod;
    }

    @Field("Decision Timeframe")
    private String decisionTimeframe;

    public String getDecisionTimeframe() {
        return decisionTimeframe;
    }

    public void setDecisionTimeframe(String decisionTimeframe) {
        this.decisionTimeframe = decisionTimeframe;
    }

    @Field("Credit Score Range")
    private String creditScoreRange;

    public String getCreditScoreRange() {
        return creditScoreRange;
    }

    public void setCreditScoreRange(String creditScoreRange) {
        this.creditScoreRange = creditScoreRange;
    }

    @Field("Inquiry Length")
    private String inquiryLength;

    public String getInquiryLength() {
        return inquiryLength;
    }

    public void setInquiryLength(String inquiryLength) {
        this.inquiryLength = inquiryLength;
    }

    @Field("Urgency Indicator")
    private String urgencyIndicator;

    @Field("Sentiment Score")
    private String sentimentScore;

    @Field("Keywords Presence")
    private String keywordsPresence;

    @Field("Day of the Week")
    private String dayOfTheWeek;

    @Field("Time of Day")
    private String timeOfDay;

    @Field("Geographical Indicator")
    private String geographicalIndicator;

    @Field("Previous Interactions")
    private String previousInteractions;

    @Field("Inquiry Source")
    private String inquirySource;

    @Field("Property Type Interest")
    private String propertyTypeInterest;

    @Field("Budget Mentioned")
    private String budgetMentioned;

    @Field("Transaction Outcome")
    private String transactionOutcome;

    @Field("Name")
    private String name;

    @Field("Phone Number")
    private String phoneNumber;

    @Field("Status")
    private String status;

    @Field("Date")
    private LocalDate date;

 




    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Enquiry(String text, String contactMethod, String customerIdentity, String customerAge,
        String areaOfResidence, String incomeLevel, String expenditureSituation, String employmentStatus,
        String propertyOwnershipStatus, String investmentIntent, String previousTransactionExperience,
        String familySituation, String financialReadiness, String preferredCommunicationMethod,
        String decisionTimeframe, String creditScoreRange, String inquiryLength, String urgencyIndicator,
        String sentimentScore, String keywordsPresence, String dayOfTheWeek, String timeOfDay,
        String geographicalIndicator, String previousInteractions, String inquirySource,
        String propertyTypeInterest, String budgetMentioned, String name, String phoneNumber, String status) {
        this.text = text;
        this.contactMethod = contactMethod;
        this.customerIdentity = customerIdentity;
        this.customerAge = customerAge;
        this.areaOfResidence = areaOfResidence;
        this.incomeLevel = incomeLevel;
        this.expenditureSituation = expenditureSituation;
        this.employmentStatus = employmentStatus;
        this.propertyOwnershipStatus = propertyOwnershipStatus;
        this.investmentIntent = investmentIntent;
        this.previousTransactionExperience = previousTransactionExperience;
        this.familySituation = familySituation;
        this.financialReadiness = financialReadiness;
        this.preferredCommunicationMethod = preferredCommunicationMethod;
        this.decisionTimeframe = decisionTimeframe;
        this.creditScoreRange = creditScoreRange;
        this.inquiryLength = inquiryLength;
        this.urgencyIndicator = urgencyIndicator;
        this.sentimentScore = sentimentScore;
        this.keywordsPresence = keywordsPresence;
        this.dayOfTheWeek = dayOfTheWeek;
        this.timeOfDay = timeOfDay;
        this.geographicalIndicator = geographicalIndicator;
        this.previousInteractions = previousInteractions;
        this.inquirySource = inquirySource;
        this.propertyTypeInterest = propertyTypeInterest;
        this.budgetMentioned = budgetMentioned;
        this.name = name;
        this.phoneNumber = phoneNumber; 
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUrgencyIndicator() {
        return urgencyIndicator;
    }

    public void setUrgencyIndicator(String urgencyIndicator) {
        this.urgencyIndicator = urgencyIndicator;
    }

    public String getSentimentScore() {
        return sentimentScore;
    }

    public void setSentimentScore(String sentimentScore) {
        this.sentimentScore = sentimentScore;
    }

    public String getKeywordsPresence() {
        return keywordsPresence;
    }

    public void setKeywordsPresence(String keywordsPresence) {
        this.keywordsPresence = keywordsPresence;
    }

    public String getDayOfTheWeek() {
        return dayOfTheWeek;
    }

    public void setDayOfTheWeek(String dayOfTheWeek) {
        this.dayOfTheWeek = dayOfTheWeek;
    }

    public String getTimeOfDay() {
        return timeOfDay;
    }

    public void setTimeOfDay(String timeOfDay) {
        this.timeOfDay = timeOfDay;
    }

    public String getGeographicalIndicator() {
        return geographicalIndicator;
    }

    public void setGeographicalIndicator(String geographicalIndicator) {
        this.geographicalIndicator = geographicalIndicator;
    }

    public String getPreviousInteractions() {
        return previousInteractions;
    }

    public void setPreviousInteractions(String previousInteractions) {
        this.previousInteractions = previousInteractions;
    }

    public String getInquirySource() {
        return inquirySource;
    }

    public void setInquirySource(String inquirySource) {
        this.inquirySource = inquirySource;
    }

    public String getPropertyTypeInterest() {
        return propertyTypeInterest;
    }

    public void setPropertyTypeInterest(String propertyTypeInterest) {
        this.propertyTypeInterest = propertyTypeInterest;
    }

    public String getBudgetMentioned() {
        return budgetMentioned;
    }

    public void setBudgetMentioned(String budgetMentioned) {
        this.budgetMentioned = budgetMentioned;
    }

    public String getTransactionOutcome() {
        return transactionOutcome;
    }

    public void setTransactionOutcome(String transactionOutcome) {
        this.transactionOutcome = transactionOutcome;
    }

    public void display(Enquiry enquiry){
        System.out.println(enquiry.areaOfResidence);
        System.out.println(enquiry.budgetMentioned);
        System.out.println(enquiry.contactMethod);
        System.out.println(enquiry.creditScoreRange);
        System.out.println(enquiry.customerAge);
        System.out.println(enquiry.customerIdentity);
        System.out.println(enquiry.dayOfTheWeek);
        System.out.println(enquiry.decisionTimeframe);
        System.out.println(enquiry.employmentStatus);
        System.out.println(enquiry.expenditureSituation);
        System.out.println(enquiry.familySituation);
        System.out.println(enquiry.financialReadiness);
        System.out.println(enquiry.geographicalIndicator);
        System.out.println(enquiry.id);
    }
}
