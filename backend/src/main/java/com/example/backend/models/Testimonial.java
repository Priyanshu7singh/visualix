package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "testimonials")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Testimonial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String clientName;

    private String companyRole; // e.g. "YouTuber", "CEO at BrandX"

    private int rating = 5;

    @Column(columnDefinition="TEXT", nullable = false)
    private String quote;

    private String avatarUrl;

    private LocalDateTime createdAt = LocalDateTime.now();
}
