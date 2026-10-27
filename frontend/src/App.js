import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './components/Toast';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import TemplateLibrary from './pages/TemplateLibrary';
import RecruiterSearch from './pages/RecruiterSearch';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route
          path="/templates"
          element={
            <PrivateRoute allowedRoles={['JOB_SEEKER', 'PREMIUM_USER']}>
              <TemplateLibrary />
            </PrivateRoute>
          }
        />
        <Route
          path="/resume/:id"
          element={
            <PrivateRoute allowedRoles={['JOB_SEEKER', 'PREMIUM_USER']}>
              <ResumeBuilder />
            </PrivateRoute>
          }
        />
        <Route
          path="/recruiter"
          element={
            <PrivateRoute allowedRoles={['RECRUITER', 'HIRING_MANAGER', 'ADMIN']}>
              <RecruiterSearch />
            </PrivateRoute>
          }
        />

        <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
        <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
