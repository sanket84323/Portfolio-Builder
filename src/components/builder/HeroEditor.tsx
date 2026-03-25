'use client';

import { useRef, useState } from 'react';
import { IPortfolio } from '@/models/Portfolio';

interface EditorProps {
  portfolio: IPortfolio;
  onUpdate: (updates: Partial<IPortfolio>) => void;
  portfolioId: string;
}

function ImageUploadBox({
  label,
  value,
  accept,
  uploadType,
  onUploaded,
  hint,
}: {
  label: string;
  value?: string;
  accept: string;
  uploadType: string;
  onUploaded: (url: string) => void;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file: File) => {
    setUploading(true);
    setError('');
    const fd = new FormData();
    fd.append('file', file);
    fd.append('type', uploadType);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) {
        onUploaded(data.url);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch {
      setError('Network error during upload');
    } finally {
      setUploading(false);
    }
  };

  const isImage = uploadType === 'image';

  return (
    <div>
      <label className="label-field">{label}</label>

      {/* Preview or drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: isImage ? '140px' : '72px',
          borderRadius: '12px',
          border: `2px dashed rgba(99,102,241,${uploading ? '0.6' : '0.25'})`,
          background: uploading ? 'rgba(99,102,241,0.07)' : 'rgba(255,255,255,0.02)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          overflow: 'hidden',
          transition: 'all 0.2s',
        }}
      >
        {isImage && value ? (
          <>
            <img
              src={value}
              alt="preview"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '10px' }}>
              <span style={{ fontSize: '1.5rem' }}>{uploading ? '⏳' : '📷'}</span>
              <span style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 600, marginTop: '0.25rem' }}>
                {uploading ? 'Uploading…' : 'Click or drop to change'}
              </span>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>{uploading ? '⏳' : isImage ? '🖼️' : '📄'}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.82rem', fontWeight: 600 }}>
              {uploading ? 'Uploading…' : 'Click or drag & drop to upload'}
            </div>
            {hint && <div style={{ color: '#475569', fontSize: '0.72rem', marginTop: '0.2rem' }}>{hint}</div>}
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {error && <p style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.35rem' }}>{error}</p>}

      {/* Also allow URL paste as fallback */}
      <input
        className="input-field"
        placeholder={isImage ? 'Or paste image URL…' : 'Or paste a URL…'}
        value={value || ''}
        onChange={(e) => onUploaded(e.target.value)}
        style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}
      />
    </div>
  );
}

export default function HeroEditor({ portfolio, onUpdate }: EditorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <p style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.6 }}>
        Your hero section is the first thing visitors see — make it count.
      </p>

      <div>
        <label className="label-field">Portfolio Title</label>
        <input className="input-field" placeholder="e.g. John's Developer Portfolio"
          value={portfolio.title || ''} onChange={(e) => onUpdate({ title: e.target.value })} />
      </div>

      <div>
        <label className="label-field">Your Name (displayed on portfolio)</label>
        <input className="input-field" placeholder="e.g. John Doe"
          value={(portfolio as any).displayName || ''} onChange={(e) => onUpdate({ displayName: e.target.value } as any)} />
      </div>

      <div>
        <label className="label-field">Role / Job Title</label>
        <input className="input-field" placeholder="e.g. Full Stack Developer | ML Engineer"
          value={portfolio.role || ''} onChange={(e) => onUpdate({ role: e.target.value })} />
      </div>

      <div>
        <label className="label-field">Tagline / Headline</label>
        <input className="input-field" placeholder="e.g. Building the future, one line of code at a time."
          value={portfolio.tagline || ''} onChange={(e) => onUpdate({ tagline: e.target.value })} />
      </div>

      <ImageUploadBox
        label="Profile Photo"
        value={portfolio.profileImage}
        accept="image/*"
        uploadType="image"
        hint="JPG, PNG, WebP — max 10MB"
        onUploaded={(url) => onUpdate({ profileImage: url })}
      />

      <ImageUploadBox
        label="Resume / CV"
        value={portfolio.resumeUrl}
        accept=".pdf,.doc,.docx"
        uploadType="resume"
        hint="PDF, DOC, DOCX — max 10MB"
        onUploaded={(url) => onUpdate({ resumeUrl: url })}
      />
    </div>
  );
}
