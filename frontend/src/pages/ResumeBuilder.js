import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { resumeApi, templateApi } from '../services/api';
import { downloadResume } from '../utils/downloadResume';
import { useToast } from '../components/Toast';
import ResumeDocumentPreview from '../components/ResumeDocumentPreview';

const emptyResume = {
  title: '',
  candidateName: '',
  headline: '',
  summary: '',
  contactEmail: '',
  contactPhone: '',
  address: '',
  location: '',
  website: '',
  profilePhoto: '',
  skills: [],
  languages: [],
  references: [],
  education: [],
  experience: [],
  visibleToRecruiters: false,
  templateId: 6,
};

const sampleRichardSanchezResume = {
  title: 'Richard Sanchez - Marketing Manager',
  candidateName: 'RICHARD SANCHEZ',
  headline: 'MARKETING MANAGER',
  profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  summary: 'Results-driven Marketing Manager with 7+ years of experience leading teams, scaling brand awareness, and increasing company revenue through strategic campaigns and digital media marketing.',
  contactPhone: '+123-456-7890',
  contactEmail: 'hello@reallygreatsite.com',
  location: 'San Francisco, CA',
  address: '123 Anywhere St.',
  website: 'www.reallygreatsite.com',
  skills: [
    'Project Management',
    'Public Relations',
    'Teamwork',
    'Time Management',
    'Leadership',
    'Effective Communication',
    'Critical Thinking',
    'Digital Marketing'
  ],
  languages: [
    'English (Fluent)',
    'French (Fluent)',
    'German (Basic)',
    'Spanish (Intermediate)'
  ],
  references: [
    {
      name: 'Estelle Darcy',
      company: 'Wardiere Inc.',
      title: 'CTO',
      phone: '123-456-7890',
      email: 'hello@reallygreatsite.com'
    }
  ],
  experience: [
    {
      company: 'Borcelle Studio',
      jobTitle: 'Marketing Manager & Specialist',
      startDate: '2023',
      endDate: 'PRESENT',
      current: true,
      description: '• Developed and executed comprehensive marketing strategies aligned with company growth.\n• Led, mentored, and managed a team of marketing specialists.\n• Monitored brand consistency across all marketing channels and materials.',
      displayOrder: 0
    },
    {
      company: 'Fauget Studio',
      jobTitle: 'Senior Marketing Specialist',
      startDate: '2020',
      endDate: '2023',
      current: false,
      description: '• Managed marketing budgets and allocated resources to optimize ROI.\n• Conducted market research to identify trends and competitor strategies.',
      displayOrder: 1
    },
    {
      company: 'Studio Shodwe',
      jobTitle: 'Marketing Coordinator',
      startDate: '2018',
      endDate: '2020',
      current: false,
      description: '• Maintained relationships with media agencies, partners, and vendors.\n• Supported product marketing releases and tracked campaign metrics.',
      displayOrder: 2
    }
  ],
  education: [
    {
      institution: 'Wardiere University',
      degree: 'Master of Business Administration (MBA)',
      fieldOfStudy: 'School of Business',
      startDate: '2016',
      endDate: '2018',
      gpa: '3.8 / 4.0',
      displayOrder: 0
    },
    {
      institution: 'Wardiere University',
      degree: 'Bachelor of Business Management',
      fieldOfStudy: 'Department of Management',
      startDate: '2012',
      endDate: '2016',
      gpa: '3.8 / 4.0',
      displayOrder: 1
    }
  ],
  visibleToRecruiters: true,
  templateId: 6
};

const SUGGESTED_VERBS = [
  'Spearheaded', 'Implemented', 'Architected', 'Optimized', 'Managed', 'Developed', 'Led', 'Designed', 'Streamlined', 'Created'
];

export default function ResumeBuilder() {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { addToast } = useToast();
  const fileInputRef = useRef(null);

  const [resume, setResume] = useState(emptyResume);
  const [skillInput, setSkillInput] = useState('');
  const [langInput, setLangInput] = useState('');
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'editor' | 'preview'
  const [zoomLevel, setZoomLevel] = useState(100);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    templateApi.getAll().then((res) => setTemplates(res.data || []));
  }, []);

  useEffect(() => {
    if (!isNew) {
      resumeApi.getById(id)
        .then((res) => {
          const loadedData = res.data || {};
          setResume({
            ...emptyResume,
            ...loadedData,
            templateId: loadedData.templateId ? Number(loadedData.templateId) : 6,
          });
        })
        .catch(() => setError('Could not load resume.'));
    } else {
      const templateParam = searchParams.get('template');
      const templateId = templateParam ? Number(templateParam) : 6;
      setResume({
        ...emptyResume,
        candidateName: user?.fullName || '',
        contactEmail: user?.email || '',
        templateId,
      });
    }
  }, [id, isNew, user, searchParams]);

  const selectedTemplate = templates.find((t) => Number(t.id) === Number(resume.templateId)) || templates.find((t) => Number(t.id) === 6) || templates[0];

  const update = (field, value) => {
    setResume((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (error) setError('');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        update('profilePhoto', reader.result);
        addToast('Photo uploaded', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const loadSampleData = () => {
    setResume({
      ...sampleRichardSanchezResume,
      id: resume.id,
      templateId: resume.templateId || 6,
    });
    setErrors({});
    setError('');
    addToast('Sample data filled', 'info');
  };

  const addSkill = () => {
    if (skillInput.trim() && !resume.skills?.includes(skillInput.trim())) {
      update('skills', [...(resume.skills || []), skillInput.trim()]);
    }
    setSkillInput('');
  };

  const removeSkill = (skill) => update('skills', (resume.skills || []).filter((s) => s !== skill));

  const addLanguage = () => {
    if (langInput.trim() && !resume.languages?.includes(langInput.trim())) {
      update('languages', [...(resume.languages || []), langInput.trim()]);
    }
    setLangInput('');
  };

  const removeLanguage = (lang) => update('languages', (resume.languages || []).filter((l) => l !== lang));

  const addReference = () => update('references', [...(resume.references || []), {
    name: '', company: '', title: '', phone: '', email: ''
  }]);

  const updateReference = (index, field, value) => {
    const list = [...(resume.references || [])];
    list[index] = { ...list[index], [field]: value };
    update('references', list);
  };

  const removeReference = (index) => update('references', (resume.references || []).filter((_, i) => i !== index));

  const addEducation = () => update('education', [...resume.education, {
    institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', gpa: '', displayOrder: resume.education.length,
  }]);

  const updateEducation = (index, field, value) => {
    const list = [...resume.education];
    list[index] = { ...list[index], [field]: value };
    update('education', list);
  };

  const removeEducation = (index) => update('education', resume.education.filter((_, i) => i !== index));

  const addExperience = () => update('experience', [...resume.experience, {
    company: '', jobTitle: '', startDate: '', endDate: '', current: false, description: '', displayOrder: resume.experience.length,
  }]);

  const updateExperience = (index, field, value) => {
    const list = [...resume.experience];
    list[index] = { ...list[index], [field]: value };
    update('experience', list);
  };

  const removeExperience = (index) => update('experience', resume.experience.filter((_, i) => i !== index));

  const handleInsertVerb = (verb) => {
    const expList = [...(resume.experience || [])];
    if (expList.length === 0) {
      expList.push({
        company: '',
        jobTitle: '',
        startDate: '',
        endDate: '',
        current: true,
        description: `• ${verb} `,
        displayOrder: 0
      });
    } else {
      const lastIdx = expList.length - 1;
      const currentDesc = expList[lastIdx].description || '';
      const bulletPrefix = currentDesc && !currentDesc.endsWith('\n') ? '\n• ' : currentDesc ? '• ' : '• ';
      expList[lastIdx] = {
        ...expList[lastIdx],
        description: `${currentDesc}${bulletPrefix}${verb} `
      };
    }
    update('experience', expList);
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!resume.title || !resume.title.trim()) {
      validationErrors.title = 'Please enter a resume title.';
    }
    if (!resume.candidateName || !resume.candidateName.trim()) {
      validationErrors.candidateName = 'Please enter your full name.';
    }
    if (!resume.contactEmail || !resume.contactEmail.trim()) {
      validationErrors.contactEmail = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resume.contactEmail.trim())) {
      validationErrors.contactEmail = 'Please enter a valid email address.';
    }
    return validationErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setError('Please fill in required fields (* Title, Full Name, Email) before saving.');
      addToast('Please fill in required fields', 'error');
      return;
    }

    setSaving(true);
    setError('');
    setErrors({});
    try {
      if (isNew) {
        const res = await resumeApi.create(resume);
        addToast('Resume created successfully', 'success');
        navigate(`/resume/${res.data.id}`);
      } else {
        await resumeApi.update(id, resume);
        addToast('Resume saved successfully', 'success');
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save resume.');
      addToast('Could not save resume', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = () => {
    addToast('Downloading PDF...', 'info');
    downloadResume(resume);
  };

  return (
    <div className="builder-layout">
      {/* Top Controls Toolbar */}
      <div className="builder-header-toolbar">
        <div className="toolbar-left">
          <Link to="/dashboard" className="btn btn-sm btn-secondary">
            ← Dashboard
          </Link>
          <div className="builder-title-meta">
            <h2>{isNew ? 'Create Resume' : 'Edit Resume'}</h2>
          </div>
        </div>

        <div className="toolbar-center">
          <div className="view-toggle-group">
            <button
              type="button"
              className={`btn-toggle ${viewMode === 'split' ? 'active' : ''}`}
              onClick={() => setViewMode('split')}
            >
              Split View
            </button>
            <button
              type="button"
              className={`btn-toggle ${viewMode === 'editor' ? 'active' : ''}`}
              onClick={() => setViewMode('editor')}
            >
              Form Only
            </button>
            <button
              type="button"
              className={`btn-toggle ${viewMode === 'preview' ? 'active' : ''}`}
              onClick={() => setViewMode('preview')}
            >
              Preview Only
            </button>
          </div>
        </div>

        <div className="toolbar-right">
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={loadSampleData}
            title="Auto-fill form with sample resume data"
          >
            ✨ Fill Sample Data
          </button>

          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={handleDownload}
          >
            Download PDF
          </button>

          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Resume'}
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className={`builder-workspace-container view-${viewMode}`}>
        {/* LEFT COLUMN: Form Editor */}
        {(viewMode === 'split' || viewMode === 'editor') && (
          <div className="builder-form-pane">
            {error && <div className="error-banner">{error}</div>}

            {/* Template Selection */}
            <div className="form-card template-box">
              <label className="field-label-bold">Selected Template:</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <select
                  value={resume.templateId || 6}
                  onChange={(e) => update('templateId', Number(e.target.value))}
                  className="input-select"
                >
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.industryCategory})
                    </option>
                  ))}
                </select>
                <Link to="/templates" className="link-standard">
                  Browse All
                </Link>
              </div>
            </div>

            {/* 1. Resume Identity */}
            <div className="form-card">
              <h3 className="card-heading">Resume Identity</h3>
              <div className="field-group">
                <label>Resume Title (internal name) <span className="req">*</span></label>
                <input
                  className={errors.title ? 'input-field input-err' : 'input-field'}
                  value={resume.title}
                  onChange={(e) => update('title', e.target.value)}
                  placeholder="e.g. Richard Sanchez - Marketing Resume"
                />
                {errors.title && <span className="err-text">{errors.title}</span>}
              </div>

              <div className="field-group">
                <label>Headline / Professional Title</label>
                <input
                  className="input-field"
                  value={resume.headline}
                  onChange={(e) => update('headline', e.target.value)}
                  placeholder="e.g. MARKETING MANAGER"
                />
              </div>
            </div>

            {/* 2. Photo Upload */}
            <div className="form-card">
              <h3 className="card-heading">Profile Photo / Avatar</h3>
              <p className="card-subtext">Used on templates that support profile photos.</p>
              <div className="photo-box">
                <div className="avatar-img-wrap">
                  <img
                    src={resume.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                    alt="Avatar preview"
                  />
                </div>
                <div className="photo-actions">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handlePhotoUpload}
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => update('profilePhoto', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400')}
                  >
                    Use Sample
                  </button>
                  {resume.profilePhoto && (
                    <button
                      type="button"
                      className="btn-text-danger"
                      onClick={() => update('profilePhoto', '')}
                    >
                      Remove
                    </button>
                  )}
                  <input
                    className="input-field"
                    style={{ marginTop: '8px' }}
                    placeholder="Or enter image URL (https://...)"
                    value={resume.profilePhoto || ''}
                    onChange={(e) => update('profilePhoto', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* 3. Personal & Contact Details */}
            <div className="form-card">
              <h3 className="card-heading">Personal & Contact Details</h3>
              <div className="form-row-2">
                <div className="field-group">
                  <label>Full Name <span className="req">*</span></label>
                  <input
                    className={errors.candidateName ? 'input-field input-err' : 'input-field'}
                    value={resume.candidateName}
                    onChange={(e) => update('candidateName', e.target.value)}
                    placeholder="e.g. RICHARD SANCHEZ"
                  />
                  {errors.candidateName && <span className="err-text">{errors.candidateName}</span>}
                </div>
                <div className="field-group">
                  <label>Email Address <span className="req">*</span></label>
                  <input
                    type="email"
                    className={errors.contactEmail ? 'input-field input-err' : 'input-field'}
                    value={resume.contactEmail}
                    onChange={(e) => update('contactEmail', e.target.value)}
                    placeholder="e.g. hello@reallygreatsite.com"
                  />
                  {errors.contactEmail && <span className="err-text">{errors.contactEmail}</span>}
                </div>
              </div>

              <div className="form-row-2">
                <div className="field-group">
                  <label>Phone Number</label>
                  <input
                    className="input-field"
                    value={resume.contactPhone}
                    onChange={(e) => update('contactPhone', e.target.value)}
                    placeholder="e.g. +123-456-7890"
                  />
                </div>
                <div className="field-group">
                  <label>City / Location</label>
                  <input
                    className="input-field"
                    value={resume.location}
                    onChange={(e) => update('location', e.target.value)}
                    placeholder="e.g. San Francisco, CA"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="field-group">
                  <label>Street Address</label>
                  <input
                    className="input-field"
                    value={resume.address}
                    onChange={(e) => update('address', e.target.value)}
                    placeholder="e.g. 123 Anywhere St."
                  />
                </div>
                <div className="field-group">
                  <label>Website / Portfolio</label>
                  <input
                    className="input-field"
                    value={resume.website}
                    onChange={(e) => update('website', e.target.value)}
                    placeholder="e.g. www.reallygreatsite.com"
                  />
                </div>
              </div>
            </div>

            {/* 4. Professional Summary */}
            <div className="form-card">
              <h3 className="card-heading">Professional Summary</h3>
              <div className="field-group">
                <label>Summary Statement</label>
                <textarea
                  rows={4}
                  className="input-textarea"
                  value={resume.summary}
                  onChange={(e) => update('summary', e.target.value)}
                  placeholder="Write a concise overview of your background, experience, and major career highlights..."
                />
              </div>
            </div>

            {/* 5. Work Experience */}
            <div className="form-card">
              <h3 className="card-heading">Work Experience</h3>
              <p className="card-subtext">Add past and current roles. Use bullet points (•) for descriptions.</p>

              {/* Quick Action Verbs */}
              <div className="verbs-quick-row">
                <span className="verbs-label">Quick Verbs:</span>
                {SUGGESTED_VERBS.map((v) => (
                  <button
                    key={v}
                    type="button"
                    className="btn-verb-chip"
                    onClick={() => handleInsertVerb(v)}
                    title={`Click to insert "+ • ${v} "`}
                  >
                    + {v}
                  </button>
                ))}
              </div>

              {resume.experience.map((exp, i) => (
                <div className="item-block" key={i}>
                  <div className="item-block-header">
                    <strong>Role #{i + 1}</strong>
                    <button
                      type="button"
                      className="btn-text-danger"
                      onClick={() => removeExperience(i)}
                    >
                      ✕ Remove
                    </button>
                  </div>

                  <div className="form-row-2">
                    <input
                      className="input-field"
                      placeholder="Company Name (e.g. Borcelle Studio)"
                      value={exp.company}
                      onChange={(e) => updateExperience(i, 'company', e.target.value)}
                    />
                    <input
                      className="input-field"
                      placeholder="Job Title (e.g. Marketing Manager)"
                      value={exp.jobTitle}
                      onChange={(e) => updateExperience(i, 'jobTitle', e.target.value)}
                    />
                  </div>

                  <div className="form-row-2">
                    <input
                      className="input-field"
                      placeholder="Start Year/Date (e.g. 2023)"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(i, 'startDate', e.target.value)}
                    />
                    <input
                      className="input-field"
                      placeholder="End Date (e.g. Present or 2026)"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(i, 'endDate', e.target.value)}
                      disabled={exp.current}
                    />
                  </div>

                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(i, 'current', e.target.checked)}
                    />
                    Currently working here (shows as PRESENT)
                  </label>

                  <div className="field-group" style={{ marginTop: '8px' }}>
                    <label>Description & Bullet Points</label>
                    <textarea
                      rows={4}
                      className="input-textarea"
                      value={exp.description}
                      onChange={(e) => updateExperience(i, 'description', e.target.value)}
                      placeholder="• Spearheaded marketing initiatives...&#10;• Managed team of specialists...&#10;• Increased revenue by 25%..."
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={addExperience}
                style={{ marginTop: '6px' }}
              >
                + Add Work Experience
              </button>
            </div>

            {/* 6. Education */}
            <div className="form-card">
              <h3 className="card-heading">Education</h3>
              {resume.education.map((edu, i) => (
                <div className="item-block" key={i}>
                  <div className="item-block-header">
                    <strong>Degree #{i + 1}</strong>
                    <button
                      type="button"
                      className="btn-text-danger"
                      onClick={() => removeEducation(i)}
                    >
                      ✕ Remove
                    </button>
                  </div>

                  <div className="form-row-2">
                    <input
                      className="input-field"
                      placeholder="Degree (e.g. Master of Business Administration)"
                      value={edu.degree}
                      onChange={(e) => updateEducation(i, 'degree', e.target.value)}
                    />
                    <input
                      className="input-field"
                      placeholder="Institution (e.g. Wardiere University)"
                      value={edu.institution}
                      onChange={(e) => updateEducation(i, 'institution', e.target.value)}
                    />
                  </div>

                  <div className="form-row-2">
                    <input
                      className="input-field"
                      placeholder="Major / Department (e.g. School of Business)"
                      value={edu.fieldOfStudy}
                      onChange={(e) => updateEducation(i, 'fieldOfStudy', e.target.value)}
                    />
                    <input
                      className="input-field"
                      placeholder="GPA (e.g. 3.8 / 4.0)"
                      value={edu.gpa}
                      onChange={(e) => updateEducation(i, 'gpa', e.target.value)}
                    />
                  </div>

                  <div className="form-row-2">
                    <input
                      className="input-field"
                      placeholder="Start (e.g. 2016)"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(i, 'startDate', e.target.value)}
                    />
                    <input
                      className="input-field"
                      placeholder="End (e.g. 2018)"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(i, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={addEducation}
                style={{ marginTop: '6px' }}
              >
                + Add Education
              </button>
            </div>

            {/* 7. Skills & Languages */}
            <div className="form-card">
              <h3 className="card-heading">Skills & Languages</h3>
              <div className="field-group">
                <label>Skills (Type skill and press Enter)</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    className="input-field"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    placeholder="e.g. Project Management"
                  />
                  <button type="button" className="btn btn-sm btn-primary" onClick={addSkill}>
                    Add
                  </button>
                </div>

                <div className="tag-chips-wrapper">
                  {(resume.skills || []).map((s) => (
                    <span key={s} className="tag-chip">
                      {s}
                      <button type="button" onClick={() => removeSkill(s)}>&times;</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="field-group" style={{ marginTop: '16px' }}>
                <label>Languages</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    className="input-field"
                    value={langInput}
                    onChange={(e) => setLangInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                    placeholder="e.g. English (Fluent) or Spanish (Native)"
                  />
                  <button type="button" className="btn btn-sm btn-primary" onClick={addLanguage}>
                    Add
                  </button>
                </div>

                <div className="tag-chips-wrapper">
                  {(resume.languages || []).map((l) => (
                    <span key={typeof l === 'object' ? l.name : l} className="tag-chip lang">
                      {typeof l === 'object' ? `${l.name} (${l.proficiency})` : l}
                      <button type="button" onClick={() => removeLanguage(l)}>&times;</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 8. References */}
            <div className="form-card">
              <h3 className="card-heading">References</h3>
              {(resume.references || []).map((ref, i) => (
                <div className="item-block" key={i}>
                  <div className="item-block-header">
                    <strong>Reference #{i + 1}</strong>
                    <button
                      type="button"
                      className="btn-text-danger"
                      onClick={() => removeReference(i)}
                    >
                      ✕ Remove
                    </button>
                  </div>

                  <div className="form-row-2">
                    <input
                      className="input-field"
                      placeholder="Name (e.g. Estelle Darcy)"
                      value={ref.name}
                      onChange={(e) => updateReference(i, 'name', e.target.value)}
                    />
                    <input
                      className="input-field"
                      placeholder="Company & Role (e.g. Wardiere Inc. / CTO)"
                      value={ref.title ? `${ref.company || ''}${ref.company && ref.title ? ' / ' : ''}${ref.title}` : ref.company}
                      onChange={(e) => {
                        const parts = e.target.value.split('/');
                        updateReference(i, 'company', parts[0]?.trim() || '');
                        updateReference(i, 'title', parts[1]?.trim() || '');
                      }}
                    />
                  </div>

                  <div className="form-row-2">
                    <input
                      className="input-field"
                      placeholder="Phone (e.g. 123-456-7890)"
                      value={ref.phone}
                      onChange={(e) => updateReference(i, 'phone', e.target.value)}
                    />
                    <input
                      className="input-field"
                      placeholder="Email (e.g. hello@reallygreatsite.com)"
                      value={ref.email}
                      onChange={(e) => updateReference(i, 'email', e.target.value)}
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={addReference}
                style={{ marginTop: '6px' }}
              >
                + Add Reference
              </button>
            </div>

            {/* 9. Recruiter Visibility */}
            <div className="form-card">
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={resume.visibleToRecruiters}
                  onChange={(e) => update('visibleToRecruiters', e.target.checked)}
                />
                <strong>Make this resume searchable & visible to recruiters</strong>
              </label>
            </div>

            <div className="form-footer-actions">
              <button type="button" className="btn btn-secondary" onClick={handleDownload}>
                Download PDF
              </button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save Resume'}
              </button>
            </div>
          </div>
        )}

        {/* RIGHT COLUMN: Live Sheet Preview */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div className="builder-sheet-pane">
            <div className="sheet-pane-header">
              <span className="live-pill">Live Preview</span>
              <div className="zoom-controls">
                <button
                  type="button"
                  className="btn-zoom-icon"
                  onClick={() => setZoomLevel((prev) => Math.max(70, prev - 10))}
                  title="Zoom Out"
                >
                  −
                </button>
                <span className="zoom-value">{zoomLevel}%</span>
                <button
                  type="button"
                  className="btn-zoom-icon"
                  onClick={() => setZoomLevel((prev) => Math.min(130, prev + 10))}
                  title="Zoom In"
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn-zoom-icon"
                  onClick={() => setZoomLevel(100)}
                  title="Reset"
                >
                  100%
                </button>
              </div>
            </div>

            <div className="sheet-viewport">
              <div
                className="sheet-scale-box"
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.15s ease'
                }}
              >
                <ResumeDocumentPreview resume={resume} template={selectedTemplate} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
