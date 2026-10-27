-- =============================================================================
-- MySQL Schema for Resume Builder
-- Database: resumedb
-- You can run this in MySQL Workbench or let Hibernate create the tables automatically!
-- =============================================================================

CREATE DATABASE IF NOT EXISTS resumedb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE resumedb;

-- 1. Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(50) NOT NULL DEFAULT 'JOB_SEEKER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Templates table
CREATE TABLE IF NOT EXISTS templates (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    industry_category VARCHAR(255),
    layout_style VARCHAR(100),
    color_scheme VARCHAR(100),
    font_family VARCHAR(100),
    premium_only BOOLEAN DEFAULT FALSE,
    ats_friendly BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Resumes table
CREATE TABLE IF NOT EXISTS resumes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    owner_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL DEFAULT 'Untitled Resume',
    candidate_name VARCHAR(255),
    headline VARCHAR(255),
    summary LONGTEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    address VARCHAR(255),
    location VARCHAR(255),
    website VARCHAR(255),
    profile_photo LONGTEXT,
    visible_to_recruiters BOOLEAN DEFAULT FALSE,
    template_id BIGINT DEFAULT 6,
    status VARCHAR(50) DEFAULT 'DRAFT',
    version INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_resumes_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Resume Skills table
CREATE TABLE IF NOT EXISTS resume_skills (
    resume_id BIGINT NOT NULL,
    skill VARCHAR(255) NOT NULL,
    CONSTRAINT fk_resume_skills FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Resume Languages table
CREATE TABLE IF NOT EXISTS resume_languages (
    resume_id BIGINT NOT NULL,
    language VARCHAR(255) NOT NULL,
    CONSTRAINT fk_resume_languages FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Educations table
CREATE TABLE IF NOT EXISTS educations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    institution VARCHAR(255),
    degree VARCHAR(255),
    field_of_study VARCHAR(255),
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    gpa VARCHAR(50),
    display_order INT DEFAULT 0,
    CONSTRAINT fk_educations_resume FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Experiences table
CREATE TABLE IF NOT EXISTS experiences (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    company VARCHAR(255),
    job_title VARCHAR(255),
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    current BOOLEAN DEFAULT FALSE,
    description LONGTEXT,
    display_order INT DEFAULT 0,
    CONSTRAINT fk_experiences_resume FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. References table
CREATE TABLE IF NOT EXISTS resume_references (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    name VARCHAR(255),
    company VARCHAR(255),
    title VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    CONSTRAINT fk_references_resume FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Seed Default Templates
INSERT IGNORE INTO templates (id, name, industry_category, layout_style, color_scheme, fontFamily, premium_only, ats_friendly) VALUES
(6, 'Executive Timeline (Richard Sanchez)', 'Marketing & Management', 'timeline', 'Navy & Slate', 'Inter', false, true),
(1, 'Classic Professional', 'General & Academic', 'classic', 'Navy & Charcoal', 'Georgia', false, true),
(2, 'Modern Minimalist', 'Tech & Engineering', 'modern', 'Slate & Teal', 'Inter', false, true),
(3, 'Two-Column Sidebar', 'Healthcare & Science', 'sidebar', 'Blue & Steel', 'Roboto', false, true),
(4, 'Corporate Executive', 'Finance & Leadership', 'executive', 'Charcoal & Gold', 'Merriweather', false, true),
(5, 'Creative Startup', 'Design & Product', 'creative', 'Indigo & Purple', 'Montserrat', false, true);
