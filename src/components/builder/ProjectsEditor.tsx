'use client';

import { useRef, useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Video, Link2, GitBranch, ExternalLink } from 'lucide-react';
import { IPortfolio, IProject } from '@/models/Portfolio';

interface EditorProps {
  portfolio: IPortfolio;
  onUpdate: (updates: Partial<IPortfolio>) => void;
  portfolioId: string;
}

const blank: IProject = {
  title: '', description: '', image: '', techStack: [], githubLink: '', liveLink: '',
  videoUrl: '', videoThumbnail: '', videoDescription: '', videoType: 'youtube',
};

function ImageUploadBox({ value, onUploaded }: { value?: string; onUploaded: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('type', 'image');
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    if (res.ok) { const d = await res.json(); onUploaded(d.url); }
    setUploading(false);
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); }}
        style={{ position: 'relative', width: '100%', height: '110px', borderRadius: '10px', border: '2px dashed rgba(99,102,241,0.25)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden' }}>
        {value ? (
          <>
            <img src={value} alt="preview" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
              <span style={{ fontSize: '1.2rem' }}>{uploading ? '⏳' : '📷'}</span>
              <span style={{ color: '#fff', fontSize: '0.72rem', fontWeight: 600, marginTop: '0.2rem' }}>{uploading ? 'Uploading…' : 'Click to change'}</span>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem' }}>{uploading ? '⏳' : '🖼️'}</div>
            <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.2rem' }}>{uploading ? 'Uploading…' : 'Click or drag image to upload'}</div>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
      <input className="input-field" placeholder="Or paste image URL…" value={value || ''} onChange={(e) => onUploaded(e.target.value)} style={{ marginTop: '0.4rem', fontSize: '0.78rem' }} />
    </div>
  );
}

export default function ProjectsEditor({ portfolio, onUpdate }: EditorProps) {
  const projects = portfolio.projects || [];
  const [expanded, setExpanded] = useState<number | null>(null);

  const add = () => {
    onUpdate({ projects: [...projects, { ...blank }] });
    setExpanded(projects.length);
  };

  const remove = (idx: number) => {
    onUpdate({ projects: projects.filter((_, i) => i !== idx) });
    if (expanded === idx) setExpanded(null);
  };

  const patch = (idx: number, field: keyof IProject, value: string | string[] | boolean) => {
    onUpdate({ projects: projects.map((p, i) => i === idx ? { ...p, [field]: value } : p) });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
      {projects.length === 0 && (
        <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)' }}>
          <p style={{ color: '#475569', fontSize: '0.875rem' }}>Add your projects — include demos, GitHub links, and videos!</p>
        </div>
      )}

      {projects.map((proj, idx) => (
        <div key={idx} className="glass" style={{ borderRadius: '12px', overflow: 'hidden' }}>
          {/* Accordion header */}
          <div
            onClick={() => setExpanded(expanded === idx ? null : idx)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.25rem', cursor: 'pointer', userSelect: 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {proj.videoUrl && <Video size={14} color="#818cf8" />}
              <span style={{ fontWeight: 600, color: '#f1f5f9', fontSize: '0.9rem' }}>
                {proj.title || `Project ${idx + 1}`}
              </span>
              {proj.techStack?.length > 0 && (
                <span style={{ fontSize: '0.7rem', color: '#475569' }}>({proj.techStack.slice(0, 3).join(', ')})</span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button className="btn-danger" onClick={(e) => { e.stopPropagation(); remove(idx); }} style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>
                <Trash2 size={12} />
              </button>
              {expanded === idx ? <ChevronUp size={16} color="#475569" /> : <ChevronDown size={16} color="#475569" />}
            </div>
          </div>

          {expanded === idx && (
            <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '0.875rem', paddingTop: '1rem' }}>
              <div>
                <label className="label-field">Project Title</label>
                <input className="input-field" placeholder="e.g. AI Resume Analyzer" value={proj.title}
                  onChange={(e) => patch(idx, 'title', e.target.value)} />
              </div>

              <div>
                <label className="label-field">Description</label>
                <textarea className="input-field" placeholder="What does this project do? What problem does it solve? What impact did it have?" value={proj.description}
                  onChange={(e) => patch(idx, 'description', e.target.value)} rows={3} style={{ resize: 'vertical', fontFamily: 'inherit' }} />
              </div>

              <div>
                <label className="label-field">Tech Stack (comma separated)</label>
                <input className="input-field" placeholder="React, Node.js, MongoDB, TensorFlow"
                  value={proj.techStack?.join(', ') || ''}
                  onChange={(e) => patch(idx, 'techStack', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))} />
              </div>

              {/* Project image */}
              <div>
                <label className="label-field">Project Screenshot / Image</label>
                <ImageUploadBox value={proj.image || ''} onUploaded={(url) => patch(idx, 'image', url)} />
              </div>

              {/* Links */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label className="label-field"><GitBranch size={12} style={{ display: 'inline', marginRight: '0.3rem' }} />GitHub Link</label>
                  <input className="input-field" placeholder="https://github.com/..." value={proj.githubLink || ''}
                    onChange={(e) => patch(idx, 'githubLink', e.target.value)} />
                </div>
                <div>
                  <label className="label-field"><ExternalLink size={12} style={{ display: 'inline', marginRight: '0.3rem' }} />Live Demo Link</label>
                  <input className="input-field" placeholder="https://yourproject.com" value={proj.liveLink || ''}
                    onChange={(e) => patch(idx, 'liveLink', e.target.value)} />
                </div>
              </div>

              {/* ——— VIDEO SECTION ——— */}
              <div style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Video size={16} color="#818cf8" />
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#818cf8' }}>Demo Video</span>
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                  <label className="label-field">Video Type</label>
                  <select className="input-field" value={proj.videoType || 'youtube'}
                    onChange={(e) => patch(idx, 'videoType', e.target.value)}>
                    <option value="youtube">YouTube Link</option>
                    <option value="vimeo">Vimeo Link</option>
                    <option value="upload">Upload MP4/WebM</option>
                  </select>
                </div>

                {(proj.videoType === 'youtube' || proj.videoType === 'vimeo') && (
                  <div style={{ marginBottom: '0.75rem' }}>
                    <label className="label-field">Video URL</label>
                    <input className="input-field"
                      placeholder={proj.videoType === 'youtube' ? 'https://youtube.com/watch?v=...' : 'https://vimeo.com/...'}
                      value={proj.videoUrl || ''}
                      onChange={(e) => patch(idx, 'videoUrl', e.target.value)} />
                  </div>
                )}

                {proj.videoType === 'upload' && (
                  <div style={{ marginBottom: '0.75rem' }}>
                    <label className="label-field">Upload Video (MP4/WebM, max 100MB)</label>
                    <input type="file" accept="video/mp4,video/webm" style={{ color: '#94a3b8', fontSize: '0.8rem' }}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const fd = new FormData();
                        fd.append('file', file);
                        fd.append('type', 'video');
                        const res = await fetch('/api/upload', { method: 'POST', body: fd });
                        if (res.ok) { const d = await res.json(); patch(idx, 'videoUrl', d.url); }
                      }} />
                    {proj.videoUrl && proj.videoType === 'upload' && (
                      <p style={{ color: '#4ade80', fontSize: '0.75rem', marginTop: '0.3rem' }}>✓ Video uploaded</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="label-field">Video Description</label>
                  <input className="input-field" placeholder="e.g. Full walkthrough of the AI-powered resume analyzer"
                    value={proj.videoDescription || ''}
                    onChange={(e) => patch(idx, 'videoDescription', e.target.value)} />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <button className="btn-secondary" onClick={add} style={{ width: '100%', justifyContent: 'center' }}>
        <Plus size={16} /> Add Project
      </button>
    </div>
  );
}
