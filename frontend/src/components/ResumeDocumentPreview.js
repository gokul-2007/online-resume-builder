import React from 'react';

export default function ResumeDocumentPreview({ resume, template }) {
  const layout = template?.layoutStyle || (resume.templateId === 6 ? 'timeline' : (resume.templateId ? 'sidebar' : 'timeline'));

  const candidateName = resume.candidateName || resume.title || 'RICHARD SANCHEZ';
  const headline = resume.headline || 'MARKETING MANAGER';
  const summary = resume.summary || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  const contactEmail = resume.contactEmail || 'hello@reallygreatsite.com';
  const contactPhone = resume.contactPhone || '+123-456-7890';
  const location = resume.location || 'Any City';
  const address = resume.address || '123 Anywhere St.';
  const website = resume.website || 'www.reallygreatsite.com';
  const avatarSrc = resume.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';

  const skills = Array.isArray(resume.skills) && resume.skills.length > 0
    ? resume.skills
    : ['Project Management', 'Public Relations', 'Teamwork', 'Time Management', 'Leadership', 'Effective Communication', 'Critical Thinking', 'Digital Marketing'];

  const languages = Array.isArray(resume.languages) && resume.languages.length > 0
    ? resume.languages
    : ['English (Fluent)', 'French (Fluent)', 'German (Basic)', 'Spanish (Intermediate)'];

  const references = Array.isArray(resume.references) && resume.references.length > 0
    ? resume.references
    : [{
        name: 'Estelle Darcy',
        company: 'Wardiere Inc.',
        title: 'CTO',
        phone: '123-456-7890',
        email: 'hello@reallygreatsite.com',
      }];

  const experience = Array.isArray(resume.experience) && resume.experience.length > 0
    ? resume.experience
    : [
        {
          company: 'Borcelle Studio',
          jobTitle: 'Marketing Manager & Specialist',
          startDate: '2030',
          endDate: 'PRESENT',
          current: true,
          description: '• Develop and execute comprehensive marketing strategies and campaigns that align with the company\'s goals and objectives.\n• Lead, mentor, and manage a high-performing marketing team, fostering a collaborative and results-driven work environment.\n• Monitor brand consistency across marketing channels and materials.',
        },
        {
          company: 'Fauget Studio',
          jobTitle: 'Marketing Manager & Specialist',
          startDate: '2025',
          endDate: '2029',
          description: '• Create and manage the marketing budget, ensuring efficient allocation of resources and optimizing ROI.\n• Oversee market research to identify emerging trends, customer needs, and competitor strategies.',
        },
        {
          company: 'Studio Shodwe',
          jobTitle: 'Marketing Manager & Specialist',
          startDate: '2024',
          endDate: '2025',
          description: '• Develop and maintain strong relationships with partners, agencies, and vendors to support marketing initiatives.\n• Monitor and maintain brand consistency across all marketing channels and materials.',
        },
      ];

  const education = Array.isArray(resume.education) && resume.education.length > 0
    ? resume.education
    : [
        {
          degree: 'Master of Business Management',
          institution: 'Wardiere University',
          fieldOfStudy: 'School of business',
          startDate: '2029',
          endDate: '2031',
          gpa: '3.8 / 4.0',
        },
        {
          degree: 'Bachelor of Business Management',
          institution: 'Wardiere University',
          fieldOfStudy: 'School of business',
          startDate: '2025',
          endDate: '2029',
          gpa: '3.8 / 4.0',
        },
      ];

  // Helper for bullet lines in description
  const renderDescLines = (desc) => {
    if (!desc) return null;
    const lines = desc.split('\n').filter((l) => l.trim().length > 0);
    return (
      <ul className="live-preview-bullets">
        {lines.map((line, idx) => (
          <li key={idx}>{line.replace(/^[•\-]\s*/, '')}</li>
        ))}
      </ul>
    );
  };

  if (layout === 'timeline') {
    return (
      <div className="live-resume-sheet live-layout-timeline" style={{ fontFamily: template?.fontFamily || 'Inter, sans-serif' }}>
        {/* Top Dark Navy Header */}
        <div className="live-timeline-header">
          <div className="live-timeline-avatar-container">
            <img src={avatarSrc} alt={candidateName} className="live-timeline-avatar" />
          </div>
          <div className="live-timeline-header-text">
            <h1 className="live-timeline-name">{candidateName}</h1>
            {headline && <div className="live-timeline-headline">{headline}</div>}
          </div>
        </div>

        {/* Split Body */}
        <div className="live-timeline-body">
          {/* Left Sidebar */}
          <div className="live-timeline-sidebar">
            {/* Contact */}
            <div className="live-timeline-side-section">
              <h3 className="live-timeline-side-title">CONTACT</h3>
              <div className="live-timeline-side-divider"></div>
              <div className="live-timeline-contact-list">
                {contactPhone && (
                  <div className="live-timeline-contact-item">
                    <span className="live-icon">📞</span>
                    <span>{contactPhone}</span>
                  </div>
                )}
                {contactEmail && (
                  <div className="live-timeline-contact-item">
                    <span className="live-icon">✉</span>
                    <span>{contactEmail}</span>
                  </div>
                )}
                {(location || address) && (
                  <div className="live-timeline-contact-item">
                    <span className="live-icon">📍</span>
                    <span>{[address, location].filter(Boolean).join(', ')}</span>
                  </div>
                )}
                {website && (
                  <div className="live-timeline-contact-item">
                    <span className="live-icon">🌐</span>
                    <span>{website}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div className="live-timeline-side-section">
                <h3 className="live-timeline-side-title">SKILLS</h3>
                <div className="live-timeline-side-divider"></div>
                <ul className="live-timeline-side-bullets">
                  {skills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div className="live-timeline-side-section">
                <h3 className="live-timeline-side-title">LANGUAGES</h3>
                <div className="live-timeline-side-divider"></div>
                <ul className="live-timeline-side-bullets">
                  {languages.map((l, i) => (
                    <li key={i}>{typeof l === 'object' ? `${l.name || l.language} (${l.proficiency || l.level || 'Fluent'})` : l}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* References */}
            {references.length > 0 && (
              <div className="live-timeline-side-section">
                <h3 className="live-timeline-side-title">REFERENCE</h3>
                <div className="live-timeline-side-divider"></div>
                <div className="live-timeline-references">
                  {references.map((r, i) => (
                    <div key={i} className="live-timeline-ref-card">
                      <div className="ref-person-name">{r.name}</div>
                      <div className="ref-person-title">{[r.company, r.title].filter(Boolean).join(' / ')}</div>
                      {r.phone && <div className="ref-person-meta"><strong>Phone:</strong> {r.phone}</div>}
                      {r.email && <div className="ref-person-meta"><strong>Email:</strong> {r.email}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Main Timeline */}
          <div className="live-timeline-main">
            {/* Profile */}
            {summary && (
              <div className="live-timeline-main-section">
                <div className="live-timeline-badge-row">
                  <div className="live-timeline-badge-circle">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                  <h2 className="live-timeline-sec-title">PROFILE</h2>
                  <div className="live-timeline-header-line"></div>
                </div>
                <div className="live-timeline-axis-content profile-axis">
                  <p className="live-timeline-summary-text">{summary}</p>
                </div>
              </div>
            )}

            {/* Work Experience */}
            {experience.length > 0 && (
              <div className="live-timeline-main-section">
                <div className="live-timeline-badge-row">
                  <div className="live-timeline-badge-circle">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
                  </div>
                  <h2 className="live-timeline-sec-title">WORK EXPERIENCE</h2>
                  <div className="live-timeline-header-line"></div>
                </div>
                <div className="live-timeline-axis-content">
                  {experience.map((exp, i) => {
                    const dateRange = [exp.startDate, exp.current ? 'PRESENT' : exp.endDate].filter(Boolean).join(' - ');
                    return (
                      <div className="live-timeline-entry" key={i}>
                        <div className="live-timeline-node"></div>
                        <div className="live-timeline-entry-header">
                          <span className="live-entry-company">{exp.company || 'Company Name'}</span>
                          {dateRange && <span className="live-entry-date">{dateRange}</span>}
                        </div>
                        {exp.jobTitle && <div className="live-entry-role">{exp.jobTitle}</div>}
                        {renderDescLines(exp.description)}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div className="live-timeline-main-section">
                <div className="live-timeline-badge-row">
                  <div className="live-timeline-badge-circle">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>
                  </div>
                  <h2 className="live-timeline-sec-title">EDUCATION</h2>
                  <div className="live-timeline-header-line"></div>
                </div>
                <div className="live-timeline-axis-content">
                  {education.map((edu, i) => {
                    const dateRange = [edu.startDate, edu.endDate].filter(Boolean).join(' - ');
                    const schoolLine = [edu.fieldOfStudy, edu.institution].filter(Boolean).join(' | ');
                    return (
                      <div className="live-timeline-entry" key={i}>
                        <div className="live-timeline-node"></div>
                        <div className="live-timeline-entry-header">
                          <span className="live-entry-company">{edu.degree || 'Degree / Qualification'}</span>
                          {dateRange && <span className="live-entry-date">{dateRange}</span>}
                        </div>
                        {schoolLine && <div className="live-entry-role">{schoolLine}</div>}
                        {edu.gpa && <div className="live-entry-gpa"><strong>GPA:</strong> {edu.gpa}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (layout === 'sidebar') {
    return (
      <div className="live-resume-sheet live-layout-sidebar" style={{ fontFamily: template?.fontFamily || 'Roboto, sans-serif' }}>
        <div className="live-sidebar-header">
          <h1 className="live-sidebar-name">{candidateName}</h1>
          {headline && <div className="live-sidebar-headline">{headline}</div>}
        </div>
        <div className="live-sidebar-split">
          <div className="live-sidebar-left">
            <div className="live-side-sec">
              <h4>Contact</h4>
              <div className="live-contact-col">
                {contactPhone && <div>📞 {contactPhone}</div>}
                {contactEmail && <div>✉ {contactEmail}</div>}
                {(location || address) && <div>📍 {[address, location].filter(Boolean).join(', ')}</div>}
                {website && <div>🌐 {website}</div>}
              </div>
            </div>
            {skills.length > 0 && (
              <div className="live-side-sec">
                <h4>Skills</h4>
                <div className="live-chips-wrap">
                  {skills.map((s, i) => <span key={i} className="live-chip-blue">{s}</span>)}
                </div>
              </div>
            )}
            {education.length > 0 && (
              <div className="live-side-sec">
                <h4>Education</h4>
                {education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: '8px', fontSize: '11px' }}>
                    <strong>{edu.degree}</strong>
                    <div style={{ color: '#0369a1' }}>{edu.institution}</div>
                    <div style={{ color: '#64748b' }}>{[edu.startDate, edu.endDate].filter(Boolean).join(' - ')}</div>
                    {edu.gpa && <div>GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="live-sidebar-right">
            {summary && (
              <div className="live-main-sec">
                <h4>Summary</h4>
                <p>{summary}</p>
              </div>
            )}
            {experience.length > 0 && (
              <div className="live-main-sec">
                <h4>Experience</h4>
                {experience.map((exp, i) => (
                  <div key={i} className="live-exp-row">
                    <div className="live-exp-title-row">
                      <span className="live-exp-role">{exp.jobTitle}</span>
                      <span className="live-exp-dates">{[exp.startDate, exp.current ? 'Present' : exp.endDate].filter(Boolean).join(' - ')}</span>
                    </div>
                    <div className="live-exp-comp">{exp.company}</div>
                    {renderDescLines(exp.description)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Classic or Modern layout
  return (
    <div className={`live-resume-sheet live-layout-${layout}`} style={{ fontFamily: template?.fontFamily || (layout === 'classic' ? 'Georgia, serif' : 'Inter, sans-serif') }}>
      <div className={`live-standard-header ${layout === 'classic' ? 'classic-head' : 'modern-head'}`}>
        <h1 className="live-standard-name">{candidateName}</h1>
        {headline && <div className="live-standard-headline">{headline}</div>}
        <div className="live-standard-contact">
          {[contactPhone, contactEmail, [address, location].filter(Boolean).join(', '), website].filter(Boolean).join('  ·  ')}
        </div>
      </div>

      <div className="live-standard-body">
        {summary && (
          <div className="live-standard-sec">
            <h3 className="live-standard-sec-title">Professional Summary</h3>
            <p className="live-standard-text">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="live-standard-sec">
            <h3 className="live-standard-sec-title">Work Experience</h3>
            {experience.map((exp, i) => (
              <div key={i} className="live-standard-entry">
                <div className="live-standard-entry-head">
                  <span className="live-entry-bold">{exp.jobTitle || 'Role'} — <span className="live-entry-comp-name">{exp.company}</span></span>
                  <span className="live-entry-muted">{[exp.startDate, exp.current ? 'Present' : exp.endDate].filter(Boolean).join(' - ')}</span>
                </div>
                {renderDescLines(exp.description)}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div className="live-standard-sec">
            <h3 className="live-standard-sec-title">Education</h3>
            {education.map((edu, i) => (
              <div key={i} className="live-standard-entry">
                <div className="live-standard-entry-head">
                  <span className="live-entry-bold">{edu.degree} — <span className="live-entry-comp-name">{edu.institution}</span></span>
                  <span className="live-entry-muted">{[edu.startDate, edu.endDate].filter(Boolean).join(' - ')}</span>
                </div>
                {edu.fieldOfStudy && <div className="live-entry-sub">{edu.fieldOfStudy}</div>}
                {edu.gpa && <div className="live-entry-meta">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div className="live-standard-sec">
            <h3 className="live-standard-sec-title">Skills & Expertise</h3>
            <div className="live-chips-wrap">
              {skills.map((s, i) => (
                <span key={i} className="live-preview-chip">{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
