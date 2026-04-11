package com.example.backend.controllers;

import com.example.backend.models.MusicTrack;
import com.example.backend.repositories.MusicTrackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/music")
@RequiredArgsConstructor
public class MusicController {

    private final MusicTrackRepository repository;

    @GetMapping
    public List<MusicTrack> getAllTracks() {
        return repository.findAll();
    }

    @PostMapping
    public MusicTrack createTrack(@RequestBody MusicTrack track) {
        return repository.save(track);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrack(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
