package com.example.backend.controllers;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    // For a simple royal themed MVP, we are hardcoding a matching password. 
    // In a real-world production app, this should be replaced with Spring Security + a User DB + JWTs
    private final String ADMIN_PASSWORD = "2026rockey@12";

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        if (ADMIN_PASSWORD.equals(request.getPassword())) {
            Map<String, String> response = new HashMap<>();
            response.put("token", "dummy-auth-token-visualix-success");
            response.put("status", "success");
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @Data
    static class LoginRequest {
        private String password;
    }
}
