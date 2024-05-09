package com.example.moregrowth.controller;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.moregrowth.model.Enquiry;
import com.example.moregrowth.service.EnquiryService;


@RestController
public class EnquiryController {

    @Autowired
    private EnquiryService enquiryService;
    /*
     *
     * Search Functions
     */
    //view all the enquiries
    @CrossOrigin
    @GetMapping("/all")
    public List<Enquiry> getAll() {
        return enquiryService.getAllEnquiries();
    }
    //search specific enquiry by using ID
    @GetMapping("/search/id/{id}")
    public Optional<Enquiry> getEnquiryById(@PathVariable String id) {
        return enquiryService.findById(id);
    }
    //search specific enquiry by using name
    @GetMapping("/search/name/{name}")
    public List<Enquiry> getEnquiryByName(@PathVariable String name) {
        return enquiryService.findByName(name);
    }
    //search specific enquiry by using name
    @GetMapping("/search/phoneNumber/{phoneNumber}")
    public List<Enquiry> getEnquiryByPhoneNumber(@PathVariable String phoneNumber) {
        return enquiryService.findByPhoneNumber(phoneNumber);
    }
    /*
     *
     *
     * data provided functions
     */
    //provide total goodleads 
    @GetMapping("/totalgoodleads/{leads}")
    public long gettotalleads(@PathVariable String leads) {
        return enquiryService.countByTransactionOutcome(leads);
    }
    //provide Open Enquiry in Good leads
    @GetMapping("/Openleads")
    public long getOpenleads() {
        return  enquiryService.countByStatus("Open");
    }
    //provide Closed Enquiry in Good leads
    @GetMapping("/Closedleads")
    public long getClosedleads() {
        return  enquiryService.countByStatus("Closed");
    }
    //provide Lost Enquiry in Good leads
    @GetMapping("/Lostleads")
    public long getLostleads() {
        return  enquiryService.countByStatus("Lost");
    }
    //calc Conversion rate use closed/total
    @GetMapping("/ConversionRate")
    public String getConversionRate() {
        Double df = enquiryService.countByStatus("Closed")*100.0/enquiryService.countByTransactionOutcome("Good");
        DecimalFormat temp = new DecimalFormat("#.00");
        String res = temp.format(df) + " %";
        return res;
    }
    //get past 7 days good leads
    @GetMapping("/past7goodleads")
    public long[] getGoodleadseachday() {
        LocalDate today = LocalDate.now();
        long[] res = new long[7];
        for(int i = 0; i < 7 ; i++){
            LocalDate tempday = today.minusDays(i+1);
            res[i] = enquiryService.countByDateAndTransactionOutcome(tempday);
        }
        return res;
    }
    //get yesterday enquiries
    @GetMapping("/past7enquiry")
    public long[] getyesterdayenquiry() {
        LocalDate today = LocalDate.now();
        long[] res = new long[7];
        for(int i =0;i < 7;i++){
            LocalDate tempday = today.minusDays(i+1);
            res[0] =enquiryService.countByDate(tempday);
        }
        return res;
    }
    //percentage of all the contact method
    @GetMapping("/Contactpercentage/{method}")
    public Double getContactpercentage(@PathVariable String method) {
        return (double)enquiryService.countByContactMethod(method)/enquiryService.getTotalEnquiry();
    }
    /*
     *
     *
     * List both Good and bad leads
     */
    @PostMapping("/listgood")
    public List<Enquiry> listGood() {
        return enquiryService.findbyTransactionOutcome("Good");
    }

    @PostMapping("/listbad")
    public List<Enquiry> listbad() {
        return enquiryService.findbyTransactionOutcome("Bad");
    }
    /*
     *
     *
     * Management Functions
     */
    //update
    @PutMapping("/enquiries/{id}")
    public Enquiry updateEnquiry(@PathVariable String id, @RequestBody Enquiry enquiry) {
        enquiry.setId(id);
        return EnquiryService.save(enquiry);
    }
    
    //delete specific enquiry
    @DeleteMapping("delete/{id}")
    public void deleteEnquiry(@PathVariable String id) {
        EnquiryService.deleteById(id);
    }

    //get number of different level of income
    @GetMapping("incomelevel/{level}")
    public long getIncomeNumber(@PathVariable String level) {
        return enquiryService.getIncomeNumber(level); 
    }
    
}
