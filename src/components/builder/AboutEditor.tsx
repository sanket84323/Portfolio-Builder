'use client';

import { IPortfolio } from '@/models/Portfolio';

interface EditorProps {
  portfolio: IPortfolio;
  onUpdate: (updates: Partial<IPortfolio>) => void;
  portfolioId: string;
}

export default function AboutEditor({ portfolio, onUpdate }: EditorProps) {
  const interests = portfolio.interests || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <label className="label-field">Professional Bio</label>
        <textarea
          className="input-field"
          placeholder="Write a compelling 2-3 sentence professional summary about yourself, your experience, and what makes you unique..."
          value={portfolio.about || ''}
          onChange={(e) => onUpdate({ about: e.target.value })}
          rows={5}
          style={{ resize: 'vertical', fontFamily: 'inherit' }}
        />
      </div>

      <div>
        <label className="label-field">College / University</label>
        <input className="input-field" placeholder="e.g. Indian Institute of Technology, Bombay"
          value={portfolio.college || ''} onChange={(e) => onUpdate({ college: e.target.value })} />
      </div>

      <div>
        <label className="label-field">Degree</label>
        <input className="input-field" placeholder="e.g. B.Tech in Computer Science"
          value={portfolio.degree || ''} onChange={(e) => onUpdate({ degree: e.target.value })} />
      </div>

      <div>
        <label className="label-field">Career Focus</label>
        <input className="input-field" placeholder="e.g. Full Stack Development, Machine Learning, UI/UX Design"
          value={portfolio.careerFocus || ''} onChange={(e) => onUpdate({ careerFocus: e.target.value })} />
      </div>

      <div>
        <label className="label-field">Interests (comma separated)</label>
        <input
          className="input-field"
          placeholder="e.g. Open Source, AI, Gaming, Competitive Programming"
          value={interests.join(', ')}
          onChange={(e) => onUpdate({ interests: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
        />
      </div>
    </div>
  );
}
