const pptxgen = require('pptxgenjs');

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

// Color Palette
const COLOR_PRIMARY = '18224B';      // Deep Navy
const COLOR_SECONDARY = '3B82F6';    // Bright Accent Blue
const COLOR_ACCENT = 'F59E0B';       // Orange / Amber for bullets & highlights
const COLOR_BG_LIGHT = 'F8FAFC';     // Clean light gray-blue background
const COLOR_CARD_BG = 'EDF2F9';      // Rounded card background
const COLOR_CARD_BORDER = 'CBD5E1';  // Card border
const COLOR_TEXT_DARK = '1E293B';    // Charcoal dark
const COLOR_TEXT_MUTED = '475569';   // Slate muted
const COLOR_WHITE = 'FFFFFF';        // Pure white

const FOOTER_TEXT = 'Project Review · Resume Builder Full-Stack Platform';

// Helper for top badge and title
function addHeader(slide, numberStr, titleStr) {
  // Dark blue circle / badge
  slide.addShape(pres.shapes.OVAL, {
    x: 0.5, y: 0.4, w: 0.48, h: 0.48,
    fill: { color: COLOR_PRIMARY },
    line: { color: COLOR_PRIMARY }
  });
  slide.addText(numberStr, {
    x: 0.5, y: 0.4, w: 0.48, h: 0.48,
    fontSize: 12, bold: true, color: COLOR_WHITE,
    align: 'center', valign: 'middle'
  });
  // Title
  slide.addText(titleStr.toUpperCase(), {
    x: 1.1, y: 0.4, w: 10.0, h: 0.48,
    fontSize: 14, bold: true, color: COLOR_PRIMARY,
    valign: 'middle', fontFace: 'Arial'
  });
}

// Helper for footer
function addFooter(slide) {
  slide.addText(FOOTER_TEXT, {
    x: 0.5, y: 7.0, w: 12.0, h: 0.3,
    fontSize: 9, color: '94A3B8', fontFace: 'Arial'
  });
}

// ==========================================
// SLIDE 1: Title Slide (Dark Theme)
// ==========================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR_PRIMARY };

  // Background decoration circle
  slide.addShape(pres.shapes.OVAL, {
    x: 10.0, y: -1.0, w: 5.0, h: 5.0,
    fill: { color: '202D62', transparency: 50 },
    line: { color: '202D62', transparency: 100 }
  });
  slide.addShape(pres.shapes.OVAL, {
    x: 10.5, y: 4.5, w: 4.5, h: 4.5,
    fill: { color: '202D62', transparency: 60 },
    line: { color: '202D62', transparency: 100 }
  });

  slide.addText('PROJECT REVIEW PRESENTATION', {
    x: 0.8, y: 2.0, w: 10.0, h: 0.3,
    fontSize: 12, bold: true, color: COLOR_ACCENT,
    fontFace: 'Arial'
  });

  slide.addText('Full-Stack ATS Resume Builder &\nCandidate Recruiter Portal', {
    x: 0.8, y: 2.4, w: 11.5, h: 1.5,
    fontSize: 28, bold: true, color: COLOR_WHITE,
    fontFace: 'Arial'
  });

  const metadata = [
    { text: 'Student name(s): ', options: { bold: true, color: '93C5FD' } },
    { text: 'Project Developer\n', options: { color: COLOR_WHITE } },
    { text: 'Register / roll number: ', options: { bold: true, color: '93C5FD' } },
    { text: 'REG-2024-CS-01\n', options: { color: COLOR_WHITE } },
    { text: 'Class / section: ', options: { bold: true, color: '93C5FD' } },
    { text: 'B.Tech Computer Science & Engineering\n', options: { color: COLOR_WHITE } },
    { text: 'Guide / trainer: ', options: { bold: true, color: '93C5FD' } },
    { text: 'Internal Project Review Committee\n', options: { color: COLOR_WHITE } },
    { text: 'Course / subject: ', options: { bold: true, color: '93C5FD' } },
    { text: 'Capstone / Major Project Review', options: { color: COLOR_WHITE } },
  ];

  slide.addText(metadata, {
    x: 0.8, y: 4.2, w: 10.0, h: 2.6,
    fontSize: 11, fontFace: 'Arial'
  });
}

// ==========================================
// SLIDE 2: 01 Project Overview
// ==========================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR_BG_LIGHT };
  addHeader(slide, '01', 'Project Overview');
  addFooter(slide);

  const sections = [
    {
      label: 'Introduction',
      desc: 'A modern, full-stack web application that allows job seekers to dynamically build, customize, and export ATS-friendly professional resumes in real-time, while providing recruiters a dedicated portal to search, filter, and discover prospective candidates.'
    },
    {
      label: 'Problem addressed',
      desc: 'Most traditional resume tools produce complex graphic formats that fail Applicant Tracking System (ATS) parsers, charge hidden subscription fees, lack instant multi-template customization, and offer no bridge connecting job seekers directly to hiring recruiters.'
    },
    {
      label: 'Purpose',
      desc: 'To streamline professional career documentation by pairing a live interactive builder with 6+ industry-tailored ATS templates, secure JWT authentication, and a dual-role recruiter marketplace that increases candidate visibility and hiring efficiency.'
    }
  ];

  sections.forEach((sec, idx) => {
    const yPos = 1.2 + idx * 1.8;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: yPos, w: 12.33, h: 1.55,
      fill: { color: COLOR_CARD_BG },
      line: { color: COLOR_CARD_BORDER, width: 1 }
    });

    slide.addText(sec.label, {
      x: 0.8, y: yPos + 0.15, w: 2.8, h: 1.25,
      fontSize: 14, bold: true, color: COLOR_PRIMARY,
      valign: 'middle', fontFace: 'Arial'
    });

    slide.addText(sec.desc, {
      x: 3.8, y: yPos + 0.15, w: 8.7, h: 1.25,
      fontSize: 11.5, color: COLOR_TEXT_DARK,
      valign: 'middle', fontFace: 'Arial'
    });
  });
}

// ==========================================
// SLIDE 3: 02 Problem Statement
// ==========================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR_BG_LIGHT };
  addHeader(slide, '02', 'Problem Statement');
  addFooter(slide);

  const sections = [
    {
      label: 'Existing problem',
      desc: 'Job seekers struggle to format clean, standardized resumes across various devices. Manual formatting in word processors is time-consuming, prone to margin misalignment, and often unreadable by automated ATS screening software used by top employers.'
    },
    {
      label: 'Limitations of current approach',
      desc: 'Existing online tools enforce rigid paywalls, offer zero recruiter discovery integration, fail to provide real-time dynamic preview rendering, and lack automated schema-backed structured data persistence for one-click template switching.'
    },
    {
      label: 'Why this project is required',
      desc: 'Bridging the talent-recruiter gap with an open, modern platform featuring instant live previews, multi-format exports (PDF, JSON, Print), robust REST APIs, secure role-based access, and direct recruiter candidate search.'
    }
  ];

  sections.forEach((sec, idx) => {
    const yPos = 1.2 + idx * 1.8;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: yPos, w: 12.33, h: 1.55,
      fill: { color: COLOR_CARD_BG },
      line: { color: COLOR_CARD_BORDER, width: 1 }
    });

    slide.addText(sec.label, {
      x: 0.8, y: yPos + 0.15, w: 2.8, h: 1.25,
      fontSize: 14, bold: true, color: COLOR_PRIMARY,
      valign: 'middle', fontFace: 'Arial'
    });

    slide.addText(sec.desc, {
      x: 3.8, y: yPos + 0.15, w: 8.7, h: 1.25,
      fontSize: 11.5, color: COLOR_TEXT_DARK,
      valign: 'middle', fontFace: 'Arial'
    });
  });
}

// ==========================================
// SLIDE 4: 03 Objectives
// ==========================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR_BG_LIGHT };
  addHeader(slide, '03', 'Objectives');
  addFooter(slide);

  // Left Card: Key objectives
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.2, w: 5.95, h: 5.5,
    fill: { color: COLOR_CARD_BG },
    line: { color: COLOR_CARD_BORDER, width: 1 }
  });

  slide.addText('Key objectives', {
    x: 0.8, y: 1.5, w: 5.3, h: 0.4,
    fontSize: 16, bold: true, color: COLOR_PRIMARY, fontFace: 'Arial'
  });

  const objItems = [
    { text: 'Develop an interactive, reactive UI with live preview and instant template switching.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Implement secure JWT-based stateless authentication with Role-Based Access Control (Job Seeker / Recruiter).', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Design normalized MySQL relational schema for comprehensive resume data modeling (Educations, Experiences, Skills, References).', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Create dual-ecosystem features: PDF/JSON export engine and searchable recruiter talent database.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } }
  ];

  slide.addText(objItems, {
    x: 0.8, y: 2.1, w: 5.3, h: 4.3,
    fontSize: 12, color: COLOR_TEXT_DARK, fontFace: 'Arial'
  });

  // Right Card: Expected outcomes
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.85, y: 1.2, w: 5.95, h: 5.5,
    fill: { color: COLOR_CARD_BG },
    line: { color: COLOR_CARD_BORDER, width: 1 }
  });

  slide.addText('Expected outcomes', {
    x: 7.15, y: 1.5, w: 5.3, h: 0.4,
    fontSize: 16, bold: true, color: COLOR_PRIMARY, fontFace: 'Arial'
  });

  const outcomeItems = [
    { text: 'Sub-second live rendering of formatted resumes across 6+ ATS standard templates.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Zero data loss with automated draft persistence and relational cascade updates.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Production-ready PDF printing and JSON data import/export for resume mobility.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Seamless candidate discovery for recruiters through real-time keyword, skill, and location filters.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } }
  ];

  slide.addText(outcomeItems, {
    x: 7.15, y: 2.1, w: 5.3, h: 4.3,
    fontSize: 12, color: COLOR_TEXT_DARK, fontFace: 'Arial'
  });
}

// ==========================================
// SLIDE 5: 04 Proposed Solution
// ==========================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR_BG_LIGHT };
  addHeader(slide, '04', 'Proposed Solution');
  addFooter(slide);

  // Left Section
  slide.addText('How it works', {
    x: 0.5, y: 1.2, w: 5.8, h: 0.35,
    fontSize: 14, bold: true, color: COLOR_PRIMARY, fontFace: 'Arial'
  });
  slide.addText('Users authenticate via JWT security, fill structured modular sections (Contact, Summary, Experience, Education, Skills, Languages, References), and witness immediate real-time side-by-side rendering with instant PDF generation and template styling.', {
    x: 0.5, y: 1.6, w: 5.8, h: 1.8,
    fontSize: 11.5, color: COLOR_TEXT_DARK, fontFace: 'Arial'
  });

  slide.addText('Why this solves the problem', {
    x: 0.5, y: 3.6, w: 5.8, h: 0.35,
    fontSize: 14, bold: true, color: COLOR_PRIMARY, fontFace: 'Arial'
  });
  slide.addText('Eliminates formatting headaches, enforces ATS compliance standards, ensures high readability, preserves data in a structured relational database, and bridges job seekers directly to employers with an integrated recruiter discovery engine.', {
    x: 0.5, y: 4.0, w: 5.8, h: 2.2,
    fontSize: 11.5, color: COLOR_TEXT_DARK, fontFace: 'Arial'
  });

  // Right Section: Card for Major features
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.8, y: 1.1, w: 6.0, h: 5.6,
    fill: { color: COLOR_CARD_BG },
    line: { color: COLOR_CARD_BORDER, width: 1 }
  });

  slide.addText('Major features', {
    x: 7.1, y: 1.3, w: 5.4, h: 0.4,
    fontSize: 16, bold: true, color: COLOR_PRIMARY, fontFace: 'Arial'
  });

  const featItems = [
    { text: 'Dynamic Real-Time Live Preview & Instant Switcher (6 ATS Templates)', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Multi-Section Structured Form Builder with dynamic rows & ordering', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Recruiter Search Engine with talent filtering (Skill, Title, Location)', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Multi-Format Exporting: High-Res PDF Print, Clean CSS Print, JSON Backup', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Full-Stack Security: Stateless JWT, Spring Security 6 & BCrypt Password Hashing', options: { bullet: { code: '2022', color: COLOR_ACCENT } } }
  ];

  slide.addText(featItems, {
    x: 7.1, y: 1.8, w: 5.4, h: 4.6,
    fontSize: 11.5, color: COLOR_TEXT_DARK, fontFace: 'Arial'
  });
}

// ==========================================
// SLIDE 6: 05 Technology Stack
// ==========================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR_BG_LIGHT };
  addHeader(slide, '05', 'Technology Stack');
  addFooter(slide);

  const stack = [
    { title: 'Frontend', text: '• React 18.2 (Hooks, State)\n• React Router DOM v6\n• Context API (AuthContext)\n• Axios HTTP Client\n• Vanilla CSS Design System' },
    { title: 'Backend', text: '• Java 17 LTS\n• Spring Boot 3.3.4 REST API\n• Spring Data JPA & Hibernate\n• Spring Security 6\n• JJWT 0.11.5 (JSON Web Tokens)' },
    { title: 'Database', text: '• MySQL 8.0 Server\n• InnoDB Relational Engine\n• MySQL Workbench\n• Hibernate DDL Auto-Update\n• Foreign Key Cascade Constraints' },
    { title: 'APIs / Libraries / Frameworks', text: '• RESTful API Architecture\n• Jackson JSON & JSR-310\n• Jakarta Bean Validation\n• HTML-to-PDF / Browser Print Engine\n• Custom Toast Notification System' },
    { title: 'Development Tools', text: '• Visual Studio Code / IDE\n• Apache Maven 3.9+\n• Node.js & NPM Ecosystem\n• Postman API Tester\n• Git Version Control' },
    { title: 'Other', text: '• ATS-Compliant Layout Engines\n• Demo Mode Fallback Handler\n• BCrypt Cryptographic Hashing\n• Cross-Origin Resource Sharing (CORS)\n• UTF-8 Multi-language Support' }
  ];

  stack.forEach((item, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const x = 0.5 + col * 4.2;
    const y = 1.2 + row * 2.8;

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: y, w: 3.95, h: 2.6,
      fill: { color: COLOR_CARD_BG },
      line: { color: COLOR_CARD_BORDER, width: 1 }
    });

    slide.addText(item.title, {
      x: x + 0.2, y: y + 0.15, w: 3.55, h: 0.35,
      fontSize: 13, bold: true, color: COLOR_PRIMARY, fontFace: 'Arial'
    });

    slide.addText(item.text, {
      x: x + 0.2, y: y + 0.55, w: 3.55, h: 1.9,
      fontSize: 10, color: COLOR_TEXT_DARK, fontFace: 'Arial'
    });
  });
}

// ==========================================
// SLIDE 7: 06 System Architecture
// ==========================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR_BG_LIGHT };
  addHeader(slide, '06', 'System Architecture');
  addFooter(slide);

  // 4 Horizontal Architecture Boxes
  const archBoxes = [
    { title: 'Frontend', sub: 'React SPA (Port 3000)\n• Dynamic Builder & Forms\n• Live Template Engine\n• Recruiter Dashboard' },
    { title: 'Backend', sub: 'Spring Boot 3 (Port 8080)\n• REST Controllers\n• Spring Security & JWT\n• Service Business Logic' },
    { title: 'Database', sub: 'MySQL 8 (Port 3306)\n• Users & Resumes\n• Educations & Experiences\n• Relational JPA Mappings' },
    { title: 'External Services / APIs', sub: 'Client Ecosystem\n• PDF Print Service\n• Browser Storage Cache\n• ATS Keyword Evaluator' }
  ];

  archBoxes.forEach((b, idx) => {
    const x = 0.5 + idx * 3.15;
    const y = 1.2;

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: y, w: 2.5, h: 1.7,
      fill: { color: COLOR_WHITE },
      line: { color: COLOR_PRIMARY, width: 1.5 }
    });

    slide.addText(b.title, {
      x: x, y: y + 0.1, w: 2.5, h: 0.35,
      fontSize: 12, bold: true, color: COLOR_PRIMARY, align: 'center', fontFace: 'Arial'
    });

    slide.addText(b.sub, {
      x: x + 0.1, y: y + 0.45, w: 2.3, h: 1.15,
      fontSize: 9, color: COLOR_TEXT_MUTED, align: 'center', fontFace: 'Arial'
    });

    // Arrow (except last)
    if (idx < 3) {
      slide.addShape(pres.shapes.RIGHT_ARROW, {
        x: x + 2.55, y: y + 0.65, w: 0.5, h: 0.35,
        fill: { color: COLOR_ACCENT },
        line: { color: COLOR_ACCENT }
      });
    }
  });

  // Data flow description Card
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.2, w: 12.33, h: 3.5,
    fill: { color: COLOR_CARD_BG },
    line: { color: COLOR_CARD_BORDER, width: 1 }
  });

  slide.addText('Data flow description', {
    x: 0.8, y: 3.4, w: 11.5, h: 0.4,
    fontSize: 15, bold: true, color: COLOR_PRIMARY, fontFace: 'Arial'
  });

  const flowSteps = [
    { text: '1. User Interaction: The candidate edits resume fields or changes templates on the React client interface.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: '2. API Transmission: Axios sends authenticated JSON payload via HTTP POST/PUT with Bearer JWT header to Spring Boot endpoints.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: '3. Security & Validation: JwtAuthenticationFilter inspects token validity; Spring Controllers validate payload constraints.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: '4. Persistence: Spring Data JPA Repositories persist entities to MySQL tables with transactional integrity.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: '5. Recruiter Discovery: Candidates marking "visibleToRecruiters = true" are instantly indexed for Recruiter Search queries.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } }
  ];

  slide.addText(flowSteps, {
    x: 0.8, y: 3.9, w: 11.5, h: 2.6,
    fontSize: 11, color: COLOR_TEXT_DARK, fontFace: 'Arial'
  });
}

// ==========================================
// SLIDE 8: 07 Modules / Features
// ==========================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR_BG_LIGHT };
  addHeader(slide, '07', 'Modules / Features');
  addFooter(slide);

  const tableData = [
    [
      { text: 'Module', options: { bold: true, color: COLOR_WHITE, fill: { color: COLOR_PRIMARY }, fontSize: 12 } },
      { text: 'Purpose & Capabilities', options: { bold: true, color: COLOR_WHITE, fill: { color: COLOR_PRIMARY }, fontSize: 12 } }
    ],
    [
      { text: 'Auth & Role Security Module', options: { bold: true, color: COLOR_PRIMARY, fontSize: 10.5, fill: { color: 'F8FAFC' } } },
      { text: 'Handles user registration, login, BCrypt password encryption, JWT issuance, and RBAC authorization (Job Seeker / Recruiter).', options: { fontSize: 10, color: COLOR_TEXT_DARK, fill: { color: 'F8FAFC' } } }
    ],
    [
      { text: 'Interactive Resume Builder', options: { bold: true, color: COLOR_PRIMARY, fontSize: 10.5, fill: { color: COLOR_WHITE } } },
      { text: 'Modular multi-section editor with dynamic additions (Education, Experience, Skills, References) and real-time live preview.', options: { fontSize: 10, color: COLOR_TEXT_DARK, fill: { color: COLOR_WHITE } } }
    ],
    [
      { text: 'Template Management Engine', options: { bold: true, color: COLOR_PRIMARY, fontSize: 10.5, fill: { color: 'F8FAFC' } } },
      { text: 'Provides 6 distinct ATS-optimized template designs (Timeline, Classic, Modern, Sidebar, Corporate, Creative) with instant switching.', options: { fontSize: 10, color: COLOR_TEXT_DARK, fill: { color: 'F8FAFC' } } }
    ],
    [
      { text: 'Recruiter Search & Discovery', options: { bold: true, color: COLOR_PRIMARY, fontSize: 10.5, fill: { color: COLOR_WHITE } } },
      { text: 'Dedicated portal for hiring managers to search public candidates by keyword, skills, job title, and location with preview cards.', options: { fontSize: 10, color: COLOR_TEXT_DARK, fill: { color: COLOR_WHITE } } }
    ],
    [
      { text: 'Export & Mobility Engine', options: { bold: true, color: COLOR_PRIMARY, fontSize: 10.5, fill: { color: 'F8FAFC' } } },
      { text: 'Generates print-optimized PDF outputs, JSON export for data backup, and quick-import functionality for existing profiles.', options: { fontSize: 10, color: COLOR_TEXT_DARK, fill: { color: 'F8FAFC' } } }
    ]
  ];

  slide.addTable(tableData, {
    x: 0.5, y: 1.2, w: 12.33,
    colW: [3.2, 9.13],
    border: { pt: 1, color: COLOR_CARD_BORDER },
    rowH: [0.45, 0.9, 0.9, 0.9, 0.9, 0.9]
  });
}

// ==========================================
// SLIDE 9: 08 Database / Data Model
// ==========================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR_BG_LIGHT };
  addHeader(slide, '08', 'Database / Data Model');
  addFooter(slide);

  // 3 Entity Boxes
  const entities = [
    { name: 'Users', fields: '• id (PK, BigInt)\n• email (Unique)\n• password (BCrypt)\n• full_name, phone\n• role (SEEKER / RECRUITER)' },
    { name: 'Resumes', fields: '• id (PK, BigInt)\n• owner_id (FK -> users.id)\n• template_id, title\n• summary, contact info\n• visible_to_recruiters' },
    { name: 'Child Entities', fields: '• educations (FK -> resumes)\n• experiences (FK -> resumes)\n• resume_skills (FK -> resumes)\n• resume_references (FK)\n• resume_languages (FK)' }
  ];

  entities.forEach((ent, idx) => {
    const x = 0.5 + idx * 4.2;
    const y = 1.2;

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: y, w: 3.3, h: 2.1,
      fill: { color: COLOR_WHITE },
      line: { color: COLOR_PRIMARY, width: 1.5 }
    });

    slide.addText(ent.name, {
      x: x, y: y + 0.1, w: 3.3, h: 0.35,
      fontSize: 13, bold: true, color: COLOR_PRIMARY, align: 'center', fontFace: 'Arial'
    });

    slide.addText(ent.fields, {
      x: x + 0.15, y: y + 0.45, w: 3.0, h: 1.55,
      fontSize: 9.5, color: COLOR_TEXT_DARK, fontFace: 'Arial'
    });

    if (idx < 2) {
      slide.addText('1 : N\n──►', {
        x: x + 3.35, y: y + 0.7, w: 0.8, h: 0.6,
        fontSize: 11, bold: true, color: COLOR_ACCENT, align: 'center', fontFace: 'Arial'
      });
    }
  });

  // Relationships Card
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.6, w: 12.33, h: 3.1,
    fill: { color: COLOR_CARD_BG },
    line: { color: COLOR_CARD_BORDER, width: 1 }
  });

  slide.addText('Key entities & relationships', {
    x: 0.8, y: 3.8, w: 11.5, h: 0.35,
    fontSize: 14, bold: true, color: COLOR_PRIMARY, fontFace: 'Arial'
  });

  const relItems = [
    { text: 'Users to Resumes (1 : N): One user can create multiple resumes (e.g. customized for Frontend, Full-Stack, or Data Science roles).', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Resumes to Sub-Collections (1 : N): Cascade DELETE ensures removing a resume automatically cleans up all associated educations, experiences, skills, languages, and references.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Templates Entity: Pre-seeded master catalog containing metadata (industryCategory, layoutStyle, colorScheme, atsFriendly flag).', options: { bullet: { code: '2022', color: COLOR_ACCENT } } }
  ];

  slide.addText(relItems, {
    x: 0.8, y: 4.25, w: 11.5, h: 2.2,
    fontSize: 11, color: COLOR_TEXT_DARK, fontFace: 'Arial'
  });
}

// ==========================================
// SLIDE 10: 09 Application Workflow
// ==========================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR_BG_LIGHT };
  addHeader(slide, '09', 'Application Workflow');
  addFooter(slide);

  // Workflow Boxes: Start -> Step 1 -> Step 2 -> Step 3 -> End
  const steps = [
    { name: 'Start', isOval: true, bg: COLOR_PRIMARY, fg: COLOR_WHITE },
    { name: '1. Auth &\nDashboard', isOval: false, bg: COLOR_WHITE, fg: COLOR_PRIMARY },
    { name: '2. Modular\nResume Editing', isOval: false, bg: COLOR_WHITE, fg: COLOR_PRIMARY },
    { name: '3. Template &\nLive Preview', isOval: false, bg: COLOR_WHITE, fg: COLOR_PRIMARY },
    { name: 'End (Export /\nRecruiter Match)', isOval: true, bg: COLOR_PRIMARY, fg: COLOR_WHITE }
  ];

  steps.forEach((st, idx) => {
    const x = 0.5 + idx * 2.55;
    const y = 1.3;

    slide.addShape(st.isOval ? pres.shapes.OVAL : pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: y, w: 1.85, h: 1.1,
      fill: { color: st.bg },
      line: { color: COLOR_PRIMARY, width: 1.5 }
    });

    slide.addText(st.name, {
      x: x, y: y, w: 1.85, h: 1.1,
      fontSize: 10.5, bold: true, color: st.fg, align: 'center', valign: 'middle', fontFace: 'Arial'
    });

    if (idx < 4) {
      slide.addShape(pres.shapes.RIGHT_ARROW, {
        x: x + 1.95, y: y + 0.38, w: 0.5, h: 0.3,
        fill: { color: COLOR_ACCENT },
        line: { color: COLOR_ACCENT }
      });
    }
  });

  // Description Card
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 2.8, w: 12.33, h: 3.9,
    fill: { color: COLOR_CARD_BG },
    line: { color: COLOR_CARD_BORDER, width: 1 }
  });

  slide.addText('End-to-End User & System Flow', {
    x: 0.8, y: 3.0, w: 11.5, h: 0.4,
    fontSize: 14, bold: true, color: COLOR_PRIMARY, fontFace: 'Arial'
  });

  const flowDetails = [
    { text: 'Registration & Login: Job Seeker signs in, receives JWT token, and accesses user dashboard with existing resumes.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Resume Authoring: User fills personal info, skills, education, work experience with live form validations and dynamic item addition/removal.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Instant Template Rendering: Split-screen updates resume preview instantaneously upon every keystroke, allowing instant template skin toggling.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Persistence & Export: Document is synchronized to MySQL via Spring Boot REST APIs; user downloads high-res PDF or shares public profile.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Recruiter Matching: Hiring managers query the talent database to discover and view public resumes matching desired tech skills and experience.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } }
  ];

  slide.addText(flowDetails, {
    x: 0.8, y: 3.5, w: 11.5, h: 3.0,
    fontSize: 11, color: COLOR_TEXT_DARK, fontFace: 'Arial'
  });
}

// ==========================================
// SLIDE 11: 10 Key Functionality
// ==========================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR_BG_LIGHT };
  addHeader(slide, '10', 'Key Functionality');
  addFooter(slide);

  // Functionality Header
  slide.addText('Interactive Live Resume Builder & ATS Template Engine', {
    x: 0.5, y: 1.1, w: 7.0, h: 0.5,
    fontSize: 18, bold: true, color: COLOR_PRIMARY, fontFace: 'Arial'
  });

  slide.addText('What the user can do', {
    x: 0.5, y: 1.7, w: 6.0, h: 0.35,
    fontSize: 13, bold: true, color: COLOR_PRIMARY, fontFace: 'Arial'
  });

  const userCanDo = [
    { text: 'Edit personal details, summary, experience timeline, skills, and references in an intuitive multi-tab form.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Switch between 6 ATS-friendly layout presets with instant live re-rendering on the right preview pane.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Export high-definition PDF resumes, download JSON data files, or toggle visibility for recruiter discovery.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } }
  ];

  slide.addText(userCanDo, {
    x: 0.5, y: 2.1, w: 6.0, h: 2.1,
    fontSize: 11, color: COLOR_TEXT_DARK, fontFace: 'Arial'
  });

  slide.addText('How it works', {
    x: 0.5, y: 4.4, w: 6.0, h: 0.35,
    fontSize: 13, bold: true, color: COLOR_PRIMARY, fontFace: 'Arial'
  });

  slide.addText('State is centrally managed in React and passed to ResumeDocumentPreview component. Changes trigger immediate DOM re-render without page refresh. When saved, payload is validated and persisted via REST API in MySQL.', {
    x: 0.5, y: 4.8, w: 6.0, h: 1.8,
    fontSize: 11, color: COLOR_TEXT_DARK, fontFace: 'Arial'
  });

  // Right Side Feature Preview Card / Graphic Box
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.8, y: 1.1, w: 6.0, h: 5.6,
    fill: { color: COLOR_CARD_BG },
    line: { color: COLOR_CARD_BORDER, width: 1, dashType: 'dash' }
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.1, y: 1.4, w: 5.4, h: 2.3,
    fill: { color: COLOR_WHITE },
    line: { color: COLOR_PRIMARY, width: 1 }
  });

  slide.addText('SPLIT-SCREEN BUILDER PREVIEW\n\n[ Left: Section Forms & Dynamic Rows ]\n[ Right: Live ATS Resume Rendering ]', {
    x: 7.1, y: 1.4, w: 5.4, h: 2.3,
    fontSize: 11, bold: true, color: COLOR_PRIMARY, align: 'center', valign: 'middle', fontFace: 'Arial'
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.1, y: 3.9, w: 5.4, h: 2.5,
    fill: { color: '1E293B' },
    line: { color: '1E293B' }
  });

  slide.addText('KEY CAPABILITIES HIGHLIGHT\n\n✔ Zero Latency React Preview\n✔ 6 Pre-configured ATS Color & Typography Styles\n✔ 1-Click Print & Vector PDF Generation\n✔ Public Candidate Directory for Recruiters', {
    x: 7.3, y: 4.0, w: 5.0, h: 2.3,
    fontSize: 10.5, color: COLOR_WHITE, fontFace: 'Arial'
  });
}

// ==========================================
// SLIDE 12: 11 Challenges & Solutions
// ==========================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR_BG_LIGHT };
  addHeader(slide, '11', 'Challenges & Solutions');
  addFooter(slide);

  const tableData = [
    [
      { text: 'Challenge Encountered', options: { bold: true, color: COLOR_WHITE, fill: { color: COLOR_PRIMARY }, fontSize: 12 } },
      { text: 'Engineered Solution', options: { bold: true, color: COLOR_WHITE, fill: { color: COLOR_PRIMARY }, fontSize: 12 } }
    ],
    [
      { text: '1. Complex Relational State Mapping:\nSynchronizing nested child lists (educations, experiences, skills) with JPA entities without duplicate key conflicts or orphan records.', options: { bold: true, color: COLOR_PRIMARY, fontSize: 10, fill: { color: 'F8FAFC' } } },
      { text: 'Implemented CascadeType.ALL with orphanRemoval=true in Spring Boot JPA entity relationships and structured DTO mapping to atomically synchronize updates.', options: { fontSize: 10.5, color: COLOR_TEXT_DARK, fill: { color: 'F8FAFC' } } }
    ],
    [
      { text: '2. High-Fidelity PDF Generation:\nPreserving exact layout styling, fonts, page breaks, and colors during print-to-PDF without external heavy dependencies.', options: { bold: true, color: COLOR_PRIMARY, fontSize: 10, fill: { color: COLOR_WHITE } } },
      { text: 'Crafted custom `@media print` CSS style rules with clean page-break optimizations and an iframe isolation engine for pixel-perfect PDF downloads.', options: { fontSize: 10.5, color: COLOR_TEXT_DARK, fill: { color: COLOR_WHITE } } }
    ],
    [
      { text: '3. Real-Time Preview Performance:\nRendering continuous keystroke updates across heavy resume templates without UI stutter or memory lag.', options: { bold: true, color: COLOR_PRIMARY, fontSize: 10, fill: { color: 'F8FAFC' } } },
      { text: 'Leveraged lightweight component modularity and React synthetic event batching to ensure seamless 60fps side-by-side rendering.', options: { fontSize: 10.5, color: COLOR_TEXT_DARK, fill: { color: 'F8FAFC' } } }
    ]
  ];

  slide.addTable(tableData, {
    x: 0.5, y: 1.3, w: 12.33,
    colW: [4.8, 7.53],
    border: { pt: 1, color: COLOR_CARD_BORDER },
    rowH: [0.5, 1.5, 1.5, 1.5]
  });
}

// ==========================================
// SLIDE 13: 12 Testing
// ==========================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR_BG_LIGHT };
  addHeader(slide, '12', 'Testing');
  addFooter(slide);

  slide.addText('Testing approach', {
    x: 0.5, y: 1.1, w: 12.0, h: 0.35,
    fontSize: 13, bold: true, color: COLOR_PRIMARY, fontFace: 'Arial'
  });

  slide.addText('Comprehensive testing strategy combining Spring Boot integration tests, Postman API endpoint verification, JWT filter boundary validation, and end-to-end frontend functional testing across multiple web browsers.', {
    x: 0.5, y: 1.45, w: 12.33, h: 0.7,
    fontSize: 11, color: COLOR_TEXT_DARK, fontFace: 'Arial'
  });

  const testTable = [
    [
      { text: 'Test Case', options: { bold: true, color: COLOR_WHITE, fill: { color: COLOR_PRIMARY }, fontSize: 11 } },
      { text: 'Expected Result', options: { bold: true, color: COLOR_WHITE, fill: { color: COLOR_PRIMARY }, fontSize: 11 } },
      { text: 'Actual Result', options: { bold: true, color: COLOR_WHITE, fill: { color: COLOR_PRIMARY }, fontSize: 11 } },
      { text: 'Status', options: { bold: true, color: COLOR_WHITE, fill: { color: COLOR_PRIMARY }, fontSize: 11 } }
    ],
    [
      { text: 'TC-01: JWT Authentication & Role Authorization', options: { bold: true, color: COLOR_PRIMARY, fontSize: 9.5, fill: { color: 'F8FAFC' } } },
      { text: 'Valid credentials generate signed JWT; unauthorized requests receive HTTP 401/403.', options: { fontSize: 9.5, color: COLOR_TEXT_DARK, fill: { color: 'F8FAFC' } } },
      { text: 'Tokens issued correctly; protected endpoints blocked without valid Bearer token.', options: { fontSize: 9.5, color: COLOR_TEXT_DARK, fill: { color: 'F8FAFC' } } },
      { text: 'PASSED', options: { bold: true, color: '16A34A', fontSize: 10, align: 'center', fill: { color: 'F8FAFC' } } }
    ],
    [
      { text: 'TC-02: Resume CRUD & Cascade Persistence', options: { bold: true, color: COLOR_PRIMARY, fontSize: 9.5, fill: { color: COLOR_WHITE } } },
      { text: 'Creating/updating resume persists all nested educations, experiences, and skills into MySQL.', options: { fontSize: 9.5, color: COLOR_TEXT_DARK, fill: { color: COLOR_WHITE } } },
      { text: 'All child entities saved with correct foreign keys; deletion cleans up child rows.', options: { fontSize: 9.5, color: COLOR_TEXT_DARK, fill: { color: COLOR_WHITE } } },
      { text: 'PASSED', options: { bold: true, color: '16A34A', fontSize: 10, align: 'center', fill: { color: COLOR_WHITE } } }
    ],
    [
      { text: 'TC-03: Recruiter Search & Filtering', options: { bold: true, color: COLOR_PRIMARY, fontSize: 9.5, fill: { color: 'F8FAFC' } } },
      { text: 'Recruiter query filters candidate cards by matching skills, title, and location.', options: { fontSize: 9.5, color: COLOR_TEXT_DARK, fill: { color: 'F8FAFC' } } },
      { text: 'Matching public resumes returned accurately in real-time with responsive UI cards.', options: { fontSize: 9.5, color: COLOR_TEXT_DARK, fill: { color: 'F8FAFC' } } },
      { text: 'PASSED', options: { bold: true, color: '16A34A', fontSize: 10, align: 'center', fill: { color: 'F8FAFC' } } }
    ]
  ];

  slide.addTable(testTable, {
    x: 0.5, y: 2.3, w: 12.33,
    colW: [3.2, 3.8, 3.8, 1.53],
    border: { pt: 1, color: COLOR_CARD_BORDER },
    rowH: [0.45, 1.1, 1.1, 1.1]
  });
}

// ==========================================
// SLIDE 14: 13 Future Enhancements
// ==========================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR_BG_LIGHT };
  addHeader(slide, '13', 'Future Enhancements');
  addFooter(slide);

  slide.addText('Possible improvements', {
    x: 0.5, y: 1.2, w: 12.0, h: 0.4,
    fontSize: 16, bold: true, color: COLOR_PRIMARY, fontFace: 'Arial'
  });

  const enhancements = [
    { title: 'AI Resume Assistant & ATS Score Evaluator', desc: 'Integrate OpenAI / Gemini API to automatically generate tailored executive summaries, suggest role-specific bullet points, and calculate real-time ATS match scores against target job descriptions.' },
    { title: 'Cloud Storage & CDN Profile Photos', desc: 'Connect AWS S3 / Cloudinary for scalable image upload hosting and multimedia portfolio attachments.' },
    { title: 'Direct Job Board Integrations & One-Click Apply', desc: 'Enable candidates to export directly to LinkedIn, Indeed, and corporate portals via standardized JSON resume schemas.' },
    { title: 'Real-Time Collaboration & Mentor Feedback', desc: 'Introduce WebSocket-driven live collaborative review mode for career coaches and university placement cells.' }
  ];

  enhancements.forEach((enh, idx) => {
    const yPos = 1.8 + idx * 1.25;

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: yPos, w: 12.33, h: 1.05,
      fill: { color: COLOR_CARD_BG },
      line: { color: COLOR_CARD_BORDER, width: 1 }
    });

    slide.addText(`• ${enh.title}`, {
      x: 0.8, y: yPos + 0.1, w: 11.5, h: 0.35,
      fontSize: 12.5, bold: true, color: COLOR_PRIMARY, fontFace: 'Arial'
    });

    slide.addText(enh.desc, {
      x: 1.0, y: yPos + 0.45, w: 11.3, h: 0.5,
      fontSize: 10.5, color: COLOR_TEXT_DARK, fontFace: 'Arial'
    });
  });
}

// ==========================================
// SLIDE 15: 14 Conclusion (Dark Theme)
// ==========================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLOR_PRIMARY };

  // Decorative shapes
  slide.addShape(pres.shapes.OVAL, {
    x: 10.0, y: -1.0, w: 5.0, h: 5.0,
    fill: { color: '202D62', transparency: 50 },
    line: { color: '202D62', transparency: 100 }
  });

  // Top header
  slide.addShape(pres.shapes.OVAL, {
    x: 0.5, y: 0.4, w: 0.48, h: 0.48,
    fill: { color: COLOR_WHITE },
    line: { color: COLOR_WHITE }
  });
  slide.addText('14', {
    x: 0.5, y: 0.4, w: 0.48, h: 0.48,
    fontSize: 12, bold: true, color: COLOR_PRIMARY,
    align: 'center', valign: 'middle'
  });
  slide.addText('CONCLUSION', {
    x: 1.1, y: 0.4, w: 10.0, h: 0.48,
    fontSize: 14, bold: true, color: COLOR_WHITE,
    valign: 'middle', fontFace: 'Arial'
  });

  // Summary
  slide.addText('Summary', {
    x: 0.5, y: 1.4, w: 11.5, h: 0.35,
    fontSize: 14, bold: true, color: COLOR_ACCENT, fontFace: 'Arial'
  });

  slide.addText('The Full-Stack Resume Builder successfully resolves formatting friction for job seekers while providing recruiters with an efficient candidate discovery ecosystem. Built on Spring Boot 3, MySQL, React 18, and JWT security, it offers a production-grade, highly responsive web platform.', {
    x: 0.5, y: 1.8, w: 11.5, h: 1.1,
    fontSize: 12, color: COLOR_WHITE, fontFace: 'Arial'
  });

  // Key achievements
  slide.addText('Key achievements', {
    x: 0.5, y: 3.1, w: 11.5, h: 0.35,
    fontSize: 14, bold: true, color: COLOR_ACCENT, fontFace: 'Arial'
  });

  const keyAchieve = [
    { text: 'Developed end-to-end full stack architecture with zero-latency live preview and 6 ATS templates.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Integrated stateless JWT security with role-based access for both job seekers and hiring recruiters.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } },
    { text: 'Designed robust normalized MySQL schema with cascade handling and multi-format (PDF/JSON) export.', options: { bullet: { code: '2022', color: COLOR_ACCENT } } }
  ];

  slide.addText(keyAchieve, {
    x: 0.5, y: 3.5, w: 11.5, h: 1.8,
    fontSize: 12, color: COLOR_WHITE, fontFace: 'Arial'
  });

  // Divider line
  slide.addShape(pres.shapes.LINE, {
    x: 0.5, y: 5.6, w: 11.5, h: 0,
    line: { color: '3B82F6', width: 1.5 }
  });

  // Thank you
  slide.addText('Thank you  ·  Questions welcome', {
    x: 0.5, y: 5.9, w: 11.5, h: 0.6,
    fontSize: 20, bold: true, color: COLOR_WHITE, fontFace: 'Arial'
  });
}

// Generate file
pres.writeFile({ fileName: 'Project_Review_Presentation_Resume_Builder.pptx' })
  .then(fileName => {
    console.log(`PPTX successfully created: ${fileName}`);
  })
  .catch(err => {
    console.error('Error generating PPTX:', err);
  });
