package com.resumebuilder.controller;

import com.resumebuilder.dto.ResumeDto;
import com.resumebuilder.service.ResumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "*")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping
    public ResponseEntity<List<ResumeDto>> getAll() {
        List<ResumeDto> list = resumeService.getAllForCurrentUser();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResumeDto> getById(@PathVariable Long id) {
        ResumeDto dto = resumeService.getById(id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<ResumeDto> create(@RequestBody ResumeDto dto) {
        ResumeDto created = resumeService.create(dto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResumeDto> update(@PathVariable Long id, @RequestBody ResumeDto dto) {
        ResumeDto updated = resumeService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        resumeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
