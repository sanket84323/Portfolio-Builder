'use client';

import { IPortfolio, IThemeSettings } from '@/models/Portfolio';
import {
  TEMPLATE_THEMES, FONT_OPTIONS, FONT_SIZE_OPTIONS,
  HERO_LAYOUT_OPTIONS, BG_PATTERN_OPTIONS,
} from '@/lib/constants';

interface EditorProps {
  portfolio: IPortfolio;
  onUpdate: (updates: Partial<IPortfolio>) => void;
  portfolioId: string;
}

const CARD_STYLES = ['flat', 'raised', 'bordered', 'glass'];
const BTN_STYLES = ['solid', 'outline', 'gradient', 'ghost'];
const SPACING = ['compact', 'normal', 'relaxed'];
const BORDER_RADII = [
  { label: 'None', value: 'none' }, { label: 'S', value: 'sm' },
  { label: 'M', value: 'md' }, { label: 'L', value: 'lg' }, { label: 'Full', value: 'full' },
];
const NAV_STYLES = ['floating', 'solid', 'minimal', 'none'];
const SECTIONS = ['about', 'education', 'skills', 'projects', 'achievements', 'contact'] as const;

function ColorSwatch({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="label-field">{label}</label>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input type="color" value={value || '#6366f1'} onChange={(e) => onChange(e.target.value)}
          style={{ width: '38px', height: '34px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', padding: '2px', background: 'transparent' }} />
        <input className="input-field" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="#6366f1" style={{ flex: 1 }} />
      </div>
    </div>
  );
}

function Toggle({ label, desc, value, onChange }: { label: string; desc?: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#f1f5f9' }}>{label}</div>
        {desc && <div style={{ fontSize: '0.75rem', color: '#475569' }}>{desc}</div>}
      </div>
      <button onClick={() => onChange(!value)}
        style={{ width: '44px', height: '24px', borderRadius: '100px', border: 'none', cursor: 'pointer', background: value ? '#6366f1' : '#334155', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.2s', left: value ? '22px' : '2px' }} />
      </button>
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', marginTop: '0.5rem' }}>
      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{children}</span>
      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
    </div>
  );
}

export default function ThemeEditor({ portfolio, onUpdate }: EditorProps) {
  const theme: Partial<IThemeSettings> = portfolio.themeSettings || {};

  const updateTheme = (field: keyof IThemeSettings, value: string | boolean | number | object) =>
    onUpdate({ themeSettings: { ...theme, [field]: value } as IThemeSettings });

  const updateVisibility = (section: string, val: boolean) => {
    const current = (theme.sectionVisibility || {}) as Record<string, boolean>;
    updateTheme('sectionVisibility', { ...current, [section]: val });
  };

  const applyTemplate = (key: string) => {
    const t = TEMPLATE_THEMES[key];
    if (!t) return;
    onUpdate({
      themeSettings: {
        ...theme,
        primaryColor: t.primaryColor,
        accentColor: t.accentColor,
        backgroundColor: t.backgroundColor,
        textColor: t.textColor,
        fontFamily: t.fontFamily,
        cardStyle: t.cardStyle as IThemeSettings['cardStyle'],
        buttonStyle: t.buttonStyle as IThemeSettings['buttonStyle'],
        darkMode: t.darkMode,
        template: t.template,
        heroLayout: t.heroLayout as IThemeSettings['heroLayout'],
        bgPattern: t.bgPattern as IThemeSettings['bgPattern'],
        useGradientBg: t.useGradientBg,
        navStyle: t.navStyle as IThemeSettings['navStyle'],
        borderRadius: t.borderRadius as IThemeSettings['borderRadius'],
        sectionSpacing: t.sectionSpacing as IThemeSettings['sectionSpacing'],
      } as IThemeSettings,
    });
  };

  const visibility = (theme.sectionVisibility || {}) as Record<string, boolean>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* ── ATS RESUME TEMPLATES ── */}
      <SectionHeader>ATS Resume Templates</SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem', marginBottom: '1rem' }}>
        {[
          { id: 'classic', name: 'Harvard Classic', desc: 'Times New Roman, centered headers. The gold standard for ATS.' },
          { id: 'modern', name: 'Modern Sans', desc: 'Arial, clean alignment, subtle separation rules.' },
          { id: 'tech', name: 'Tech Minimal', desc: 'Monospace headers, highly compact and data dense.' },
          { id: 'executive', name: 'Executive Serif', desc: 'Elegant traditional typography, highly polished layout.' },
          { id: 'creative', name: 'Creative Bold', desc: 'Modern layout with clean spacing and subtle accents.' },
          { id: 'academic', name: 'Academic CV', desc: 'Comprehensive, clean structure for research & academia.' }
        ].map(t => (
          <button key={t.id} onClick={() => updateTheme('resumeTheme', t.id)}
            style={{ padding: '0.6rem 0.75rem', borderRadius: '10px', cursor: 'pointer', textAlign: 'left', background: (theme.resumeTheme || 'classic') === t.id ? `rgba(99,102,241,0.18)` : 'rgba(255,255,255,0.03)', border: `1px solid ${(theme.resumeTheme || 'classic') === t.id ? '#6366f1' : 'rgba(255,255,255,0.07)'}`, transition: 'all 0.18s', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: (theme.resumeTheme || 'classic') === t.id ? '#818cf8' : '#f1f5f9', marginBottom: '2px' }}>{t.name}</span>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{t.desc}</span>
          </button>
        ))}
      </div>

      {/* ── WEB PORTFOLIO TEMPLATES ── */}
      <SectionHeader>Web Portfolio Templates</SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        {Object.entries(TEMPLATE_THEMES).map(([key, t]) => (
          <button key={key} onClick={() => applyTemplate(key)}
            style={{ padding: '0.6rem 0.75rem', borderRadius: '10px', cursor: 'pointer', textAlign: 'left', background: theme.template === key ? `${t.primaryColor}18` : 'rgba(255,255,255,0.03)', border: `1px solid ${theme.template === key ? t.primaryColor : 'rgba(255,255,255,0.07)'}`, transition: 'all 0.18s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.15rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: t.primaryColor, flexShrink: 0 }} />
              <span style={{ fontWeight: 700, fontSize: '0.78rem', color: theme.template === key ? t.primaryColor : '#cbd5e1', lineHeight: 1.2 }}>{t.name}</span>
            </div>
            <span style={{ fontSize: '0.67rem', color: '#334155', lineHeight: 1.3, display: 'block' }}>{t.description}</span>
          </button>
        ))}
      </div>

      {/* ── COLORS ── */}
      <SectionHeader>Colors</SectionHeader>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <ColorSwatch label="Primary Color" value={theme.primaryColor || '#6366f1'} onChange={(v) => updateTheme('primaryColor', v)} />
        <ColorSwatch label="Accent Color" value={theme.accentColor || '#8b5cf6'} onChange={(v) => updateTheme('accentColor', v)} />
        <ColorSwatch label="Background Color" value={theme.backgroundColor || '#0f0f1a'} onChange={(v) => updateTheme('backgroundColor', v)} />
        <ColorSwatch label="Text Color" value={theme.textColor || '#f8fafc'} onChange={(v) => updateTheme('textColor', v)} />
      </div>

      {/* Gradient BG */}
      <Toggle label="Gradient Background" desc="Replace flat background with a gradient" value={!!theme.useGradientBg} onChange={(v) => updateTheme('useGradientBg', v)} />
      {theme.useGradientBg && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '0.75rem', borderLeft: '2px solid rgba(99,102,241,0.3)' }}>
          <ColorSwatch label="Gradient Start" value={theme.gradientStart || '#6366f1'} onChange={(v) => updateTheme('gradientStart', v)} />
          <ColorSwatch label="Gradient End" value={theme.gradientEnd || '#0f0f1a'} onChange={(v) => updateTheme('gradientEnd', v)} />
          <div>
            <label className="label-field">Angle: {theme.gradientAngle ?? 135}°</label>
            <input type="range" min={0} max={360} value={theme.gradientAngle ?? 135}
              onChange={(e) => updateTheme('gradientAngle', Number(e.target.value))}
              style={{ width: '100%', accentColor: theme.primaryColor || '#6366f1' }} />
          </div>
        </div>
      )}

      {/* bg pattern */}
      <div>
        <label className="label-field" style={{ marginBottom: '0.5rem' }}>Background Pattern</label>
        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
          {BG_PATTERN_OPTIONS.map((p) => (
            <button key={p.value} onClick={() => updateTheme('bgPattern', p.value)}
              style={{ padding: '0.3rem 0.7rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, background: theme.bgPattern === p.value ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.04)', color: theme.bgPattern === p.value ? '#a5b4fc' : '#64748b', borderWidth: '1px', borderStyle: 'solid', borderColor: theme.bgPattern === p.value ? 'rgba(99,102,241,0.4)' : 'transparent', transition: 'all 0.15s' }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── TYPOGRAPHY ── */}
      <SectionHeader>Typography</SectionHeader>
      <div>
        <label className="label-field">Font Family</label>
        <select className="input-field" value={theme.fontFamily || 'Inter'} onChange={(e) => updateTheme('fontFamily', e.target.value)}>
          {FONT_OPTIONS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
        </select>
      </div>
      <div>
        <label className="label-field" style={{ marginBottom: '0.5rem' }}>Base Font Size</label>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {FONT_SIZE_OPTIONS.map((s) => (
            <button key={s.value} onClick={() => updateTheme('fontSize', s.value)}
              style={{ flex: 1, padding: '0.4rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, background: (theme.fontSize || 'md') === s.value ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.04)', color: (theme.fontSize || 'md') === s.value ? '#a5b4fc' : '#64748b', borderWidth: '1px', borderStyle: 'solid', borderColor: (theme.fontSize || 'md') === s.value ? 'rgba(99,102,241,0.4)' : 'transparent' }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── LAYOUT ── */}
      <SectionHeader>Layout & Style</SectionHeader>

      {/* Hero Layout */}
      <div>
        <label className="label-field" style={{ marginBottom: '0.5rem' }}>Hero Section Layout</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
          {HERO_LAYOUT_OPTIONS.map((opt) => (
            <button key={opt.value} onClick={() => updateTheme('heroLayout', opt.value)}
              style={{ padding: '0.6rem 0.75rem', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left', background: (theme.heroLayout || 'centered') === opt.value ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.03)', borderWidth: '1px', borderStyle: 'solid', borderColor: (theme.heroLayout || 'centered') === opt.value ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.07)', transition: 'all 0.15s' }}>
              <div style={{ fontWeight: 700, fontSize: '0.8rem', color: (theme.heroLayout || 'centered') === opt.value ? '#a5b4fc' : '#cbd5e1' }}>{opt.label}</div>
              <div style={{ fontSize: '0.7rem', color: '#475569', marginTop: '0.1rem' }}>{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Nav Style */}
      <div>
        <label className="label-field" style={{ marginBottom: '0.5rem' }}>Navigation Style</label>
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {NAV_STYLES.map((s) => (
            <button key={s} onClick={() => updateTheme('navStyle', s)}
              style={{ flex: 1, padding: '0.4rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, textTransform: 'capitalize', background: (theme.navStyle || 'floating') === s ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.04)', color: (theme.navStyle || 'floating') === s ? '#a5b4fc' : '#64748b', borderWidth: '1px', borderStyle: 'solid', borderColor: (theme.navStyle || 'floating') === s ? 'rgba(99,102,241,0.4)' : 'transparent' }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Card, Button, Spacing, Corner */}
      <div>
        <label className="label-field" style={{ marginBottom: '0.5rem' }}>Card Style</label>
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {CARD_STYLES.map((s) => (
            <button key={s} onClick={() => updateTheme('cardStyle', s)}
              style={{ flex: 1, padding: '0.4rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, textTransform: 'capitalize', background: theme.cardStyle === s ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.04)', color: theme.cardStyle === s ? '#a5b4fc' : '#64748b', borderWidth: '1px', borderStyle: 'solid', borderColor: theme.cardStyle === s ? 'rgba(99,102,241,0.4)' : 'transparent' }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label-field" style={{ marginBottom: '0.5rem' }}>Button Style</label>
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {BTN_STYLES.map((s) => (
            <button key={s} onClick={() => updateTheme('buttonStyle', s)}
              style={{ flex: 1, padding: '0.4rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, textTransform: 'capitalize', background: theme.buttonStyle === s ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.04)', color: theme.buttonStyle === s ? '#a5b4fc' : '#64748b', borderWidth: '1px', borderStyle: 'solid', borderColor: theme.buttonStyle === s ? 'rgba(99,102,241,0.4)' : 'transparent' }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label-field" style={{ marginBottom: '0.5rem' }}>Corner Radius</label>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {BORDER_RADII.map((r) => (
            <button key={r.value} onClick={() => updateTheme('borderRadius', r.value)}
              style={{ flex: 1, padding: '0.4rem', borderRadius: r.value === 'full' ? '100px' : r.value === 'lg' ? '12px' : r.value === 'md' ? '8px' : r.value === 'sm' ? '4px' : '0', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, background: (theme.borderRadius || 'lg') === r.value ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.04)', color: (theme.borderRadius || 'lg') === r.value ? '#a5b4fc' : '#64748b', borderWidth: '1px', borderStyle: 'solid', borderColor: (theme.borderRadius || 'lg') === r.value ? 'rgba(99,102,241,0.4)' : 'transparent' }}>
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label-field" style={{ marginBottom: '0.5rem' }}>Section Spacing</label>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {SPACING.map((s) => (
            <button key={s} onClick={() => updateTheme('sectionSpacing', s)}
              style={{ flex: 1, padding: '0.4rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, textTransform: 'capitalize', background: (theme.sectionSpacing || 'normal') === s ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.04)', color: (theme.sectionSpacing || 'normal') === s ? '#a5b4fc' : '#64748b', borderWidth: '1px', borderStyle: 'solid', borderColor: (theme.sectionSpacing || 'normal') === s ? 'rgba(99,102,241,0.4)' : 'transparent' }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── SECTION VISIBILITY ── */}
      <SectionHeader>Section Visibility</SectionHeader>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {SECTIONS.map((s) => (
          <Toggle key={s} label={s.charAt(0).toUpperCase() + s.slice(1)} value={visibility[s] !== false}
            onChange={(v) => updateVisibility(s, v)} />
        ))}
      </div>

      {/* ── EFFECTS & TOGGLES ── */}
      <SectionHeader>Effects</SectionHeader>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Toggle label="Dark Mode" desc="Enable dark background" value={theme.darkMode !== false} onChange={(v) => updateTheme('darkMode', v)} />
        <Toggle label="Animations" desc="Smooth scroll & entrance effects" value={theme.animationsEnabled !== false} onChange={(v) => updateTheme('animationsEnabled', v)} />
        <Toggle label="Skill Level Bars" desc="Show progress bars next to skills" value={!!theme.showSkillBars} onChange={(v) => updateTheme('showSkillBars', v)} />
      </div>

      {/* ── CUSTOM CSS ── */}
      <SectionHeader>Advanced</SectionHeader>
      <div>
        <label className="label-field">Custom CSS</label>
        <textarea
          className="input-field"
          placeholder={`/* Add custom CSS overrides */\nbody { letter-spacing: 0.02em; }\n.card { opacity: 0.95; }`}
          value={theme.customCSS || ''}
          onChange={(e) => updateTheme('customCSS', e.target.value)}
          rows={6}
          style={{ resize: 'vertical', fontFamily: 'Fira Code, monospace', fontSize: '0.78rem' }}
        />
        <p style={{ color: '#475569', fontSize: '0.72rem', marginTop: '0.3rem' }}>
          Raw CSS injected into the published portfolio &lt;head&gt;. Use with care.
        </p>
      </div>
    </div>
  );
}
