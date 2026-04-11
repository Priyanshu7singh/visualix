package com.example.backend.controllers;

import com.example.backend.models.BlogPost;
import com.example.backend.repositories.BlogPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/blog")
@RequiredArgsConstructor
public class BlogController {

    private final BlogPostRepository repository;

    @GetMapping
    public List<BlogPost> getAllPosts() {
        return repository.findAll();
    }

    @PostMapping
    public BlogPost createPost(@RequestBody BlogPost post) {
        return repository.save(post);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
