// Chapter 4.3. Nondeterministic Computing (Amb)

export type SuccessCallback = (value: any, next: () => void) => void;
export type FailureCallback = () => void;

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
