import mongoose, { Schema, Document } from 'mongoose';

export interface IProject {
  _id?: string;
  title: string;
  description: string;
  image?: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  videoDescription?: string;
  videoType?: 'upload' | 'youtube' | 'vimeo';
  featured?: boolean;
}

export interface IEducation {
  _id?: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  grade?: string;
  achievements?: string;
}

export interface ISkillCategory {
  name: string;
  skills: string[];
}

export interface IAchievement {
  _id?: string;
  title: string;
  category: 'hackathon' | 'certification' | 'award' | 'leadership' | 'internship' | 'other';
  description: string;
  date?: string;
  link?: string;
  issuer?: string;
}

export interface IThemeSettings {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: string;
  borderRadius: string;
  cardStyle: 'flat' | 'raised' | 'bordered' | 'glass';
  buttonStyle: 'solid' | 'outline' | 'gradient' | 'ghost';
  sectionSpacing: 'compact' | 'normal' | 'relaxed';
  darkMode: boolean;
  animationsEnabled: boolean;
  template: string;
  // Extended customization
  heroLayout: 'centered' | 'left' | 'split' | 'minimal';
  bgPattern: 'none' | 'glow' | 'grid' | 'dots' | 'diagonal' | 'mesh';
  gradientStart: string;
  gradientEnd: string;
  gradientAngle: number;
  useGradientBg: boolean;
  navStyle: 'floating' | 'solid' | 'minimal' | 'none';
  showSkillBars: boolean;
  sectionVisibility: {
    about: boolean;
    education: boolean;
    skills: boolean;
    projects: boolean;
    achievements: boolean;
    contact: boolean;
  };
  customCSS: string;
}

export interface ISocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
  email?: string;
  phone?: string;
}

export interface IPortfolio extends Document {
  _id: string;
  userId: string;
  title: string;
  tagline: string;
  about: string;
  profileImage?: string;
  role: string;
  college: string;
  degree: string;
  careerFocus?: string;
  interests: string[];
  education: IEducation[];
  skillCategories: ISkillCategory[];
  projects: IProject[];
  achievements: IAchievement[];
  resumeUrl?: string;
  socialLinks: ISocialLinks;
  themeSettings: IThemeSettings;
  seoTitle?: string;
  seoDescription?: string;
  faviconUrl?: string;
  status: 'draft' | 'published' | 'updated';
  publicSlug: string;
  publishedUrl?: string;
  publishedAt?: Date;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  techStack: [{ type: String }],
  githubLink: { type: String, default: '' },
  liveLink: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
  videoThumbnail: { type: String, default: '' },
  videoDescription: { type: String, default: '' },
  videoType: { type: String, enum: ['upload', 'youtube', 'vimeo'], default: 'youtube' },
  featured: { type: Boolean, default: false },
});

const EducationSchema = new Schema<IEducation>({
  institution: { type: String, default: '' },
  degree: { type: String, default: '' },
  field: { type: String, default: '' },
  startYear: { type: String, default: '' },
  endYear: { type: String, default: '' },
  grade: { type: String, default: '' },
  achievements: { type: String, default: '' },
});

const AchievementSchema = new Schema<IAchievement>({
  title: { type: String, default: '' },
  category: {
    type: String,
    enum: ['hackathon', 'certification', 'award', 'leadership', 'internship', 'other'],
    default: 'other',
  },
  description: { type: String, default: '' },
  date: { type: String, default: '' },
  link: { type: String, default: '' },
  issuer: { type: String, default: '' },
});

const ThemeSettingsSchema = new Schema<IThemeSettings>({
  primaryColor: { type: String, default: '#6366f1' },
  accentColor: { type: String, default: '#8b5cf6' },
  backgroundColor: { type: String, default: '#0f0f1a' },
  textColor: { type: String, default: '#f8fafc' },
  fontFamily: { type: String, default: 'Inter' },
  fontSize: { type: String, default: 'md' },
  borderRadius: { type: String, default: 'lg' },
  cardStyle: { type: String, enum: ['flat', 'raised', 'bordered', 'glass'], default: 'glass' },
  buttonStyle: { type: String, enum: ['solid', 'outline', 'gradient', 'ghost'], default: 'gradient' },
  sectionSpacing: { type: String, enum: ['compact', 'normal', 'relaxed'], default: 'normal' },
  darkMode: { type: Boolean, default: true },
  animationsEnabled: { type: Boolean, default: true },
  template: { type: String, default: 'developer' },
  heroLayout: { type: String, enum: ['centered', 'left', 'split', 'minimal'], default: 'centered' },
  bgPattern: { type: String, enum: ['none', 'glow', 'grid', 'dots', 'diagonal', 'mesh'], default: 'glow' },
  gradientStart: { type: String, default: '#6366f1' },
  gradientEnd: { type: String, default: '#8b5cf6' },
  gradientAngle: { type: Number, default: 135 },
  useGradientBg: { type: Boolean, default: false },
  navStyle: { type: String, enum: ['floating', 'solid', 'minimal', 'none'], default: 'floating' },
  showSkillBars: { type: Boolean, default: false },
  sectionVisibility: {
    about: { type: Boolean, default: true },
    education: { type: Boolean, default: true },
    skills: { type: Boolean, default: true },
    projects: { type: Boolean, default: true },
    achievements: { type: Boolean, default: true },
    contact: { type: Boolean, default: true },
  },
  customCSS: { type: String, default: '' },
});

const PortfolioSchema = new Schema<IPortfolio>(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, default: 'My Portfolio' },
    tagline: { type: String, default: '' },
    about: { type: String, default: '' },
    profileImage: { type: String, default: '' },
    role: { type: String, default: '' },
    college: { type: String, default: '' },
    degree: { type: String, default: '' },
    careerFocus: { type: String, default: '' },
    interests: [{ type: String }],
    education: [EducationSchema],
    skillCategories: [
      {
        name: { type: String },
        skills: [{ type: String }],
      },
    ],
    projects: [ProjectSchema],
    achievements: [AchievementSchema],
    resumeUrl: { type: String, default: '' },
    socialLinks: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
      website: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
    },
    themeSettings: { type: ThemeSettingsSchema, default: () => ({}) },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    faviconUrl: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'published', 'updated'], default: 'draft' },
    publicSlug: { type: String, required: true, unique: true },
    publishedUrl: { type: String, default: '' },
    publishedAt: { type: Date },
    viewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

PortfolioSchema.index({ publicSlug: 1 }, { unique: true });
PortfolioSchema.index({ userId: 1 });

export default mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
