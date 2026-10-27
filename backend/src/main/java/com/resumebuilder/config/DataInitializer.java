package com.resumebuilder.config;

import com.resumebuilder.model.Template;
import com.resumebuilder.repository.TemplateRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final TemplateRepository templateRepository;

    public DataInitializer(TemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    @Override
    public void run(String... args) {
        if (templateRepository.count() == 0) {
            List<Template> templates = Arrays.asList(
                    new Template(6L, "Executive Timeline (Richard Sanchez)", "Marketing & Management", "timeline", "Navy & Slate", "Inter", false, true),
                    new Template(1L, "Classic Professional", "General & Academic", "classic", "Navy & Charcoal", "Georgia", false, true),
                    new Template(2L, "Modern Minimalist", "Tech & Engineering", "modern", "Slate & Teal", "Inter", false, true),
                    new Template(3L, "Two-Column Sidebar", "Healthcare & Science", "sidebar", "Blue & Steel", "Roboto", false, true),
                    new Template(4L, "Corporate Executive", "Finance & Leadership", "executive", "Charcoal & Gold", "Merriweather", false, true),
                    new Template(5L, "Creative Startup", "Design & Product", "creative", "Indigo & Purple", "Montserrat", false, true)
            );
            templateRepository.saveAll(templates);
            System.out.println(">> Seeded " + templates.size() + " resume templates into database.");
        }
    }
}
