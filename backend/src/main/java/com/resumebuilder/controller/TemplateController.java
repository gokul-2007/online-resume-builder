package com.resumebuilder.controller;

import com.resumebuilder.model.Template;
import com.resumebuilder.service.TemplateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/templates")
@CrossOrigin(origins = "*")
public class TemplateController {

    private final TemplateService templateService;

    public TemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @GetMapping
    public ResponseEntity<List<Template>> getAll() {
        List<Template> templates = templateService.getAllTemplates();
        return ResponseEntity.ok(templates);
    }

    @GetMapping("/public/free")
    public ResponseEntity<List<Template>> getFree() {
        List<Template> freeTemplates = templateService.getFreeTemplates();
        return ResponseEntity.ok(freeTemplates);
    }
}
