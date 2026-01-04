import { describe, test, expect } from 'vitest';
import { 
  cons, 
  car, 
  cdr, 
  makeRat, 
  numer, 
  denom, 
  addRat, 
  subRat, 
  mulRat, 
  equalRat, 
  printRat,
  makeInterval,
  lowerBound,
  upperBound,
  addInterval,
  mulInterval,
  divInterval,
  makeCenterWidth,
  center,
  width,
  consFunctional,
  carFunctional,
  cdrFunctional,
  makeRatLazy,
  numerLazy,
  denomLazy
} from '../2.1/2.1';
import { makePoint, makeSegment, midpointSegment } from '../2.1/e-2.2';
import { area, makeRect } from '../2.1/e-2.3';
import { one, two, add } from '../2.1/e-2.6';
import { lowerBound as lowerBoundE27, upperBound as upperBoundE27 } from '../2.1/e-2.7';

describe('Chapter 2.1: Data Abstraction', () => {
  describe('Pairs and Lists', () => {
    test('cons, car, cdr - basic pair operations', () => {
      const pair = cons(1, 2);
      expect(car(pair)).toBe(1);
      expect(cdr(pair)).toBe(2);
    });

    test('consFunctional, carFunctional, cdrFunctional - functional pairs', () => {
      const pair = consFunctional(1, 2);
      expect(carFunctional(pair)).toBe(1);
      expect(cdrFunctional(pair)).toBe(2);
    });
  });

  describe('Rational Numbers', () => {
    test('makeRat, numer, denom - rational number construction', () => {
      const r1 = makeRat(6, 9);
      expect(numer(r1)).toBe(2);
      expect(denom(r1)).toBe(3);

      const r2 = makeRat(4, 8);
      expect(numer(r2)).toBe(1);
      expect(denom(r2)).toBe(2);
    });

    test('addRat - rational addition', () => {
      const r1 = makeRat(1, 3);
      const r2 = makeRat(1, 6);
      const sum = addRat(r1, r2);
      expect(numer(sum)).toBe(1);
      expect(denom(sum)).toBe(2);
    });

    test('subRat - rational subtraction', () => {
      const r1 = makeRat(3, 4);
      const r2 = makeRat(1, 4);
      const diff = subRat(r1, r2);
      expect(numer(diff)).toBe(1);
      expect(denom(diff)).toBe(2);
    });

    test('mulRat - rational multiplication', () => {
      const r1 = makeRat(2, 3);
      const r2 = makeRat(3, 4);
      const product = mulRat(r1, r2);
      expect(numer(product)).toBe(1);
      expect(denom(product)).toBe(2);
    });

    test('equalRat - rational equality', () => {
      const r1 = makeRat(1, 2);
      const r2 = makeRat(2, 4);
      expect(equalRat(r1, r2)).toBe(true);
      
      const r3 = makeRat(1, 3);
      expect(equalRat(r1, r3)).toBe(false);
    });

    test('printRat - rational number printing', () => {
      const r = makeRat(2, 3);
      expect(typeof printRat).toBe('function');
    });

    test('Lazy rational construction', () => {
      const r = makeRatLazy(6, 9);
      expect(numerLazy(r)).toBe(2);
      expect(denomLazy(r)).toBe(3);
    });
  });

  describe('Interval Arithmetic', () => {
    test('makeInterval, lowerBound, upperBound - interval construction', () => {
      const interval = makeInterval(1, 5);
      expect(lowerBound(interval)).toBe(1);
      expect(upperBound(interval)).toBe(5);
    });

    test('addInterval - interval addition', () => {
      const i1 = makeInterval(1, 3);
      const i2 = makeInterval(2, 4);
      const sum = addInterval(i1, i2);
      expect(lowerBound(sum)).toBe(3);
      expect(upperBound(sum)).toBe(7);
    });

    test('mulInterval - interval multiplication', () => {
      const i1 = makeInterval(1, 2);
      const i2 = makeInterval(3, 4);
      const product = mulInterval(i1, i2);
      expect(lowerBound(product)).toBe(3);
      expect(upperBound(product)).toBe(8);
    });

    test('divInterval - interval division', () => {
      const i1 = makeInterval(1, 2);
      const i2 = makeInterval(3, 4);
      const quotient = divInterval(i1, i2);
      expect(lowerBound(quotient)).toBeCloseTo(0.25, 2);
      expect(upperBound(quotient)).toBeCloseTo(0.667, 2);
    });

    test('makeCenterWidth, center, width - center-width representation', () => {
      const cw = makeCenterWidth(5, 2);
      expect(center(cw)).toBe(5);
      expect(width(cw)).toBe(2);
      expect(lowerBound(cw)).toBe(3);
      expect(upperBound(cw)).toBe(7);
    });
  });

  describe('Geometry and Rectangles', () => {
    test('makePoint, makeSegment, midpointSegment - geometric operations', () => {
      const p1 = makePoint(0, 0);
      const p2 = makePoint(4, 4);
      const mid = midpointSegment(makeSegment(p1, p2));
      expect(mid).toEqual([2, 2]);
    });

    test('area, makeRect - rectangle area calculation', () => {
      const rect = makeRect(makePoint(0, 10), makePoint(10, 0));
      expect(area(rect)).toBe(100);
    });
  });

  describe('Church Numerals', () => {
    test('one, two, add - Church numeral operations', () => {
      const inc = (x: number) => x + 1;
      expect(add(one, two)(inc)(0)).toBe(3);
    });
  });

  describe('Exercise 2.7: Interval Selectors', () => {
    test('lowerBoundE27, upperBoundE27 - alternative interval selectors', () => {
      const interval = makeInterval(1, 5);
      expect(lowerBoundE27(interval)).toBe(1);
      expect(upperBoundE27(interval)).toBe(5);
    });
  });
});
