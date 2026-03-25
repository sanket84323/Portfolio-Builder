'use client';

import { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { IPortfolio, ISkillCategory } from '@/models/Portfolio';
import { SKILL_CATEGORIES_DEFAULT } from '@/lib/constants';

interface EditorProps {
  portfolio: IPortfolio;
  onUpdate: (updates: Partial<IPortfolio>) => void;
  portfolioId: string;
}

export default function SkillsEditor({ portfolio, onUpdate }: EditorProps) {
  const categories: ISkillCategory[] = portfolio.skillCategories?.length
    ? portfolio.skillCategories
    : SKILL_CATEGORIES_DEFAULT;

  const [newSkill, setNewSkill] = useState<Record<number, string>>({});

  const updateCats = (cats: ISkillCategory[]) => onUpdate({ skillCategories: cats });

  const addSkill = (catIdx: number) => {
    const skill = newSkill[catIdx]?.trim();
    if (!skill) return;
    const updated = categories.map((c, i) =>
      i === catIdx ? { ...c, skills: [...(c.skills || []), skill] } : c
    );
    updateCats(updated);
    setNewSkill((n) => ({ ...n, [catIdx]: '' }));
  };

  const removeSkill = (catIdx: number, skillIdx: number) => {
    const updated = categories.map((c, i) =>
      i === catIdx ? { ...c, skills: c.skills.filter((_, j) => j !== skillIdx) } : c
    );
    updateCats(updated);
  };

  const addCategory = () => {
    updateCats([...categories, { name: 'New Category', skills: [] }]);
  };

  const renameCategory = (idx: number, name: string) => {
    updateCats(categories.map((c, i) => i === idx ? { ...c, name } : c));
  };

  const removeCategory = (idx: number) => {
    updateCats(categories.filter((_, i) => i !== idx));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {categories.map((cat, catIdx) => (
        <div key={catIdx} className="glass" style={{ borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <input
              className="input-field"
              value={cat.name}
              onChange={(e) => renameCategory(catIdx, e.target.value)}
              style={{ flex: 1, fontWeight: 700, background: 'transparent', border: 'none', fontSize: '0.875rem', color: '#818cf8', padding: '0.25rem 0' }}
              placeholder="Category name"
            />
            <button className="btn-ghost" onClick={() => removeCategory(catIdx)} style={{ padding: '0.25rem', color: '#ef4444' }}>
              <Trash2 size={14} />
            </button>
          </div>

          {/* Skills badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.875rem', minHeight: '32px' }}>
            {(cat.skills || []).map((skill, sIdx) => (
              <span key={sIdx} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                padding: '0.25rem 0.625rem', background: 'rgba(99,102,241,0.12)',
                border: '1px solid rgba(99,102,241,0.25)', borderRadius: '100px',
                fontSize: '0.8rem', fontWeight: 500, color: '#a5b4fc',
              }}>
                {skill}
                <button onClick={() => removeSkill(catIdx, sIdx)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', padding: 0, display: 'flex', alignItems: 'center' }}>
                  <X size={11} />
                </button>
              </span>
            ))}
            {(cat.skills || []).length === 0 && (
              <span style={{ color: '#334155', fontSize: '0.8rem' }}>No skills yet</span>
            )}
          </div>

          {/* Add skill input */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              className="input-field"
              placeholder="Add skill (e.g. React, Python)"
              value={newSkill[catIdx] || ''}
              onChange={(e) => setNewSkill((n) => ({ ...n, [catIdx]: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && addSkill(catIdx)}
              style={{ flex: 1 }}
            />
            <button className="btn-primary" onClick={() => addSkill(catIdx)} style={{ paddingLeft: '0.875rem', paddingRight: '0.875rem' }}>
              <Plus size={16} />
            </button>
          </div>
        </div>
      ))}

      <button className="btn-secondary" onClick={addCategory} style={{ width: '100%', justifyContent: 'center' }}>
        <Plus size={16} /> Add Skill Category
      </button>
    </div>
  );
}
