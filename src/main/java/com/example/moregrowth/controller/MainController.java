package com.example.moregrowth.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
    @RequestMapping("/")
    public String index() {
        return "index"; // 这里的index是指src/main/resources/static/index.html
    }
}
