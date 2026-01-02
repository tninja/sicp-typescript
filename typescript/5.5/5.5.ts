// Chapter 5.5. Compiler (Core Logic)

export type InstructionSequence = {
    needs: string[];
    modifies: string[];
    statements: string[];
};

export const makeInstructionSequence = (needs: string[], modifies: string[], statements: string[]): InstructionSequence => ({
    needs,
    modifies,
    statements
});

export const compile = (exp: any, target: string, linkage: string): InstructionSequence => {
    if (typeof exp === 'number' || typeof exp === 'string') {
        return compileSelfEvaluating(exp, target, linkage);
    }
    // ... logic for other forms ...
    throw new Error("Unknown expression type -- COMPILE " + exp);
};

const compileSelfEvaluating = (exp: any, target: string, linkage: string): InstructionSequence => {
    return endWithLinkage(linkage, makeInstructionSequence([], [target], [`(assign ${target} (const ${exp}))`]));
};

const endWithLinkage = (linkage: string, seq: InstructionSequence): InstructionSequence => {
    const linkageSeq = compileLinkage(linkage);
    return appendInstructionSequences(seq, linkageSeq);
};

const compileLinkage = (linkage: string): InstructionSequence => {
    if (linkage === 'return') return makeInstructionSequence(['continue'], [], ['(goto (reg continue))']);
    if (linkage === 'next') return makeInstructionSequence([], [], []);
    return makeInstructionSequence([], [], [`(goto (label ${linkage}))`]);
};

// Helper to combine sequences (handles register preservation)
export const appendInstructionSequences = (...seqs: InstructionSequence[]): InstructionSequence => {
    // ... implementation of list-union and list-difference logic from SICP ...
    return seqs.reduce((acc, curr) => ({
        needs: Array.from(new Set([...acc.needs, ...curr.needs])),
        modifies: Array.from(new Set([...acc.modifies, ...curr.modifies])),
        statements: [...acc.statements, ...curr.statements]
    }));
};
