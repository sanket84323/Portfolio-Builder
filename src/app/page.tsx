'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Globe, Palette, BarChart2, Shield, Play, Star, Check, ChevronRight } from 'lucide-react';

const FEATURES = [
  { icon: Zap, title: 'Lightning Fast Builder', desc: 'Drag-and-drop sections, live preview, and autosave — build your whole portfolio in under 30 minutes.' },
  { icon: Palette, title: 'Deep Customization', desc: '6 beautiful templates, 10+ fonts, unlimited color options and full dark/light mode control.' },
  { icon: Globe, title: 'Instant Public Link', desc: 'Get your own unique public URL the moment you publish. Share with recruiters in one click.' },
  { icon: Play, title: 'Rich Project Videos', desc: 'Showcase projects with demo videos, thumbnails, and a beautiful modal player — no plain links.' },
  { icon: BarChart2, title: 'Visitor Analytics', desc: 'See how many people viewed your portfolio. Track which projects got the most attention.' },
  { icon: Shield, title: 'Always Yours', desc: 'Export your portfolio as PDF or HTML anytime. Your data is always fully owned by you.' },
];

const TEMPLATES = [
  { name: 'Developer', color: '#6366f1', desc: 'Dark, modern dev theme', tags: ['dark', 'minimal', 'code-ready'] },
  { name: 'Creative', color: '#f43f5e', desc: 'Vibrant creative designer', tags: ['colorful', 'animated', 'bold'] },
  { name: 'Placement Ready', color: '#10b981', desc: 'Corporate, recruiter-friendly', tags: ['professional', 'clean'] },
  { name: 'Minimal', color: '#0ea5e9', desc: 'Clean white & elegant', tags: ['simple', 'light', 'refined'] },
  { name: 'Academic', color: '#3b82f6', desc: 'Student & research focus', tags: ['academic', 'structured'] },
  { name: 'Premium Card', color: '#f59e0b', desc: 'Luxury gold card theme', tags: ['premium', 'gold', 'cards'] },
];

const STATS = [
  { value: '10,000+', label: 'Portfolios Created' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '6', label: 'Pro Templates' },
  { value: '< 30min', label: 'Avg Build Time' },
];

const PLANS = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    features: ['1 portfolio', 'Basic templates', 'Public link', 'Image uploads', 'Basic analytics'],
    cta: 'Get Started Free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '₹299',
    period: 'per month',
    features: ['Unlimited portfolios', 'All 6 templates', 'Custom domain', 'Video uploads', 'Advanced analytics', 'Resume PDF export', 'Priority support'],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Team',
    price: '₹799',
    period: 'per month',
    features: ['Everything in Pro', 'Up to 10 portfolios', 'Team dashboard', 'Bulk export', 'Custom branding', 'API access'],
    cta: 'Contact Us',
    highlight: false,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0a0a14' }}>
      {/* ——— NAVBAR ——— */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(10, 10, 20, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ◈ PortfolioBuilder
            </span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/templates" className="btn-ghost" style={{ textDecoration: 'none' }}>Templates</Link>
            <Link href="/login" className="btn-ghost" style={{ textDecoration: 'none' }}>Login</Link>
            <Link href="/register" className="btn-primary" style={{ textDecoration: 'none', padding: '0.6rem 1.4rem', fontSize: '0.875rem' }}>
              Get Started <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ——— HERO ——— */}
      <section className="hero-gradient" style={{ paddingTop: '6rem', paddingBottom: '6rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Floating orbs */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1rem',
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: '100px', marginBottom: '2rem',
              fontSize: '0.825rem', fontWeight: 600, color: '#a5b4fc',
            }}>
              <Star size={14} fill="currentColor" /> Now with AI suggestions for your bio
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}
          >
            Build Your{' '}
            <span className="gradient-text">Dream Portfolio</span>
            <br />in Minutes. Not Days.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}
          >
            The professional portfolio builder for students, developers, and designers.
            Create, customize, and publish your placement-ready portfolio — no coding required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link href="/register" className="btn-primary" style={{ textDecoration: 'none', fontSize: '1rem', padding: '0.875rem 2rem' }}>
              Create Portfolio Free <ArrowRight size={18} />
            </Link>
            <Link href="/templates" className="btn-secondary" style={{ textDecoration: 'none', fontSize: '1rem', padding: '0.875rem 2rem' }}>
              Explore Templates
            </Link>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '4rem', flexWrap: 'wrap' }}
          >
            {STATS.map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white' }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ——— FEATURES ——— */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Why PortfolioBuilder</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Everything you need to{' '}
            <span className="gradient-text">stand out</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            From live preview to video showcases — PortfolioBuilder has every feature to make your portfolio shine.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} variants={fadeUp} className="glass card-hover"
              style={{ padding: '2rem', borderRadius: '16px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))',
                border: '1px solid rgba(99,102,241,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                <Icon size={22} color="#818cf8" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#f1f5f9' }}>{title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6 }}>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ——— TEMPLATES ——— */}
      <section style={{ padding: '6rem 2rem', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Templates</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              6 stunning themes to choose from
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Switch between templates instantly — all your data stays intact.</p>
          </motion.div>

          <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {TEMPLATES.map((t) => (
              <motion.div key={t.name} variants={fadeUp} className="glass card-hover"
                style={{ borderRadius: '16px', overflow: 'hidden', border: `1px solid ${t.color}22` }}>
                {/* Template color bar */}
                <div style={{ height: '8px', background: `linear-gradient(90deg, ${t.color}, ${t.color}88)` }} />
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontWeight: 700, color: '#f1f5f9' }}>{t.name}</h3>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: t.color }} />
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem' }}>{t.desc}</p>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {t.tags.map((tag) => (
                      <span key={tag} style={{
                        padding: '0.2rem 0.6rem', background: `${t.color}15`,
                        border: `1px solid ${t.color}30`, borderRadius: '100px',
                        fontSize: '0.7rem', fontWeight: 600, color: t.color,
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/templates" className="btn-secondary" style={{ textDecoration: 'none' }}>
              View All Templates <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ——— CTA SECTION ——— */}
      <section style={{ padding: '7rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div style={{
              display: 'inline-block', padding: '3rem 4rem',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.08))',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '24px',
            }}>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                Ready to get hired?
              </h2>
              <p style={{ color: '#64748b', fontSize: '1.15rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                Join thousands of students and developers who landed their dream jobs with a PortfolioBuilder portfolio.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/register" className="btn-primary" style={{ textDecoration: 'none', fontSize: '1.05rem', padding: '0.875rem 2rem' }}>
                  Start Building Free <ArrowRight size={18} />
                </Link>
                <Link href="/login" className="btn-secondary" style={{ textDecoration: 'none', fontSize: '1.05rem', padding: '0.875rem 2rem' }}>
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ——— PRICING SECTION ——— */}
      <section style={{ padding: '5rem 2rem', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Pricing</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>Simple, transparent pricing</h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>No hidden fees. Cancel anytime.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {PLANS.map((plan) => (
              <div key={plan.name} className="glass card-hover"
                style={{
                  borderRadius: '20px', padding: '2.5rem',
                  border: plan.highlight ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.06)',
                  position: 'relative', overflow: 'hidden',
                }}>
                {plan.highlight && (
                  <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '0.3rem 1rem', borderRadius: '0 0 10px 10px', fontSize: '0.75rem', fontWeight: 700, color: 'white' }}>
                    MOST POPULAR
                  </div>
                )}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>{plan.name}</h3>
                <div style={{ marginBottom: '2rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 900, color: plan.highlight ? '#a5b4fc' : 'white' }}>{plan.price}</span>
                  <span style={{ color: '#64748b', marginLeft: '0.4rem' }}>/{plan.period}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
                      <Check size={15} color="#4ade80" strokeWidth={3} /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={plan.highlight ? 'btn-primary' : 'btn-secondary'} style={{ textDecoration: 'none', width: '100%', justifyContent: 'center' }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— FOOTER ——— */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2.5rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ◈ PortfolioBuilder
          </span>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Templates', 'Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
              <Link key={item} href="#" style={{ color: '#475569', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#94a3b8')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}>
                {item}
              </Link>
            ))}
          </div>
          <p style={{ color: '#334155', fontSize: '0.8rem' }}>© 2026 PortfolioBuilder. Built for the next generation of talent.</p>
        </div>
      </footer>
    </div>
  );
}
