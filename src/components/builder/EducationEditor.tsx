'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { IPortfolio, IEducation } from '@/models/Portfolio';

interface EditorProps {
  portfolio: IPortfolio;
  onUpdate: (updates: Partial<IPortfolio>) => void;
  portfolioId: string;
}

const blank: IEducation = { institution: '', degree: '', field: '', startYear: '', endYear: '', grade: '', achievements: '' };

export default function EducationEditor({ portfolio, onUpdate }: EditorProps) {
  const education = portfolio.education || [];

  const add = () => onUpdate({ education: [...education, { ...blank }] });

  const remove = (idx: number) => {
    const updated = education.filter((_, i) => i !== idx);
    onUpdate({ education: updated });
  };

  const patch = (idx: number, field: keyof IEducation, value: string) => {
    const updated = education.map((e, i) => i === idx ? { ...e, [field]: value } : e);
    onUpdate({ education: updated });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {education.length === 0 && (
        <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)' }}>
          <p style={{ color: '#475569', fontSize: '0.875rem' }}>No education entries yet. Add your college, school, or certifications.</p>
        </div>
      )}

      {education.map((edu, idx) => (
        <div key={idx} className="glass" style={{ borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#818cf8' }}>Entry {idx + 1}</span>
            <button className="btn-danger" onClick={() => remove(idx)} style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
              <Trash2 size={13} /> Remove
            </button>
          </div>
          <div>
            <label className="label-field">Institution</label>
            <input className="input-field" placeholder="e.g. IIT Bombay" value={edu.institution}
              onChange={(e) => patch(idx, 'institution', e.target.value)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label className="label-field">Degree</label>
              <input className="input-field" placeholder="B.Tech" value={edu.degree}
                onChange={(e) => patch(idx, 'degree', e.target.value)} />
            </div>
            <div>
              <label className="label-field">Field of Study</label>
              <input className="input-field" placeholder="Computer Science" value={edu.field}
                onChange={(e) => patch(idx, 'field', e.target.value)} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label className="label-field">Start Year</label>
              <input className="input-field" placeholder="2021" value={edu.startYear}
                onChange={(e) => patch(idx, 'startYear', e.target.value)} />
            </div>
            <div>
              <label className="label-field">End Year</label>
              <input className="input-field" placeholder="2025" value={edu.endYear}
                onChange={(e) => patch(idx, 'endYear', e.target.value)} />
            </div>
            <div>
              <label className="label-field">Grade / CGPA</label>
              <input className="input-field" placeholder="9.2" value={edu.grade || ''}
                onChange={(e) => patch(idx, 'grade', e.target.value)} />
            </div>
          </div>
          <div>
            <label className="label-field">Key Achievements</label>
            <input className="input-field" placeholder="e.g. Dean's List, Best Project Award" value={edu.achievements || ''}
              onChange={(e) => patch(idx, 'achievements', e.target.value)} />
          </div>
        </div>
      ))}

      <button className="btn-secondary" onClick={add} style={{ width: '100%', justifyContent: 'center' }}>
        <Plus size={16} /> Add Education Entry
      </button>
    </div>
  );
}
