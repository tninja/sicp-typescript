import { contFracIter } from './e-1.37';

// Exercise 1.38. Euler's e-2.

export const eMinus2 = (k: number): number => {
    const nProc = () => 1.0;
    const dProc = (i: number) => {
        if ((i + 1) % 3 === 0) {
            return 2 * (i + 1) / 3;
        }
        return 1.0;
    };
    return contFracIter(nProc, dProc, k);
};

export const eApprox = (k: number) => eMinus2(k) + 2;
