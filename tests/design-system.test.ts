import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Checkpoint 1: Design System & Visual Tokens', () => {
  const indexCss = fs.readFileSync(path.resolve(__dirname, '../src/index.css'), 'utf-8');
  const indexHtml = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');

  it('defines the warm off-white ivory background color token (#F7F5EF)', () => {
    expect(indexCss).toContain('#F7F5EF');
  });

  it('defines botanical green (#79A94A) and soft green tint (#E8F2DC)', () => {
    expect(indexCss).toContain('#79A94A');
    expect(indexCss).toContain('#E8F2DC');
  });

  it('loads Space Mono and Inter typography in index.html', () => {
    expect(indexHtml).toContain('Space+Mono');
    expect(indexHtml).toContain('Inter');
  });

  it('defines editorial card styles with restrained shadows and charcoal borders', () => {
    expect(indexCss).toContain('card-editorial');
    expect(indexCss).toContain('border: 1.5px solid #141414');
    expect(indexCss).toContain('box-shadow: 3px 3px 0px #141414');
  });

  it('defines consistent primary green button and secondary outline button styles', () => {
    expect(indexCss).toContain('btn-primary-green');
    expect(indexCss).toContain('btn-secondary-outline');
  });

  it('ensures no neon gradients or excessive saturated styling is used', () => {
    expect(indexCss.toLowerCase()).not.toContain('conic-gradient');
    expect(indexCss.toLowerCase()).not.toContain('linear-gradient(to right, #ff00');
  });
});

