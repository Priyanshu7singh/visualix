package com.example.backend.repositories;

import com.example.backend.models.MusicTrack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MusicTrackRepository extends JpaRepository<MusicTrack, Long> {
}
