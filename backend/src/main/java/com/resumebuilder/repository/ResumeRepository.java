package com.resumebuilder.repository;

import com.resumebuilder.model.Resume;
import com.resumebuilder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    List<Resume> findByOwnerOrderByUpdatedAtDesc(User owner);
    Optional<Resume> findByIdAndOwner(Long id, User owner);
    List<Resume> findByVisibleToRecruitersTrueOrderByUpdatedAtDesc();

    @Query("SELECT r FROM Resume r WHERE r.visibleToRecruiters = true AND (" +
           "LOWER(r.candidateName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(r.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(r.headline) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(r.location) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(r.address) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(r.summary) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "EXISTS (SELECT s FROM r.skills s WHERE LOWER(s) LIKE LOWER(CONCAT('%', :keyword, '%')))) " +
           "ORDER BY r.updatedAt DESC")
    List<Resume> searchVisibleResumes(@Param("keyword") String keyword);
}
