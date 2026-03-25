'use client';

import { useState, useCallback } from 'react';
import { Globe, Copy, CheckCircle, Loader2, ExternalLink, RefreshCw, EyeOff } from 'lucide-react';
import { IPortfolio } from '@/models/Portfolio';
import { slugify } from '@/lib/utils';
import toast from 'react-hot-toast';

interface EditorProps {
  portfolio: IPortfolio;
  onUpdate: (updates: Partial<IPortfolio>) => void;
  portfolioId: string;
}

export default function PublishPanel({ portfolio, portfolioId, onUpdate }: EditorProps) {
  const [slug, setSlug] = useState(portfolio.publicSlug || '');
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const isPublished = portfolio.status === 'published';

  const checkSlug = useCallback(async (val: string) => {
    const clean = slugify(val);
    if (!clean || clean === portfolio.publicSlug) { setSlugAvailable(null); return; }
    setCheckingSlug(true);
    try {
      const res = await fetch(`/api/portfolios/${portfolioId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'check-slug', slug: clean }),
      });
      const data = await res.json();
      setSlugAvailable(data.available);
    } finally {
      setCheckingSlug(false);
    }
  }, [portfolioId, portfolio.publicSlug]);

  const publish = async () => {
    setPublishing(true);
    try {
      const cleanSlug = slugify(slug) || portfolio.publicSlug;
      const res = await fetch(`/api/portfolios/${portfolioId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'publish', slug: cleanSlug }),
      });
      const data = await res.json();
      if (res.ok) {
        onUpdate({ status: 'published', publicSlug: data.portfolio.publicSlug, publishedUrl: data.portfolio.publishedUrl });
        toast.success('🎉 Portfolio published!');
      } else {
        toast.error(data.error || 'Publish failed');
      }
    } finally {
      setPublishing(false);
    }
  };

  const unpublish = async () => {
    if (!confirm('Unpublish this portfolio? It will no longer be publicly accessible.')) return;
    setPublishing(true);
    try {
      const res = await fetch(`/api/portfolios/${portfolioId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'unpublish' }),
      });
      if (res.ok) {
        onUpdate({ status: 'draft' });
        toast.success('Portfolio unpublished');
      }
    } finally {
      setPublishing(false);
    }
  };

  const copyLink = () => {
    const url = portfolio.publishedUrl || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/p/${portfolio.publicSlug}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Status indicator */}
      <div style={{
        padding: '1.25rem', borderRadius: '14px',
        background: isPublished ? 'rgba(74,222,128,0.08)' : 'rgba(251,191,36,0.08)',
        border: `1px solid ${isPublished ? 'rgba(74,222,128,0.2)' : 'rgba(251,191,36,0.2)'}`,
        display: 'flex', alignItems: 'center', gap: '1rem',
      }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: isPublished ? 'rgba(74,222,128,0.15)' : 'rgba(251,191,36,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isPublished ? <CheckCircle size={22} color="#4ade80" /> : <Globe size={22} color="#fbbf24" />}
        </div>
        <div>
          <div style={{ fontWeight: 700, color: '#f1f5f9' }}>{isPublished ? 'Published & Live' : 'Draft — Not Public'}</div>
          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{isPublished ? portfolio.publishedAt ? `Published ${new Date(portfolio.publishedAt).toLocaleDateString()}` : 'Your portfolio is live' : 'Publish to get your public link'}</div>
        </div>
      </div>

      {/* Slug editor */}
      <div>
        <label className="label-field">Your Public URL Slug</label>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ color: '#475569', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>/p/</span>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              className="input-field"
              placeholder="your-name"
              value={slug}
              onChange={(e) => {
                const cleaned = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                setSlug(cleaned);
              }}
              onBlur={() => checkSlug(slug)}
            />
            {checkingSlug && <Loader2 size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', animation: 'spin 0.8s linear infinite' }} />}
          </div>
        </div>
        {slugAvailable === true && <p style={{ color: '#4ade80', fontSize: '0.75rem', marginTop: '0.3rem' }}>✓ This URL is available!</p>}
        {slugAvailable === false && <p style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.3rem' }}>✗ Already taken. Try another.</p>}
        <p style={{ color: '#475569', fontSize: '0.75rem', marginTop: '0.3rem' }}>
          Full URL: {process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/p/{slug || portfolio.publicSlug}
        </p>
      </div>

      {/* SEO */}
      <div>
        <label className="label-field">SEO Title</label>
        <input className="input-field" placeholder="John Doe – Full Stack Developer Portfolio"
          value={portfolio.seoTitle || ''} onChange={(e) => onUpdate({ seoTitle: e.target.value })} />
      </div>

      <div>
        <label className="label-field">SEO Description</label>
        <textarea className="input-field" placeholder="Full Stack Developer with 3 years of experience..."
          value={portfolio.seoDescription || ''} onChange={(e) => onUpdate({ seoDescription: e.target.value })}
          rows={2} style={{ resize: 'vertical', fontFamily: 'inherit' }} />
      </div>

      {/* Published link display */}
      {isPublished && (
        <div style={{ background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '12px', padding: '1rem' }}>
          <label className="label-field">Your Live Portfolio Link</label>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ flex: 1, color: '#4ade80', fontSize: '0.85rem', wordBreak: 'break-all' }}>
              {portfolio.publishedUrl || `/p/${portfolio.publicSlug}`}
            </span>
            <button className="btn-ghost" onClick={copyLink} style={{ padding: '0.375rem' }}><Copy size={15} /></button>
            <a href={portfolio.publishedUrl || `http://localhost:3000/p/${portfolio.publicSlug}`} target="_blank" rel="noopener" className="btn-ghost" style={{ padding: '0.375rem' }}>
              <ExternalLink size={15} />
            </a>
          </div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#475569' }}>
            Views: <strong style={{ color: '#fbbf24' }}>{portfolio.viewCount || 0}</strong>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <button className="btn-primary" onClick={publish} disabled={publishing}
          style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.875rem' }}>
          {publishing ? <Loader2 size={18} className="animate-spin" /> : isPublished ? <RefreshCw size={18} /> : <Globe size={18} />}
          {publishing ? 'Publishing...' : isPublished ? 'Republish Updates' : 'Publish Portfolio'}
        </button>

        {isPublished && (
          <button className="btn-danger" onClick={unpublish} disabled={publishing}
            style={{ width: '100%', justifyContent: 'center' }}>
            <EyeOff size={16} /> Unpublish
          </button>
        )}
      </div>
    </div>
  );
}
