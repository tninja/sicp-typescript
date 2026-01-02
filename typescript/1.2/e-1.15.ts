// Exercise 1.15. Sine function.

export const cube = (x: number) => x * x * x;

export const p = (x: number): number => {
    return 3 * x - 4 * cube(x);
};

export const sine = (angle: number): number => {
    if (Math.abs(angle) <= 0.1) {
        return angle;
    }
    return p(sine(angle / 3.0));
};
