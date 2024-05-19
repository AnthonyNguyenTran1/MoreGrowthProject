package com.example.moregrowth.service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.moregrowth.mapper.EnquiryRepository;
import com.example.moregrowth.model.Enquiry;

@Service
public class DecisionService {

    @Autowired
    private EnquiryRepository enquiryRepository;

    private static final Map<String, Integer> TIMEFRAME_MAPPING = new HashMap<>();
    static {
        TIMEFRAME_MAPPING.put("Immediate", 0);
        TIMEFRAME_MAPPING.put("<1 month", 1);
        TIMEFRAME_MAPPING.put("<3 months", 2);
        TIMEFRAME_MAPPING.put("<6 months", 3);
        TIMEFRAME_MAPPING.put(">12 months", 7);
        TIMEFRAME_MAPPING.put("1-3 months", 2);
        TIMEFRAME_MAPPING.put("3-6 months", 4);
        TIMEFRAME_MAPPING.put("6+ months", 6);
        TIMEFRAME_MAPPING.put("6-12 months", 5);
        TIMEFRAME_MAPPING.put("6 months", 4);
    }

    public long[] getTimeFrame() {
        long[] res = new long[7];

        List<Enquiry> enquiries = enquiryRepository.findAll();
        for(Enquiry enquiry : enquiries){
            String timeframe = enquiry.getDecisionTimeframe();  // Assuming getTimeFrame() returns the timeframe string
            Integer mappedValue = TIMEFRAME_MAPPING.get(timeframe);
            if (mappedValue != null && mappedValue < res.length) {
                res[mappedValue]++;
            }
        }
        
        return res;

        // 输出结果
    }


}
