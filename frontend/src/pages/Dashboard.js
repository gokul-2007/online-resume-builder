import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { resumeApi, templateApi } from '../services/api';
import { downloadResume } from '../utils/downloadResume';
import { useToast } from '../components/Toast';
import ResumeDocumentPreview from '../components/ResumeDocumentPreview';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [resumes, setResumes] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [previewResume, setPreviewResume] = useState(null);

  useEffect(() => {
    Promise.all([
      resumeApi.getAll().catch(() => ({ data: [] })),
      templateApi.getAll().catch(() => ({ data: [] }))
    ]).then(([resumesRes, templatesRes]) => {
      setResumes(resumesRes.data || []);
      setTemplates(templatesRes.data || []);
    }).catch(() => {
      setErrorMsg('Could not load resumes.');
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const isRecruiterLike = ['RECRUITER', 'HIRING_MANAGER', 'ADMIN'].includes(user.role);

  const filteredResumes = useMemo(() => {
    return resumes.filter((r) => {
      const matchesSearch =
        (r.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.headline || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.candidateName || '').toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (statusFilter === 'ALL') return true;
      return (r.status || 'DRAFT').toUpperCase() === statusFilter;
    });
  }, [resumes, searchQuery, statusFilter]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title || 'this resume'}"?`)) return;
    try {
      await resumeApi.remove(id);
      setResumes((prev) => prev.filter((r) => r.id !== id));
      addToast('Resume deleted', 'info');
      if (previewResume && previewResume.id === id) {
        setPreviewResume(null);
      }
    } catch (err) {
      addToast('Failed to delete resume', 'error');
    }
  };

  const handleDuplicate = async (r) => {
    try {
      const duplicateData = {
        ...r,
        id: undefined,
        title: `${r.title || 'Resume'} (Copy)`,
        status: 'DRAFT',
      };
      const res = await resumeApi.create(duplicateData);
      setResumes((prev) => [res.data, ...prev]);
      addToast('Resume duplicated', 'success');
      navigate(`/resume/${res.data.id}`);
    } catch (err) {
      addToast('Could not duplicate resume', 'error');
    }
  };

  const handleDownload = (r) => {
    addToast('Downloading PDF...', 'info');
    downloadResume(r);
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      {!isRecruiterLike ? (
        <div className="page-header-row">
          <div>
            <h1 className="page-title">My Resumes</h1>
            <p className="page-subtitle">Manage and edit your career resumes</p>
          </div>
          <div className="page-header-actions">
            <Link to="/resume/new" className="btn btn-primary">
              + Create New Resume
            </Link>
          </div>
        </div>
      ) : (
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Recruiter Dashboard</h1>
            <p className="page-subtitle">Candidate discovery and recruitment management portal</p>
          </div>
        </div>
      )}

      {isRecruiterLike ? (
        <div className="info-callout">
          <h3>Recruiter Portal</h3>
          <p>
            You are logged in as a <strong>{user.role.replace('_', ' ').toLowerCase()}</strong>. Visit the candidate search to browse candidate profiles.
          </p>
          <Link to="/recruiter" className="btn btn-primary" style={{ marginTop: '10px' }}>
            Go to Candidate Search
          </Link>
        </div>
      ) : (
        <>
          {/* Controls Bar: Search & Filter */}
          <div className="dashboard-toolbar">
            <div className="search-box">
              <input
                type="text"
                className="input-search"
                placeholder="Search by title, role, or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="filter-tabs">
              <button
                className={`tab-btn ${statusFilter === 'ALL' ? 'active' : ''}`}
                onClick={() => setStatusFilter('ALL')}
              >
                All ({resumes.length})
              </button>
              <button
                className={`tab-btn ${statusFilter === 'PUBLISHED' ? 'active' : ''}`}
                onClick={() => setStatusFilter('PUBLISHED')}
              >
                Published ({resumes.filter((r) => r.status === 'PUBLISHED' || r.visibleToRecruiters).length})
              </button>
              <button
                className={`tab-btn ${statusFilter === 'DRAFT' ? 'active' : ''}`}
                onClick={() => setStatusFilter('DRAFT')}
              >
                Drafts ({resumes.filter((r) => r.status === 'DRAFT' && !r.visibleToRecruiters).length})
              </button>
            </div>
          </div>

          {errorMsg && <div className="error-banner">{errorMsg}</div>}

          {loading ? (
            <div className="loading-state">
              <p>Loading resumes...</p>
            </div>
          ) : filteredResumes.length === 0 ? (
            <div className="empty-box">
              <h3>{searchQuery ? 'No matching resumes found' : 'No resumes yet'}</h3>
              <p>
                {searchQuery
                  ? 'Try searching with different terms.'
                  : 'Get started by creating your first resume or choosing a template.'}
              </p>
              <div style={{ marginTop: '16px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <Link to="/resume/new" className="btn btn-primary">Create Resume</Link>
                <Link to="/templates" className="btn btn-secondary">Browse Templates</Link>
              </div>
            </div>
          ) : (
            <div className="resumes-grid">
              {filteredResumes.map((r) => {
                const matchedTemplate = templates.find((t) => Number(t.id) === Number(r.templateId)) || templates[0];

                return (
                  <div className="resume-card" key={r.id}>
                    <div className="resume-card-header">
                      <span className="template-name-badge">
                        {matchedTemplate?.name || 'Standard'}
                      </span>
                      <span className={`badge-status status-${(r.status || 'DRAFT').toLowerCase()}`}>
                        {r.visibleToRecruiters ? 'Public' : (r.status || 'Draft')}
                      </span>
                    </div>

                    <div className="resume-card-body">
                      <h3 className="card-title">{r.title || 'Untitled Resume'}</h3>
                      <p className="card-headline">{r.headline || 'No headline specified'}</p>
                      <p className="card-meta">
                        {(r.experience || []).length} role(s) · {(r.skills || []).length} skill(s)
                      </p>
                    </div>

                    <div className="resume-card-footer">
                      <Link to={`/resume/${r.id}`} className="btn btn-sm btn-primary">
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary"
                        onClick={() => setPreviewResume(r)}
                      >
                        Preview
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleDownload(r)}
                      >
                        PDF
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(r.id, r.title)}
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Preview Modal */}
      {previewResume && (
        <div className="modal-backdrop" onClick={() => setPreviewResume(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-box-header">
              <h3>{previewResume.title || 'Resume Preview'}</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link to={`/resume/${previewResume.id}`} className="btn btn-sm btn-primary">
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleDownload(previewResume)}
                >
                  Download PDF
                </button>
                <button
                  type="button"
                  className="btn-close-modal"
                  onClick={() => setPreviewResume(null)}
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="modal-box-body">
              <ResumeDocumentPreview
                resume={previewResume}
                template={templates.find((t) => Number(t.id) === Number(previewResume.templateId))}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


