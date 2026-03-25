'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Save, Loader2, User, Mail, AtSign, Image } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/Sidebar';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user, refreshUser } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', bio: '', profileImage: user?.profileImage || '' });

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        await refreshUser();
        toast.success('Profile updated!');
      } else toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a14' }}>
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="dashboard-main">
        <header className="dashboard-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setMobileOpen(true)} className="btn-ghost" style={{ padding: '0.4rem' }}><Menu size={20} /></button>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Settings</h1>
          </div>
        </header>

        <div style={{ padding: '2rem', maxWidth: '640px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

            {/* Avatar */}
            <div className="glass" style={{ borderRadius: '20px', padding: '2rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', color: '#f1f5f9' }}>Profile Information</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.75rem' }}>
                {form.profileImage ? (
                  <img src={form.profileImage} alt="Profile" style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(99,102,241,0.4)' }} />
                ) : (
                  <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: '0.25rem' }}>{user?.name}</div>
                  <div style={{ color: '#64748b', fontSize: '0.875rem' }}>@{user?.username}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                  <label className="label-field"><User size={12} style={{ display: 'inline', marginRight: '0.3rem' }} />Full Name</label>
                  <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
                </div>

                <div>
                  <label className="label-field"><Mail size={12} style={{ display: 'inline', marginRight: '0.3rem' }} />Email</label>
                  <input className="input-field" value={user?.email || ''} disabled style={{ opacity: 0.5, cursor: 'not-allowed' }} />
                  <p style={{ color: '#475569', fontSize: '0.75rem', marginTop: '0.3rem' }}>Email cannot be changed.</p>
                </div>

                <div>
                  <label className="label-field"><AtSign size={12} style={{ display: 'inline', marginRight: '0.3rem' }} />Username</label>
                  <input className="input-field" value={user?.username || ''} disabled style={{ opacity: 0.5, cursor: 'not-allowed' }} />
                </div>

                <div>
                  <label className="label-field"><Image size={12} style={{ display: 'inline', marginRight: '0.3rem' }} />Profile Image URL</label>
                  <input className="input-field" value={form.profileImage} onChange={(e) => setForm({ ...form, profileImage: e.target.value })} placeholder="https://..." />
                  <label style={{ marginTop: '0.5rem', display: 'block' }}>
                    <input type="file" accept="image/*" style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const fd = new FormData();
                        fd.append('file', file);
                        fd.append('type', 'image');
                        const res = await fetch('/api/upload', { method: 'POST', body: fd });
                        if (res.ok) { const d = await res.json(); setForm((f) => ({ ...f, profileImage: d.url })); toast.success('Image uploaded!'); }
                      }}
                    />
                    <span className="btn-secondary" style={{ cursor: 'pointer', fontSize: '0.8rem', padding: '0.45rem 1rem' }}>Upload Image</span>
                  </label>
                </div>

                <div>
                  <label className="label-field">Bio</label>
                  <textarea className="input-field" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="A short bio about yourself..." rows={3} style={{ resize: 'vertical', fontFamily: 'inherit' }} />
                </div>

                <button className="btn-primary" onClick={handleSave} disabled={saving} style={{ width: '100%', justifyContent: 'center' }}>
                  {saving ? <Loader2 size={16} /> : <Save size={16} />} {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>

            {/* Danger zone */}
            <div className="glass" style={{ borderRadius: '20px', padding: '2rem', border: '1px solid rgba(239,68,68,0.15)' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#f87171' }}>Danger Zone</h2>
              <p style={{ color: '#475569', fontSize: '0.875rem', marginBottom: '1rem' }}>Permanently delete your account and all portfolios. This cannot be undone.</p>
              <button className="btn-danger" onClick={() => toast.error('Account deletion coming soon. Contact support.')}>Delete Account</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
