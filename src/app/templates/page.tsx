'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Moon, Sun, Search, Loader2 } from 'lucide-react';
import { TEMPLATE_THEMES } from '@/lib/constants';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export default function TemplatesPage() {
  const [filter, setFilter] = useState<'all' | 'dark' | 'light'>('all');
  const [search, setSearch] = useState('');
  const [applying, setApplying] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleUseTemplate = async (key: string, t: typeof TEMPLATE_THEMES[string]) => {
    if (!user) {
      router.push('/register');
      return;
    }
    setApplying(key);
    try {
      // Create a new portfolio with this template pre-applied
      const res = await fetch('/api/portfolios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'My Portfolio',
          role: 'Full Stack Developer',
          tagline: 'Bridging the gap between design and development to build beautiful, functional web applications.',
          about: 'I am a passionate software engineer with a strong foundation in modern web technologies. I love building products that solve real problems, optimizing performance, and creating intuitive user experiences. When I am not coding, you can find me exploring new tech or writing articles about software architecture.',
          college: 'University of Technology',
          degree: 'B.S. in Computer Science',
          careerFocus: 'Web Development & MLOps',
          interests: ['Open Source', 'UI/UX Design', 'Cloud Architecture', 'Artificial Intelligence'],
          projects: [
            { title: 'Nexus E-Commerce', description: 'A modern headless e-commerce platform built with Next.js, Stripe, and Sanity CMS. Features real-time inventory, auth, and lightning-fast edge caching.', techStack: ['Next.js', 'TypeScript', 'Tailwind', 'Stripe'], githubLink: 'https://github.com', liveLink: 'https://example.com', image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80' },
            { title: 'SynthAI Image Generator', description: 'AI-powered image generation tool leveraging Stable Diffusion. Includes a prompt gallery, user accounts, and one-click variations.', techStack: ['React', 'Node.js', 'Python', 'Replicate API'], githubLink: 'https://github.com', liveLink: 'https://example.com', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80' }
          ],
          education: [
            { institution: 'University of Technology', degree: 'Bachelor of Science', field: 'Computer Science', startYear: '2019', endYear: '2023', grade: '3.8', achievements: "Dean's List, Lead Hacker at GDSC" }
          ],
          achievements: [
            { category: 'hackathon', title: 'Global HackWeek Winner', issuer: 'Major League Hacking', description: 'Won 1st place overall for building a distributed climate-data tracking node network.', date: 'Oct 2023' }
          ],
          skillCategories: [
            { name: 'Core', skills: ['TypeScript', 'JavaScript', 'Python', 'Go'] },
            { name: 'Frontend', skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
            { name: 'Backend', skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis'] }
          ],
          socialLinks: { github: 'https://github.com', linkedin: 'https://linkedin.com', twitter: 'https://twitter.com', email: 'hello@example.com' },
          themeSettings: {
            primaryColor: t.primaryColor,
            accentColor: t.accentColor,
            backgroundColor: t.backgroundColor,
            textColor: t.textColor,
            fontFamily: t.fontFamily,
            cardStyle: t.cardStyle,
            buttonStyle: t.buttonStyle,
            darkMode: t.darkMode,
            template: t.template,
            heroLayout: t.heroLayout,
            bgPattern: t.bgPattern,
            useGradientBg: t.useGradientBg,
            navStyle: t.navStyle,
            borderRadius: t.borderRadius,
            sectionSpacing: t.sectionSpacing,
          },
        }),
      });
      const data = await res.json();
      if (res.ok && data.portfolio?._id) {
        toast.success(`${t.name} template applied!`);
        router.push(`/dashboard/builder/${data.portfolio._id}`);
      } else {
        toast.error('Failed to create portfolio');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setApplying(null);
    }
  };

  const entries = Object.entries(TEMPLATE_THEMES).filter(([, t]) => {
    const matchesFilter = filter === 'all' || (filter === 'dark' && t.darkMode) || (filter === 'light' && !t.darkMode);
    const matchesSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a14', color: '#f8fafc' }}>
      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,20,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>◈ PortfolioBuilder</span>
          </Link>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Link href="/login" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>Login</Link>
            <Link href="/register" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '0.5rem 1.25rem', borderRadius: '10px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                Get Started <ArrowRight size={15} />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section style={{ textAlign: 'center', padding: '4.5rem 2rem 3rem' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <p style={{ color: '#6366f1', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>Templates</p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            {Object.keys(TEMPLATE_THEMES).length} Stunning Templates
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Switch between themes anytime — all your content stays intact.
          </p>

          {/* Filter bar */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.3rem' }}>
              {[{ label: 'All', value: 'all' }, { label: 'Dark', value: 'dark', icon: Moon }, { label: 'Light', value: 'light', icon: Sun }].map(({ label, value, icon: Icon }) => (
                <button key={value} onClick={() => setFilter(value as any)}
                  style={{ padding: '0.4rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.825rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem', background: filter === value ? 'rgba(99,102,241,0.25)' : 'transparent', color: filter === value ? '#a5b4fc' : '#64748b', transition: 'all 0.15s' }}>
                  {Icon && <Icon size={13} />} {label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.4rem 1rem' }}>
              <Search size={14} color="#64748b" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..."
                style={{ background: 'none', border: 'none', outline: 'none', color: '#f1f5f9', fontSize: '0.825rem', width: '160px' }} />
            </div>
          </div>

          <p style={{ color: '#334155', fontSize: '0.8rem' }}>{entries.length} template{entries.length !== 1 ? 's' : ''} found</p>
        </motion.div>
      </section>

      {/* Template grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem 6rem' }}>
        {entries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>No templates match your search.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {entries.map(([key, t], i) => (
              <motion.div key={key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.05, 0.5) }}
                style={{ borderRadius: '20px', overflow: 'hidden', border: `1px solid ${t.primaryColor}20`, background: 'rgba(255,255,255,0.02)', transition: 'transform 0.25s, box-shadow 0.25s', cursor: 'default' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.3)`; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>

                {/* Mini preview strip */}
                <div style={{ height: '200px', background: t.backgroundColor, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 60% at 50% -10%, ${t.primaryColor}40 0%, transparent 70%)` }} />
                  {/* Mini nav */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '36px', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', padding: '0 1rem', gap: '0.75rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: t.primaryColor }} />
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: t.primaryColor, fontFamily: t.fontFamily }}>Portfolio</span>
                    <div style={{ flex: 1 }} />
                    {[1, 2, 3].map((n) => <div key={n} style={{ width: '24px', height: '3px', borderRadius: '100px', background: 'rgba(255,255,255,0.15)' }} />)}
                  </div>

                  {/* Content preview */}
                  <div style={{ textAlign: 'center', position: 'relative', fontFamily: t.fontFamily }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: `linear-gradient(135deg, ${t.primaryColor}, ${t.accentColor})`, margin: '0 auto 0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 900, color: t.darkMode ? t.backgroundColor : '#fff', boxShadow: `0 0 20px ${t.primaryColor}50` }}>Y</div>
                    <div style={{ fontWeight: 800, color: t.textColor, fontSize: '1.05rem', letterSpacing: '-0.01em' }}>Your Name</div>
                    <div style={{ color: t.primaryColor, fontSize: '0.75rem', fontWeight: 700, marginTop: '0.2rem' }}>Developer / Designer</div>
                    <div style={{ marginTop: '0.875rem', display: 'inline-block', padding: '0.35rem 1.1rem', borderRadius: '8px', background: t.buttonStyle === 'gradient' ? `linear-gradient(135deg, ${t.primaryColor}, ${t.accentColor})` : t.buttonStyle === 'outline' ? 'transparent' : t.primaryColor, color: t.buttonStyle === 'outline' ? t.primaryColor : '#fff', fontSize: '0.72rem', fontWeight: 700, border: t.buttonStyle === 'outline' ? `1.5px solid ${t.primaryColor}` : 'none' }}>View Projects</div>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: t.primaryColor, boxShadow: `0 0 8px ${t.primaryColor}70` }} />
                      <h3 style={{ fontWeight: 800, fontSize: '1rem', color: '#f1f5f9' }}>{t.name}</h3>
                    </div>
                    <span style={{ fontSize: '0.67rem', padding: '0.2rem 0.6rem', background: t.darkMode ? 'rgba(99,102,241,0.12)' : 'rgba(251,191,36,0.12)', border: `1px solid ${t.darkMode ? 'rgba(99,102,241,0.2)' : 'rgba(251,191,36,0.2)'}`, borderRadius: '100px', color: t.darkMode ? '#818cf8' : '#fbbf24', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      {t.darkMode ? <Moon size={11} /> : <Sun size={11} />} {t.darkMode ? 'Dark' : 'Light'}
                    </span>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.835rem', marginBottom: '1rem', lineHeight: 1.5 }}>{t.description}</p>

                  {/* Style tags */}
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    {[t.fontFamily, t.cardStyle, `${t.buttonStyle} btn`].map((tag) => (
                      <span key={tag} style={{ padding: '0.18rem 0.6rem', background: `${t.primaryColor}12`, border: `1px solid ${t.primaryColor}22`, borderRadius: '100px', fontSize: '0.68rem', fontWeight: 700, color: t.primaryColor }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleUseTemplate(key, t)}
                    disabled={applying === key}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '12px', background: `linear-gradient(135deg, ${t.primaryColor}, ${t.accentColor})`, border: 'none', color: '#fff', fontWeight: 700, cursor: applying === key ? 'not-allowed' : 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', opacity: applying === key ? 0.8 : 1, transition: 'opacity 0.2s' }}
                  >
                    {applying === key ? <><Loader2 size={15} /> Applying...</> : <>{user ? 'Use This Template' : 'Get Started'} <ArrowRight size={15} /></>}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
