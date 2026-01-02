// Exercise 3.2. make-monitored.

export const makeMonitored = (f: Function) => {
    let count = 0;
    return (m: any) => {
        if (m === 'how-many-calls?') return count;
        if (m === 'reset-count') {
            count = 0;
            return;
        }
        count++;
        return f(m);
    };
};
