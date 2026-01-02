import { average } from '../common';
import { cons, car, cdr, Pair } from './2.1';

// Exercise 2.2. Line segments.

export type Point = Pair<number, number>;
export const makePoint = (x: number, y: number): Point => cons(x, y);
export const xPoint = (p: Point) => car(p);
export const yPoint = (p: Point) => cdr(p);

export type Segment = Pair<Point, Point>;
export const makeSegment = (start: Point, end: Point): Segment => cons(start, end);
export const startSegment = (s: Segment) => car(s);
export const endSegment = (s: Segment) => cdr(s);

export const midpointSegment = (s: Segment): Point => {
    return makePoint(
        average(xPoint(startSegment(s)), xPoint(endSegment(s))),
        average(yPoint(startSegment(s)), yPoint(endSegment(s)))
    );
};

export const printPoint = (p: Point) => {
    console.log(`(${xPoint(p)},${yPoint(p)})`);
};
