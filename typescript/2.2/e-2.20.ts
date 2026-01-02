import { isOdd } from '../common';

// Exercise 2.20. same-parity.

export const sameParity = (leader: number, ...rest: number[]): number[] => {
    const leaderIsOdd = isOdd(leader);
    return [leader, ...rest.filter(x => isOdd(x) === leaderIsOdd)];
};
