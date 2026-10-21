import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { profile, role, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-school-green border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-slate-600">กำลังตรวจสอบสิทธิ์การเข้าถึง...</span>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!profile) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role not authorized
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return <>{children}</>;
};
