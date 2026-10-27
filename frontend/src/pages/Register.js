import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

export default function Register() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    role: 'JOB_SEEKER',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      addToast('Account created successfully', 'success');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Sign up to start building resumes.</p>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form-content">
          <div className="field-group">
            <label>Full Name</label>
            <input
              name="fullName"
              className="input-field"
              value={form.fullName}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              required
            />
          </div>

          <div className="field-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="input-field"
              value={form.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="field-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="input-field"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>

          <div className="field-group">
            <label>Phone (Optional)</label>
            <input
              name="phone"
              className="input-field"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 234 567 890"
            />
          </div>

          <div className="field-group">
            <label>I am registering as a...</label>
            <select
              name="role"
              className="input-select"
              value={form.role}
              onChange={handleChange}
            >
              <option value="JOB_SEEKER">Job Seeker</option>
              <option value="RECRUITER">Recruiter / Employer</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="auth-footer-text">
            Already have an account? <Link to="/login" className="link-standard">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}


