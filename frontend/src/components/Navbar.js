import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isRecruiterLike = user && ['RECRUITER', 'HIRING_MANAGER', 'ADMIN'].includes(user.role);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="site-navbar">
      <div className="nav-container">
        <div className="nav-brand-section">
          <Link to={user ? "/dashboard" : "/login"} className="brand-link">
            <span className="brand-logo-icon">📄</span>
            <span className="brand-title">ResumeBuilder</span>
          </Link>
        </div>

        {user && (
          <div className="nav-menu">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Dashboard
            </NavLink>
            {!isRecruiterLike && (
              <NavLink
                to="/templates"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Templates
              </NavLink>
            )}
            {isRecruiterLike && (
              <NavLink
                to="/recruiter"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Candidate Search
              </NavLink>
            )}
          </div>
        )}

        <div className="nav-user-section">
          {user ? (
            <div className="nav-user-controls">
              <span className="user-greeting">
                {user.fullName} <span className="user-role-badge">({user.role === 'JOB_SEEKER' ? 'Job Seeker' : user.role.replace('_', ' ')})</span>
              </span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-auth-links">
              <NavLink to="/login" className="nav-link">Login</NavLink>
              <NavLink to="/register" className="btn-register-nav">Register</NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}


