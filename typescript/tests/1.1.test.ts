import { describe, test, expect } from 'vitest';
import { 
  absCond1, 
  absCond2, 
  abs, 
  gte, 
  squareIter, 
  improve, 
  isGoodEnough, 
  sqrt 
} from '../1.1/1.1';
import { ex1_2 } from '../1.1/e-1.2';
import { sumLargerSquare } from '../1.1/e-1.3';
import { aPlusAbsB } from '../1.1/e-1.4';
import { p, test } from '../1.1/e-1.5';
import { sqrtIter as sqrtIterE16, isGoodEnough as isGoodEnoughE16, improve as improveE16 } from '../1.1/e-1.6';
import { squareIterDelta, isGoodEnough as isGoodEnoughE17, improve as improveE17, sqrtDelta } from '../1.1/e-1.7';
import { cubeRootIter, cubeRoot } from '../1.1/e-1.8';

describe('Chapter 1.1: The Elements of Programming', () => {
  describe('Absolute Value Functions', () => {
    test('absCond1 - three clause version', () => {
      expect(absCond1(5)).toBe(5);
      expect(absCond1(0)).toBe(0);
      expect(absCond1(-5)).toBe(5);
    });

    test('absCond2 - two clause version', () => {
      expect(absCond2(5)).toBe(5);
      expect(absCond2(0)).toBe(0);
      expect(absCond2(-5)).toBe(5);
    });

    test('abs - preferred implementation', () => {
      expect(abs(5)).toBe(5);
      expect(abs(0)).toBe(0);
      expect(abs(-5)).toBe(5);
    });
  });

  describe('Comparison Functions', () => {
    test('gte - greater than or equal', () => {
      expect(gte(5, 3)).toBe(true);
      expect(gte(3, 3)).toBe(true);
      expect(gte(3, 5)).toBe(false);
    });
  });

  describe('Square Root Functions', () => {
    test('sqrt - main implementation', () => {
      expect(sqrt(9)).toBeCloseTo(3, 3);
      expect(sqrt(2)).toBeCloseTo(1.414, 3);
      expect(sqrt(0.25)).toBeCloseTo(0.5, 3);
    });

    test('sqrtDelta - alternative implementation', () => {
      expect(sqrtDelta(2)).toBeCloseTo(1.414, 3);
      expect(sqrtDelta(9)).toBeCloseTo(3, 3);
    });

    test('sqrtIter - exercise 1.6 implementation', () => {
      expect(sqrtIter(9)).toBeCloseTo(3, 3);
      expect(sqrtIter(2)).toBeCloseTo(1.414, 3);
    });

    test('Helper functions', () => {
      expect(isGoodEnough(3, 9)).toBe(true);
      expect(isGoodEnough(2, 9)).toBe(false);
      expect(improve(2, 9)).toBeCloseTo(3.25, 3);
    });
  });

  describe('Cube Root Functions', () => {
    test('cubeRoot - main implementation', () => {
      expect(cubeRoot(27)).toBeCloseTo(3, 2);
      expect(cubeRoot(8)).toBeCloseTo(2, 2);
      expect(cubeRoot(1)).toBeCloseTo(1, 2);
    });
  });

  describe('Exercise 1.2: Prefix Form Translation', () => {
    test('ex1_2 - complex expression evaluation', () => {
      const result = ex1_2();
      expect(result).toBeCloseTo(-0.255555, 5);
    });
  });

  describe('Exercise 1.3: Sum of Squares of Two Larger Numbers', () => {
    test('sumLargerSquare - various cases', () => {
      expect(sumLargerSquare(1, 2, 3)).toBe(13);
      expect(sumLargerSquare(3, 2, 1)).toBe(13);
      expect(sumLargerSquare(5, 1, 2)).toBe(29);
      expect(sumLargerSquare(1, 1, 1)).toBe(2);
    });
  });

  describe('Exercise 1.4: Compound Operators', () => {
    test('aPlusAbsB - dynamic operator selection', () => {
      expect(aPlusAbsB(10, 5)).toBe(15);
      expect(aPlusAbsB(10, -5)).toBe(15);
      expect(aPlusAbsB(0, 7)).toBe(7);
      expect(aPlusAbsB(0, -7)).toBe(7);
    });
  });

  describe('Exercise 1.5: Applicative Order vs Normal Order', () => {
    test('p - infinite loop function', () => {
      expect(typeof p).toBe('function');
    });

    test('test - conditional evaluation function', () => {
      expect(test(0, 'anything')).toBe(0);
      expect(test(1, 'result')).toBe('result');
    });
  });

  describe('Exercise 1.6: newIf vs built-in if', () => {
    test('newIf - basic functionality', () => {
      expect(improveE16(2, 9)).toBeCloseTo(3.25, 3);
      expect(isGoodEnoughE16(3, 9)).toBe(true);
    });

    test('Helper functions work independently', () => {
      expect(typeof sqrtIterE16).toBe('function');
    });
  });
});
