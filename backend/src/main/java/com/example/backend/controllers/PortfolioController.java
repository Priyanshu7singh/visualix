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

    @PutMapping("/{id}")
    public ResponseEntity<PortfolioItem> updateItem(@PathVariable Long id, @RequestBody PortfolioItem itemDetails) {
        return repository.findById(id).map(item -> {
            item.setTitle(itemDetails.getTitle());
            item.setCategory(itemDetails.getCategory());
            item.setDescription(itemDetails.getDescription());
            if (itemDetails.getMediaUrl() != null && !itemDetails.getMediaUrl().isEmpty()) {
                item.setMediaUrl(itemDetails.getMediaUrl());
            }
            return ResponseEntity.ok(repository.save(item));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
