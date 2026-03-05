import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { RoleBadge } from './UI';

export function Layout({ children, nav }) {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 fixed lg:relative z-50
        ${collapsed ? 'lg:w-16' : 'lg:w-60'}
        w-60 h-full flex flex-col bg-slate-900
        transition-all duration-300 ease-in-out flex-shrink-0
      `}>
        {/* Logo */}
        <div className={`flex items-center gap-3 p-4 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
          <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain shadow-amber-glow" />
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-white font-bold text-sm font-heading leading-tight">WavaGrill</p>
              <p className="text-slate-400 text-xs">IMS</p>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {nav?.map((item, i) => (
            <button key={i}
              onClick={() => { item.onClick(); setMobileOpen(false); }}
              className={`sidebar-link w-full text-left ${item.active ? 'active' : ''} ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : undefined}>
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User info */}
        <div className={`p-3 border-t border-white/10 ${collapsed ? '' : ''}`}>
          {!collapsed ? (
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-white text-sm font-medium truncate">{user?.name}</p>
              <div className="mt-1 mb-2"><RoleBadge role={user?.role} /></div>
              <button onClick={logout}
                className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                ← Sign out
              </button>
            </div>
          ) : (
            <button onClick={logout} className="sidebar-link w-full justify-center" title="Sign out">
              ↩
            </button>
          )}
        </div>

        {/* Collapse toggle (desktop) */}
        <button onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-slate-900 border border-white/10 items-center justify-center text-white text-xs hover:bg-slate-700 transition-colors">
          {collapsed ? '›' : '‹'}
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar (mobile) */}
        <header className="lg:hidden flex items-center justify-between bg-white border-b border-slate-100 px-4 py-3">
          <button onClick={() => setMobileOpen(true)} className="btn-ghost">
            ☰
          </button>
          <p className="font-bold text-slate-800 font-heading text-sm">WavaGrill IMS</p>
          <div className="w-8" />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
