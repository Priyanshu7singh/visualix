package com.example.backend.controllers;

import com.example.backend.models.PortfolioItem;
import com.example.backend.repositories.PortfolioItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/portfolio")
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioItemRepository repository;

    @GetMapping
    public List<PortfolioItem> getAllItems(@RequestParam(required = false) String category) {
        if (category != null && !category.isEmpty() && !category.equalsIgnoreCase("All")) {
            return repository.findByCategory(category);
        }
        return repository.findAll();
    }

    @PostMapping
    public PortfolioItem createItem(@RequestBody PortfolioItem item) {
        return repository.save(item);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
