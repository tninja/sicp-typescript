// Exercise 1.2: Translate the following expression into prefix form
// 
//     5 + 4 + (2 - (3 - (6 + 4/3)))
//     -----------------------------
//         3 * (6 - 2) * (2 - 7)
//
// Original Scheme expression:
// (/ (+ 5 4 (- 2 (- 3 (+ 6 (/ 4 3))))) (* 3 (- 6 2) (- 2 7)))

export const ex1_2 = (): number => {
    // Calculate numerator: (+ 5 4 (- 2 (- 3 (+ 6 (/ 4 3)))))
    const numerator = 5 + 4 + (2 - (3 - (6 + 4 / 3)));
    
    // Calculate denominator: (* 3 (- 6 2) (- 2 7))
    const denominator = 3 * (6 - 2) * (2 - 7);
    
    return numerator / denominator;
};

// The result should be -23/90 ≈ -0.255555...
