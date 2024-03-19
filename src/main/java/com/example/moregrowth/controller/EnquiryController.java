package com.example.moregrowth.controller;

import com.example.moregrowth.mapper.EnquiryRepository;
import com.example.moregrowth.model.Enquiry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/enquiries")
public class EnquiryController {

    @Autowired
    private EnquiryRepository enquiryRepository;

    // get all 
    @GetMapping
    public List<Enquiry> getAllEnquiries() {
        return enquiryRepository.findAll();
    }

    // search base on ID
    @GetMapping("/{id}")
    public ResponseEntity<Enquiry> getEnquiryById(@PathVariable String id) {
        Optional<Enquiry> enquiry = enquiryRepository.findById(id);
        return enquiry.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // post new enquiries
    @PostMapping
    public Enquiry createEnquiry(@RequestBody Enquiry newEnquiry) {
        return enquiryRepository.insert(newEnquiry);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Enquiry> updateEnquiry(@PathVariable String id, @RequestBody Enquiry updatedEnquiry) {
        // Find whether the Inquiry object with the specified ID exists in the database
        Optional<Enquiry> optionalEnquiry = enquiryRepository.findById(id);
        
        // Check whether the corresponding Inquiry object is found
        if (optionalEnquiry.isPresent()) {
            // get enquiry
            Enquiry existingEnquiry = optionalEnquiry.get();
            
            // Update fields of an existing Inquiry object
            existingEnquiry.setemailContent(updatedEnquiry.getemailContent());
            existingEnquiry.setcontactMethod(updatedEnquiry.getcontactMethod());
            existingEnquiry.setrole(updatedEnquiry.getrole());
            existingEnquiry.settransactionResult(updatedEnquiry.gettransactionResult());
            
            
            // save update info to database
            Enquiry savedEnquiry = enquiryRepository.save(existingEnquiry);
            
            // return http and updated object
            return ResponseEntity.ok(savedEnquiry);
        } else {
            // if cannot find, return warning
            return ResponseEntity.notFound().build();
        }
    }

    // delete the enquiry
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnquiry(@PathVariable String id) {
        if (enquiryRepository.existsById(id)) {
            enquiryRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
