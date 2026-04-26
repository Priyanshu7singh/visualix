package com.example.backend.controllers;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import com.example.backend.config.TokenStore;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final TokenStore tokenStore;

    @Value("${admin.id}")
    private String adminId;

    @Value("${admin.password}")
    private String adminPassword;

    public AuthController(TokenStore tokenStore) {
        this.tokenStore = tokenStore;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        if (adminId.equals(request.getAdminId()) && adminPassword.equals(request.getPassword())) {
            String token = UUID.randomUUID().toString();
            tokenStore.addToken(token);
            
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("status", "success");
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @Data
    static class LoginRequest {
        private String adminId;
        private String password;
    }
}
