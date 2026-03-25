'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Loader2, Mail, Lock, User, AtSign } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', username: '', password: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    const result = await register(form.name, form.email, form.password, form.username);
    setLoading(false);
    if (result.success) {
      toast.success('Account created! Welcome to PortfolioBuilder 🎉');
      router.push('/dashboard');
    } else {
      toast.error(result.error || 'Registration failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a14', padding: '2rem' }}>
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% -10%, rgba(99,102,241,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '460px', position: 'relative' }}>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ◈ PortfolioBuilder
            </span>
          </Link>
          <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '0.9rem' }}>Create your free account — no credit card needed</p>
        </div>

        <div className="glass" style={{ borderRadius: '20px', padding: '2.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>Create Account</h1>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label className="label-field">Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input className="input-field" type="text" placeholder="Your full name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} required style={{ paddingLeft: '2.5rem' }} />
              </div>
            </div>

            <div>
              <label className="label-field">Email address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input className="input-field" type="email" placeholder="you@example.com" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} required style={{ paddingLeft: '2.5rem' }} />
              </div>
            </div>

            <div>
              <label className="label-field">Username (your public URL)</label>
              <div style={{ position: 'relative' }}>
                <AtSign size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input className="input-field" type="text" placeholder="johndoe" value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                  required style={{ paddingLeft: '2.5rem' }} />
              </div>
              {form.username && (
                <p style={{ color: '#818cf8', fontSize: '0.75rem', marginTop: '0.3rem' }}>
                  Your link: portfoliobuilder.app/p/{form.username}-xxxx
                </p>
              )}
            </div>

            <div>
              <label className="label-field">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input className="input-field" type={show ? 'text' : 'password'} placeholder="At least 6 characters" value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })} required style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} />
                <button type="button" onClick={() => setShow(!show)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#475569' }}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}
              style={{ width: '100%', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
              {loading ? <Loader2 size={18} /> : <ArrowRight size={16} />}
              {loading ? 'Creating account...' : 'Create Free Account'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
              Already have an account?{' '}
              <Link href="/login" style={{ color: '#818cf8', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
