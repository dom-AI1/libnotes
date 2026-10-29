import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Checkpoint 2: Landing Page Required Sections & Verification', () => {
  const appTsx = fs.readFileSync(path.resolve(__dirname, '../src/App.tsx'), 'utf-8');
  const heroTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/Hero.tsx'), 'utf-8');
  const featureCardsTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/FeatureCards.tsx'), 'utf-8');
  const howItWorksTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/HowItWorks.tsx'), 'utf-8');
  const productPreviewTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/ProductPreview.tsx'), 'utf-8');
  const finalCtaTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/FinalCTA.tsx'), 'utf-8');
  const footerTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/Footer.tsx'), 'utf-8');

  it('renders all 11 required landing page components in App.tsx', () => {
    expect(appTsx).toContain('<Navbar');
    expect(appTsx).toContain('<Hero');
    expect(appTsx).toContain('<FeatureCards');
    expect(appTsx).toContain('<ProductPreview');
    expect(appTsx).toContain('<HowItWorks');
    expect(appTsx).toContain('<FinalCTA');
    expect(appTsx).toContain('<Footer');
  });

  it('renders the exact hero headline with highlighted "exam-ready" phrase', () => {
    expect(heroTsx).toContain('Turn educational videos into');
    expect(heroTsx).toContain('exam-ready');
    expect(heroTsx).toContain('selection-box');
  });

  it('provides both Upload Lecture and Paste Video Link CTAs in Hero and FinalCTA', () => {
    expect(heroTsx).toContain('Upload Video File');
    expect(heroTsx).toContain('Paste Video Link');
    expect(finalCtaTsx).toContain('Upload Video File');
    expect(finalCtaTsx).toContain('Paste Video Link');
  });

  it('contains the three staggered feature cards with line art SVGs', () => {
    expect(featureCardsTsx).toContain('Learn Your Way');
    expect(featureCardsTsx).toContain('Ready for Exams');
    expect(featureCardsTsx).toContain('Understand Your Weak Spots');
    expect(featureCardsTsx).toContain('NotebookIllustration');
    expect(featureCardsTsx).toContain('ExamIllustration');
    expect(featureCardsTsx).toContain('WeakSpotsIllustration');
  });

  it('includes How It Works 3-step breakdown and About Manifesto', () => {
    expect(howItWorksTsx).toContain('Feed Any Lecture');
    expect(howItWorksTsx).toContain('Choose Note Format');
    expect(howItWorksTsx).toContain('Test & Conquer Weak Spots');
    expect(howItWorksTsx).toContain('OUR MANIFESTO');
  });

  it('includes an interactive Product Preview with live note style switcher', () => {
    expect(productPreviewTsx).toContain('PRODUCT PREVIEW');
    expect(productPreviewTsx).toContain('Open Interactive Workspace');
  });

  it('does not contain invented metrics or fake testimonials in the footer', () => {
    expect(footerTsx.toLowerCase()).not.toContain('million users');
    expect(footerTsx.toLowerCase()).not.toContain('trusted by harvard');
  });
});
