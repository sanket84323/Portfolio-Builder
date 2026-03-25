'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Folder, Palette, Eye, Globe, Settings, LogOut, Plus, BarChart2, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/portfolios', label: 'My Portfolios', icon: Folder },
  { href: '/templates', label: 'Templates', icon: Palette },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out successfully');
    router.push('/');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 49, backdropFilter: 'blur(4px)' }}
        />
      )}

      <aside
        className="sidebar"
        style={{
          transform: mobileOpen ? 'translateX(0)' : undefined,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Logo */}
        <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ◈ PortfolioBuilder
            </span>
          </Link>
          {onClose && (
            <button onClick={onClose} className="btn-ghost" style={{ padding: '0.25rem' }}>
              <X size={18} />
            </button>
          )}
        </div>

        {/* Create New Button */}
        <div style={{ padding: '0.75rem' }}>
          <Link href="/dashboard/portfolios/new" className="btn-primary" style={{ textDecoration: 'none', width: '100%', justifyContent: 'center', fontSize: '0.875rem', padding: '0.65rem 1rem' }}>
            <Plus size={16} /> New Portfolio
          </Link>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav" style={{ flex: 1 }}>
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`sidebar-item ${pathname === href ? 'active' : ''}`}
              style={{ textDecoration: 'none' }}
              onClick={onClose}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Quick links */}
        <div style={{ padding: '0 0.75rem 1rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
          <a href="/" target="_blank" rel="noopener" className="sidebar-item" style={{ textDecoration: 'none' }}>
            <Globe size={18} /> View Landing Page
          </a>
        </div>

        {/* User area */}
        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '0.875rem', flexShrink: 0,
          }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
            <div style={{ fontSize: '0.75rem', color: '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>@{user?.username}</div>
          </div>
          <button onClick={handleLogout} className="btn-ghost" style={{ padding: '0.375rem', flexShrink: 0 }} title="Log out">
            <LogOut size={16} />
          </button>
        </div>
      </aside>
    </>
  );
}
