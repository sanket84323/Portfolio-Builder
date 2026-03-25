'use client';

import { IPortfolio } from '@/models/Portfolio';
import { getVideoEmbedUrl, getVideoThumbnail } from '@/lib/utils';

interface Props {
  portfolio: Partial<IPortfolio>;
  mode: 'desktop' | 'mobile';
}

function getBgPattern(pattern: string, primary: string) {
  switch (pattern) {
    case 'grid':
      return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 0v40M40 0v40M0 0h40M0 40h40' stroke='${encodeURIComponent(primary)}' stroke-width='0.3' opacity='0.15'/%3E%3C/svg%3E")`;
    case 'dots':
      return `radial-gradient(circle, ${primary}25 1px, transparent 1px)`;
    case 'diagonal':
      return `repeating-linear-gradient(45deg, ${primary}08 0px, ${primary}08 1px, transparent 0px, transparent 50%)`;
    case 'mesh':
      return `radial-gradient(at 20% 20%, ${primary}30 0%, transparent 50%), radial-gradient(at 80% 80%, ${primary}18 0%, transparent 50%), radial-gradient(at 50% 50%, rgba(139,92,246,0.12) 0%, transparent 50%)`;
    default:
      return 'none';
  }
}

function getBgCss(theme: Partial<IPortfolio['themeSettings']>, bg: string, primary: string) {
  if (theme?.useGradientBg) {
    const angle = theme.gradientAngle ?? 135;
    return `linear-gradient(${angle}deg, ${theme.gradientStart || primary}, ${theme.gradientEnd || bg})`;
  }
  return bg;
}

export default function PortfolioPreview({ portfolio, mode }: Props) {
  const theme = portfolio.themeSettings || {};
  const bg = theme.backgroundColor || '#0f0f1a';
  const primary = theme.primaryColor || '#6366f1';
  const accent = theme.accentColor || '#8b5cf6';
  const textColor = theme.textColor || '#f8fafc';
  const font = theme.fontFamily || 'Inter';
  const isDark = theme.darkMode !== false;
  const fontSize = theme.fontSize === 'sm' ? '14px' : theme.fontSize === 'lg' ? '18px' : '16px';

  const mutedColor = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const sectionPad = theme.sectionSpacing === 'compact' ? '3rem' : theme.sectionSpacing === 'relaxed' ? '7rem' : '5rem';
  const radius = theme.borderRadius === 'full' ? '24px' : theme.borderRadius === 'none' ? '0' : theme.borderRadius === 'sm' ? '6px' : theme.borderRadius === 'md' ? '12px' : '16px';
  const bgCss = getBgCss(theme, bg, primary);
  const patternCss = getBgPattern(theme.bgPattern || 'glow', primary);
  const patternBgSize = theme.bgPattern === 'dots' ? '20px 20px' : theme.bgPattern === 'diagonal' ? '8px 8px' : 'auto';

  const visibility = (theme.sectionVisibility || {}) as Record<string, boolean>;
  const show = (s: string) => visibility[s] !== false;

  const heroLayout = theme.heroLayout || 'centered';
  const isMobile = mode === 'mobile';

  // Nav background
  const navStyle = theme.navStyle || 'floating';
  let navBg = 'rgba(15,15,30,0.85)';
  if (navStyle === 'solid') navBg = bg;
  if (navStyle === 'minimal') navBg = 'transparent';
  if (navStyle === 'none') navBg = 'transparent';

  const p = portfolio as any;
  const displayName = p.displayName || '';

  const heroFlexDir = heroLayout === 'left' ? 'row' : heroLayout === 'split' ? 'row' : 'column';
  const heroAlign = heroLayout === 'left' || heroLayout === 'split' ? 'flex-start' : 'center';
  const heroText = heroLayout === 'left' || heroLayout === 'split' ? 'left' : 'center';
  const heroJustify = heroLayout === 'split' ? 'space-between' : heroLayout === 'left' ? 'center' : 'center';

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@300;400;500;600;700;800;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: '${font}', Inter, sans-serif;
      background: ${bgCss};
      ${theme.bgPattern && theme.bgPattern !== 'none' && theme.bgPattern !== 'glow' ? `background-image: ${bgCss !== bg ? '' : ''}${patternCss};` : ''}
      ${patternBgSize !== 'auto' ? `background-size: auto, ${patternBgSize};` : ''}
      color: ${textColor};
      line-height: 1.65;
      font-size: ${isMobile ? '14px' : fontSize};
    }
    section { padding: ${sectionPad} ${isMobile ? '1.25rem' : '4rem'}; }
    h1 { font-size: ${isMobile ? '1.9rem' : '2.9rem'}; font-weight: 900; letter-spacing: -0.02em; }
    h2 { font-size: ${isMobile ? '1.4rem' : '1.875rem'}; font-weight: 800; }
    h3 { font-size: 1.05rem; font-weight: 700; }
    .muted { color: ${mutedColor}; }
    .card {
      background: ${cardBg};
      border: 1px solid ${cardBorder};
      border-radius: ${radius};
      padding: 1.5rem;
      ${theme.cardStyle === 'glass' ? 'backdrop-filter: blur(20px);' : ''}
      ${theme.cardStyle === 'raised' ? `box-shadow: 0 8px 30px rgba(0,0,0,0.3);` : ''}
    }
    .badge { display:inline-block; padding:0.25rem 0.75rem; border-radius:100px; font-size:0.78rem; font-weight:600; background:${primary}20; border:1px solid ${primary}30; color:${primary}; }
    .btn { display:inline-flex; align-items:center; gap:0.4rem; padding:0.65rem 1.5rem; border-radius:${radius}; border:none; font-weight:700; cursor:pointer; font-size:0.88rem; font-family:inherit; transition:all 0.2s; ${theme.buttonStyle === 'gradient' ? `background:linear-gradient(135deg,${primary},${accent});color:#fff;` : theme.buttonStyle === 'solid' ? `background:${primary};color:#fff;` : theme.buttonStyle === 'outline' ? `background:transparent;border:2px solid ${primary};color:${primary};` : `background:${primary}15;color:${primary};`} }
    .btn:hover { transform: translateY(-2px); filter: brightness(1.1); }
    .section-title { position:relative; display:inline-block; margin-bottom:1.75rem; }
    .section-title::after { content:''; position:absolute; bottom:-6px; left:0; width:40px; height:3px; background:linear-gradient(90deg,${primary},${accent}); border-radius:100px; }
    .skill-badge { display:inline-block; padding:0.25rem 0.75rem; border-radius:100px; font-size:0.78rem; font-weight:600; background:${primary}20; border:1px solid ${primary}30; color:${primary}; margin:0.2rem; }
    .skill-bar { height:6px; background:rgba(255,255,255,0.06); border-radius:100px; overflow:hidden; margin-top:0.35rem; }
    .skill-bar-fill { height:100%; background:linear-gradient(90deg,${primary},${accent}); border-radius:100px; }
    .proj-grid { display:grid; grid-template-columns:${isMobile ? '1fr' : 'repeat(2,1fr)'}; gap:1.25rem; }
    .edu-dot { position:absolute; left:-0.6rem; top:0.3rem; width:12px; height:12px; border-radius:50%; background:${primary}; border:2px solid ${bg}; }
    .ach-grid { display:grid; grid-template-columns:${isMobile ? '1fr' : 'repeat(2,1fr)'}; gap:1rem; }
    nav { display:${navStyle === 'none' ? 'none' : 'flex'}; position:sticky; top:0; z-index:100; background:${navBg}; ${navStyle === 'floating' ? `backdrop-filter:blur(20px); border-bottom:1px solid ${cardBorder};` : ''} justify-content:space-between; align-items:center; padding:0 ${isMobile ? '1rem' : '3rem'}; height:${navStyle === 'minimal' ? '48px' : '56px'}; }
    .nav-brand { font-weight:800; font-size:1rem; color:${primary}; }
    .nav-links { display:${isMobile ? 'none' : 'flex'}; gap:1.5rem; }
    .nav-links a { color:${mutedColor}; text-decoration:none; font-size:0.85rem; font-weight:500; }
    .nav-links a:hover { color:${textColor}; }
    footer { text-align:center; padding:2.5rem 2rem; border-top:1px solid ${cardBorder}; color:${mutedColor}; font-size:0.875rem; }
    a { color:${primary}; text-decoration:none; }
    ${theme.bgPattern === 'glow' ? `.hero-glow { background: radial-gradient(ellipse 70% 60% at 50% -10%, ${primary}35 0%, transparent 70%); }` : ''}
    ${theme.customCSS || ''}
  `;

  const avatarHtml = portfolio.profileImage
    ? `<img src="${portfolio.profileImage}" alt="${displayName}" style="width:${heroLayout === 'split' ? '180px' : isMobile ? '90px' : '120px'};height:${heroLayout === 'split' ? '180px' : isMobile ? '90px' : '120px'};border-radius:50%;object-fit:cover;border:3px solid ${primary};${heroLayout !== 'split' ? 'margin-bottom:1.5rem;' : ''}" />`
    : `<div style="width:${heroLayout === 'split' ? '160px' : isMobile ? '90px' : '120px'};height:${heroLayout === 'split' ? '160px' : isMobile ? '90px' : '120px'};border-radius:50%;background:linear-gradient(135deg,${primary},${accent});display:flex;align-items:center;justify-content:center;font-size:${heroLayout === 'split' ? '4rem' : isMobile ? '2.5rem' : '3.5rem'};font-weight:900;color:white;${heroLayout !== 'split' ? 'margin-bottom:1.5rem;' : ''}">${(displayName || 'Y').charAt(0)}</div>`;

  const heroContentHtml = `
    <div style="flex:1;${heroLayout === 'split' ? '' : 'display:flex;flex-direction:column;align-items:' + (heroText === 'center' ? 'center' : 'flex-start') + ';'}">
      <h1 style="margin-bottom:0.6rem">${displayName || 'Your Name'}</h1>
      <p style="font-size:1.15rem;font-weight:700;color:${primary};margin-bottom:0.6rem">${portfolio.role || 'Your Role'}</p>
      <p class="muted" style="max-width:540px;line-height:1.7;margin-bottom:2rem;font-size:${fontSize}">${portfolio.tagline || 'Your tagline goes here — make it memorable.'}</p>
      <div style="display:flex;gap:0.875rem;flex-wrap:wrap;${heroText !== 'center' ? '' : 'justify-content:center;'}">
        <a href="#projects"><button class="btn">🚀 Projects</button></a>
        <a href="#contact"><button class="btn" style="background:transparent;border:2px solid ${primary}50;color:${textColor}">📩 Contact</button></a>
        ${portfolio.resumeUrl ? `<a href="${portfolio.resumeUrl}" target="_blank"><button class="btn" style="background:transparent;border:2px solid ${cardBorder};color:${mutedColor}">📄 Resume</button></a>` : ''}
      </div>
    </div>
  `;

  const heroHtml = heroLayout === 'split'
    ? `<section style="min-height:100vh;display:flex;align-items:center;padding:${sectionPad} ${isMobile ? '1.25rem' : '5rem'};">
        <div style="display:flex;gap:4rem;align-items:center;width:100%;flex-wrap:wrap;">
          ${heroContentHtml}
          ${heroLayout !== 'minimal' ? `<div style="flex-shrink:0;">${avatarHtml}</div>` : ''}
        </div>
       </section>`
    : heroLayout === 'left'
    ? `<section style="min-height:100vh;display:flex;align-items:center;padding:${sectionPad} ${isMobile ? '1.25rem' : '5rem'};">
        <div style="display:flex;gap:3rem;align-items:center;width:100%;flex-wrap:wrap;">
          <div style="flex:1">${heroContentHtml}</div>
          ${heroLayout !== 'minimal' ? `<div style="flex-shrink:0;">${avatarHtml}</div>` : ''}
        </div>
       </section>`
    : `<section class="${theme.bgPattern === 'glow' ? 'hero-glow' : ''}" style="min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:${sectionPad} ${isMobile ? '1.5rem' : '4rem'};">
        ${heroLayout !== 'minimal' ? avatarHtml : ''}
        ${heroContentHtml}
       </section>`;

  // Skills
  const showSkillBars = !!theme.showSkillBars;
  const skillsHtml = portfolio.skillCategories?.some((c: any) => c.skills?.length)
    ? `<section id="skills" style="background:${cardBg}">
        <div style="max-width:900px;margin:0 auto">
          <h2 class="section-title">Skills</h2>
          <div style="display:grid;grid-template-columns:${isMobile ? '1fr' : 'repeat(2,1fr)'};gap:1.25rem">
            ${portfolio.skillCategories!.filter((c: any) => c.skills?.length).map((c: any) => `
              <div class="card">
                <h3 style="color:${primary};margin-bottom:0.75rem">${c.name}</h3>
                <div>
                  ${c.skills.map((s: string, i: number) => showSkillBars
                    ? `<div style="margin-bottom:0.6rem">
                        <div style="display:flex;justify-content:space-between;font-size:0.82rem;margin-bottom:0.25rem"><span>${s}</span><span style="color:${primary}">${Math.max(70, 95 - i * 5)}%</span></div>
                        <div class="skill-bar"><div class="skill-bar-fill" style="width:${Math.max(70, 95 - i * 5)}%"></div></div>
                       </div>`
                    : `<span class="skill-badge">${s}</span>`
                  ).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
       </section>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${portfolio.seoTitle || displayName || 'Portfolio'}</title>
<style>${styles}</style>
</head>
<body>

<nav>
  <span class="nav-brand">◈ ${displayName || 'Portfolio'}</span>
  <div class="nav-links">
    ${show('about') ? '<a href="#about">About</a>' : ''}
    ${show('projects') ? '<a href="#projects">Projects</a>' : ''}
    ${show('skills') ? '<a href="#skills">Skills</a>' : ''}
    ${show('contact') ? '<a href="#contact">Contact</a>' : ''}
  </div>
</nav>

${heroHtml}

${show('about') && (portfolio.about || portfolio.college) ? `
<section id="about" style="background:${cardBg}">
  <div style="max-width:900px;margin:0 auto">
    <h2 class="section-title">About Me</h2>
    <div style="display:grid;grid-template-columns:${isMobile ? '1fr' : '1fr 1fr'};gap:2rem">
      <div>
        <p style="font-size:1.02rem;line-height:1.8">${portfolio.about || ''}</p>
        ${portfolio.interests?.length ? `<div style="margin-top:1.25rem;display:flex;flex-wrap:wrap;gap:0.4rem">${portfolio.interests.map((i: string) => `<span class="badge">${i}</span>`).join('')}</div>` : ''}
      </div>
      <div class="card">
        ${[['College', portfolio.college], ['Degree', portfolio.degree], ['Focus', portfolio.careerFocus]].filter(([, v]) => v).map(([l, v]) =>
          `<div style="margin-bottom:0.875rem"><div style="font-size:0.72rem;font-weight:700;color:${mutedColor};text-transform:uppercase;letter-spacing:0.07em;margin-bottom:0.2rem">${l}</div><div style="font-weight:700">${v}</div></div>`
        ).join('')}
      </div>
    </div>
  </div>
</section>` : ''}

${show('education') && portfolio.education?.length ? `
<section id="education">
  <div style="max-width:900px;margin:0 auto">
    <h2 class="section-title">Education</h2>
    <div style="border-left:2px solid ${primary}40;padding-left:2rem;display:flex;flex-direction:column;gap:2rem">
      ${portfolio.education.map((e: any) => `
        <div style="position:relative">
          <div class="edu-dot"></div>
          <div class="card">
            <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem">
              <div><h3>${e.institution}</h3><p style="color:${primary};font-weight:600;margin-top:0.25rem">${e.degree}${e.field ? ` – ${e.field}` : ''}</p></div>
              <span class="badge">${e.startYear}${e.endYear ? ` – ${e.endYear}` : ''}</span>
            </div>
            ${e.grade ? `<p class="muted" style="font-size:0.875rem;margin-top:0.5rem">CGPA: ${e.grade}</p>` : ''}
            ${e.achievements ? `<p style="font-size:0.875rem;margin-top:0.5rem">${e.achievements}</p>` : ''}
          </div>
        </div>`).join('')}
    </div>
  </div>
</section>` : ''}

${show('skills') ? skillsHtml : ''}

${show('projects') && portfolio.projects?.length ? `
<section id="projects">
  <div style="max-width:1050px;margin:0 auto">
    <h2 class="section-title">Projects</h2>
    <div class="proj-grid">
      ${portfolio.projects.map((proj: any) => {
        const thumb = proj.videoThumbnail || (proj.videoUrl && proj.videoType !== 'upload' ? getVideoThumbnail(proj.videoUrl, proj.videoType) : '');
        return `<div class="card" style="overflow:hidden;display:flex;flex-direction:column">
          ${proj.image || thumb ? `<div style="width:100%;height:175px;background:${primary}12;border-radius:${radius};overflow:hidden;margin-bottom:1rem;position:relative"><img src="${proj.image || thumb}" style="width:100%;height:100%;object-fit:cover" onerror="this.parentElement.style.display='none'"/>${proj.videoUrl ? `<div style="position:absolute;inset:0;background:rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center"><div style="width:48px;height:48px;border-radius:50%;background:white;display:flex;align-items:center;justify-content:center"><svg width="18" height="18" fill="${primary}" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div></div>` : ''}</div>` : ''}
          <h3 style="margin-bottom:0.4rem">${proj.title}</h3>
          <p class="muted" style="font-size:0.875rem;line-height:1.55;flex:1;margin-bottom:0.875rem">${proj.description || ''}</p>
          ${proj.techStack?.length ? `<div style="display:flex;flex-wrap:wrap;gap:0.25rem;margin-bottom:0.875rem">${proj.techStack.map((t: string) => `<span style="padding:0.15rem 0.5rem;font-size:0.7rem;border-radius:6px;background:${primary}15;color:${primary};font-weight:600">${t}</span>`).join('')}</div>` : ''}
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
            ${proj.videoUrl ? `<button class="btn" style="font-size:0.78rem;padding:0.4rem 0.875rem">▶ Demo</button>` : ''}
            ${proj.githubLink ? `<a href="${proj.githubLink}" target="_blank"><button class="btn" style="font-size:0.78rem;padding:0.4rem 0.875rem;background:transparent;border:1px solid ${cardBorder};color:${textColor}">GitHub</button></a>` : ''}
            ${proj.liveLink ? `<a href="${proj.liveLink}" target="_blank"><button class="btn" style="font-size:0.78rem;padding:0.4rem 0.875rem;background:transparent;border:1px solid ${cardBorder};color:${textColor}">Live ↗</button></a>` : ''}
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>
</section>` : ''}

${show('achievements') && portfolio.achievements?.length ? `
<section id="achievements" style="background:${cardBg}">
  <div style="max-width:900px;margin:0 auto">
    <h2 class="section-title">Achievements</h2>
    <div class="ach-grid">
      ${portfolio.achievements.map((a: any) => `
        <div class="card" style="border-left:3px solid ${primary}">
          <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.4rem;margin-bottom:0.6rem">
            <span class="badge" style="font-size:0.7rem;text-transform:capitalize">${a.category}</span>
            ${a.date ? `<span class="muted" style="font-size:0.78rem">${a.date}</span>` : ''}
          </div>
          <h3 style="margin-bottom:0.25rem">${a.title}</h3>
          ${a.issuer ? `<p style="color:${primary};font-size:0.85rem;font-weight:600;margin-bottom:0.3rem">${a.issuer}</p>` : ''}
          ${a.description ? `<p class="muted" style="font-size:0.85rem">${a.description}</p>` : ''}
          ${a.link ? `<a href="${a.link}" target="_blank" style="font-size:0.78rem;margin-top:0.4rem;display:inline-block">View →</a>` : ''}
        </div>`).join('')}
    </div>
  </div>
</section>` : ''}

${show('contact') && portfolio.socialLinks && Object.values(portfolio.socialLinks).some(Boolean) ? `
<section id="contact" style="text-align:center">
  <div style="max-width:650px;margin:0 auto">
    <h2 class="section-title" style="display:block">Get In Touch</h2>
    <p class="muted" style="margin:1rem auto 2.5rem;line-height:1.7;font-size:1.02rem">Open to opportunities, collaborations, and interesting conversations!</p>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:0.75rem">
      ${portfolio.socialLinks.email ? `<a href="mailto:${portfolio.socialLinks.email}"><button class="btn">📧 Email Me</button></a>` : ''}
      ${portfolio.socialLinks.linkedin ? `<a href="${portfolio.socialLinks.linkedin}" target="_blank"><button class="btn">LinkedIn</button></a>` : ''}
      ${portfolio.socialLinks.github ? `<a href="${portfolio.socialLinks.github}" target="_blank"><button class="btn">GitHub</button></a>` : ''}
      ${portfolio.socialLinks.twitter ? `<a href="${portfolio.socialLinks.twitter}" target="_blank"><button class="btn">Twitter</button></a>` : ''}
      ${portfolio.socialLinks.website ? `<a href="${portfolio.socialLinks.website}" target="_blank"><button class="btn">Website ↗</button></a>` : ''}
    </div>
  </div>
</section>` : ''}

<footer>
  <p style="font-weight:700;margin-bottom:0.25rem;color:${textColor}">${displayName}</p>
  <p>Built with <a href="/" style="color:${primary}">PortfolioBuilder</a> · ${new Date().getFullYear()}</p>
</footer>
</body>
</html>`;

  return (
    <iframe
      srcDoc={html}
      style={{ width: isMobile ? '375px' : '100%', height: '100%', border: 'none', borderRadius: isMobile ? '36px' : '0', boxShadow: isMobile ? '0 0 0 10px #1e1e2e, 0 40px 80px rgba(0,0,0,0.8)' : 'none' }}
      title="Portfolio Preview"
    />
  );
}
