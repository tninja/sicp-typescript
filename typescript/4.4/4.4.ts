// SICP Section 4.4: Logic Programming
// Original Scheme code from scheme/4.4/4.4.scm
// This section discusses logic programming and unification algorithms

export type Binding = Map<string, any>;

// Unification algorithm for logic programming
// Original Scheme concept: Pattern matching and binding for logic queries
// Example query: (job ?x (computer programmer))
export const unifyMatch = (p1: any, p2: any, bindings: Binding | null): Binding | null => {
    if (bindings === null) return null;
    if (p1 === p2) return bindings;
    if (isVariable(p1)) return extendIfPossible(p1, p2, bindings);
    if (isVariable(p2)) return extendIfPossible(p2, p1, bindings);
    if (Array.isArray(p1) && Array.isArray(p2)) {
        if (p1.length !== p2.length) return null;
        if (p1.length === 0) return bindings;
        const firstMatch = unifyMatch(p1[0], p2[0], bindings);
        return unifyMatch(p1.slice(1), p2.slice(1), firstMatch);
    }
    return null;
};

// Check if a symbol is a logic variable (starts with ?)
// Original Scheme concept: Variables in logic queries like ?x, ?y
const isVariable = (x: any): boolean => typeof x === 'string' && x.startsWith('?');

// Extend bindings if possible, checking for circular dependencies
// Original Scheme concept: Binding logic variables to values during unification
const extendIfPossible = (v: string, val: any, bindings: Binding): Binding | null => {
    if (bindings.has(v)) {
        return unifyMatch(bindings.get(v), val, bindings);
    } else if (isVariable(val) && bindings.has(val)) {
        return unifyMatch(v, bindings.get(val), bindings);
    } else if (dependsOn(val, v, bindings)) {
        return null; // circular dependency
    }
    const res = new Map(bindings);
    res.set(v, val);
    return res;
};

// Check if expression depends on variable v (circular dependency check)
// Original Scheme concept: Prevent infinite loops in unification
const dependsOn = (exp: any, v: string, bindings: Binding): boolean => {
    if (exp === v) return true;
    if (isVariable(exp) && bindings.has(exp)) {
        return dependsOn(bindings.get(exp), v, bindings);
    }
    if (Array.isArray(exp)) {
        return exp.some(e => dependsOn(e, v, bindings));
    }
    return false;
};