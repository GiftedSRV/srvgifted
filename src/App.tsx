import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';

// Layouts & Guard
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

// Public Pages
import { HomePage } from '@/pages/public/HomePage';
import { AboutPage } from '@/pages/public/AboutPage';
import { NewsPage } from '@/pages/public/NewsPage';
import { NewsDetailPage } from '@/pages/public/NewsDetailPage';
import { CalendarPage } from '@/pages/public/CalendarPage';
import { ActivitiesPage } from '@/pages/public/ActivitiesPage';
import { AchievementsPage } from '@/pages/public/AchievementsPage';
import { ResourcesPage } from '@/pages/public/ResourcesPage';
import { ResourceDetailPage } from '@/pages/public/ResourceDetailPage';
import { DocumentsPage } from '@/pages/public/DocumentsPage';
import { ContactPage } from '@/pages/public/ContactPage';
import { LoginPage } from '@/pages/public/LoginPage';
import { AccessDeniedPage } from '@/pages/public/AccessDeniedPage';
import { NotFoundPage } from '@/pages/public/NotFoundPage';

// Dashboards
import { StudentDashboard } from '@/pages/student/StudentDashboard';
import { TeacherDashboard } from '@/pages/teacher/TeacherDashboard';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminNews } from '@/pages/admin/AdminNews';
import { AdminEvents } from '@/pages/admin/AdminEvents';
import { AdminResources } from '@/pages/admin/AdminResources';
import { AdminAchievements } from '@/pages/admin/AdminAchievements';
import { AdminUsers } from '@/pages/admin/AdminUsers';
import { AdminSettings } from '@/pages/admin/AdminSettings';
import { ProfileSettingsPage } from '@/pages/dashboard/ProfileSettingsPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            {/* Public Institutional Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:slug" element={<NewsDetailPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/resources/:id" element={<ResourceDetailPage />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/access-denied" element={<AccessDeniedPage />} />

            {/* Student Protected Portal */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            {/* Teacher Protected Portal */}
            <Route
              path="/teacher"
              element={
                <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Protected Dashboard & Modules */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/news"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminNews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/events"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/resources"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminResources />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/achievements"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminAchievements />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />

            {/* Profile & Security Settings (Self-service only) */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
                  <ProfileSettingsPage />
                </ProtectedRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
