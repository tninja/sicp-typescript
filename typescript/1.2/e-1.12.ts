// TypeScript implementation of SICP Exercise 1.12 - Pascal's Triangle
// Original Scheme code is included as comments for reference

// Exercise 1.12. Pascal's triangle.

// Scheme: (define (pascal row col)
//          (if (or (= col 1) (= col row))
//              1
//              (+ (pascal (- row 1) (- col 1))
//                 (pascal (- row 1) col))))
export const pascal = (row: number, col: number): number => {
    if (col === 1 || col === row) {
        return 1;
    }
    return pascal(row - 1, col - 1) + pascal(row - 1, col);
};
