package com.example.backend.controllers;

import com.example.backend.models.ContactMessage;
import com.example.backend.repositories.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactMessageRepository repository;

    @PostMapping
    public ResponseEntity<ContactMessage> submitMessage(@RequestBody ContactMessage message) {
        // In a real app, send an email here too
        ContactMessage saved = repository.save(message);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public List<ContactMessage> getAllMessages() {
        return repository.findAll();
    }
}
