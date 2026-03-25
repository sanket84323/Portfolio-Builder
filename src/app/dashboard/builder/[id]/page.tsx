'use client';

import { useState, useEffect, useCallback, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Eye, Globe, Monitor, Smartphone, FileText, ChevronDown, ChevronUp, Loader2, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { IPortfolio } from '@/models/Portfolio';
import toast from 'react-hot-toast';

// Section editors
import HeroEditor from '@/components/builder/HeroEditor';
import AboutEditor from '@/components/builder/AboutEditor';
import EducationEditor from '@/components/builder/EducationEditor';
import SkillsEditor from '@/components/builder/SkillsEditor';
import ProjectsEditor from '@/components/builder/ProjectsEditor';
import AchievementsEditor from '@/components/builder/AchievementsEditor';
import ContactEditor from '@/components/builder/ContactEditor';
import ThemeEditor from '@/components/builder/ThemeEditor';
import PublishPanel from '@/components/builder/PublishPanel';
import PortfolioPreview from '@/components/preview/PortfolioPreview';

interface PageProps {
  params: Promise<{ id: string }>;
}

const SECTIONS = [
  { key: 'hero', label: '🌟 Hero', component: HeroEditor },
  { key: 'about', label: '👤 About', component: AboutEditor },
  { key: 'education', label: '🎓 Education', component: EducationEditor },
  { key: 'skills', label: '⚡ Skills', component: SkillsEditor },
  { key: 'projects', label: '🚀 Projects', component: ProjectsEditor },
  { key: 'achievements', label: '🏆 Achievements', component: AchievementsEditor },
  { key: 'contact', label: '📩 Contact', component: ContactEditor },
  { key: 'theme', label: '🎨 Theme & Design', component: ThemeEditor },
  { key: 'publish', label: '🌐 Publish', component: PublishPanel },
];

export default function BuilderPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { portfolio, loading, saving, lastSaved, save, update } = usePortfolio(id);
  const [activeSection, setActiveSection] = useState('hero');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [autoSaveTimer, setAutoSaveTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Autosave — debounced 3s after each update
  const scheduleAutoSave = useCallback(
    (data: Partial<IPortfolio>) => {
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
      const timer = setTimeout(() => save(data), 3000);
      setAutoSaveTimer(timer);
    },
    [autoSaveTimer, save]
  );

  // Cleanup timer
  useEffect(() => () => { if (autoSaveTimer) clearTimeout(autoSaveTimer); }, [autoSaveTimer]);

  const handleUpdate = useCallback(
    (updates: Partial<IPortfolio>) => {
      update(updates);
      scheduleAutoSave(updates);
    },
    [update, scheduleAutoSave]
  );

  const handleManualSave = async () => {
    if (!portfolio) return;
    const saved = await save(portfolio as IPortfolio);
    if (saved) toast.success('Saved!');
    else toast.error('Save failed');
  };

  if (loading || !portfolio) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a14', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: '#64748b' }}>Loading builder...</p>
      </div>
    );
  }

  const ActiveComponent = SECTIONS.find((s) => s.key === activeSection)?.component;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a14', display: 'flex', flexDirection: 'column' }}>
      {/* Builder Top Bar */}
      <header style={{
        height: '56px', background: 'rgba(15,15,30,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.25rem', gap: '1rem', position: 'sticky', top: 0, zIndex: 100,
      }}>
        {/* Left: Back + Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
          <button className="btn-ghost" onClick={() => router.push('/dashboard')} style={{ padding: '0.4rem', flexShrink: 0 }}>
            <ArrowLeft size={18} />
          </button>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {portfolio.title || 'Portfolio Builder'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: '#475569' }}>
              {saving ? (
                <><Loader2 size={11} className="animate-spin" /> Saving...</>
              ) : lastSaved ? (
                <><CheckCircle size={11} color="#4ade80" /> Saved {lastSaved.toLocaleTimeString()}</>
              ) : (
                <><AlertCircle size={11} color="#fbbf24" /> Unsaved</>
              )}
            </div>
          </div>
        </div>

        {/* Center: Preview toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '0.25rem' }}>
          <button
            onClick={() => setPreviewMode('desktop')}
            style={{ padding: '0.375rem 0.75rem', borderRadius: '7px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.375rem', transition: 'all 0.2s', background: previewMode === 'desktop' ? 'rgba(99,102,241,0.25)' : 'transparent', color: previewMode === 'desktop' ? '#a5b4fc' : '#64748b' }}
          >
            <Monitor size={14} /> Desktop
          </button>
          <button
            onClick={() => setPreviewMode('mobile')}
            style={{ padding: '0.375rem 0.75rem', borderRadius: '7px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.375rem', transition: 'all 0.2s', background: previewMode === 'mobile' ? 'rgba(99,102,241,0.25)' : 'transparent', color: previewMode === 'mobile' ? '#a5b4fc' : '#64748b' }}
          >
            <Smartphone size={14} /> Mobile
          </button>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <button className="btn-secondary" onClick={handleManualSave} disabled={saving} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save
          </button>
          <a href={`/preview/${id}`} target="_blank" rel="noopener" className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Eye size={14} /> Preview
          </a>
          <button className="btn-primary" onClick={() => setActiveSection('publish')} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
            <Globe size={14} /> Publish
          </button>
        </div>
      </header>

      {/* Split Layout */}
      <div className="builder-layout" style={{ flex: 1 }}>
        {/* Left: Editor Panel */}
        <aside className="builder-editor">
          {/* Section tabs */}
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                style={{
                  padding: '0.35rem 0.75rem', borderRadius: '8px', cursor: 'pointer',
                  fontSize: '0.75rem', fontWeight: 600, transition: 'all 0.2s',
                  background: activeSection === s.key ? 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))' : 'rgba(255,255,255,0.04)',
                  color: activeSection === s.key ? '#a5b4fc' : '#64748b',
                  border: activeSection === s.key ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Active editor */}
          <div style={{ padding: '1.25rem' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {ActiveComponent && (
                  <ActiveComponent
                    portfolio={portfolio as IPortfolio}
                    onUpdate={handleUpdate}
                    portfolioId={id}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </aside>

        {/* Right: Live Preview */}
        <div className="builder-preview">
          <div className={`preview-iframe-container ${previewMode}`} style={{ flex: 1, height: '100%', padding: '0' }}>
            <PortfolioPreview portfolio={portfolio as IPortfolio} mode={previewMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
