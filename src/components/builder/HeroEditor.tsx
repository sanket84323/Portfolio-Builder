'use client';

import { IPortfolio } from '@/models/Portfolio';

interface EditorProps {
  portfolio: IPortfolio;
  onUpdate: (updates: Partial<IPortfolio>) => void;
  portfolioId: string;
}

export default function HeroEditor({ portfolio, onUpdate }: EditorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <p style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.6 }}>
          Your hero section is the first thing visitors see — make it count.
        </p>
      </div>

      <div>
        <label className="label-field">Portfolio Title</label>
        <input
          className="input-field"
          placeholder="e.g. John's Developer Portfolio"
          value={portfolio.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
        />
      </div>

      <div>
        <label className="label-field">Your Name (displayed on portfolio)</label>
        <input
          className="input-field"
          placeholder="e.g. John Doe"
          value={(portfolio as any).displayName || ''}
          onChange={(e) => onUpdate({ displayName: e.target.value } as any)}
        />
      </div>

      <div>
        <label className="label-field">Role / Job Title</label>
        <input
          className="input-field"
          placeholder="e.g. Full Stack Developer | ML Engineer"
          value={portfolio.role || ''}
          onChange={(e) => onUpdate({ role: e.target.value })}
        />
      </div>

      <div>
        <label className="label-field">Tagline / Headline</label>
        <input
          className="input-field"
          placeholder="e.g. Building the future, one line of code at a time."
          value={portfolio.tagline || ''}
          onChange={(e) => onUpdate({ tagline: e.target.value })}
        />
      </div>

      <div>
        <label className="label-field">Profile Image URL</label>
        <input
          className="input-field"
          placeholder="https://example.com/your-photo.jpg"
          value={portfolio.profileImage || ''}
          onChange={(e) => onUpdate({ profileImage: e.target.value })}
        />
        <p style={{ color: '#475569', fontSize: '0.75rem', marginTop: '0.35rem' }}>
          Paste a direct image URL or use Upload below
        </p>
      </div>

      <div>
        <label className="label-field">Upload Profile Image</label>
        <input
          type="file"
          accept="image/*"
          style={{ color: '#94a3b8', fontSize: '0.85rem' }}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const fd = new FormData();
            fd.append('file', file);
            fd.append('type', 'image');
            const res = await fetch('/api/upload', { method: 'POST', body: fd });
            if (res.ok) {
              const data = await res.json();
              onUpdate({ profileImage: data.url });
            }
          }}
        />
      </div>

      <div>
        <label className="label-field">Resume URL / Upload Resume</label>
        <input
          className="input-field"
          placeholder="https://drive.google.com/... or upload below"
          value={portfolio.resumeUrl || ''}
          onChange={(e) => onUpdate({ resumeUrl: e.target.value })}
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.5rem' }}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const fd = new FormData();
            fd.append('file', file);
            fd.append('type', 'resume');
            const res = await fetch('/api/upload', { method: 'POST', body: fd });
            if (res.ok) {
              const data = await res.json();
              onUpdate({ resumeUrl: data.url });
            }
          }}
        />
      </div>
    </div>
  );
}
