import { describe, test, expect } from 'vitest';
import { compile } from '../5.5/5.5';

describe('Chapter 5.5: Compilation', () => {
  test('Compile self-evaluating', () => {
    const code = compile(5, 'val', 'next');
    expect(code.statements).toContain('(assign val (const 5))');
  });
});
