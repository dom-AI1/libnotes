import { describe, it, expect } from 'vitest';
import { SAMPLE_STUDY_KITS } from '../src/data/mockData';

describe('Checkpoint 6: Note-Style Selection & Meaningful Distinct Content', () => {
  const thermoKit = SAMPLE_STUDY_KITS.find(k => k.id === 'kit-thermodynamics')!;

  it('provides all three distinct NoteAI note styles plus Exam Mode', () => {
    expect(thermoKit.content.quick || thermoKit.content.minimal).toBeDefined();
    expect(thermoKit.content.topper).toBeDefined();
    expect(thermoKit.content.chatpata || thermoKit.content.chatpate).toBeDefined();
    expect(thermoKit.content.exam).toBeDefined();
  });

  it('Quick Notes provides concise formula sheet and revision bullets without excessive prose', () => {
    const quick = thermoKit.content.quick || thermoKit.content.minimal!;
    expect(quick.formulas.length).toBeGreaterThanOrEqual(3);
    expect(quick.cheatSheet.length).toBeGreaterThanOrEqual(4);
    // Formulas contain First Law and Carnot efficiency
    const formulasStr = JSON.stringify(quick.formulas);
    expect(formulasStr).toContain('dQ = dU + dW');
    expect(formulasStr).toContain('η = 1 - (T2 / T1)');
  });

  it('Topper Notes provides rigorous topic-wise derivations and pro tips', () => {
    const topper = thermoKit.content.topper;
    expect(topper.derivations.length).toBeGreaterThan(0);
    expect(topper.deepDive.length).toBeGreaterThan(0);
    // Verified derivation steps
    const derivation = topper.derivations[0];
    expect(derivation.title).toContain('Isothermal');
    expect(derivation.finalResult).toContain('2.303 nRT log10(V2 / V1)');
  });

  it('Chatpata Notes provides conversational Hinglish analogies and memorable mnemonics', () => {
    const chatpata = thermoKit.content.chatpata || thermoKit.content.chatpate!;
    expect(chatpata.desiAnalogies.length).toBeGreaterThan(0);
    const analogy = chatpata.desiAnalogies[0];
    expect(analogy.analogy).toContain('Pocket Money');
    expect(analogy.desiPunchline).toContain('Gullak + Party = Mummy');
  });

  it('ensures each style generates meaningfully distinct output for the same lecture', () => {
    const quickText = JSON.stringify(thermoKit.content.quick || thermoKit.content.minimal);
    const topperText = JSON.stringify(thermoKit.content.topper);
    const chatpataText = JSON.stringify(thermoKit.content.chatpata || thermoKit.content.chatpate);

    expect(quickText).not.toEqual(topperText);
    expect(topperText).not.toEqual(chatpataText);
    expect(chatpataText).not.toEqual(quickText);
  });
});
