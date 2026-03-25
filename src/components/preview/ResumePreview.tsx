'use client';

import { IPortfolio } from '@/models/Portfolio';
import { useEffect, useRef, useState } from 'react';

interface ResumePreviewProps {
  portfolio: IPortfolio;
}

export default function ResumePreview({ portfolio }: ResumePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const displayName = portfolio.name || 'Your Name';
    const email = portfolio.socialLinks?.email || '';
    const phone = portfolio.socialLinks?.phone || '';
    const linkedin = portfolio.socialLinks?.linkedin || '';
    const github = portfolio.socialLinks?.github || '';
    const location = portfolio.socialLinks?.location || '';

    // Helper to format links simply for ATS
    const contactParts = [];
    if (email) contactParts.push(`<a href="mailto:${email}">${email}</a>`);
    if (phone) contactParts.push(phone);
    if (location) contactParts.push(location);
    if (linkedin) contactParts.push(`<a href="${linkedin}">LinkedIn</a>`);
    if (github) contactParts.push(`<a href="${github}">GitHub</a>`);
    if (portfolio.socialLinks?.website) contactParts.push(`<a href="${portfolio.socialLinks.website}">Website</a>`);

    const contactHtml = contactParts.join(' | ');

    // Extract Summary
    const summary = portfolio.about || portfolio.tagline || '';

    // Experience (Achievements mapped as Experience)
    const experienceHtml = portfolio.achievements?.length ? `
      <h2>Professional Experience</h2>
      ${portfolio.achievements.map((ach: any) => `
        <div class="item">
          <div class="item-header">
            <span>${ach.title}</span>
            <span>${ach.date || ''}</span>
          </div>
          <div class="item-sub">
            <span>${ach.issuer || ''}</span>
          </div>
          ${ach.description ? `<ul><li>${ach.description}</li></ul>` : ''}
        </div>
      `).join('')}
    ` : '';

    // Projects
    const projectsHtml = portfolio.projects?.length ? `
      <h2>Projects</h2>
      ${portfolio.projects.map((proj: any) => `
        <div class="item">
          <div class="item-header">
            <span>${proj.title} ${proj.liveLink || proj.githubLink ? ` <a href="${proj.liveLink || proj.githubLink}" style="font-weight:normal; font-size:10pt;">[Link]</a>` : ''}</span>
            <span>${proj.techStack?.length ? proj.techStack.join(', ') : ''}</span>
          </div>
          ${proj.description ? `<ul class="desc-list">${proj.description.split('\n').filter((d:string)=>d.trim()).map((d:string) => `<li>${d.trim()}</li>`).join('')}</ul>` : ''}
        </div>
      `).join('')}
    ` : '';

    // Education
    const educationHtml = portfolio.education?.length ? `
      <h2>Education</h2>
      ${portfolio.education.map((edu: any) => `
        <div class="item">
          <div class="item-header">
            <span>${edu.degree}</span>
            <span>${edu.year || ''}</span>
          </div>
          <div class="item-sub">
            <span>${edu.institution}</span>
          </div>
          ${edu.description ? `<p style="margin:2pt 0 0 0; font-size:10pt;">${edu.description}</p>` : ''}
        </div>
      `).join('')}
    ` : '';

    // Skills
    const skillsHtml = portfolio.skillCategories?.length ? `
      <h2>Skills</h2>
      <div class="item">
        ${portfolio.skillCategories.filter((c:any) => c.skills?.length).map((c: any) => `
          <div style="margin-bottom: 3pt;">
            <strong>${c.name}:</strong> ${c.skills.join(', ')}
          </div>
        `).join('')}
      </div>
    ` : '';

    const srcDoc = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${displayName} - Resume</title>
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #000;
            background: #e2e8f0; /* Default preview background */
            font-size: 11pt;
            line-height: 1.4;
            margin: 0;
            padding: 20px;
          }
          .page {
            max-width: 8.5in;
            margin: 0 auto;
            padding: 1in;
            background: #ffffff;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          a { color: #000; text-decoration: none; border-bottom: 1px solid #ccc; }
          
          /* Typography */
          h1 { font-size: 24pt; margin: 0 0 4pt 0; text-align: center; line-height: 1.1; }
          .role { text-align: center; font-size: 12pt; margin-bottom: 6pt; font-weight: 500; }
          .contact-info { text-align: center; font-size: 10pt; margin-bottom: 16pt; }
          .contact-info a { border-bottom: none; }
          
          h2 { 
            font-size: 12pt; 
            text-transform: uppercase; 
            border-bottom: 1px solid #000; 
            margin: 16pt 0 8pt 0; 
            padding-bottom: 2pt; 
            letter-spacing: 0.5px;
          }
          
          .item { margin-bottom: 12pt; page-break-inside: avoid; }
          .item-header { display: flex; justify-content: space-between; font-weight: bold; align-items: baseline; }
          .item-sub { display: flex; justify-content: space-between; font-style: italic; margin-bottom: 4pt; font-size: 10.5pt; }
          .desc-list { margin: 4pt 0 0 0; padding-left: 18pt; }
          .desc-list li { margin-bottom: 3pt; text-align: justify; }
          
          p { margin: 0 0 8pt 0; text-align: justify; }

          .print-btn {
            display: block;
            margin: 0 auto 20px auto;
            padding: 10px 20px;
            background: #0f172a;
            color: #fff;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.2s, background 0.2s;
          }
          .print-btn:hover { background: #1e293b; transform: translateY(-1px); }

          /* Print Overrides */
          @media print {
            body { background: #fff; padding: 0; }
            .page { 
              box-shadow: none; 
              margin: 0; 
              padding: 0; 
              max-width: 100%; 
              width: 100%; 
            }
            .no-print { display: none !important; }
          }
        </style>
      </head>
      <body>
        <button class="print-btn no-print" onclick="window.print()">Download / Print ATS PDF</button>
        <div class="page">
          <h1>${displayName}</h1>
          ${portfolio.role ? `<div class="role">${portfolio.role}</div>` : ''}
          <div class="contact-info">
            ${contactHtml}
          </div>

          ${summary ? `
            <h2>Professional Summary</h2>
            <p>${summary}</p>
          ` : ''}
          
          ${experienceHtml}
          ${projectsHtml}
          ${educationHtml}
          ${skillsHtml}
        </div>
      </body>
      </html>
    `;

    setHtmlContent(srcDoc);
  }, [portfolio]);

  // Use a blob URL if needed, or srcDoc. srcDoc is easier for full HTML strings.
  return (
    <iframe
      ref={iframeRef}
      srcDoc={htmlContent}
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: '#e2e8f0'
      }}
      title="ATS Resume Preview"
    />
  );
}
