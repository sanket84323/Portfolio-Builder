'use client';

import { Plus, Trash2 } from 'lucide-react';
import { IPortfolio, IAchievement } from '@/models/Portfolio';
import { ACHIEVEMENT_CATEGORIES } from '@/lib/constants';

interface EditorProps {
  portfolio: IPortfolio;
  onUpdate: (updates: Partial<IPortfolio>) => void;
  portfolioId: string;
}

const blank: IAchievement = { title: '', category: 'other', description: '', date: '', link: '', issuer: '' };

export default function AchievementsEditor({ portfolio, onUpdate }: EditorProps) {
  const achievements = portfolio.achievements || [];

  const add = () => onUpdate({ achievements: [...achievements, { ...blank }] });
  const remove = (idx: number) => onUpdate({ achievements: achievements.filter((_, i) => i !== idx) });
  const patch = (idx: number, field: keyof IAchievement, value: string) =>
    onUpdate({ achievements: achievements.map((a, i) => i === idx ? { ...a, [field]: value } : a) });

  const catColors: Record<string, string> = {
    hackathon: '#f59e0b', certification: '#10b981', award: '#f43f5e',
    leadership: '#8b5cf6', internship: '#0ea5e9', other: '#64748b',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {achievements.length === 0 && (
        <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)' }}>
          <p style={{ color: '#475569', fontSize: '0.875rem' }}>Add hackathons, certifications, internships, awards and more.</p>
        </div>
      )}

      {achievements.map((ach, idx) => (
        <div key={idx} className="glass" style={{ borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', borderLeft: `3px solid ${catColors[ach.category] || '#64748b'}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <select className="input-field" value={ach.category}
              onChange={(e) => patch(idx, 'category', e.target.value)}
              style={{ flex: 1, maxWidth: '160px', color: catColors[ach.category] || '#64748b', fontWeight: 700 }}>
              {ACHIEVEMENT_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <button className="btn-danger" onClick={() => remove(idx)} style={{ padding: '0.3rem 0.6rem' }}>
              <Trash2 size={13} />
            </button>
          </div>

          <div>
            <label className="label-field">Title</label>
            <input className="input-field" placeholder="e.g. Winner – HackMIT 2024" value={ach.title}
              onChange={(e) => patch(idx, 'title', e.target.value)} />
          </div>

          <div>
            <label className="label-field">Issuer / Organization</label>
            <input className="input-field" placeholder="e.g. MIT, Coursera, Google" value={ach.issuer || ''}
              onChange={(e) => patch(idx, 'issuer', e.target.value)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label className="label-field">Date</label>
              <input className="input-field" placeholder="e.g. Oct 2024" value={ach.date || ''}
                onChange={(e) => patch(idx, 'date', e.target.value)} />
            </div>
            <div>
              <label className="label-field">Link (optional)</label>
              <input className="input-field" placeholder="https://..." value={ach.link || ''}
                onChange={(e) => patch(idx, 'link', e.target.value)} />
            </div>
          </div>

          <div>
            <label className="label-field">Description</label>
            <textarea className="input-field" placeholder="Brief description of the achievement..."
              value={ach.description} onChange={(e) => patch(idx, 'description', e.target.value)}
              rows={2} style={{ resize: 'vertical', fontFamily: 'inherit' }} />
          </div>
        </div>
      ))}

      <button className="btn-secondary" onClick={add} style={{ width: '100%', justifyContent: 'center' }}>
        <Plus size={16} /> Add Achievement
      </button>
    </div>
  );
}
