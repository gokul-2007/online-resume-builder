// Utility to generate formatted resume documents and trigger Download / Print to PDF

const TEMPLATE_STYLES = {
  6: {
    id: 6,
    name: 'Executive Timeline',
    layout: 'timeline',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    primaryColor: '#2b354f',
    secondaryColor: '#1e293b',
    accentColor: '#eaedf3',
  },
  1: {
    id: 1,
    name: 'Classic Professional',
    layout: 'classic',
    fontFamily: 'Georgia, "Times New Roman", serif',
    primaryColor: '#1e293b',
    secondaryColor: '#1e3a8a',
    accentColor: '#f1f5f9',
  },
  2: {
    id: 2,
    name: 'Modern Minimalist',
    layout: 'modern',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    primaryColor: '#0f766e',
    secondaryColor: '#0d9488',
    accentColor: '#f0fdfa',
  },
  3: {
    id: 3,
    name: 'Two-Column Sidebar',
    layout: 'sidebar',
    fontFamily: '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    primaryColor: '#0369a1',
    secondaryColor: '#0284c7',
    accentColor: '#e0f2fe',
  },
  4: {
    id: 4,
    name: 'Corporate Executive',
    layout: 'executive',
    fontFamily: '"Merriweather", Georgia, serif',
    primaryColor: '#1e293b',
    secondaryColor: '#d97706',
    accentColor: '#fffbeb',
  },
  5: {
    id: 5,
    name: 'Creative Startup',
    layout: 'creative',
    fontFamily: '"Montserrat", "Poppins", -apple-system, sans-serif',
    primaryColor: '#6d28d9',
    secondaryColor: '#4f46e5',
    accentColor: '#f5f3ff',
  },
};

const DEFAULT_STYLE = TEMPLATE_STYLES[6];

export function generateResumeHtml(resume) {
  const tId = Number(resume.templateId);
  const style = TEMPLATE_STYLES[tId] || DEFAULT_STYLE;
  const layout = style.layout || 'timeline';

  const candidateName = escapeHtml(resume.candidateName || resume.title || 'Untitled Resume');
  const headline = escapeHtml(resume.headline || '');
  const summary = escapeHtml(resume.summary || '');
  const contactEmail = escapeHtml(resume.contactEmail || '');
  const contactPhone = escapeHtml(resume.contactPhone || '');
  const location = escapeHtml(resume.location || '');
  const address = escapeHtml(resume.address || '');
  const website = escapeHtml(resume.website || '');
  const profilePhoto = resume.profilePhoto || '';
  const skills = Array.isArray(resume.skills) ? resume.skills : [];
  const experience = Array.isArray(resume.experience) ? resume.experience : [];
  const education = Array.isArray(resume.education) ? resume.education : [];
  const languages = Array.isArray(resume.languages) ? resume.languages : [];
  const references = Array.isArray(resume.references) ? resume.references : [];

  const contactItems = [];
  if (contactPhone) {
    contactItems.push(`<span>📞 ${contactPhone}</span>`);
  }
  if (contactEmail) {
    contactItems.push(`<a href="mailto:${contactEmail}">✉ ${contactEmail}</a>`);
  }
  if (location || address) {
    contactItems.push(`<span>📍 ${[address, location].filter(Boolean).join(', ')}</span>`);
  }
  if (website) {
    contactItems.push(`<a href="${website.startsWith('http') ? website : `https://${website}`}" target="_blank">🌐 ${website}</a>`);
  }

  const renderExperience = () => {
    if (experience.length === 0) return '';
    return `
      <section class="resume-section section-experience">
        <h2 class="section-title">Work Experience</h2>
        <div class="entries">
          ${experience.map((exp) => {
            const dateRange = [exp.startDate, exp.current ? 'Present' : exp.endDate].filter(Boolean).join(' – ');
            const formattedDesc = escapeHtml(exp.description || '')
              .split('\n')
              .filter((l) => l.trim().length > 0)
              .map((line) => line.startsWith('•') || line.startsWith('-') ? `<li>${line.replace(/^[•\-]\s*/, '')}</li>` : `<p>${line}</p>`)
              .join('');
            const descOutput = formattedDesc.includes('<li>') ? `<ul>${formattedDesc}</ul>` : formattedDesc;

            return `
              <div class="entry">
                <div class="entry-header">
                  <div>
                    <h3 class="entry-role">${escapeHtml(exp.jobTitle || 'Role')}</h3>
                    <div class="entry-subtitle">${escapeHtml(exp.company || '')}</div>
                  </div>
                  ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                </div>
                ${descOutput ? `<div class="entry-desc">${descOutput}</div>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </section>
    `;
  };

  const renderEducation = () => {
    if (education.length === 0) return '';
    return `
      <section class="resume-section section-education">
        <h2 class="section-title">Education</h2>
        <div class="entries">
          ${education.map((edu) => {
            const dateRange = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
            const degreeAndField = [edu.degree, edu.fieldOfStudy].filter(Boolean).join(' in ');
            return `
              <div class="entry">
                <div class="entry-header">
                  <div>
                    <h3 class="entry-role">${escapeHtml(edu.institution || 'University / Institution')}</h3>
                    ${degreeAndField ? `<div class="entry-subtitle">${escapeHtml(degreeAndField)}</div>` : ''}
                  </div>
                  ${dateRange ? `<div class="entry-date">${escapeHtml(dateRange)}</div>` : ''}
                </div>
                ${edu.gpa ? `<div class="entry-meta">GPA / Grade: <strong>${escapeHtml(edu.gpa)}</strong></div>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </section>
    `;
  };

  const renderSkills = () => {
    if (skills.length === 0) return '';
    return `
      <section class="resume-section section-skills">
        <h2 class="section-title">Skills & Expertise</h2>
        <div class="skills-grid">
          ${skills.map((s) => `<span class="skill-chip">${escapeHtml(s)}</span>`).join('')}
        </div>
      </section>
    `;
  };

  const renderSummary = () => {
    if (!summary) return '';
    return `
      <section class="resume-section section-summary">
        <h2 class="section-title">Professional Summary</h2>
        <p class="summary-text">${summary}</p>
      </section>
    `;
  };

  let bodyContent = '';
  if (layout === 'timeline') {
    const avatarSrc = profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
    bodyContent = `
      <div class="timeline-container">
        <!-- Top Navy Header Banner -->
        <header class="timeline-header-banner">
          <div class="timeline-avatar-wrapper">
            <img class="timeline-avatar-img" src="${avatarSrc}" alt="${candidateName}" />
          </div>
          <div class="timeline-header-titles">
            <h1 class="timeline-name">${candidateName}</h1>
            ${headline ? `<div class="timeline-title-tag">${headline}</div>` : ''}
          </div>
        </header>

        <!-- Split Sidebar + Main Timeline -->
        <div class="timeline-body-grid">
          <!-- Left Sidebar -->
          <aside class="timeline-left-sidebar">
            <section class="timeline-side-block">
              <h3 class="timeline-side-heading">CONTACT</h3>
              <div class="timeline-side-bar"></div>
              <div class="timeline-contact-items">
                ${contactPhone ? `
                  <div class="timeline-contact-row">
                    <svg class="timeline-icon" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    <span>${contactPhone}</span>
                  </div>` : ''}
                ${contactEmail ? `
                  <div class="timeline-contact-row">
                    <svg class="timeline-icon" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    <span>${contactEmail}</span>
                  </div>` : ''}
                ${(location || address) ? `
                  <div class="timeline-contact-row">
                    <svg class="timeline-icon" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    <span>${[address, location].filter(Boolean).join(', ')}</span>
                  </div>` : ''}
                ${website ? `
                  <div class="timeline-contact-row">
                    <svg class="timeline-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                    <span>${website}</span>
                  </div>` : ''}
              </div>
            </section>

            ${skills.length > 0 ? `
              <section class="timeline-side-block">
                <h3 class="timeline-side-heading">SKILLS</h3>
                <div class="timeline-side-bar"></div>
                <ul class="timeline-bullets">
                  ${skills.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
                </ul>
              </section>
            ` : ''}

            ${languages.length > 0 ? `
              <section class="timeline-side-block">
                <h3 class="timeline-side-heading">LANGUAGES</h3>
                <div class="timeline-side-bar"></div>
                <ul class="timeline-bullets">
                  ${languages.map(l => `<li>${escapeHtml(typeof l === 'object' ? `${l.name || l.language} (${l.proficiency || l.level || 'Fluent'})` : l)}</li>`).join('')}
                </ul>
              </section>
            ` : ''}

            ${references.length > 0 ? `
              <section class="timeline-side-block">
                <h3 class="timeline-side-heading">REFERENCE</h3>
                <div class="timeline-side-bar"></div>
                <div class="timeline-references">
                  ${references.map(r => `
                    <div class="timeline-ref-box">
                      <div class="ref-name">${escapeHtml(r.name)}</div>
                      <div class="ref-title">${escapeHtml([r.company, r.title].filter(Boolean).join(' / '))}</div>
                      ${r.phone ? `<div class="ref-row"><strong>Phone:</strong> ${escapeHtml(r.phone)}</div>` : ''}
                      ${r.email ? `<div class="ref-row"><strong>Email:</strong> ${escapeHtml(r.email)}</div>` : ''}
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}
          </aside>

          <!-- Right Main Timeline -->
          <main class="timeline-right-main">
            ${summary ? `
              <section class="timeline-main-block">
                <div class="timeline-badge-header">
                  <div class="timeline-circle-badge">
                    <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                  <h2 class="timeline-sec-title">PROFILE</h2>
                  <div class="timeline-header-line"></div>
                </div>
                <div class="timeline-axis-content profile-text-wrap">
                  <p class="timeline-summary-p">${summary}</p>
                </div>
              </section>
            ` : ''}

            ${experience.length > 0 ? `
              <section class="timeline-main-block">
                <div class="timeline-badge-header">
                  <div class="timeline-circle-badge">
                    <svg viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
                  </div>
                  <h2 class="timeline-sec-title">WORK EXPERIENCE</h2>
                  <div class="timeline-header-line"></div>
                </div>
                <div class="timeline-axis-content">
                  ${experience.map(exp => {
                    const dateRange = [exp.startDate, exp.current ? 'PRESENT' : exp.endDate].filter(Boolean).join(' - ');
                    const descLines = escapeHtml(exp.description || '').split('\n').filter(l => l.trim().length > 0);
                    return `
                      <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-item-head">
                          <span class="timeline-item-company">${escapeHtml(exp.company || 'Company')}</span>
                          ${dateRange ? `<span class="timeline-item-date">${escapeHtml(dateRange)}</span>` : ''}
                        </div>
                        ${exp.jobTitle ? `<div class="timeline-item-role">${escapeHtml(exp.jobTitle)}</div>` : ''}
                        ${descLines.length > 0 ? `
                          <ul class="timeline-item-bullets">
                            ${descLines.map(line => `<li>${line.replace(/^[•\-]\s*/, '')}</li>`).join('')}
                          </ul>
                        ` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              </section>
            ` : ''}

            ${education.length > 0 ? `
              <section class="timeline-main-block">
                <div class="timeline-badge-header">
                  <div class="timeline-circle-badge">
                    <svg viewBox="0 0 24 24"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>
                  </div>
                  <h2 class="timeline-sec-title">EDUCATION</h2>
                  <div class="timeline-header-line"></div>
                </div>
                <div class="timeline-axis-content">
                  ${education.map(edu => {
                    const dateRange = [edu.startDate, edu.endDate].filter(Boolean).join(' - ');
                    const schoolLine = [edu.fieldOfStudy, edu.institution].filter(Boolean).join(' | ');
                    return `
                      <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-item-head">
                          <span class="timeline-item-company">${escapeHtml(edu.degree || 'Degree')}</span>
                          ${dateRange ? `<span class="timeline-item-date">${escapeHtml(dateRange)}</span>` : ''}
                        </div>
                        ${schoolLine ? `<div class="timeline-item-role">${escapeHtml(schoolLine)}</div>` : ''}
                        ${edu.gpa ? `<div class="timeline-item-gpa"><strong>GPA:</strong> ${escapeHtml(edu.gpa)}</div>` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              </section>
            ` : ''}
          </main>
        </div>
      </div>
    `;
  } else if (layout === 'sidebar') {
    bodyContent = `
      <div class="sidebar-layout-container">
        <header class="sidebar-header">
          <h1 class="candidate-name">${candidateName}</h1>
          ${headline ? `<div class="candidate-headline">${headline}</div>` : ''}
        </header>
        <div class="sidebar-columns">
          <aside class="sidebar-left-col">
            <section class="resume-section">
              <h2 class="section-title">Contact</h2>
              <div class="sidebar-contact-list">
                ${contactItems.map(item => `<div class="sidebar-contact-item">${item}</div>`).join('')}
              </div>
            </section>
            ${renderSkills()}
            ${renderEducation()}
          </aside>
          <main class="sidebar-right-col">
            ${renderSummary()}
            ${renderExperience()}
          </main>
        </div>
      </div>
    `;
  } else {
    bodyContent = `
      <header class="resume-header">
        <h1 class="candidate-name">${candidateName}</h1>
        ${headline ? `<div class="candidate-headline">${headline}</div>` : ''}
        <div class="contact-bar">
          ${contactItems.join(layout === 'classic' ? ' • ' : ' · ')}
        </div>
      </header>
      ${renderSummary()}
      ${renderExperience()}
      ${renderEducation()}
      ${renderSkills()}
    `;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${candidateName} - Resume</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Georgia&family=Inter:wght@400;500;600;700;800;900&family=Merriweather:wght@400;700;900&family=Montserrat:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: ${style.primaryColor};
      --secondary: ${style.secondaryColor};
      --accent: ${style.accentColor};
      --font: ${style.fontFamily};
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: var(--font);
      color: #1e293b;
      background: #f1f5f9;
      line-height: 1.5;
      font-size: 14px;
      -webkit-font-smoothing: antialiased;
    }

    /* Screen Action Bar (hidden when printing/PDF) */
    .action-bar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: #1e2430;
      color: #ffffff;
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
      font-family: 'Inter', sans-serif;
    }
    .action-bar-title {
      font-size: 14px;
      font-weight: 600;
      color: #f8fafc;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .template-badge-pill {
      background: #334155;
      color: #93c5fd;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 12px;
      font-weight: 500;
    }
    .action-bar-buttons {
      display: flex;
      gap: 10px;
    }
    .btn-action {
      background: var(--secondary);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
      text-decoration: none;
    }
    .btn-action:hover {
      opacity: 0.92;
      transform: translateY(-1px);
    }
    .btn-secondary-action {
      background: #334155;
      color: #e2e8f0;
    }
    .btn-secondary-action:hover {
      background: #475569;
      color: white;
    }

    /* Base Document Layout */
    .resume-wrapper {
      max-width: 850px;
      margin: 28px auto 40px auto;
      background: #ffffff;
      padding: 48px 54px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      border-radius: 4px;
    }

    .resume-section {
      margin-bottom: 22px;
    }
    .summary-text {
      color: #334155;
      font-size: 13.5px;
      line-height: 1.6;
    }
    .entries {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .entry {
      page-break-inside: avoid;
    }
    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 3px;
    }
    .entry-role {
      font-size: 14.5px;
      font-weight: 700;
      color: #0f172a;
    }
    .entry-subtitle {
      font-size: 13.5px;
      font-weight: 600;
      color: var(--secondary);
    }
    .entry-date {
      font-size: 12.5px;
      font-weight: 500;
      color: #64748b;
      white-space: nowrap;
    }
    .entry-meta {
      font-size: 12px;
      color: #64748b;
      margin-top: 2px;
    }
    .entry-desc {
      font-size: 13px;
      color: #334155;
      line-height: 1.55;
      margin-top: 4px;
    }
    .entry-desc ul {
      margin-left: 18px;
      margin-top: 4px;
    }
    .entry-desc li {
      margin-bottom: 3px;
    }
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    /* =========================================================================
       TEMPLATE 6: EXECUTIVE TIMELINE (Richard Sanchez Design)
       ========================================================================= */
    .layout-timeline.resume-wrapper {
      padding: 0 !important;
      overflow: hidden;
      border-radius: 4px;
      background: #ffffff;
    }
    .timeline-container {
      width: 100%;
      background: #ffffff;
    }
    .timeline-header-banner {
      background: #2b354f;
      color: #ffffff;
      padding: 24px 36px 24px 36px;
      display: flex;
      align-items: center;
      position: relative;
    }
    .timeline-avatar-wrapper {
      width: 145px;
      height: 145px;
      position: absolute;
      left: 36px;
      top: 15px;
      z-index: 10;
      border-radius: 50%;
      border: 5px solid #ffffff;
      box-shadow: 0 4px 14px rgba(0,0,0,0.18);
      background: #eaedf3;
      overflow: hidden;
      flex-shrink: 0;
    }
    .timeline-avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .timeline-header-titles {
      margin-left: 175px;
      padding-left: 15px;
      flex: 1;
    }
    .timeline-name {
      font-size: 32px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      line-height: 1.1;
      margin: 0;
      font-family: 'Inter', sans-serif;
    }
    .timeline-title-tag {
      font-size: 14px;
      font-weight: 600;
      color: #cbd5e1;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      margin-top: 6px;
    }

    .timeline-body-grid {
      display: grid;
      grid-template-columns: 32% 68%;
      min-height: 700px;
    }
    .timeline-left-sidebar {
      background: #e8ecf1;
      padding: 60px 24px 32px 32px;
      border-right: 1px solid #dce2e8;
    }
    .timeline-side-block {
      margin-bottom: 26px;
    }
    .timeline-side-heading {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #2b354f;
      margin: 0 0 4px 0;
    }
    .timeline-side-bar {
      height: 2px;
      background: #2b354f;
      width: 100%;
      margin-bottom: 12px;
    }
    .timeline-contact-items {
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 12.5px;
      color: #334155;
    }
    .timeline-contact-row {
      display: flex;
      align-items: center;
      gap: 9px;
      word-break: break-word;
    }
    .timeline-icon {
      width: 15px;
      height: 15px;
      fill: #2b354f;
      flex-shrink: 0;
    }
    .timeline-bullets {
      list-style-type: disc;
      padding-left: 18px;
      margin: 0;
      font-size: 12.5px;
      color: #334155;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .timeline-bullets li {
      padding-left: 2px;
    }
    .timeline-references {
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-size: 12.5px;
    }
    .timeline-ref-box .ref-name {
      font-weight: 700;
      color: #1e293b;
      font-size: 13px;
    }
    .timeline-ref-box .ref-title {
      color: #475569;
      font-size: 12px;
      margin-bottom: 2px;
    }
    .timeline-ref-box .ref-row {
      color: #475569;
      font-size: 11.5px;
      margin-top: 1px;
    }

    .timeline-right-main {
      padding: 30px 36px 36px 28px;
      background: #ffffff;
    }
    .timeline-main-block {
      margin-bottom: 28px;
    }
    .timeline-badge-header {
      display: flex;
      align-items: center;
      gap: 12px;
      position: relative;
    }
    .timeline-circle-badge {
      width: 32px;
      height: 32px;
      background: #2b354f;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      z-index: 2;
    }
    .timeline-circle-badge svg {
      width: 17px;
      height: 17px;
      fill: #ffffff;
    }
    .timeline-sec-title {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #2b354f;
      margin: 0;
      white-space: nowrap;
    }
    .timeline-header-line {
      flex: 1;
      height: 1.5px;
      background: #8c9ba5;
      margin-left: 8px;
    }
    .timeline-axis-content {
      margin-left: 15px;
      padding-left: 24px;
      border-left: 2px solid #8c9ba5;
      padding-top: 12px;
      padding-bottom: 6px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .timeline-axis-content.profile-text-wrap {
      padding-bottom: 12px;
    }
    .timeline-summary-p {
      font-size: 12.5px;
      line-height: 1.6;
      color: #334155;
    }
    .timeline-item {
      position: relative;
    }
    .timeline-dot {
      position: absolute;
      left: -30px;
      top: 4px;
      width: 10px;
      height: 10px;
      background: #ffffff;
      border: 2px solid #8c9ba5;
      border-radius: 50%;
    }
    .timeline-item-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .timeline-item-company {
      font-size: 14px;
      font-weight: 700;
      color: #1e293b;
    }
    .timeline-item-date {
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
      letter-spacing: 0.04em;
    }
    .timeline-item-role {
      font-size: 12.5px;
      color: #475569;
      font-weight: 500;
      margin: 2px 0 5px 0;
    }
    .timeline-item-gpa {
      font-size: 12px;
      color: #475569;
      margin-top: 2px;
    }
    .timeline-item-bullets {
      list-style-type: disc;
      padding-left: 16px;
      margin: 4px 0 0 0;
      font-size: 12px;
      color: #334155;
      line-height: 1.5;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    /* =========================================================================
       TEMPLATE 1: CLASSIC PROFESSIONAL (Georgia, Traditional Centered Layout)
       ========================================================================= */
    .layout-classic {
      font-family: Georgia, 'Times New Roman', serif;
    }
    .layout-classic .resume-header {
      text-align: center;
      border-top: 2.5px solid #1e293b;
      border-bottom: 2.5px solid #1e293b;
      padding: 16px 0;
      margin-bottom: 24px;
    }
    .layout-classic .candidate-name {
      font-size: 28px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #1e293b;
      margin-bottom: 4px;
    }
    .layout-classic .candidate-headline {
      font-size: 15px;
      font-style: italic;
      color: #475569;
      margin-bottom: 8px;
    }
    .layout-classic .contact-bar {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 12.5px;
      color: #475569;
    }
    .layout-classic .contact-bar a {
      color: #475569;
      text-decoration: none;
    }
    .layout-classic .section-title {
      text-align: center;
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #1e293b;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 4px;
      margin-bottom: 14px;
    }
    .layout-classic .skill-chip {
      background: #f8fafc;
      color: #1e293b;
      border: 1px solid #cbd5e1;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 2px;
    }

    /* =========================================================================
       TEMPLATE 2: MODERN MINIMALIST (Inter, Left-Aligned with Accent Bars)
       ========================================================================= */
    .layout-modern {
      font-family: 'Inter', -apple-system, sans-serif;
    }
    .layout-modern .resume-header {
      border-left: 4px solid #0d9488;
      padding-left: 16px;
      margin-bottom: 26px;
    }
    .layout-modern .candidate-name {
      font-size: 30px;
      font-weight: 800;
      color: #0f766e;
      letter-spacing: -0.03em;
      line-height: 1.15;
    }
    .layout-modern .candidate-headline {
      font-size: 15px;
      font-weight: 600;
      color: #0d9488;
      margin: 4px 0 10px 0;
    }
    .layout-modern .contact-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      font-size: 12.5px;
      color: #64748b;
    }
    .layout-modern .contact-bar a {
      color: #64748b;
      text-decoration: none;
    }
    .layout-modern .section-title {
      font-size: 13.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #0f766e;
      border-bottom: 2px solid #ccfbf1;
      padding-bottom: 4px;
      margin-bottom: 14px;
    }
    .layout-modern .skill-chip {
      background: #f0fdfa;
      color: #0f766e;
      border: 1px solid #99f6e4;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 20px;
    }

    /* =========================================================================
       TEMPLATE 3: TWO-COLUMN SIDEBAR (Roboto, Clean Structured Split Layout)
       ========================================================================= */
    .layout-sidebar {
      font-family: 'Roboto', -apple-system, sans-serif;
    }
    .layout-sidebar.resume-wrapper {
      padding: 0;
      overflow: hidden;
      border-radius: 6px;
    }
    .layout-sidebar .sidebar-header {
      background: linear-gradient(135deg, #0369a1 0%, #0284c7 100%);
      color: white;
      padding: 32px 38px;
    }
    .layout-sidebar .sidebar-header .candidate-name {
      font-size: 30px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.01em;
    }
    .layout-sidebar .sidebar-header .candidate-headline {
      font-size: 16px;
      font-weight: 500;
      color: #bae6fd;
      margin-top: 4px;
    }
    .layout-sidebar .sidebar-columns {
      display: grid;
      grid-template-columns: 34% 66%;
    }
    .layout-sidebar .sidebar-left-col {
      background: #f8fafc;
      padding: 26px 22px;
      border-right: 1px solid #e2e8f0;
    }
    .layout-sidebar .sidebar-right-col {
      padding: 26px 30px;
    }
    .layout-sidebar .sidebar-contact-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 12.5px;
      color: #475569;
    }
    .layout-sidebar .sidebar-contact-item a {
      color: #475569;
      text-decoration: none;
    }
    .layout-sidebar .section-title {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: #0369a1;
      border-bottom: 2px solid #e0f2fe;
      padding-bottom: 4px;
      margin-bottom: 12px;
    }
    .layout-sidebar .skill-chip {
      background: #e0f2fe;
      color: #0369a1;
      font-size: 11.5px;
      font-weight: 600;
      padding: 4px 9px;
      border-radius: 4px;
    }

    /* =========================================================================
       TEMPLATE 4: CORPORATE EXECUTIVE (Merriweather, Dark Header & Gold Accents)
       ========================================================================= */
    .layout-executive {
      font-family: 'Inter', sans-serif;
    }
    .layout-executive.resume-wrapper {
      padding: 0;
      overflow: hidden;
    }
    .layout-executive .resume-header {
      background: #1e293b;
      color: #ffffff;
      padding: 34px 40px 26px 40px;
      border-bottom: 4px solid #d97706;
    }
    .layout-executive .candidate-name {
      font-family: 'Merriweather', Georgia, serif;
      font-size: 28px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 0.02em;
    }
    .layout-executive .candidate-headline {
      font-size: 15px;
      font-weight: 600;
      color: #f59e0b;
      margin: 4px 0 12px 0;
    }
    .layout-executive .contact-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      font-size: 12.5px;
      color: #cbd5e1;
    }
    .layout-executive .contact-bar a {
      color: #cbd5e1;
      text-decoration: none;
    }
    .layout-executive-content {
      padding: 32px 40px;
    }
    .layout-executive .section-title {
      font-family: 'Merriweather', Georgia, serif;
      font-size: 13.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #1e293b;
      border-left: 3.5px solid #d97706;
      padding-left: 10px;
      margin-bottom: 14px;
    }
    .layout-executive .skill-chip {
      background: #fffbeb;
      color: #92400e;
      border: 1px solid #fde68a;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 4px;
    }

    /* =========================================================================
       TEMPLATE 5: CREATIVE STARTUP (Montserrat / Poppins, Indigo Gradient Cards)
       ========================================================================= */
    .layout-creative {
      font-family: 'Poppins', 'Montserrat', sans-serif;
    }
    .layout-creative.resume-wrapper {
      padding: 36px 40px;
    }
    .layout-creative .resume-header {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      color: white;
      padding: 26px 30px;
      border-radius: 12px;
      margin-bottom: 24px;
    }
    .layout-creative .candidate-name {
      font-family: 'Montserrat', sans-serif;
      font-size: 28px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.02em;
    }
    .layout-creative .candidate-headline {
      font-size: 15px;
      font-weight: 500;
      color: #e0e7ff;
      margin: 4px 0 10px 0;
    }
    .layout-creative .contact-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      font-size: 12.5px;
      color: #ede9fe;
    }
    .layout-creative .contact-bar a {
      color: #ede9fe;
      text-decoration: none;
    }
    .layout-creative .section-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #6d28d9;
      border-bottom: 2px dashed #ddd6fe;
      padding-bottom: 5px;
      margin-bottom: 14px;
    }
    .layout-creative .entry {
      background: #faf5ff;
      border: 1px solid #f3e8ff;
      padding: 14px 16px;
      border-radius: 8px;
    }
    .layout-creative .skill-chip {
      background: #ede9fe;
      color: #5b21b6;
      font-size: 12px;
      font-weight: 600;
      padding: 5px 12px;
      border-radius: 16px;
    }

    /* Print / PDF Generation Rules */
    @media print {
      body {
        background: #ffffff !important;
        font-size: 12px;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .action-bar {
        display: none !important;
      }
      .resume-wrapper {
        box-shadow: none !important;
        margin: 0 !important;
        padding: 0 !important;
        max-width: 100% !important;
        width: 100% !important;
        border-radius: 0 !important;
      }
      .layout-creative.resume-wrapper {
        padding: 0 !important;
      }
      .layout-executive-content {
        padding: 24px 0 !important;
      }
      a {
        text-decoration: none !important;
        color: inherit !important;
      }
      @page {
        margin: 10mm 12mm;
        size: auto;
      }
    }
  </style>
</head>
<body>
  <div class="action-bar no-print">
    <div class="action-bar-title">
      📄 ${candidateName} — Resume Preview
      <span class="template-badge-pill">Template: ${style.name}</span>
    </div>
    <div class="action-bar-buttons">
      <button class="btn-action" onclick="window.print()">
        🖨️ Print / Save as PDF
      </button>
      <button class="btn-action btn-secondary-action" onclick="downloadAsHtml()">
        ⬇️ Download HTML
      </button>
      <button class="btn-action btn-secondary-action" onclick="downloadAsText()">
        📝 Download Text
      </button>
      <button class="btn-action btn-secondary-action" onclick="window.close()">
        ✕ Close
      </button>
    </div>
  </div>

  <div class="resume-wrapper layout-${layout}" id="resume-content">
    ${layout === 'executive' ? `
      <header class="resume-header">
        <h1 class="candidate-name">${candidateName}</h1>
        ${headline ? `<div class="candidate-headline">${headline}</div>` : ''}
        <div class="contact-bar">
          ${contactItems.join(' · ')}
        </div>
      </header>
      <div class="layout-executive-content">
        ${renderSummary()}
        ${renderExperience()}
        ${renderEducation()}
        ${renderSkills()}
      </div>
    ` : bodyContent}
  </div>

  <script>
    function downloadAsHtml() {
      const clone = document.documentElement.cloneNode(true);
      const bar = clone.querySelector('.action-bar');
      if (bar) bar.remove();
      const scripts = clone.querySelectorAll('script');
      scripts.forEach(s => s.remove());
      const blob = new Blob([clone.outerHTML], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = '${candidateName.replace(/[^a-zA-Z0-9_-]/g, '_')}_Resume.html';
      a.click();
    }

    function downloadAsText() {
      const text = document.getElementById('resume-content').innerText;
      const blob = new Blob([text], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = '${candidateName.replace(/[^a-zA-Z0-9_-]/g, '_')}_Resume.txt';
      a.click();
    }
  </script>
</body>
</html>`;
}

export function generateResumePlainText(resume) {
  const lines = [];
  const name = resume.candidateName || resume.title || 'Untitled Resume';
  lines.push(name.toUpperCase());
  lines.push('='.repeat(name.length));
  if (resume.headline) lines.push(resume.headline);
  lines.push('');

  const contact = [];
  if (resume.contactEmail) contact.push(`Email: ${resume.contactEmail}`);
  if (resume.contactPhone) contact.push(`Phone: ${resume.contactPhone}`);
  if (resume.location) contact.push(`Location: ${resume.location}`);
  if (resume.address) contact.push(`Address: ${resume.address}`);
  if (contact.length) {
    lines.push(contact.join(' | '));
    lines.push('');
  }

  if (resume.summary) {
    lines.push('PROFESSIONAL SUMMARY');
    lines.push('--------------------');
    lines.push(resume.summary);
    lines.push('');
  }

  if (Array.isArray(resume.experience) && resume.experience.length > 0) {
    lines.push('EXPERIENCE');
    lines.push('----------');
    resume.experience.forEach((exp) => {
      const dates = [exp.startDate, exp.current ? 'Present' : exp.endDate].filter(Boolean).join(' - ');
      lines.push(`${exp.jobTitle || 'Role'} | ${exp.company || ''} ${dates ? `(${dates})` : ''}`);
      if (exp.description) {
        lines.push(exp.description);
      }
      lines.push('');
    });
  }

  if (Array.isArray(resume.education) && resume.education.length > 0) {
    lines.push('EDUCATION');
    lines.push('---------');
    resume.education.forEach((edu) => {
      const dates = [edu.startDate, edu.endDate].filter(Boolean).join(' - ');
      const degree = [edu.degree, edu.fieldOfStudy].filter(Boolean).join(' in ');
      lines.push(`${edu.institution || 'Institution'} ${dates ? `(${dates})` : ''}`);
      if (degree) lines.push(`Degree: ${degree}`);
      if (edu.gpa) lines.push(`GPA: ${edu.gpa}`);
      lines.push('');
    });
  }

  if (Array.isArray(resume.skills) && resume.skills.length > 0) {
    lines.push('SKILLS');
    lines.push('------');
    lines.push(resume.skills.join(', '));
    lines.push('');
  }

  return lines.join('\n');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Opens a print/download window and triggers print dialog
 */
export function downloadResume(resume, autoPrint = true) {
  if (!resume) return;

  const html = generateResumeHtml(resume);
  const printWindow = window.open('', '_blank');

  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();

    if (autoPrint) {
      // Give styles & Google fonts time to render before triggering print
      printWindow.onload = () => {
        setTimeout(() => {
          try {
            printWindow.focus();
            printWindow.print();
          } catch (e) {
            console.error('Print trigger error', e);
          }
        }, 350);
      };
    }
  } else {
    // Popup was blocked: fallback to direct HTML file download
    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const filename = (resume.candidateName || resume.title || 'resume').replace(/[^a-z0-9]/gi, '_').toLowerCase() + '_resume.html';
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }
}
