package com.example.moregrowth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/home")
    public String redirect() {
        // Forward to home page so that route is preserved.a
        return "forward:/";
    }
}
