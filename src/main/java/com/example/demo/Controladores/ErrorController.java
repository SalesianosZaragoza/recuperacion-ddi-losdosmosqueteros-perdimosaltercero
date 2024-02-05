package com.example.demo.Controladores;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;

public class ErrorController {
    @RequestMapping("/error")
        @ResponseBody
        String error(HttpServletRequest request) {
            return "<h1>Error occurred</h1>";
        }
}
