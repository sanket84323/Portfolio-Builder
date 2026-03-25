'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Pencil, Eye, Trash2, Copy, ExternalLink, Menu, Loader2 } from 'lucide-react';
import { usePortfolios } from '@/hooks/usePortfolio';
import Sidebar from '@/components/Sidebar';
import { formatDate } from '@/lib/utils';
import { IPortfolio } from '@/models/Portfolio';
import toast from 'react-hot-toast';

export default function PortfoliosPage() {
  const router = useRouter();
  const { portfolios, loading, createPortfolio, deletePortfolio } = usePortfolios();
  const [creating, setCreating] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCreate = async () => {
    setCreating(true);
    const p = await createPortfolio('My Portfolio');
    setCreating(false);
    if (p) { toast.success('Portfolio created!'); router.push(`/dashboard/builder/${p._id}`); }
    else toast.error('Failed to create portfolio');
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

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a14' }}>
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="dashboard-main">
        <header className="dashboard-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setMobileOpen(true)} className="btn-ghost" style={{ padding: '0.4rem' }}>
              <Menu size={20} />
            </button>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>My Portfolios</h1>
          </div>
          <button className="btn-primary" onClick={handleCreate} disabled={creating} style={{ fontSize: '0.875rem', padding: '0.6rem 1.25rem' }}>
            {creating ? <Loader2 size={16} /> : <Plus size={16} />} New Portfolio
          </button>
        </header>

        <div style={{ padding: '2rem' }}>
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
              {[1,2,3].map(i => <div key={i} className="glass loading-shimmer" style={{ borderRadius: '16px', height: '200px' }} />)}
            </div>
          ) : portfolios.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>No portfolios yet</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Create your first portfolio to get started.</p>
              <button className="btn-primary" onClick={handleCreate} style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
                <Plus size={18} /> Create Portfolio
              </button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
              {portfolios.map((p) => (
                <PortfolioCard key={p._id.toString()} portfolio={p}
                  onDelete={handleDelete} router={router}
                  onCopy={(url) => { navigator.clipboard.writeText(url); toast.success('Copied!'); }} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function PortfolioCard({ portfolio, onDelete, router, onCopy }: {
  portfolio: IPortfolio; onDelete: (id: string, title: string) => void;
  router: ReturnType<typeof useRouter>; onCopy: (url: string) => void;
}) {
  const id = portfolio._id.toString();
  const isPublished = portfolio.status === 'published';
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass card-hover"
      style={{ borderRadius: '16px', overflow: 'hidden', border: `1px solid ${isPublished ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.06)'}` }}>
      <div style={{ height: '5px', background: isPublished ? 'linear-gradient(90deg,#10b981,#4ade80)' : 'linear-gradient(90deg,#6366f1,#8b5cf6)' }} />
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <div>
            <h3 style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: '0.2rem' }}>{portfolio.title || 'Untitled'}</h3>
            <p style={{ fontSize: '0.775rem', color: '#64748b' }}>Updated {formatDate(portfolio.updatedAt)}</p>
          </div>
          <span className={isPublished ? 'badge-published' : 'badge-draft'}>{isPublished ? '● Live' : '● Draft'}</span>
        </div>

        {isPublished && portfolio.publishedUrl && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 0.75rem', background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.12)', borderRadius: '8px', marginBottom: '1rem' }}>
            <span style={{ color: '#4ade80', fontSize: '0.75rem', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              /p/{portfolio.publicSlug}
            </span>
            <button onClick={() => onCopy(portfolio.publishedUrl || '')} className="btn-ghost" style={{ padding: '0.15rem', color: '#4ade80' }}><Copy size={13} /></button>
            <a href={portfolio.publishedUrl} target="_blank" rel="noopener" className="btn-ghost" style={{ padding: '0.15rem', color: '#4ade80' }}><ExternalLink size={13} /></a>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.5rem' }}>
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
