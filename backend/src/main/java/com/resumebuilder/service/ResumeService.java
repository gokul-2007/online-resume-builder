package com.resumebuilder.service;

import com.resumebuilder.dto.*;
import com.resumebuilder.exception.BadRequestException;
import com.resumebuilder.exception.ResourceNotFoundException;
import com.resumebuilder.model.*;
import com.resumebuilder.repository.ResumeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final AuthService authService;

    public ResumeService(ResumeRepository resumeRepository, AuthService authService) {
        this.resumeRepository = resumeRepository;
        this.authService = authService;
    }

    @Transactional(readOnly = true)
    public List<ResumeDto> getAllForCurrentUser() {
        User currentUser = authService.getCurrentUser();
        return resumeRepository.findByOwnerOrderByUpdatedAtDesc(currentUser)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ResumeDto getById(Long id) {
        User currentUser = authService.getCurrentUser();
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found with id: " + id));

        // Job seekers can only view their own resume, unless recruiter or visibleToRecruiters
        boolean isOwner = resume.getOwner().getId().equals(currentUser.getId());
        boolean isRecruiter = currentUser.getRole() == Role.RECRUITER || currentUser.getRole() == Role.HIRING_MANAGER || currentUser.getRole() == Role.ADMIN;
        if (!isOwner && !(isRecruiter && resume.isVisibleToRecruiters())) {
            throw new BadRequestException("You do not have permission to view this resume.");
        }

        return toDto(resume);
    }

    @Transactional
    public ResumeDto create(ResumeDto dto) {
        User currentUser = authService.getCurrentUser();

        Resume resume = new Resume();
        resume.setOwner(currentUser);
        copyDtoToEntity(dto, resume, currentUser);
        resume.setStatus("DRAFT");
        resume.setVersion(1);

        Resume saved = resumeRepository.save(resume);
        return toDto(saved);
    }

    @Transactional
    public ResumeDto update(Long id, ResumeDto dto) {
        User currentUser = authService.getCurrentUser();
        Resume existing = resumeRepository.findByIdAndOwner(id, currentUser)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found with id: " + id));

        copyDtoToEntity(dto, existing, currentUser);
        existing.setVersion((existing.getVersion() != null ? existing.getVersion() : 1) + 1);

        Resume saved = resumeRepository.save(existing);
        return toDto(saved);
    }

    @Transactional
    public void delete(Long id) {
        User currentUser = authService.getCurrentUser();
        Resume existing = resumeRepository.findByIdAndOwner(id, currentUser)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found with id: " + id));
        resumeRepository.delete(existing);
    }

    private void copyDtoToEntity(ResumeDto dto, Resume resume, User owner) {
        resume.setTitle(dto.getTitle() != null && !dto.getTitle().isBlank() ? dto.getTitle() : "Untitled Resume");
        resume.setCandidateName(dto.getCandidateName() != null && !dto.getCandidateName().isBlank() ? dto.getCandidateName() : owner.getFullName());
        resume.setHeadline(dto.getHeadline());
        resume.setSummary(dto.getSummary());
        resume.setContactEmail(dto.getContactEmail() != null ? dto.getContactEmail() : owner.getEmail());
        resume.setContactPhone(dto.getContactPhone() != null ? dto.getContactPhone() : owner.getPhone());
        resume.setAddress(dto.getAddress());
        resume.setLocation(dto.getLocation());
        resume.setWebsite(dto.getWebsite());
        resume.setProfilePhoto(dto.getProfilePhoto());
        resume.setVisibleToRecruiters(dto.isVisibleToRecruiters());
        resume.setTemplateId(dto.getTemplateId() != null ? dto.getTemplateId() : 6L);
        if (dto.getStatus() != null) {
            resume.setStatus(dto.getStatus());
        }

        resume.setSkills(dto.getSkills() != null ? new ArrayList<>(dto.getSkills()) : new ArrayList<>());
        resume.setLanguages(dto.getLanguages() != null ? new ArrayList<>(dto.getLanguages()) : new ArrayList<>());

        // Update education
        resume.getEducation().clear();
        if (dto.getEducation() != null) {
            for (int i = 0; i < dto.getEducation().size(); i++) {
                EducationDto edDto = dto.getEducation().get(i);
                Education edu = new Education();
                edu.setInstitution(edDto.getInstitution());
                edu.setDegree(edDto.getDegree());
                edu.setFieldOfStudy(edDto.getFieldOfStudy());
                edu.setStartDate(edDto.getStartDate());
                edu.setEndDate(edDto.getEndDate());
                edu.setGpa(edDto.getGpa());
                edu.setDisplayOrder(edDto.getDisplayOrder() != null ? edDto.getDisplayOrder() : i);
                resume.addEducation(edu);
            }
        }

        // Update experience
        resume.getExperience().clear();
        if (dto.getExperience() != null) {
            for (int i = 0; i < dto.getExperience().size(); i++) {
                ExperienceDto expDto = dto.getExperience().get(i);
                Experience exp = new Experience();
                exp.setCompany(expDto.getCompany());
                exp.setJobTitle(expDto.getJobTitle());
                exp.setStartDate(expDto.getStartDate());
                exp.setEndDate(expDto.getEndDate());
                exp.setCurrent(expDto.isCurrent());
                exp.setDescription(expDto.getDescription());
                exp.setDisplayOrder(expDto.getDisplayOrder() != null ? expDto.getDisplayOrder() : i);
                resume.addExperience(exp);
            }
        }

        // Update references
        resume.getResumeReferences().clear();
        if (dto.getReferences() != null) {
            for (ReferenceDto refDto : dto.getReferences()) {
                ResumeReference ref = new ResumeReference();
                ref.setName(refDto.getName());
                ref.setCompany(refDto.getCompany());
                ref.setTitle(refDto.getTitle());
                ref.setPhone(refDto.getPhone());
                ref.setEmail(refDto.getEmail());
                resume.addReference(ref);
            }
        }
    }

    public ResumeDto toDto(Resume resume) {
        ResumeDto dto = new ResumeDto();
        dto.setId(resume.getId());
        dto.setTitle(resume.getTitle());
        dto.setCandidateName(resume.getCandidateName());
        dto.setHeadline(resume.getHeadline());
        dto.setSummary(resume.getSummary());
        dto.setContactEmail(resume.getContactEmail());
        dto.setContactPhone(resume.getContactPhone());
        dto.setAddress(resume.getAddress());
        dto.setLocation(resume.getLocation());
        dto.setWebsite(resume.getWebsite());
        dto.setProfilePhoto(resume.getProfilePhoto());
        dto.setSkills(new ArrayList<>(resume.getSkills()));
        dto.setLanguages(new ArrayList<>(resume.getLanguages()));
        dto.setVisibleToRecruiters(resume.isVisibleToRecruiters());
        dto.setTemplateId(resume.getTemplateId());
        dto.setStatus(resume.getStatus());
        dto.setVersion(resume.getVersion());
        dto.setOwnerEmail(resume.getOwner() != null ? resume.getOwner().getEmail() : null);

        if (resume.getEducation() != null) {
            dto.setEducation(resume.getEducation().stream().map(e -> {
                EducationDto edDto = new EducationDto();
                edDto.setId(e.getId());
                edDto.setInstitution(e.getInstitution());
                edDto.setDegree(e.getDegree());
                edDto.setFieldOfStudy(e.getFieldOfStudy());
                edDto.setStartDate(e.getStartDate());
                edDto.setEndDate(e.getEndDate());
                edDto.setGpa(e.getGpa());
                edDto.setDisplayOrder(e.getDisplayOrder());
                return edDto;
            }).collect(Collectors.toList()));
        }

        if (resume.getExperience() != null) {
            dto.setExperience(resume.getExperience().stream().map(e -> {
                ExperienceDto expDto = new ExperienceDto();
                expDto.setId(e.getId());
                expDto.setCompany(e.getCompany());
                expDto.setJobTitle(e.getJobTitle());
                expDto.setStartDate(e.getStartDate());
                expDto.setEndDate(e.getEndDate());
                expDto.setCurrent(e.isCurrent());
                expDto.setDescription(e.getDescription());
                expDto.setDisplayOrder(e.getDisplayOrder());
                return expDto;
            }).collect(Collectors.toList()));
        }

        if (resume.getResumeReferences() != null) {
            dto.setReferences(resume.getResumeReferences().stream().map(r -> {
                ReferenceDto refDto = new ReferenceDto();
                refDto.setId(r.getId());
                refDto.setName(r.getName());
                refDto.setCompany(r.getCompany());
                refDto.setTitle(r.getTitle());
                refDto.setPhone(r.getPhone());
                refDto.setEmail(r.getEmail());
                return refDto;
            }).collect(Collectors.toList()));
        }

        return dto;
    }
}
