package com.example.moregrowth.service;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.moregrowth.dto.PredictionRequest;
import com.example.moregrowth.dto.PredictionResponse;
import com.example.moregrowth.model.Enquiry;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class PredictionService {

    private final ResourceLoader resourceLoader;

    @Autowired
    public PredictionService(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }
    
    private RestTemplate restTemplate = new RestTemplate();

    public PredictionResponse callPythonModel(PredictionRequest request) {
        String pythonModelEndpoint = "http://localhost:5000/predict";
        return restTemplate.postForObject(pythonModelEndpoint, request, PredictionResponse.class);
    }


    public String runPythonScript(PredictionRequest request) {
        try {
            //connect and get users' data
            Enquiry enquiry = new Enquiry(
                request.getText(),
                request.getContactMethod(),
                request.getCustomerIdentity(),
                request.getCustomerAge(),
                request.getAreaOfResidence(),
                request.getIncomeLevel(),
                request.getExpenditureSituation(),
                request.getEmploymentStatus(),
                request.getPropertyOwnershipStatus(),
                request.getInvestmentIntent(),
                request.getPreviousTransactionExperience(),
                request.getFamilySituation(),
                request.getFinancialReadiness(),
                request.getPreferredCommunicationMethod(),
                request.getDecisionTimeframe(),
                request.getCreditScoreRange(),
                request.getInquiryLength(),
                request.getUrgencyIndicator(),
                request.getSentimentScore(),
                request.getKeywordsPresence(),
                request.getDayOfTheWeek(),
                request.getTimeOfDay(),
                request.getGeographicalIndicator(),
                request.getPreviousInteractions(),
                request.getInquirySource(),
                request.getPropertyTypeInterest(),
                request.getBudgetMentioned(),
                request.getName(),
                request.getPhoneNumber(),
                request.getStatus()
            );

            //get the model in the JAR package
            Resource modelResource = resourceLoader.getResource("classpath:model_Version2.joblib");
            File tempModelFile = Files.createTempFile("m-", ".joblib").toFile();
            Files.copy(modelResource.getInputStream(), tempModelFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
            

            // get the resource from the py file
            Resource pythonScriptResource = resourceLoader.getResource("classpath:Local connection without http.py");
            // new a file to store the python file 
            File tempScript = Files.createTempFile("s-", ".py").toFile();
            Files.copy(pythonScriptResource.getInputStream(), tempScript.toPath(), StandardCopyOption.REPLACE_EXISTING);
            tempScript.setExecutable(true);
            // transform the data to json
            ObjectMapper objectMapper = new ObjectMapper();
            String enquiryJson = objectMapper.writeValueAsString(enquiry);

            // write the data into temp file in the Json file
            Path tempFile = Files.createTempFile("enquiry", ".json");
            Files.write(tempFile, enquiryJson.getBytes(StandardCharsets.UTF_8));

            // use python script n set the file path
            ProcessBuilder processBuilder = new ProcessBuilder("python", tempScript.getAbsolutePath(), tempModelFile.getAbsolutePath(), tempFile.toString());
            // combine the error info and output infor
            processBuilder.redirectErrorStream(true); 
            Process process = processBuilder.start();
            System.out.println("python start");


            //use the buffer object to get the data in jsonform
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            System.out.println("python end2");

            //get the data from the info return by python script
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line);
            }
            System.out.println("python end3");

            /* testing code
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                System.err.println("Error in Python script execution: " + errorOutput); 
                return "Error executing script";
            }*/

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                System.err.println("Error in Python script execution: " + output); 
                return "Error executing script";
            }
            System.out.println("python end4");

            // delete the tempfile
            Files.deleteIfExists(tempFile);

            return output.toString();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }
    
}