import { cons, car, cdr } from './2.1';
import { makePoint, xPoint, yPoint, Point } from './e-2.2';

// Exercise 2.3. Rectangles.

// Representation 1: top-left and bottom-right points
export type Rect = [Point, Point];
export const makeRect = (topLeft: Point, bottomRight: Point): Rect => [topLeft, bottomRight];

export const rectWidth = (r: Rect) => Math.abs(xPoint(r[0]) - xPoint(r[1]));
export const rectHeight = (r: Rect) => Math.abs(yPoint(r[0]) - yPoint(r[1]));

export const area = (r: Rect) => rectWidth(r) * rectHeight(r);
export const perimeter = (r: Rect) => 2 * (rectWidth(r) + rectHeight(r));
