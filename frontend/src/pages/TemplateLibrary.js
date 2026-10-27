import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { templateApi } from '../services/api';
import ResumeDocumentPreview from '../components/ResumeDocumentPreview';

function TemplateThumbnail({ template }) {
  const { layoutStyle } = template;

  if (layoutStyle === 'timeline') {
    return (
      <div className="thumb-preview thumb-timeline">
        <div className="thumb-header navy-banner">
          <div className="thumb-avatar-circle"></div>
          <div style={{ flex: 1, marginLeft: '32px' }}>
            <div className="thumb-line bold white" style={{ width: '65%', marginBottom: '2px' }}></div>
            <div className="thumb-line sm light-slate" style={{ width: '40%' }}></div>
          </div>
        </div>
        <div className="thumb-split-body">
          <div className="thumb-left-col timeline-side">
            <div className="thumb-line sm" style={{ width: '60%', marginBottom: '4px', background: '#2b354f' }}></div>
            <div className="thumb-line sm" style={{ width: '80%', marginBottom: '3px' }}></div>
            <div className="thumb-line sm" style={{ width: '70%', marginBottom: '6px' }}></div>
            <div className="thumb-line sm" style={{ width: '50%', marginBottom: '4px', background: '#2b354f' }}></div>
            <div className="thumb-line sm" style={{ width: '75%', marginBottom: '2px' }}></div>
            <div className="thumb-line sm" style={{ width: '65%' }}></div>
          </div>
          <div className="thumb-right-col timeline-main">
            <div className="thumb-timeline-axis">
              <div className="thumb-timeline-node"></div>
              <div className="thumb-line bold" style={{ width: '60%', marginBottom: '3px' }}></div>
              <div className="thumb-line sm" style={{ width: '85%', marginBottom: '2px' }}></div>
            </div>
            <div className="thumb-timeline-axis" style={{ marginTop: '6px' }}>
              <div className="thumb-timeline-node"></div>
              <div className="thumb-line bold" style={{ width: '50%', marginBottom: '3px' }}></div>
              <div className="thumb-line sm" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (layoutStyle === 'classic') {
    return (
      <div className="thumb-preview thumb-classic">
        <div className="thumb-header centered">
          <div className="thumb-line bold" style={{ width: '60%', margin: '0 auto 3px' }}></div>
          <div className="thumb-line sm" style={{ width: '40%', margin: '0 auto 3px' }}></div>
          <div className="thumb-divider double"></div>
        </div>
        <div className="thumb-section centered">
          <div className="thumb-sec-title" style={{ width: '45%', margin: '0 auto 5px' }}></div>
          <div className="thumb-line" style={{ width: '90%', margin: '0 auto 3px' }}></div>
          <div className="thumb-line" style={{ width: '75%', margin: '0 auto' }}></div>
        </div>
        <div className="thumb-section centered" style={{ marginTop: '6px' }}>
          <div className="thumb-sec-title" style={{ width: '35%', margin: '0 auto 5px' }}></div>
          <div className="thumb-line" style={{ width: '85%', margin: '0 auto 3px' }}></div>
        </div>
      </div>
    );
  }

  if (layoutStyle === 'modern') {
    return (
      <div className="thumb-preview thumb-modern">
        <div className="thumb-header left-accent">
          <div style={{ flex: 1 }}>
            <div className="thumb-line bold teal" style={{ width: '65%', marginBottom: '3px' }}></div>
            <div className="thumb-line sm" style={{ width: '45%' }}></div>
          </div>
        </div>
        <div className="thumb-section">
          <div className="thumb-sec-title teal-under" style={{ width: '50%' }}></div>
          <div className="thumb-line" style={{ width: '95%', marginBottom: '3px' }}></div>
          <div className="thumb-line" style={{ width: '80%', marginBottom: '4px' }}></div>
          <div className="thumb-pills">
            <span className="thumb-pill teal"></span>
            <span className="thumb-pill teal"></span>
            <span className="thumb-pill teal"></span>
          </div>
        </div>
      </div>
    );
  }

  if (layoutStyle === 'sidebar') {
    return (
      <div className="thumb-preview thumb-sidebar">
        <div className="thumb-header blue-banner">
          <div className="thumb-line bold white" style={{ width: '55%', marginBottom: '2px' }}></div>
          <div className="thumb-line sm light-blue" style={{ width: '35%' }}></div>
        </div>
        <div className="thumb-split-body">
          <div className="thumb-left-col">
            <div className="thumb-line sm" style={{ width: '70%', marginBottom: '4px' }}></div>
            <div className="thumb-pill blue" style={{ width: '85%', marginBottom: '3px' }}></div>
            <div className="thumb-pill blue" style={{ width: '65%' }}></div>
          </div>
          <div className="thumb-right-col">
            <div className="thumb-sec-title blue-under" style={{ width: '60%' }}></div>
            <div className="thumb-line" style={{ width: '95%', marginBottom: '3px' }}></div>
            <div className="thumb-line" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (layoutStyle === 'executive') {
    return (
      <div className="thumb-preview thumb-executive">
        <div className="thumb-header dark-banner">
          <div className="thumb-line bold white" style={{ width: '60%', marginBottom: '2px' }}></div>
          <div className="thumb-line sm gold" style={{ width: '40%' }}></div>
        </div>
        <div className="thumb-section" style={{ padding: '8px 10px' }}>
          <div className="thumb-sec-title gold-left" style={{ width: '55%' }}></div>
          <div className="thumb-line" style={{ width: '90%', marginBottom: '3px' }}></div>
          <div className="thumb-line" style={{ width: '80%' }}></div>
        </div>
      </div>
    );
  }

  // Creative Startup
  return (
    <div className="thumb-preview thumb-creative">
      <div className="thumb-header purple-grad">
        <div className="thumb-line bold white" style={{ width: '60%', marginBottom: '2px' }}></div>
        <div className="thumb-line sm light-purple" style={{ width: '40%' }}></div>
      </div>
      <div className="thumb-section" style={{ padding: '6px 8px' }}>
        <div className="thumb-card-box">
          <div className="thumb-line purple" style={{ width: '70%', marginBottom: '2px' }}></div>
          <div className="thumb-line sm" style={{ width: '90%' }}></div>
        </div>
      </div>
    </div>
  );
}

export default function TemplateLibrary() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [previewTemplate, setPreviewTemplate] = useState(null);

  useEffect(() => {
    templateApi.getAll()
      .then((res) => {
        const availableTemplates = (res.data || []).filter((t) => !t.premiumOnly);
        setTemplates(availableTemplates);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredTemplates = useMemo(() => {
    if (categoryFilter === 'ALL') return templates;
    if (categoryFilter === 'ATS') return templates.filter((t) => t.atsFriendly);
    if (categoryFilter === 'TIMELINE') return templates.filter((t) => t.layoutStyle === 'timeline');
    if (categoryFilter === 'MODERN') return templates.filter((t) => t.layoutStyle === 'modern' || t.layoutStyle === 'creative');
    if (categoryFilter === 'CLASSIC') return templates.filter((t) => t.layoutStyle === 'classic' || t.layoutStyle === 'sidebar' || t.layoutStyle === 'executive');
    return templates;
  }, [templates, categoryFilter]);

  const sampleDummyResume = {
    title: 'Sample Career Resume',
    candidateName: 'RICHARD SANCHEZ',
    headline: 'MARKETING MANAGER & STRATEGIST',
    profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    summary: 'Seasoned marketing manager with 8+ years experience driving brand growth, leading high-performance cross-functional teams, and orchestrating omni-channel campaigns.',
    contactEmail: 'hello@reallygreatsite.com',
    contactPhone: '+123-456-7890',
    location: 'San Francisco, CA',
    address: '123 Market Street',
    website: 'www.richardsanchez.dev',
    skills: ['Strategic Planning', 'Product Marketing', 'Growth Marketing', 'Team Leadership', 'Brand Strategy', 'Data Analytics', 'SEO / SEM', 'Budget Management'],
    languages: ['English (Native)', 'Spanish (Fluent)', 'French (Intermediate)'],
    experience: [
      {
        company: 'Borcelle Studio',
        jobTitle: 'Senior Marketing Manager',
        startDate: '2023',
        endDate: 'PRESENT',
        current: true,
        description: '• Spearheaded end-to-end global marketing campaigns resulting in 42% revenue increase.\n• Led and mentored a cross-functional team of 12 designers and copywriters.\n• Implemented automated lifecycle email marketing flows with 38% open rates.',
      },
      {
        company: 'Fauget Media Co.',
        jobTitle: 'Marketing Specialist',
        startDate: '2020',
        endDate: '2023',
        description: '• Managed $2.4M annual advertising budget across multi-channel campaigns.\n• Conducted deep market research and competitor benchmarking for product launches.',
      }
    ],
    education: [
      {
        degree: 'Master of Business Administration (MBA)',
        institution: 'Stanford University',
        fieldOfStudy: 'Marketing & Management',
        startDate: '2018',
        endDate: '2020',
        gpa: '3.9 / 4.0'
      }
    ],
    references: [
      {
        name: 'Estelle Darcy',
        company: 'Wardiere Inc.',
        title: 'Chief Technology Officer',
        phone: '+123-456-7890',
        email: 'hello@reallygreatsite.com'
      }
    ]
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Template Library</h1>
          <p className="page-subtitle">Choose a template style with distinct visual layouts and typography</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs" style={{ marginBottom: '24px' }}>
        <button
          className={`tab-btn ${categoryFilter === 'ALL' ? 'active' : ''}`}
          onClick={() => setCategoryFilter('ALL')}
        >
          All Templates ({templates.length})
        </button>
        <button
          className={`tab-btn ${categoryFilter === 'ATS' ? 'active' : ''}`}
          onClick={() => setCategoryFilter('ATS')}
        >
          ATS-Optimized ({templates.filter(t => t.atsFriendly).length})
        </button>
        <button
          className={`tab-btn ${categoryFilter === 'TIMELINE' ? 'active' : ''}`}
          onClick={() => setCategoryFilter('TIMELINE')}
        >
          Timeline Layouts ({templates.filter(t => t.layoutStyle === 'timeline').length})
        </button>
        <button
          className={`tab-btn ${categoryFilter === 'MODERN' ? 'active' : ''}`}
          onClick={() => setCategoryFilter('MODERN')}
        >
          Modern ({templates.filter(t => t.layoutStyle === 'modern' || t.layoutStyle === 'creative').length})
        </button>
        <button
          className={`tab-btn ${categoryFilter === 'CLASSIC' ? 'active' : ''}`}
          onClick={() => setCategoryFilter('CLASSIC')}
        >
          Classic & Sidebar ({templates.filter(t => t.layoutStyle === 'classic' || t.layoutStyle === 'sidebar' || t.layoutStyle === 'executive').length})
        </button>
      </div>

      {loading && (
        <div className="loading-state">
          <p>Loading templates...</p>
        </div>
      )}

      <div className="templates-grid">
        {filteredTemplates.map((t) => (
          <div className="template-card" key={t.id}>
            <div className="template-thumb-box" onClick={() => setPreviewTemplate(t)}>
              <TemplateThumbnail template={t} />
            </div>

            <div className="template-card-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="template-title">{t.name}</h3>
                {t.atsFriendly && <span className="badge-ats">ATS Friendly</span>}
              </div>

              <p className="template-subtitle">
                <strong>{t.industryCategory}</strong> · {t.fontFamily}
              </p>

              <div className="template-tag-pills">
                <span className="tag-pill">{t.layoutStyle || 'Standard'} Layout</span>
                <span className="tag-pill">Color: {t.colorScheme}</span>
              </div>

              <div className="template-card-actions">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => setPreviewTemplate(t)}
                >
                  Preview
                </button>
                <Link
                  to={`/resume/new?template=${t.id}`}
                  className="btn btn-sm btn-primary"
                  style={{ flex: 1, textAlign: 'center' }}
                >
                  Use Template
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <div className="modal-backdrop" onClick={() => setPreviewTemplate(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-box-header">
              <h3>{previewTemplate.name} Preview</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link
                  to={`/resume/new?template=${previewTemplate.id}`}
                  className="btn btn-sm btn-primary"
                >
                  Use This Template
                </Link>
                <button
                  type="button"
                  className="btn-close-modal"
                  onClick={() => setPreviewTemplate(null)}
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="modal-box-body">
              <ResumeDocumentPreview
                resume={{ ...sampleDummyResume, templateId: previewTemplate.id }}
                template={previewTemplate}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

