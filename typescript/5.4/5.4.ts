import { Machine } from '../5.2/5.2';

// SICP Section 5.4: The Explicit-Control Evaluator
// Original Scheme code from scheme/5.4/5.4.scm
// This implements an explicit-control evaluator as a register machine

// Create an explicit-control evaluator machine
// Original Scheme code shows the complete controller sequence starting with:
// eval-dispatch
//   (test (op self-evaluating?) (reg exp))
//   (branch (label ev-self-eval))
//   (test (op variable?) (reg exp))
//   (branch (label ev-variable))
//   ... and continuing with ev-quoted, ev-assignment, ev-definition,
//   ev-if, ev-lambda, ev-begin, ev-application
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
    // Original Scheme operations from the metacircular evaluator (4.1)
    machine.installOps([
        ['self-evaluating?', (exp: any) => typeof exp === 'number'],
        ['variable?', (exp: any) => typeof exp === 'string'],
        // ... other ops from 4.1 ...
    ]);

    return machine;
};
