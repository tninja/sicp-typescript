// Chapter 4.4. Logic Programming - Fixed Unification

export type Binding = Map<string, any>;

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

const isVariable = (x: any): boolean => typeof x === 'string' && x.startsWith('?');

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