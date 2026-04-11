package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "music_tracks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MusicTrack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;
    
    private String duration; // e.g. "3:45"

    @Column(nullable = false)
    private String audioUrl;
    
    // Optional waveform data/url for visualizer
    private String waveformUrl; 
}
