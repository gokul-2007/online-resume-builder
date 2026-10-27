package com.resumebuilder.service;

import com.resumebuilder.dto.ResumeDto;
import com.resumebuilder.model.Resume;
import com.resumebuilder.repository.ResumeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecruiterService {

    private final ResumeRepository resumeRepository;
    private final ResumeService resumeService;

    public RecruiterService(ResumeRepository resumeRepository, ResumeService resumeService) {
        this.resumeRepository = resumeRepository;
        this.resumeService = resumeService;
    }

    @Transactional(readOnly = true)
    public List<ResumeDto> getAllCandidates() {
        return resumeRepository.findByVisibleToRecruitersTrueOrderByUpdatedAtDesc()
                .stream()
                .map(resumeService::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ResumeDto> searchCandidates(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllCandidates();
        }

        String kw = keyword.trim().toLowerCase();
        List<Resume> visibleResumes = resumeRepository.findByVisibleToRecruitersTrueOrderByUpdatedAtDesc();

        // Match tokens across candidate information
        String[] tokens = kw.split("[\\s,]+");

        return visibleResumes.stream()
                .filter(r -> matchesAllTokens(r, tokens))
                .map(resumeService::toDto)
                .collect(Collectors.toList());
    }

    private boolean matchesAllTokens(Resume r, String[] tokens) {
        StringBuilder sb = new StringBuilder();
        if (r.getCandidateName() != null) sb.append(" ").append(r.getCandidateName());
        if (r.getTitle() != null) sb.append(" ").append(r.getTitle());
        if (r.getHeadline() != null) sb.append(" ").append(r.getHeadline());
        if (r.getSummary() != null) sb.append(" ").append(r.getSummary());
        if (r.getLocation() != null) sb.append(" ").append(r.getLocation());
        if (r.getAddress() != null) sb.append(" ").append(r.getAddress());
        if (r.getSkills() != null) {
            for (String s : r.getSkills()) sb.append(" ").append(s);
        }
        if (r.getExperience() != null) {
            r.getExperience().forEach(e -> {
                if (e.getCompany() != null) sb.append(" ").append(e.getCompany());
                if (e.getJobTitle() != null) sb.append(" ").append(e.getJobTitle());
                if (e.getDescription() != null) sb.append(" ").append(e.getDescription());
            });
        }
        if (r.getEducation() != null) {
            r.getEducation().forEach(e -> {
                if (e.getInstitution() != null) sb.append(" ").append(e.getInstitution());
                if (e.getDegree() != null) sb.append(" ").append(e.getDegree());
                if (e.getFieldOfStudy() != null) sb.append(" ").append(e.getFieldOfStudy());
            });
        }

        String haystack = sb.toString().toLowerCase();
        for (String token : tokens) {
            if (!token.isBlank() && !haystack.contains(token)) {
                return false;
            }
        }
        return true;
    }
}
