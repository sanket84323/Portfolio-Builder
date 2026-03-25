'use client';

import { useState } from 'react';
import { IPortfolio } from '@/models/Portfolio';
import { getVideoEmbedUrl, getVideoThumbnail } from '@/lib/utils';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Instagram, Globe, X, Play, Download } from 'lucide-react';

export default function PublicPortfolio({ portfolio }: { portfolio: IPortfolio }) {
  const [videoModal, setVideoModal] = useState<{ url: string; type: string; title: string } | null>(null);

  const theme = portfolio.themeSettings || {};
  const bg = theme.backgroundColor || '#0f0f1a';
  const primary = theme.primaryColor || '#6366f1';
  const accent = theme.accentColor || '#8b5cf6';
  const text = theme.textColor || '#f8fafc';
  const font = theme.fontFamily || 'Inter';
  const isDark = theme.darkMode !== false;
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const muted = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const radius = theme.borderRadius === 'full' ? '24px' : theme.borderRadius === 'none' ? '0' : theme.borderRadius === 'sm' ? '6px' : theme.borderRadius === 'md' ? '12px' : '16px';

  const p = portfolio as any;
  const displayName = p.displayName || '';
  const sectionPad = theme.sectionSpacing === 'compact' ? '4rem 2rem' : theme.sectionSpacing === 'relaxed' ? '8rem 2rem' : '6rem 2rem';

  const btnStyle = (secondary = false): React.CSSProperties => {
    const base: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.625rem', borderRadius: '10px', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'none', fontFamily: font, transition: 'all 0.25s ease' };
    if (secondary) return { ...base, background: 'transparent', border: `2px solid ${primary}50`, color: text };
    if (theme.buttonStyle === 'gradient') return { ...base, background: `linear-gradient(135deg, ${primary}, ${accent})`, color: '#fff' };
    if (theme.buttonStyle === 'solid') return { ...base, background: primary, color: '#fff' };
    if (theme.buttonStyle === 'outline') return { ...base, background: 'transparent', border: `2px solid ${primary}`, color: primary };
    return { ...base, background: `${primary}15`, color: primary };
  };

  const card: React.CSSProperties = { background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: radius, padding: '1.5rem', ...(theme.cardStyle === 'glass' ? { backdropFilter: 'blur(20px)' } : {}), ...(theme.cardStyle === 'raised' ? { boxShadow: '0 8px 30px rgba(0,0,0,0.3)' } : {}) };

  const badge: React.CSSProperties = { display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, background: `${primary}20`, border: `1px solid ${primary}30`, color: primary };

  return (
    <div style={{ minHeight: '100vh', background: bg, color: text, fontFamily: `'${font}', Inter, sans-serif` }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .portfolio-section-title::after { content:''; display:block; width:40px; height:3px; background:linear-gradient(90deg,${primary},${accent}); border-radius:100px; margin-top:8px; }
        .proj-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .proj-card { transition: all 0.3s ease; }
        .play-overlay { opacity:0; transition: opacity 0.2s; }
        .video-thumb-wrap:hover .play-overlay { opacity:1; }
        .social-link:hover { transform: scale(1.15); }
        .social-link { transition: transform 0.2s; }
      `}</style>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: sectionPad, background: `radial-gradient(ellipse 70% 60% at 50% -10%, ${primary}30 0%, transparent 70%), ${bg}` }}>
        {portfolio.profileImage ? (
          <img src={portfolio.profileImage} alt={displayName} style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${primary}`, marginBottom: '1.5rem' }} />
        ) : (
          <div style={{ width: '130px', height: '130px', borderRadius: '50%', background: `linear-gradient(135deg, ${primary}, ${accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', fontWeight: 900, color: '#fff', marginBottom: '1.5rem' }}>
            {displayName.charAt(0) || '?'}
          </div>
        )}
        <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{displayName || 'Portfolio'}</h1>
        <p style={{ fontSize: '1.25rem', fontWeight: 700, color: primary, marginBottom: '0.75rem' }}>{portfolio.role || ''}</p>
        <p style={{ fontSize: '1.1rem', color: muted, maxWidth: '600px', lineHeight: 1.7, marginBottom: '2.25rem' }}>{portfolio.tagline || ''}</p>
        <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#projects" style={btnStyle()}>🚀 View Projects</a>
          <a href="#contact" style={btnStyle(true)}>📩 Contact Me</a>
          {portfolio.resumeUrl && <a href={portfolio.resumeUrl} target="_blank" rel="noopener" style={{ ...btnStyle(true), border: `2px solid ${cardBorder}`, color: muted }}><Download size={16} /> Resume</a>}
        </div>
      </section>

      {/* ABOUT */}
      {(portfolio.about || portfolio.college) && (
        <section id="about" style={{ padding: sectionPad, background: cardBg }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 className="portfolio-section-title" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>About Me</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: text }}>{portfolio.about}</p>
                {portfolio.interests?.length > 0 && (
                  <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {portfolio.interests.map((i: string) => <span key={i} style={badge}>{i}</span>)}
                  </div>
                )}
              </div>
              <div style={card}>
                {[['College', portfolio.college], ['Degree', portfolio.degree], ['Career Focus', portfolio.careerFocus]].filter(([, v]) => v).map(([l, v]) => (
                  <div key={l} style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: muted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.2rem' }}>{l}</div>
                    <div style={{ fontWeight: 700 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {portfolio.education?.length > 0 && (
        <section id="education" style={{ padding: sectionPad }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 className="portfolio-section-title" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2.5rem' }}>Education</h2>
            <div style={{ borderLeft: `2px solid ${primary}40`, paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {portfolio.education.map((e: any, i: number) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-2.55rem', top: '0.3rem', width: '14px', height: '14px', borderRadius: '50%', background: primary, border: `3px solid ${bg}` }} />
                  <div style={{ ...card, flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div><h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{e.institution}</h3>
                        <p style={{ color: primary, fontWeight: 600, marginTop: '0.25rem' }}>{e.degree}{e.field ? ` – ${e.field}` : ''}</p>
                      </div>
                      <span style={badge}>{e.startYear}{e.endYear ? ` – ${e.endYear}` : ''}</span>
                    </div>
                    {e.grade && <p style={{ color: muted, fontSize: '0.875rem', marginTop: '0.5rem' }}>CGPA: {e.grade}</p>}
                    {e.achievements && <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', lineHeight: 1.5 }}>{e.achievements}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SKILLS */}
      {portfolio.skillCategories?.some((c: any) => c.skills?.length) && (
        <section id="skills" style={{ padding: sectionPad, background: cardBg }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 className="portfolio-section-title" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>Skills</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {portfolio.skillCategories.filter((c: any) => c.skills?.length).map((c: any, i: number) => (
                <div key={i} style={card}>
                  <h3 style={{ color: primary, marginBottom: '0.875rem', fontWeight: 700 }}>{c.name}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {c.skills.map((s: string) => <span key={s} style={badge}>{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {portfolio.projects?.length > 0 && (
        <section id="projects" style={{ padding: sectionPad }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 className="portfolio-section-title" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {portfolio.projects.map((proj: any, i: number) => {
                const thumb = proj.videoThumbnail || (proj.videoUrl && proj.videoType !== 'upload' ? getVideoThumbnail(proj.videoUrl, proj.videoType) : '');
                const hasVideo = !!proj.videoUrl;
                return (
                  <div key={i} className="proj-card" style={{ ...card, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    {(proj.image || thumb || hasVideo) && (
                      <div className="video-thumb-wrap" style={{ position: 'relative', width: '100%', height: '190px', background: `${primary}10`, borderRadius: '12px', overflow: 'hidden', marginBottom: '1.25rem', cursor: hasVideo ? 'pointer' : 'default' }}
                        onClick={() => hasVideo && setVideoModal({ url: proj.videoUrl, type: proj.videoType || 'youtube', title: proj.title })}>
                        {(proj.image || thumb) && <img src={proj.image || thumb} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => (e.currentTarget.style.opacity = '0')} />}
                        {hasVideo && (
                          <div className="play-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Play size={24} fill={primary} color={primary} style={{ marginLeft: '3px' }} />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{proj.title}</h3>
                    <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.6, flex: 1, marginBottom: '1rem' }}>{proj.description}</p>
                    {proj.techStack?.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '1rem' }}>
                        {proj.techStack.map((t: string) => <span key={t} style={{ padding: '0.15rem 0.5rem', fontSize: '0.72rem', borderRadius: '6px', background: `${primary}15`, color: primary, fontWeight: 600 }}>{t}</span>)}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {hasVideo && (
                        <button onClick={() => setVideoModal({ url: proj.videoUrl, type: proj.videoType || 'youtube', title: proj.title })} style={{ ...btnStyle(), fontSize: '0.825rem', padding: '0.5rem 1rem' }}>
                          <Play size={14} /> Watch Demo
                        </button>
                      )}
                      {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noopener" style={{ ...btnStyle(true), fontSize: '0.825rem', padding: '0.5rem 1rem' }}><Github size={14} /> GitHub</a>}
                      {proj.liveLink && <a href={proj.liveLink} target="_blank" rel="noopener" style={{ ...btnStyle(true), fontSize: '0.825rem', padding: '0.5rem 1rem' }}><ExternalLink size={14} /> Live</a>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ACHIEVEMENTS */}
      {portfolio.achievements?.length > 0 && (
        <section id="achievements" style={{ padding: sectionPad, background: cardBg }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 className="portfolio-section-title" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>Achievements</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {portfolio.achievements.map((a: any, i: number) => (
                <div key={i} style={{ ...card, borderLeft: `3px solid ${primary}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ ...badge, textTransform: 'capitalize' }}>{a.category}</span>
                    {a.date && <span style={{ fontSize: '0.8rem', color: muted }}>{a.date}</span>}
                  </div>
                  <h3 style={{ fontWeight: 700, marginBottom: '0.3rem' }}>{a.title}</h3>
                  {a.issuer && <p style={{ color: primary, fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.375rem' }}>{a.issuer}</p>}
                  {a.description && <p style={{ color: muted, fontSize: '0.875rem', lineHeight: 1.5 }}>{a.description}</p>}
                  {a.link && <a href={a.link} target="_blank" rel="noopener" style={{ color: primary, fontSize: '0.8rem', display: 'inline-block', marginTop: '0.5rem' }}>View →</a>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      {portfolio.socialLinks && Object.values(portfolio.socialLinks).some(Boolean) && (
        <section id="contact" style={{ padding: sectionPad, textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 className="portfolio-section-title" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', display: 'block', textAlign: 'center' }}>Get In Touch</h2>
            <p style={{ color: muted, maxWidth: '500px', margin: '1rem auto 2.5rem', lineHeight: 1.7 }}>
              Open to opportunities, collaborations, and interesting conversations!
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {portfolio.socialLinks?.email && <a href={`mailto:${portfolio.socialLinks.email}`} style={btnStyle()}><Mail size={18} /> Email Me</a>}
              {portfolio.socialLinks?.linkedin && <a href={portfolio.socialLinks.linkedin} target="_blank" rel="noopener" style={btnStyle(true)}><Linkedin size={18} /> LinkedIn</a>}
              {portfolio.socialLinks?.github && <a href={portfolio.socialLinks.github} target="_blank" rel="noopener" style={btnStyle(true)}><Github size={18} /> GitHub</a>}
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {portfolio.socialLinks?.twitter && <a href={portfolio.socialLinks.twitter} target="_blank" rel="noopener" className="social-link" style={{ color: muted }}><Twitter size={22} /></a>}
              {portfolio.socialLinks?.instagram && <a href={portfolio.socialLinks.instagram} target="_blank" rel="noopener" className="social-link" style={{ color: muted }}><Instagram size={22} /></a>}
              {portfolio.socialLinks?.website && <a href={portfolio.socialLinks.website} target="_blank" rel="noopener" className="social-link" style={{ color: muted }}><Globe size={22} /></a>}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ textAlign: 'center', padding: '2.5rem 2rem', borderTop: `1px solid ${cardBorder}`, color: muted }}>
        <p style={{ fontWeight: 700, marginBottom: '0.25rem', color: text }}>{displayName}</p>
        <p style={{ fontSize: '0.8rem' }}>Built with <a href="/" style={{ color: primary }}>PortfolioBuilder</a> · {new Date().getFullYear()}</p>
      </footer>

      {/* VIDEO MODAL */}
      {videoModal && (
        <div onClick={() => setVideoModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#111122', borderRadius: '20px', overflow: 'hidden', width: '100%', maxWidth: '900px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 40px 100px rgba(0,0,0,0.8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ color: '#f1f5f9', fontWeight: 700 }}>{videoModal.title}</h3>
              <button onClick={() => setVideoModal(null)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '8px', padding: '0.375rem', cursor: 'pointer', color: '#94a3b8' }}><X size={18} /></button>
            </div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', background: '#000' }}>
              {videoModal.type === 'upload' ? (
                <video src={videoModal.url} controls autoPlay style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
              ) : (
                <iframe
                  src={getVideoEmbedUrl(videoModal.url, videoModal.type as 'youtube' | 'vimeo')}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
