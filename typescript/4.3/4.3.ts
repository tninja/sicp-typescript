// SICP Section 4.3: Nondeterministic Computing (Amb)
// This section discusses nondeterministic computing with the amb operator
// Original Scheme concepts from SICP Chapter 4.3

export type SuccessCallback = (value: any, next: () => void) => void;
export type FailureCallback = () => void;

// Amb operator for nondeterministic choice
// Original Scheme concept: (amb <choice1> <choice2> ... <choiceN>)
// Returns one of the choices, with backtracking on failure
export const amb = (choices: any[], success: SuccessCallback, fail: FailureCallback) => {
    const tryNext = (items: any[]) => {
        if (items.length === 0) {
            fail();
        } else {
            success(items[0], () => tryNext(items.slice(1)));
        }
    };
    tryNext(choices);
};

// Example usage: find pairs that sum to 10
// amb([1, 2, 3], (x, failX) => {
//     amb([7, 8, 9], (y, failY) => {
//         if (x + y === 10) {
//             console.log(x, y);
//         } else {
//             failY();
//         }
//     }, failX);
// }, () => console.log("done"));
