// Exercise 2.75. Message passing style make-from-mag-ang.

export const makeFromMagAng = (r: number, a: number) => {
    return (op: string) => {
        switch (op) {
            case 'real-part': return r * Math.cos(a);
            case 'imag-part': return r * Math.sin(a);
            case 'magnitude': return r;
            case 'angle': return a;
            default: throw new Error("Unknown op -- MAKE-FROM-MAG-ANG " + op);
        }
    };
};
