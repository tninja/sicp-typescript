// Exercise 1.12. Pascal's triangle.

export const pascal = (row: number, col: number): number => {
    if (col === 1 || col === row) {
        return 1;
    }
    return pascal(row - 1, col - 1) + pascal(row - 1, col);
};
