import { Expression, Env, evaluate } from '../4.1/4.1';

// Chapter 4.2. Lazy Evaluator

export type Thunk = {
    type: 'thunk' | 'evaluated-thunk';
    exp: Expression;
    env: Env;
    value?: any;
};

export const delayIt = (exp: Expression, env: Env): Thunk => ({
    type: 'thunk',
    exp,
    env
});

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

export const actualValue = (exp: Expression, env: Env): any => {
    return forceIt(evaluate(exp, env));
};

// Lazy application: parameters are wrapped in thunks
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
