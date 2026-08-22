import { describe, expect, it } from 'vitest';
import { generateSchema, jsonLdScript, validateSchema } from '../src/lib/schema';

describe('schema generator', () => {
  it('creates FAQ mainEntity items', () => {
    const schema = generateSchema('FAQPage', { questions: [{ question: 'What is it?', answer: 'A tool.' }] });
    expect(schema.mainEntity).toEqual([{ '@type': 'Question', name: 'What is it?', acceptedAnswer: { '@type': 'Answer', text: 'A tool.' } }]);
  });

  it('creates a paste-ready script wrapper', () => {
    const result = jsonLdScript({ '@context': 'https://schema.org', '@type': 'Article' });
    expect(result).toContain('<script type="application/ld+json">');
    expect(result).toContain('</script>');
  });

  it('flags missing required fields', () => {
    expect(validateSchema('Organization', {})).toContain('Add a value for name.');
  });
});
