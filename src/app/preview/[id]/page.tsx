'use client';

import { use, useEffect, useState } from 'react';
import { IPortfolio } from '@/models/Portfolio';
import PortfolioPreview from '@/components/preview/PortfolioPreview';
import { Monitor, Smartphone, ExternalLink, ArrowLeft, Pencil } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

export default function PreviewPage({ params }: Props) {
  const { id } = use(params);
  const [portfolio, setPortfolio] = useState<IPortfolio | null>(null);
  const [mode, setMode] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    fetch(`/api/portfolios/${id}`)
      .then((r) => r.json())
      .then((d) => setPortfolio(d.portfolio));
  }, [id]);

  if (!portfolio) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a14' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a14', display: 'flex', flexDirection: 'column' }}>
      {/* Bar */}
      <header style={{ height: '52px', background: 'rgba(15,15,30,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', gap: '1rem' }}>
        <Link href={`/dashboard/builder/${id}`} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontSize: '0.875rem' }}>
          <ArrowLeft size={16} /> Back to Editor
        </Link>

        <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '0.25rem' }}>
          {[{ label: 'Desktop', icon: Monitor, val: 'desktop' }, { label: 'Mobile', icon: Smartphone, val: 'mobile' }].map(({ label, icon: Icon, val }) => (
            <button key={val} onClick={() => setMode(val as any)}
              style={{ padding: '0.35rem 0.875rem', borderRadius: '7px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.375rem', transition: 'all 0.2s', background: mode === val ? 'rgba(99,102,241,0.25)' : 'transparent', color: mode === val ? '#a5b4fc' : '#64748b' }}>
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link href={`/dashboard/builder/${id}`} className="btn-secondary" style={{ textDecoration: 'none', fontSize: '0.8rem', padding: '0.4rem 0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
            <Pencil size={14} /> Edit
          </Link>
          {portfolio.status === 'published' && portfolio.publishedUrl && (
            <a href={portfolio.publishedUrl} target="_blank" rel="noopener" className="btn-primary" style={{ textDecoration: 'none', fontSize: '0.8rem', padding: '0.4rem 0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
              <ExternalLink size={14} /> Open Live
            </a>
          )}
        </div>
      </header>

      {/* Preview */}
      <div style={{ flex: 1, background: '#0d0d1a', display: 'flex', alignItems: mode === 'mobile' ? 'center' : 'stretch', justifyContent: 'center', padding: mode === 'mobile' ? '2rem' : 0 }}>
        <PortfolioPreview portfolio={portfolio} mode={mode} />
      </div>
    </div>
  );
}
