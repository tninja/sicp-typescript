import { Expression, Env, evaluate } from '../4.1/4.1';

// SICP Section 4.2: Lazy Evaluation
// Original Scheme code from scheme/4.2/4.2.scm

export type Thunk = {
    type: 'thunk' | 'evaluated-thunk';
    exp: Expression;
    env: Env;
    value?: any;
};

// Create a thunk (delayed computation)
// Original Scheme code:
// (define (delay-it exp env)
//   (list 'thunk exp env))
export const delayIt = (exp: Expression, env: Env): Thunk => ({
    type: 'thunk',
    exp,
    env
});

// Force evaluation of a thunk (with memoization)
// Original Scheme code:
// (define (force-it obj)
//   (cond ((thunk? obj)
//          (let ((result (actual-value
//                         (thunk-exp obj)
//                         (thunk-env obj))))
//            (set-car! obj 'evaluated-thunk)
//            (set-car! (cdr obj) result)  ; replace exp with its value
//            (set-cdr! (cdr obj) '())     ; forget unneeded env
//            result))
//         ((evaluated-thunk? obj)
//          (thunk-value obj))
//         (else obj)))
export const forceIt = (obj: any): any => {
    if (obj && obj.type === 'thunk') {
        const result = actualValue(obj.exp, obj.env);
        obj.type = 'evaluated-thunk';
        obj.value = result;
        return result;
    }
    if (obj && obj.type === 'evaluated-thunk') {
        return obj.value;
    }
    return obj;
};

// Get actual value of an expression (forces thunks)
// Original Scheme code:
// (define (actual-value exp env)
//   (force-it (eval exp env)))
export const actualValue = (exp: Expression, env: Env): any => {
    return forceIt(evaluate(exp, env));
};

// Lazy application: parameters are wrapped in thunks
// Original Scheme code:
// (define (apply procedure arguments env)
//   (cond ((primitive-procedure? procedure)
//          (apply-primitive-procedure
//           procedure
//           (list-of-arg-values arguments env)))  ; changed
//         ((compound-procedure? procedure)
//          (eval-sequence
//           (procedure-body procedure)
//           (extend-environment
//            (procedure-parameters procedure)
//            (list-of-delayed-args arguments env) ; changed
//            (procedure-environment procedure))))
//         (else
//          (error
//           "Unknown procedure type -- APPLY" procedure))))
export const applyLazy = (procedure: any, args: Expression[], env: Env): any => {
    if (procedure.type === 'primitive') {
        const argValues = args.map(arg => actualValue(arg, env));
        return procedure.func(...argValues);
    } else if (procedure.type === 'procedure') {
        const thunks = args.map(arg => delayIt(arg, env));
        // Extend env and eval procedure body
        // (Similar to 4.1 but passing thunks instead of values)
    }
};
