import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Spinner } from './components/UI';

// Protect route by allowed roles
export function ProtectedRoute({ roles }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/unauthorized" replace />;
  return <Outlet />;
}

// Redirect to correct dashboard after login
export function RoleRedirect() {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'SUPER_ADMIN') return <Navigate to="/super-admin" replace />;
  if (user.role === 'ADMIN') return <Navigate to="/admin" replace />;
  return <Navigate to="/kitchen" replace />;
}

export function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-6xl mb-4">🚫</p>
        <h1 className="text-2xl font-bold text-gray-700">Access Denied</h1>
        <p className="text-gray-500 mt-2">You don't have permission to view this page.</p>
      </div>
    </div>
  );
}
