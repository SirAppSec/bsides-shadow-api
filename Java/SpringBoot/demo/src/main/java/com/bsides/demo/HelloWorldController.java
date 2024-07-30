package com.bsides.demo;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/secret") 
public class HelloWorldController {

    @GetMapping("/hello")
    public String helloWorld() {
        return "Found me!";
    }
}