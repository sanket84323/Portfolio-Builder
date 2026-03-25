export const TEMPLATE_THEMES: Record<string, {
  name: string; description: string; primaryColor: string; accentColor: string;
  backgroundColor: string; textColor: string; fontFamily: string; cardStyle: string;
  buttonStyle: string; template: string; darkMode: boolean;
  heroLayout: string; bgPattern: string; useGradientBg: boolean;
  navStyle: string; borderRadius: string; sectionSpacing: string;
}> = {
  developer: { name: 'Developer', description: 'Dark, modern developer-focused theme', primaryColor: '#6366f1', accentColor: '#8b5cf6', backgroundColor: '#0f0f1a', textColor: '#f8fafc', fontFamily: 'Inter', cardStyle: 'glass', buttonStyle: 'gradient', template: 'developer', darkMode: true, heroLayout: 'centered', bgPattern: 'glow', useGradientBg: false, navStyle: 'floating', borderRadius: 'lg', sectionSpacing: 'normal' },
  minimal: { name: 'Minimal', description: 'Clean white minimal design', primaryColor: '#0ea5e9', accentColor: '#06b6d4', backgroundColor: '#ffffff', textColor: '#1e293b', fontFamily: 'Outfit', cardStyle: 'bordered', buttonStyle: 'outline', template: 'minimal', darkMode: false, heroLayout: 'left', bgPattern: 'none', useGradientBg: false, navStyle: 'minimal', borderRadius: 'md', sectionSpacing: 'relaxed' },
  creative: { name: 'Creative', description: 'Vibrant creative designer theme', primaryColor: '#f43f5e', accentColor: '#ec4899', backgroundColor: '#1a0a2e', textColor: '#fdf4ff', fontFamily: 'Space Grotesk', cardStyle: 'glass', buttonStyle: 'gradient', template: 'creative', darkMode: true, heroLayout: 'split', bgPattern: 'mesh', useGradientBg: true, navStyle: 'solid', borderRadius: 'full', sectionSpacing: 'relaxed' },
  placement: { name: 'Placement Ready', description: 'Professional corporate theme for placements', primaryColor: '#10b981', accentColor: '#059669', backgroundColor: '#0a1628', textColor: '#f1f5f9', fontFamily: 'Roboto', cardStyle: 'raised', buttonStyle: 'solid', template: 'placement', darkMode: true, heroLayout: 'left', bgPattern: 'none', useGradientBg: false, navStyle: 'solid', borderRadius: 'sm', sectionSpacing: 'compact' },
  academic: { name: 'Academic', description: 'Clean academic student portfolio', primaryColor: '#3b82f6', accentColor: '#2563eb', backgroundColor: '#f8fafc', textColor: '#1e293b', fontFamily: 'Merriweather', cardStyle: 'bordered', buttonStyle: 'solid', template: 'academic', darkMode: false, heroLayout: 'centered', bgPattern: 'dots', useGradientBg: false, navStyle: 'minimal', borderRadius: 'none', sectionSpacing: 'normal' },
  premium: { name: 'Premium Card', description: 'Luxurious card-based premium theme', primaryColor: '#f59e0b', accentColor: '#d97706', backgroundColor: '#09090b', textColor: '#fafafa', fontFamily: 'Playfair Display', cardStyle: 'glass', buttonStyle: 'gradient', template: 'premium', darkMode: true, heroLayout: 'split', bgPattern: 'glow', useGradientBg: false, navStyle: 'floating', borderRadius: 'lg', sectionSpacing: 'relaxed' },
  cyberpunk: { name: 'Cyberpunk', description: 'Neon-on-black with electric accents', primaryColor: '#00ffcc', accentColor: '#ff00ff', backgroundColor: '#050510', textColor: '#e0e0ff', fontFamily: 'Fira Code', cardStyle: 'bordered', buttonStyle: 'outline', template: 'cyberpunk', darkMode: true, heroLayout: 'left', bgPattern: 'grid', useGradientBg: false, navStyle: 'solid', borderRadius: 'none', sectionSpacing: 'normal' },
  glassnoir: { name: 'Glass Noir', description: 'Frosted glass on deep charcoal', primaryColor: '#a78bfa', accentColor: '#7c3aed', backgroundColor: '#111118', textColor: '#e2e8f0', fontFamily: 'DM Sans', cardStyle: 'glass', buttonStyle: 'ghost', template: 'glassnoir', darkMode: true, heroLayout: 'centered', bgPattern: 'mesh', useGradientBg: false, navStyle: 'floating', borderRadius: 'lg', sectionSpacing: 'relaxed' },
  retro: { name: 'Retro Terminal', description: 'Green-on-dark terminal / hacker aesthetic', primaryColor: '#22c55e', accentColor: '#16a34a', backgroundColor: '#020d02', textColor: '#bbf7d0', fontFamily: 'Fira Code', cardStyle: 'bordered', buttonStyle: 'outline', template: 'retro', darkMode: true, heroLayout: 'left', bgPattern: 'grid', useGradientBg: false, navStyle: 'none', borderRadius: 'none', sectionSpacing: 'compact' },
  brutalist: { name: 'Brutalist', description: 'Bold, raw, high-contrast design', primaryColor: '#facc15', accentColor: '#f97316', backgroundColor: '#0a0a0a', textColor: '#ffffff', fontFamily: 'Space Grotesk', cardStyle: 'flat', buttonStyle: 'solid', template: 'brutalist', darkMode: true, heroLayout: 'minimal', bgPattern: 'none', useGradientBg: false, navStyle: 'solid', borderRadius: 'none', sectionSpacing: 'relaxed' },
  pastel: { name: 'Pastel Garden', description: 'Soft pastel light palette for creatives', primaryColor: '#db2777', accentColor: '#9333ea', backgroundColor: '#fdf2f8', textColor: '#1e1b4b', fontFamily: 'Nunito', cardStyle: 'raised', buttonStyle: 'gradient', template: 'pastel', darkMode: false, heroLayout: 'centered', bgPattern: 'dots', useGradientBg: true, navStyle: 'floating', borderRadius: 'full', sectionSpacing: 'normal' },
  sunset: { name: 'Sunset', description: 'Warm orange-to-pink gradient glow', primaryColor: '#f97316', accentColor: '#ec4899', backgroundColor: '#18080e', textColor: '#fef3c7', fontFamily: 'Outfit', cardStyle: 'glass', buttonStyle: 'gradient', template: 'sunset', darkMode: true, heroLayout: 'split', bgPattern: 'glow', useGradientBg: true, navStyle: 'minimal', borderRadius: 'md', sectionSpacing: 'normal' },
  ocean: { name: 'Ocean Deep', description: 'Cool blues and teals — calm & professional', primaryColor: '#0ea5e9', accentColor: '#06b6d4', backgroundColor: '#0c1929', textColor: '#e0f2fe', fontFamily: 'Raleway', cardStyle: 'glass', buttonStyle: 'solid', template: 'ocean', darkMode: true, heroLayout: 'left', bgPattern: 'diagonal', useGradientBg: false, navStyle: 'solid', borderRadius: 'lg', sectionSpacing: 'relaxed' },
  rosegold: { name: 'Rose Gold', description: 'Elegant rose gold on near-white', primaryColor: '#c084fc', accentColor: '#e879f9', backgroundColor: '#fff5f5', textColor: '#1c1917', fontFamily: 'Cormorant Garamond', cardStyle: 'raised', buttonStyle: 'gradient', template: 'rosegold', darkMode: false, heroLayout: 'centered', bgPattern: 'none', useGradientBg: false, navStyle: 'floating', borderRadius: 'md', sectionSpacing: 'normal' },
  monochrome: { name: 'Monochrome', description: 'Grayscale with a single accent punch', primaryColor: '#f8fafc', accentColor: '#94a3b8', backgroundColor: '#020208', textColor: '#f8fafc', fontFamily: 'Inter', cardStyle: 'bordered', buttonStyle: 'outline', template: 'monochrome', darkMode: true, heroLayout: 'left', bgPattern: 'grid', useGradientBg: false, navStyle: 'solid', borderRadius: 'sm', sectionSpacing: 'compact' },
  neon: { name: 'Neon Flux', description: 'Multi-color neon lighting vibe', primaryColor: '#f0abfc', accentColor: '#67e8f9', backgroundColor: '#09000d', textColor: '#faf5ff', fontFamily: 'Space Grotesk', cardStyle: 'glass', buttonStyle: 'gradient', template: 'neon', darkMode: true, heroLayout: 'centered', bgPattern: 'glow', useGradientBg: true, navStyle: 'floating', borderRadius: 'full', sectionSpacing: 'relaxed' },
};

export const FONT_OPTIONS = [
  { label: 'Inter', value: 'Inter' },
  { label: 'DM Sans', value: 'DM Sans' },
  { label: 'Roboto', value: 'Roboto' },
  { label: 'Lato', value: 'Lato' },
  { label: 'Outfit', value: 'Outfit' },
  { label: 'Space Grotesk', value: 'Space Grotesk' },
  { label: 'Poppins', value: 'Poppins' },
  { label: 'Nunito', value: 'Nunito' },
  { label: 'Raleway', value: 'Raleway' },
  { label: 'Josefin Sans', value: 'Josefin Sans' },
  { label: 'Merriweather', value: 'Merriweather' },
  { label: 'Playfair Display', value: 'Playfair Display' },
  { label: 'Cormorant Garamond', value: 'Cormorant Garamond' },
  { label: 'Crimson Text', value: 'Crimson Text' },
  { label: 'Fira Code', value: 'Fira Code' },
  { label: 'Source Sans 3', value: 'Source Sans 3' },
];

export const FONT_SIZE_OPTIONS = [
  { label: 'Small (14px)', value: 'sm' },
  { label: 'Medium (16px)', value: 'md' },
  { label: 'Large (18px)', value: 'lg' },
];

export const HERO_LAYOUT_OPTIONS = [
  { label: 'Centered', value: 'centered', desc: 'Avatar + text centered' },
  { label: 'Left Aligned', value: 'left', desc: 'Text left, avatar right' },
  { label: 'Split', value: 'split', desc: 'Equal halves' },
  { label: 'Minimal', value: 'minimal', desc: 'Text only, no avatar' },
];

export const BG_PATTERN_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Radial Glow', value: 'glow' },
  { label: 'Grid Lines', value: 'grid' },
  { label: 'Dots', value: 'dots' },
  { label: 'Diagonal Lines', value: 'diagonal' },
  { label: 'Gradient Mesh', value: 'mesh' },
];

export const SKILL_CATEGORIES_DEFAULT = [
  { name: 'Languages', skills: [] },
  { name: 'Frontend', skills: [] },
  { name: 'Backend', skills: [] },
  { name: 'Tools & DevOps', skills: [] },
  { name: 'AI / ML / IoT', skills: [] },
];

export const ACHIEVEMENT_CATEGORIES = [
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'certification', label: 'Certification' },
  { value: 'award', label: 'Award' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'internship', label: 'Internship' },
  { value: 'other', label: 'Other' },
];
