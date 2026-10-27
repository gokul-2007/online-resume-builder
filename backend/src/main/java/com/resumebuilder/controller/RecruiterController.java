package com.resumebuilder.controller;

import com.resumebuilder.dto.ResumeDto;
import com.resumebuilder.service.RecruiterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruiter")
@CrossOrigin(origins = "*")
public class RecruiterController {

    private final RecruiterService recruiterService;

    public RecruiterController(RecruiterService recruiterService) {
        this.recruiterService = recruiterService;
    }

    @GetMapping("/candidates")
    public ResponseEntity<List<ResumeDto>> getCandidates() {
        List<ResumeDto> candidates = recruiterService.getAllCandidates();
        return ResponseEntity.ok(candidates);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ResumeDto>> search(@RequestParam(value = "keyword", required = false, defaultValue = "") String keyword) {
        List<ResumeDto> results = recruiterService.searchCandidates(keyword);
        return ResponseEntity.ok(results);
    }
}
