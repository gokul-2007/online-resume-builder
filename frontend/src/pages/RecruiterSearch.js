import React, { useEffect, useState } from 'react';
import { recruiterApi, templateApi } from '../services/api';
import { downloadResume } from '../utils/downloadResume';
import { useToast } from '../components/Toast';
import ResumeDocumentPreview from '../components/ResumeDocumentPreview';

const SUGGESTED_TAGS = ['React', 'Java', 'Marketing', 'Product Manager', 'Python', 'Full Stack', 'Design', 'Data'];

export default function RecruiterSearch() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewCandidate, setPreviewCandidate] = useState(null);
  const { addToast } = useToast();

  const loadAllCandidates = () => {
    setLoading(true);
    Promise.all([
      recruiterApi.getCandidates().catch(() => ({ data: [] })),
      templateApi.getAll().catch(() => ({ data: [] }))
    ]).then(([candRes, tempRes]) => {
      setResults(candRes.data || []);
      setTemplates(tempRes.data || []);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { loadAllCandidates(); }, []);

  const handleSearch = async (queryToSearch) => {
    const term = typeof queryToSearch === 'string' ? queryToSearch : keyword;
    if (!term.trim()) {
      loadAllCandidates();
      return;
    }
    setLoading(true);
    try {
      const res = await recruiterApi.search(term.trim());
      setResults(res.data || []);
      addToast(`Found ${(res.data || []).length} candidate(s)`, 'info', 2000);
    } catch (err) {
      addToast('Search error', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleTagClick = (tag) => {
    setKeyword(tag);
    handleSearch(tag);
  };

  const handleDownload = (r) => {
    addToast('Downloading candidate resume...', 'info');
    downloadResume(r);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Candidate Search</h1>
          <p className="page-subtitle">Search and browse shared candidate resumes</p>
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="search-form-row">
        <input
          className="input-field"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search by skill, name, role, or location (e.g. React, Python, Marketing)..."
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
        {keyword && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => { setKeyword(''); loadAllCandidates(); }}
          >
            Clear
          </button>
        )}
      </form>

      {/* Suggested Tags */}
      <div className="tags-quick-list">
        <span className="tags-label">Suggestions:</span>
        {SUGGESTED_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`btn-tag ${keyword.toLowerCase() === tag.toLowerCase() ? 'active' : ''}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div style={{ margin: '18px 0 12px 0', fontSize: '0.88rem', color: '#64748b' }}>
        Found <strong>{results.length}</strong> candidate(s)
      </div>

      {loading && (
        <div className="loading-state">
          <p>Searching candidate database...</p>
        </div>
      )}

      {!loading && results.length === 0 && (
        <div className="empty-box">
          <h3>No candidates found</h3>
          <p>Try searching with different keywords.</p>
        </div>
      )}

      {/* Candidates Grid */}
      <div className="resumes-grid">
        {results.map((r) => (
          <div className="resume-card" key={r.id}>
            <div className="resume-card-header">
              <span className="template-name-badge">
                {r.location || 'Location Not Specified'}
              </span>
              <span className="badge-status status-published">Verified</span>
            </div>

            <div className="resume-card-body">
              <h3 className="card-title">{r.candidateName || 'Candidate'}</h3>
              <p className="card-headline">{r.headline || r.title || 'Professional'}</p>
              <p className="card-meta" style={{ marginTop: '8px' }}>
                {r.summary ? `${r.summary.slice(0, 120)}${r.summary.length > 120 ? '...' : ''}` : 'No summary provided.'}
              </p>

              <div className="tag-chips-wrapper" style={{ marginTop: '10px' }}>
                {(r.skills || []).slice(0, 4).map((s) => (
                  <span key={s} className="tag-chip">{s}</span>
                ))}
              </div>
            </div>

            <div className="resume-card-footer">
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => setPreviewCandidate(r)}
                style={{ flex: 1 }}
              >
                Preview
              </button>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => handleDownload(r)}
                style={{ flex: 1 }}
              >
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Candidate Live Modal */}
      {previewCandidate && (
        <div className="modal-backdrop" onClick={() => setPreviewCandidate(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-box-header">
              <h3>{previewCandidate.candidateName || 'Candidate Resume'}</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => handleDownload(previewCandidate)}
                >
                  Download PDF
                </button>
                <button
                  type="button"
                  className="btn-close-modal"
                  onClick={() => setPreviewCandidate(null)}
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="modal-box-body">
              <ResumeDocumentPreview
                resume={previewCandidate}
                template={templates.find((t) => Number(t.id) === Number(previewCandidate.templateId))}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

