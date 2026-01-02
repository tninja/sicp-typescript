import { foldRight, foldLeft } from './e-2.38';

// Exercise 2.39. reverse with fold-left and fold-right.

export const reverseRight = <T>(sequence: T[]): T[] => 
    foldRight((acc: T[], curr: T) => [...acc, curr], [], sequence);

export const reverseLeft = <T>(sequence: T[]): T[] => 
    foldLeft((acc: T[], curr: T) => [curr, ...acc], [], sequence);
