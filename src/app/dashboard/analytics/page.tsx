'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Eye, TrendingUp, Menu, Globe } from 'lucide-react';
import { usePortfolios } from '@/hooks/usePortfolio';
import Sidebar from '@/components/Sidebar';
import { formatDate } from '@/lib/utils';

export default function AnalyticsPage() {
  const { portfolios, loading } = usePortfolios();
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalViews = portfolios.reduce((a, p) => a + (p.viewCount || 0), 0);
  const published = portfolios.filter((p) => p.status === 'published');
  const mostViewed = [...portfolios].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))[0];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a14' }}>
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="dashboard-main">
        <header className="dashboard-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setMobileOpen(true)} className="btn-ghost" style={{ padding: '0.4rem' }}><Menu size={20} /></button>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Analytics</h1>
          </div>
        </header>

        <div style={{ padding: '2rem' }}>
          {/* Summary cards */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {[
              { label: 'Total Views', value: totalViews, icon: Eye, color: '#f59e0b' },
              { label: 'Published Portfolios', value: published.length, icon: Globe, color: '#10b981' },
              { label: 'Total Portfolios', value: portfolios.length, icon: BarChart2, color: '#6366f1' },
              { label: 'Avg Views', value: published.length ? Math.round(totalViews / published.length) : 0, icon: TrendingUp, color: '#8b5cf6' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="glass" style={{ borderRadius: '16px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} color={color} />
                </div>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white' }}>{value}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Per-portfolio breakdown */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', color: '#f1f5f9' }}>Portfolio Performance</h2>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[1,2].map(i => <div key={i} className="glass loading-shimmer" style={{ borderRadius: '12px', height: '70px' }} />)}
              </div>
            ) : portfolios.length === 0 ? (
              <div className="glass" style={{ borderRadius: '16px', padding: '3rem', textAlign: 'center' }}>
                <p style={{ color: '#64748b' }}>No portfolios yet. Create one to see analytics.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {portfolios.map((p) => {
                  const maxViews = Math.max(...portfolios.map((x) => x.viewCount || 0), 1);
                  const pct = ((p.viewCount || 0) / maxViews) * 100;
                  return (
                    <div key={p._id.toString()} className="glass" style={{ borderRadius: '14px', padding: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <div>
                          <span style={{ fontWeight: 700, color: '#f1f5f9' }}>{p.title}</span>
                          <span style={{ marginLeft: '0.75rem' }} className={p.status === 'published' ? 'badge-published' : 'badge-draft'}>
                            {p.status === 'published' ? '● Live' : '● Draft'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Eye size={14} color="#fbbf24" />
                          <span style={{ fontWeight: 700, color: '#fbbf24' }}>{p.viewCount || 0}</span>
                          <span style={{ color: '#64748b', fontSize: '0.8rem' }}>views</span>
                        </div>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '100px', overflow: 'hidden' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.3, duration: 0.8 }}
                          style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', borderRadius: '100px' }} />
                      </div>
                      {p.status === 'published' && p.publishedUrl && (
                        <a href={p.publishedUrl} target="_blank" rel="noopener" style={{ fontSize: '0.75rem', color: '#4ade80', marginTop: '0.5rem', display: 'inline-block', textDecoration: 'none' }}>
                          {p.publishedUrl.replace('http://localhost:3000', '')} ↗
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
