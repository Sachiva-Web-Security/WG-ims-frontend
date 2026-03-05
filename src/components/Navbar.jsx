import { useAuth } from '../context/AuthContext';
import { RoleBadge } from './UI';

export default function Navbar() {
  const { user, logout } = useAuth();

  const roleIcon = { SUPER_ADMIN: '🛡️', ADMIN: '🍳', KITCHEN_USER: '📦' };

  return (
    <nav className="bg-brand-700 text-white px-6 py-3 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain shadow-amber-glow" />
        <div>
          <p className="font-bold text-lg leading-tight">WavaGrill IMS</p>
          <p className="text-xs text-brand-100 opacity-80">Inventory Management System</p>
        </div>
      </div>
      {user && (
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{roleIcon[user.role]} {user.name}</p>
            <RoleBadge role={user.role} />
          </div>
          <button
            onClick={logout}
            className="text-xs bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
