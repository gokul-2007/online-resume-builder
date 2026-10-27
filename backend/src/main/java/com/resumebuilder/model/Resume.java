package com.resumebuilder.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "resumes")
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    private String title;
    private String candidateName;
    private String headline;

    @Column(columnDefinition = "LONGTEXT")
    private String summary;

    private String contactEmail;
    private String contactPhone;
    private String address;
    private String location;
    private String website;

    @Column(columnDefinition = "LONGTEXT")
    private String profilePhoto;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "resume_skills", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "skill")
    private List<String> skills = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "resume_languages", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "language")
    private List<String> languages = new ArrayList<>();

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Education> education = new ArrayList<>();

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Experience> experience = new ArrayList<>();

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ResumeReference> resumeReferences = new ArrayList<>();

    private boolean visibleToRecruiters = false;
    private Long templateId = 6L;
    private String status = "DRAFT";
    private Integer version = 1;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Resume() {}

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (version == null) version = 1;
        if (status == null) status = "DRAFT";
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Helper methods for bidirectional relationships
    public void addEducation(Education edu) {
        education.add(edu);
        edu.setResume(this);
    }

    public void removeEducation(Education edu) {
        education.remove(edu);
        edu.setResume(null);
    }

    public void addExperience(Experience exp) {
        experience.add(exp);
        exp.setResume(this);
    }

    public void removeExperience(Experience exp) {
        experience.remove(exp);
        exp.setResume(null);
    }

    public void addReference(ResumeReference ref) {
        resumeReferences.add(ref);
        ref.setResume(this);
    }

    public void removeReference(ResumeReference ref) {
        resumeReferences.remove(ref);
        ref.setResume(null);
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCandidateName() { return candidateName; }
    public void setCandidateName(String candidateName) { this.candidateName = candidateName; }

    public String getHeadline() { return headline; }
    public void setHeadline(String headline) { this.headline = headline; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getProfilePhoto() { return profilePhoto; }
    public void setProfilePhoto(String profilePhoto) { this.profilePhoto = profilePhoto; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills != null ? skills : new ArrayList<>(); }

    public List<String> getLanguages() { return languages; }
    public void setLanguages(List<String> languages) { this.languages = languages != null ? languages : new ArrayList<>(); }

    public List<Education> getEducation() { return education; }
    public void setEducation(List<Education> education) { this.education = education != null ? education : new ArrayList<>(); }

    public List<Experience> getExperience() { return experience; }
    public void setExperience(List<Experience> experience) { this.experience = experience != null ? experience : new ArrayList<>(); }

    public List<ResumeReference> getResumeReferences() { return resumeReferences; }
    public void setResumeReferences(List<ResumeReference> resumeReferences) { this.resumeReferences = resumeReferences != null ? resumeReferences : new ArrayList<>(); }

    public boolean isVisibleToRecruiters() { return visibleToRecruiters; }
    public void setVisibleToRecruiters(boolean visibleToRecruiters) { this.visibleToRecruiters = visibleToRecruiters; }

    public Long getTemplateId() { return templateId; }
    public void setTemplateId(Long templateId) { this.templateId = templateId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getVersion() { return version; }
    public void setVersion(Integer version) { this.version = version; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
