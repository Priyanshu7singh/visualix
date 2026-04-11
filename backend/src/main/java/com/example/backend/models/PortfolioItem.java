package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "portfolio_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category; // 'Video', 'Motion Graphics', 'Thumbnails', 'Music'

    private String mediaUrl; // URL to video or image
    
    private String thumbnailUrl;
    
    @Column(columnDefinition="TEXT")
    private String description;

    private LocalDateTime createdAt = LocalDateTime.now();
}
