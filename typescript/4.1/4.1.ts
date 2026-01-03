// SICP Section 4.1: The Metacircular Evaluator
// Original Scheme code from scheme/4.1/4.1.scm

export type Expression = any;
export type Env = any[];

// Evaluate an expression in an environment
// Original Scheme code:
// (define (eval exp env)
//   (cond ((self-evaluating? exp) exp)
//         ((variable? exp) (lookup-variable-value exp env))
//         ((quoted? exp) (text-of-quotation exp))
//         ((assignment? exp) (eval-assignment exp env))
//         ((definition? exp) (eval-definition exp env))
//         ((if? exp) (eval-if exp env))
//         ((lambda? exp)
//          (make-procedure (lambda-parameters exp)
//                          (lambda-body exp)
//                          env))
//         ((begin? exp)
//          (eval-sequence (begin-actions exp) env))
//         ((cond? exp) (eval (cond->if exp) env))
//         ((application? exp)
//          (apply (eval (operator exp) env)
//                 (list-of-values (operands exp) env)))
//         (else
//           (error "Unknown expression type -- EVAL" exp))))
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

// Apply a procedure to arguments
// Original Scheme code:
// (define (apply procedure arguments)
//   (cond ((primitive-procedure? procedure)
//          (apply-primitive-procedure procedure arguments))
//         ((compound-procedure? procedure)
//          (eval-sequence
//            (procedure-body procedure)
//            (extend-environment
//              (procedure-parameters procedure)
//              arguments
//              (procedure-environment procedure))))
//         (else
//           (error
//             "Unknown procedure type -- APPLY" procedure))))
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
// Scheme: (define (self-evaluating? exp)
//          (cond ((number? exp) true)
//                ((string? exp) true)
//                (else false)))
const isSelfEvaluating = (exp: any) => typeof exp === 'number' || typeof exp === 'string' && !isVariable(exp);
// Scheme: (define (variable? exp) (symbol? exp))
const isVariable = (exp: any) => typeof exp === 'string';
// Scheme: (define (quoted? exp) (tagged-list? exp 'quote))
const isQuoted = (exp: any) => Array.isArray(exp) && exp[0] === 'quote';
// Scheme: (define (text-of-quotation exp) (cadr exp))
const textOfQuotation = (exp: any) => exp[1];
// Scheme: (define (assignment? exp) (tagged-list? exp 'set!))
const isAssignment = (exp: any) => Array.isArray(exp) && exp[0] === 'set!';
// Scheme: (define (definition? exp) (tagged-list? exp 'define))
const isDefinition = (exp: any) => Array.isArray(exp) && exp[0] === 'define';
// Scheme: (define (if? exp) (tagged-list? exp 'if))
const isIf = (exp: any) => Array.isArray(exp) && exp[0] === 'if';
// Scheme: (define (lambda? exp) (tagged-list? exp 'lambda))
const isLambda = (exp: any) => Array.isArray(exp) && exp[0] === 'lambda';
// Scheme: (define (lambda-parameters exp) (cadr exp))
const lambdaParameters = (exp: any) => exp[1];
// Scheme: (define (lambda-body exp) (cddr exp))
const lambdaBody = (exp: any) => exp.slice(2);
// Scheme: (define (begin? exp) (tagged-list? exp 'begin))
const isBegin = (exp: any) => Array.isArray(exp) && exp[0] === 'begin';
// Scheme: (define (begin-actions exp) (cdr exp))
const beginActions = (exp: any) => exp.slice(1);
// Scheme: (define (application? exp) (pair? exp))
const isApplication = (exp: any) => Array.isArray(exp);
// Scheme: (define (operator exp) (car exp))
const operator = (exp: any) => exp[0];
// Scheme: (define (operands exp) (cdr exp))
const operands = (exp: any) => exp.slice(1);

// Scheme: (define (list-of-values exps env)
//          (if (no-operands? exps)
//              '()
//              (cons (eval (first-operand exps) env)
//                    (list-of-values (rest-operands exps) env))))
const listOfValues = (ops: any[], env: Env) => ops.map(op => evaluate(op, env));

// Scheme: (define (eval-if exp env)
//          (if (true? (eval (if-predicate exp) env))
//              (eval (if-consequent exp) env)
//              (eval (if-alternative exp) env)))
const evalIf = (exp: any, env: Env) => {
    if (evaluate(exp[1], env)) {
        return evaluate(exp[2], env);
    } else {
        return evaluate(exp[3], env);
    }
};

// Scheme: (define (eval-sequence exps env)
//          (cond ((last-exp? exps) (eval (first-exp exps) env))
//                (else (eval (first-exp exps) env)
//                      (eval-sequence (rest-exps exps) env))))
const evalSequence = (exps: any[], env: Env) => {
    let res;
    for (const exp of exps) {
        res = evaluate(exp, env);
    }
    return res;
};

// Scheme: (define (eval-assignment exp env)
//          (set-variable-value! (assignment-variable exp)
//                               (eval (assignment-value exp) env)
//                               env)
//          'ok)
const evalAssignment = (exp: any, env: Env) => {
    setVariableValue(exp[1], evaluate(exp[2], env), env);
    return 'ok';
};

// Scheme: (define (eval-definition exp env)
//          (define-variable! (definition-variable exp)
//                            (eval (definition-value exp) env)
//                            env)
//          'ok)
const evalDefinition = (exp: any, env: Env) => {
    defineVariable(exp[1], evaluate(exp[2], env), env);
    return 'ok';
};

// Environment and Procedures
// Scheme: (define (make-procedure parameters body env)
//          (list 'procedure parameters body env))
const makeProcedure = (params: any, body: any, env: Env) => ({ type: 'procedure', params, body, env });
// Scheme: (define (compound-procedure? p)
//          (tagged-list? p 'procedure))
const isCompoundProcedure = (p: any) => p && p.type === 'procedure';
// Scheme: (define (procedure-parameters p) (cadr p))
const procedureParameters = (p: any) => p.params;
// Scheme: (define (procedure-body p) (caddr p))
const procedureBody = (p: any) => p.body;
// Scheme: (define (procedure-environment p) (cadddr p))
const procedureEnvironment = (p: any) => p.env;

// Scheme: (define (primitive-procedure? proc)
//          (tagged-list? proc 'primitive))
const isPrimitiveProcedure = (p: any) => p && p.type === 'primitive';
// Scheme: (define (apply-primitive-procedure proc args)
//          (apply-in-underlying-scheme (primitive-implementation proc) args))
const applyPrimitiveProcedure = (p: any, args: any[]) => p.func(...args);

// Scheme: (define (extend-environment vars vals base-env)
//          (if (= (length vars) (length vals))
//              (cons (make-frame vars vals) base-env)
//              (if (< (length vars) (length vals))
//                  (error "Too many arguments supplied" vars vals)
//                  (error "Too few arguments supplied" vars vals))))
const extendEnvironment = (vars: string[], vals: any[], baseEnv: Env) => [{ vars, vals }, ...baseEnv];

// Scheme: (define (lookup-variable-value var env)
//          (define (env-loop env)
//            (define (scan vars vals)
//              (cond ((null? vars)
//                     (env-loop (enclosing-environment env)))
//                    ((eq? var (car vars))
//                     (car vals))
//                    (else (scan (cdr vars) (cdr vals)))))
//            (if (eq? env the-empty-environment)
//                (error "Unbound variable" var)
//                (let ((frame (first-frame env)))
//                  (scan (frame-variables frame)
//                        (frame-values frame)))))
//          (env-loop env))
const lookupVariableValue = (varName: string, env: Env) => {
    for (const frame of env) {
        const idx = frame.vars.indexOf(varName);
        if (idx !== -1) return frame.vals[idx];
    }
    throw new Error("Unbound variable " + varName);
};

// Scheme: (define (set-variable-value! var val env)
//          (define (env-loop env)
//            (define (scan vars vals)
//              (cond ((null? vars)
//                     (env-loop (enclosing-environment env)))
//                    ((eq? var (car vars))
//                     (set-car! vals val))
//                    (else (scan (cdr vars) (cdr vals)))))
//            (if (eq? env the-empty-environment)
//                (error "Unbound variable -- SET!" var)
//                (let ((frame (first-frame env)))
//                  (scan (frame-variables frame)
//                        (frame-values frame)))))
//          (env-loop env))
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

// Scheme: (define (define-variable! var val env)
//          (let ((frame (first-frame env)))
//            (define (scan vars vals)
//              (cond ((null? vars)
//                     (add-binding-to-the-frame! var val frame))
//                    ((eq? var (car vars))
//                     (set-car! vals val))
//                    (else (scan (cdr vars) (cdr vals)))))
//            (scan (frame-variables frame)
//                  (frame-values frame))))
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
