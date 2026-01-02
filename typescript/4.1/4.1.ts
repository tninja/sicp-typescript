// Metacircular Evaluator

export type Expression = any;
export type Env = any[];

export const evaluate = (exp: Expression, env: Env): any => {
    if (isSelfEvaluating(exp)) return exp;
    if (isVariable(exp)) return lookupVariableValue(exp, env);
    if (isQuoted(exp)) return textOfQuotation(exp);
    if (isAssignment(exp)) return evalAssignment(exp, env);
    if (isDefinition(exp)) return evalDefinition(exp, env);
    if (isIf(exp)) return evalIf(exp, env);
    if (isLambda(exp)) return makeProcedure(lambdaParameters(exp), lambdaBody(exp), env);
    if (isBegin(exp)) return evalSequence(beginActions(exp), env);
    if (isApplication(exp)) return apply(evaluate(operator(exp), env), listOfValues(operands(exp), env));
    throw new Error("Unknown expression type -- EVALUATE " + exp);
};

export const apply = (procedure: any, args: any[]): any => {
    if (isPrimitiveProcedure(procedure)) {
        return applyPrimitiveProcedure(procedure, args);
    } else if (isCompoundProcedure(procedure)) {
        return evalSequence(
            procedureBody(procedure),
            extendEnvironment(procedureParameters(procedure), args, procedureEnvironment(procedure))
        );
    }
    throw new Error("Unknown procedure type -- APPLY " + procedure);
};

// Syntax predicates and selectors
const isSelfEvaluating = (exp: any) => typeof exp === 'number' || typeof exp === 'string' && !isVariable(exp);
const isVariable = (exp: any) => typeof exp === 'string';
const isQuoted = (exp: any) => Array.isArray(exp) && exp[0] === 'quote';
const textOfQuotation = (exp: any) => exp[1];
const isAssignment = (exp: any) => Array.isArray(exp) && exp[0] === 'set!';
const isDefinition = (exp: any) => Array.isArray(exp) && exp[0] === 'define';
const isIf = (exp: any) => Array.isArray(exp) && exp[0] === 'if';
const isLambda = (exp: any) => Array.isArray(exp) && exp[0] === 'lambda';
const lambdaParameters = (exp: any) => exp[1];
const lambdaBody = (exp: any) => exp.slice(2);
const isBegin = (exp: any) => Array.isArray(exp) && exp[0] === 'begin';
const beginActions = (exp: any) => exp.slice(1);
const isApplication = (exp: any) => Array.isArray(exp);
const operator = (exp: any) => exp[0];
const operands = (exp: any) => exp.slice(1);

const listOfValues = (ops: any[], env: Env) => ops.map(op => evaluate(op, env));

const evalIf = (exp: any, env: Env) => {
    if (evaluate(exp[1], env)) {
        return evaluate(exp[2], env);
    } else {
        return evaluate(exp[3], env);
    }
};

const evalSequence = (exps: any[], env: Env) => {
    let res;
    for (const exp of exps) {
        res = evaluate(exp, env);
    }
    return res;
};

const evalAssignment = (exp: any, env: Env) => {
    setVariableValue(exp[1], evaluate(exp[2], env), env);
    return 'ok';
};

const evalDefinition = (exp: any, env: Env) => {
    defineVariable(exp[1], evaluate(exp[2], env), env);
    return 'ok';
};

// Environment and Procedures
const makeProcedure = (params: any, body: any, env: Env) => ({ type: 'procedure', params, body, env });
const isCompoundProcedure = (p: any) => p && p.type === 'procedure';
const procedureParameters = (p: any) => p.params;
const procedureBody = (p: any) => p.body;
const procedureEnvironment = (p: any) => p.env;

const isPrimitiveProcedure = (p: any) => p && p.type === 'primitive';
const applyPrimitiveProcedure = (p: any, args: any[]) => p.func(...args);

const extendEnvironment = (vars: string[], vals: any[], baseEnv: Env) => [{ vars, vals }, ...baseEnv];

const lookupVariableValue = (varName: string, env: Env) => {
    for (const frame of env) {
        const idx = frame.vars.indexOf(varName);
        if (idx !== -1) return frame.vals[idx];
    }
    throw new Error("Unbound variable " + varName);
};

const setVariableValue = (varName: string, val: any, env: Env) => {
    for (const frame of env) {
        const idx = frame.vars.indexOf(varName);
        if (idx !== -1) {
            frame.vals[idx] = val;
            return;
        }
    }
    throw new Error("Unbound variable -- SET! " + varName);
};

const defineVariable = (varName: string, val: any, env: Env) => {
    const frame = env[0];
    const idx = frame.vars.indexOf(varName);
    if (idx !== -1) {
        frame.vals[idx] = val;
    } else {
        frame.vars.push(varName);
        frame.vals.push(val);
    }
};
