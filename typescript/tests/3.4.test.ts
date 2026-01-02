import { describe, test, expect } from 'vitest';
import { makeMutex } from '../3.4/3.4';

describe('Chapter 3.4: Concurrency', () => {
  test('Mutex synchronization', async () => {
    const mutex = makeMutex();
    let val = 0;
    const task = async () => {
      await mutex.acquire();
      const local = val;
      await new Promise(r => setTimeout(r, 5));
      val = local + 1;
      mutex.release();
    };
    await Promise.all([task(), task()]);
    expect(val).toBe(2);
  });
});
