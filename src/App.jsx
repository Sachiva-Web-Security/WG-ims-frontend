import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ProtectedRoute, RoleRedirect, Unauthorized } from './Guards';
import Login from './pages/Login';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import AdminDashboard from './pages/AdminDashboard';
import KitchenDashboard from './pages/KitchenDashboard';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/" element={<RoleRedirect />} />

            <Route element={<ProtectedRoute roles={['SUPER_ADMIN']} />}>
              <Route path="/super-admin" element={<SuperAdminDashboard />} />
            </Route>

            <Route element={<ProtectedRoute roles={['ADMIN', 'SUPER_ADMIN']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            <Route element={<ProtectedRoute roles={['KITCHEN_USER', 'ADMIN', 'SUPER_ADMIN']} />}>
              <Route path="/kitchen" element={<KitchenDashboard />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
