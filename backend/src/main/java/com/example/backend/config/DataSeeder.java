package com.example.backend.config;

import com.example.backend.models.*;
import com.example.backend.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final PortfolioItemRepository portfolioRepo;
    private final TestimonialRepository testimonialRepo;
    private final MusicTrackRepository musicRepo;
    private final BlogPostRepository blogRepo;

    @Override
    public void run(String... args) throws Exception {
        if (portfolioRepo.count() == 0) {
            portfolioRepo.save(new PortfolioItem(null, "Cinematic Brand Trailer", "Video", "https://www.w3schools.com/html/mov_bbb.mp4", "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "A stunning brand trailer with royal aesthetic.", null));
            portfolioRepo.save(new PortfolioItem(null, "Neon Typography Animation", "Motion Graphics", "https://www.w3schools.com/html/mov_bbb.mp4", "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "High-energy text animations for social media.", null));
            portfolioRepo.save(new PortfolioItem(null, "Epic Gaming Thumbnail", "Thumbnails", null, "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "Clickable and vibrant YouTube thumbnail.", null));
        }

        if (testimonialRepo.count() == 0) {
            testimonialRepo.save(new Testimonial(null, "Elena Rostova", "Creative Director", 5, "Visualix turned our raw footage into a cinematic masterpiece. The attention to detail and luxury feel was exactly what we needed.", "https://randomuser.me/api/portraits/women/44.jpg", null));
            testimonialRepo.save(new Testimonial(null, "Marcus Jenkins", "Top YouTuber", 5, "I've been working with this agency for over 2 years. Their thumbnails and editing always boost my retention and click-rates.", "https://randomuser.me/api/portraits/men/32.jpg", null));
        }

        if (musicRepo.count() == 0) {
            musicRepo.save(new MusicTrack(null, "Royal Ascension", "3:15", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", null));
            musicRepo.save(new MusicTrack(null, "Cybernetic Pulse", "2:45", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", null));
        }

        if (blogRepo.count() == 0) {
            blogRepo.save(new BlogPost(null, "How to Achieve a Luxury Cinematic Look", "Tips on color grading to make your videos feel expensive.", "Color grading is crucial... [Full content here].", "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", null));
            blogRepo.save(new BlogPost(null, "My 2+ Years Journey in Motion Graphics", "Lessons learned working with high-profile clients.", "Starting a creative agency is thrilling... [Full content here].", "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", null));
        }
    }
}
