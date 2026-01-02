import { Machine } from '../5.2/5.2';

// Chapter 5.4. Explicit-Control Evaluator (Skeleton)

export const makeEvaluatorMachine = () => {
    const machine = new Machine();
    machine.allocateRegister('exp');
    machine.allocateRegister('env');
    machine.allocateRegister('val');
    machine.allocateRegister('proc');
    machine.allocateRegister('argl');
    machine.allocateRegister('continue');
    machine.allocateRegister('unev');

    // Define basic operations used in the evaluator
    machine.installOps([
        ['self-evaluating?', (exp: any) => typeof exp === 'number'],
        ['variable?', (exp: any) => typeof exp === 'string'],
        // ... other ops from 4.1 ...
    ]);

    return machine;
};
