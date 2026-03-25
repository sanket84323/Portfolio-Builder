'use client';

import { Mail, Github, Linkedin, Twitter, Globe, Phone, Instagram } from 'lucide-react';
import { IPortfolio, ISocialLinks } from '@/models/Portfolio';

interface EditorProps {
  portfolio: IPortfolio;
  onUpdate: (updates: Partial<IPortfolio>) => void;
  portfolioId: string;
}

const SOCIAL_FIELDS: { key: keyof ISocialLinks; label: string; icon: React.ElementType; placeholder: string }[] = [
  { key: 'email', label: 'Email', icon: Mail, placeholder: 'you@example.com' },
  { key: 'github', label: 'GitHub', icon: Github, placeholder: 'https://github.com/yourusername' },
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/yourprofile' },
  { key: 'twitter', label: 'Twitter / X', icon: Twitter, placeholder: 'https://twitter.com/yourhandle' },
  { key: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/yourhandle' },
  { key: 'website', label: 'Personal Website', icon: Globe, placeholder: 'https://yourwebsite.com' },
  { key: 'phone', label: 'Phone (optional)', icon: Phone, placeholder: '+91 98765 43210' },
];

export default function ContactEditor({ portfolio, onUpdate }: EditorProps) {
  const socialLinks = portfolio.socialLinks || {};

  const update = (key: keyof ISocialLinks, val: string) =>
    onUpdate({ socialLinks: { ...socialLinks, [key]: val } });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <p style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.6 }}>
        These will appear as clickable icons on your portfolio's contact section and footer.
      </p>

      {SOCIAL_FIELDS.map(({ key, label, icon: Icon, placeholder }) => (
        <div key={key}>
          <label className="label-field">
            <Icon size={12} style={{ display: 'inline', marginRight: '0.3rem' }} />{label}
          </label>
          <input
            className="input-field"
            placeholder={placeholder}
            value={(socialLinks as Record<string, string>)[key] || ''}
            onChange={(e) => update(key, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
