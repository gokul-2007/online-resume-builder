package com.resumebuilder.dto;

import java.util.ArrayList;
import java.util.List;

public class ResumeDto {
    private Long id;
    private String title;
    private String candidateName;
    private String headline;
    private String summary;
    private String contactEmail;
    private String contactPhone;
    private String address;
    private String location;
    private String website;
    private String profilePhoto;
    private List<String> skills = new ArrayList<>();
    private List<String> languages = new ArrayList<>();
    private List<EducationDto> education = new ArrayList<>();
    private List<ExperienceDto> experience = new ArrayList<>();
    private List<ReferenceDto> references = new ArrayList<>();
    private boolean visibleToRecruiters;
    private Long templateId = 6L;
    private String status = "DRAFT";
    private Integer version = 1;
    private String ownerEmail;

    public ResumeDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public List<EducationDto> getEducation() { return education; }
    public void setEducation(List<EducationDto> education) { this.education = education != null ? education : new ArrayList<>(); }

    public List<ExperienceDto> getExperience() { return experience; }
    public void setExperience(List<ExperienceDto> experience) { this.experience = experience != null ? experience : new ArrayList<>(); }

    public List<ReferenceDto> getReferences() { return references; }
    public void setReferences(List<ReferenceDto> references) { this.references = references != null ? references : new ArrayList<>(); }

    public boolean isVisibleToRecruiters() { return visibleToRecruiters; }
    public void setVisibleToRecruiters(boolean visibleToRecruiters) { this.visibleToRecruiters = visibleToRecruiters; }

    public Long getTemplateId() { return templateId; }
    public void setTemplateId(Long templateId) { this.templateId = templateId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getVersion() { return version; }
    public void setVersion(Integer version) { this.version = version; }

    public String getOwnerEmail() { return ownerEmail; }
    public void setOwnerEmail(String ownerEmail) { this.ownerEmail = ownerEmail; }
}
