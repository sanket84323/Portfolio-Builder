'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Pencil, Eye, Globe, Trash2, Copy, Clock, TrendingUp, Loader2, ExternalLink, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { usePortfolios } from '@/hooks/usePortfolio';
import Sidebar from '@/components/Sidebar';
import toast from 'react-hot-toast';
import { formatDate } from '@/lib/utils';
import { IPortfolio } from '@/models/Portfolio';

export default function DashboardPage() {
  const { user } = useAuth();
  const { portfolios, loading, createPortfolio, deletePortfolio } = usePortfolios();
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [creatingResume, setCreatingResume] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCreate = async () => {
    setCreating(true);
    const p = await createPortfolio('My Portfolio');
    setCreating(false);
    if (p) {
      toast.success('Portfolio created!');
      router.push(`/dashboard/builder/${p._id}`);
    } else {
      toast.error('Failed to create portfolio');
    }
  };

  const handleCreateResume = async () => {
    setCreatingResume(true);
    const p = await createPortfolio('My Resume');
    setCreatingResume(false);
    if (p) {
      toast.success('Resume created!');
      router.push(`/dashboard/builder/${p._id}?mode=resume`);
    } else {
      toast.error('Failed to create resume');
    }
  };

  const handleDelete = (id: string, title: string) => {
    toast((t) => (
      <div>
        <p style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Delete "{title}"? This cannot be undone.</p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <button onClick={() => toast.dismiss(t.id)} className="btn-ghost" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>Cancel</button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              toast.loading('Deleting...', { id: 'delete' });
              await deletePortfolio(id);
              toast.success('Portfolio deleted', { id: 'delete' });
            }}
            className="btn-danger"
            style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
          >
            Delete
          </button>
        </div>
      </div>
    ), { duration: Infinity, style: { background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } });
  };

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('Link copied!');
  };

  const published = portfolios.filter((p) => p.status === 'published');
  const drafts = portfolios.filter((p) => p.status !== 'published');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a14' }}>
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setMobileOpen(true)} className="btn-ghost" style={{ display: 'none', padding: '0.4rem' }} id="mobile-menu-btn">
              <Menu size={20} />
            </button>
            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9' }}>Dashboard</h1>
              <p style={{ color: '#475569', fontSize: '0.8rem' }}>Good to see you, {user?.name?.split(' ')[0]}!</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-primary" onClick={handleCreate} disabled={creating || creatingResume} style={{ fontSize: '0.875rem', padding: '0.6rem 1rem' }}>
              {creating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              {creating ? 'Creating...' : 'New Portfolio'}
            </button>
            <button className="btn-primary" onClick={handleCreateResume} disabled={creating || creatingResume} style={{ fontSize: '0.875rem', padding: '0.6rem 1rem', background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              {creatingResume ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              {creatingResume ? 'Creating...' : 'New Resume'}
            </button>
          </div>
        </header>

        <div style={{ padding: '2rem' }}>
          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {[
              { label: 'Total Portfolios', value: portfolios.length, icon: Globe, color: '#6366f1' },
              { label: 'Published', value: published.length, icon: TrendingUp, color: '#10b981' },
              { label: 'Total Views', value: portfolios.reduce((a, p) => a + (p.viewCount || 0), 0), icon: Eye, color: '#f59e0b' },
              { label: 'Drafts', value: drafts.length, icon: Clock, color: '#8b5cf6' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="glass" style={{ borderRadius: '16px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} color={color} />
                </div>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>{label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Portfolios */}
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass loading-shimmer" style={{ borderRadius: '16px', height: '220px' }} />
              ))}
            </div>
          ) : portfolios.length === 0 ? (
            /* Empty state */
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              style={{ textAlign: 'center', padding: '5rem 2rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>Create your first portfolio</h2>
              <p style={{ color: '#64748b', maxWidth: '400px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                Build a stunning, customizable portfolio that gets you noticed by recruiters and clients.
              </p>
              <button className="btn-primary" onClick={handleCreate} disabled={creating} style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
                {creating ? <Loader2 size={18} /> : <Plus size={18} />}
                {creating ? 'Creating...' : 'Create Portfolio'}
              </button>
            </motion.div>
          ) : (
            <div>
              {/* Published section */}
              {published.length > 0 && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#4ade80', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                    Published
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
                    {published.map((p) => <PortfolioCard key={p._id.toString()} portfolio={p} onDelete={handleDelete} onCopyLink={copyLink} router={router} />)}
                  </div>
                </div>
              )}

              {/* Drafts section */}
              {drafts.length > 0 && (
                <div>
                  <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#fbbf24', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24', display: 'inline-block' }} />
                    Drafts
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
                    {drafts.map((p) => <PortfolioCard key={p._id.toString()} portfolio={p} onDelete={handleDelete} onCopyLink={copyLink} router={router} />)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

function PortfolioCard({ portfolio, onDelete, onCopyLink, router }: {
  portfolio: IPortfolio;
  onDelete: (id: string, title: string) => void;
  onCopyLink: (url: string) => void;
  router: ReturnType<typeof useRouter>;
}) {
  const id = portfolio._id.toString();
  const isPublished = portfolio.status === 'published';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass card-hover"
      style={{ borderRadius: '16px', overflow: 'hidden', border: `1px solid ${isPublished ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.06)'}` }}>
      {/* Color strip based on theme */}
      <div style={{ height: '5px', background: isPublished ? 'linear-gradient(90deg, #10b981, #4ade80)' : 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.2rem' }}>
              {portfolio.title || 'Untitled Portfolio'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Updated {formatDate(portfolio.updatedAt)}</p>
          </div>
          <span className={isPublished ? 'badge-published' : 'badge-draft'}>
            {isPublished ? '● Live' : '● Draft'}
          </span>
        </div>

        {portfolio.tagline && (
          <p style={{ color: '#475569', fontSize: '0.875rem', marginBottom: '0.75rem', lineHeight: 1.5 }}>
            {portfolio.tagline}
          </p>
        )}

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.75rem', color: '#475569' }}>
          <span>{portfolio.projects?.length || 0} projects</span>
          <span>·</span>
          <span>{portfolio.skillCategories?.length || 0} skill categories</span>
          {isPublished && <><span>·</span><span style={{ color: '#fbbf24' }}>{portfolio.viewCount || 0} views</span></>}
        </div>

        {/* Published URL */}
        {isPublished && portfolio.publishedUrl && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.12)', borderRadius: '8px', marginBottom: '1rem' }}>
            <span style={{ color: '#4ade80', fontSize: '0.75rem', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {portfolio.publishedUrl.replace('http://localhost:3000', '')}
            </span>
            <button onClick={() => onCopyLink(portfolio.publishedUrl || '')} className="btn-ghost" style={{ padding: '0.2rem', color: '#4ade80' }}>
              <Copy size={13} />
            </button>
            <a href={portfolio.publishedUrl} target="_blank" rel="noopener" className="btn-ghost" style={{ padding: '0.2rem', color: '#4ade80' }}>
              <ExternalLink size={13} />
            </a>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => router.push(`/dashboard/builder/${id}`)} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', flex: 1 }}>
            <Pencil size={14} /> Edit
          </button>
          <a href={`/preview/${id}`} target="_blank" rel="noopener" className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.5rem 0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
            <Eye size={14} /> Preview
          </a>
          <button className="btn-danger" onClick={() => onDelete(id, portfolio.title)} style={{ padding: '0.5rem 0.75rem' }}>
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
