// SICP Section 5.5: Compilation
// Original Scheme code from scheme/5.5/5.5.scm
// This implements a compiler as described in SICP Chapter 5.5

// Instruction sequence representation for the compiler
// Original Scheme code:
// (define (make-instruction-sequence needs modifies statements)
//   (list needs modifies statements))
export type InstructionSequence = {
    needs: string[];
    modifies: string[];
    statements: string[];
};

// Create an instruction sequence
// Original Scheme code: (make-instruction-sequence needs modifies statements)
export const makeInstructionSequence = (needs: string[], modifies: string[], statements: string[]): InstructionSequence => ({
    needs,
    modifies,
    statements
});

// Main compilation function
// Original Scheme code:
// (define (compile exp target linkage)
//   (cond ((self-evaluating? exp)
//          (compile-self-evaluating exp target linkage))
//         ((quoted? exp) (compile-quoted exp target linkage))
//         ((variable? exp) (compile-variable exp target linkage))
//         ((assignment? exp) (compile-assignment exp target linkage))
//         ((definition? exp) (compile-definition exp target linkage))
//         ((if? exp) (compile-if exp target linkage))
//         ((lambda? exp) (compile-lambda exp target linkage))
//         ((begin? exp) (compile-sequence (begin-actions exp) target linkage))
//         ((cond? exp) (compile (cond->if exp) target linkage))
//         ((application? exp) (compile-application exp target linkage))
//         (else (error "Unknown expression type -- COMPILE" exp))))
export const compile = (exp: any, target: string, linkage: string): InstructionSequence => {
    if (typeof exp === 'number' || typeof exp === 'string') {
        return compileSelfEvaluating(exp, target, linkage);
    }
    // ... logic for other forms ...
    throw new Error("Unknown expression type -- COMPILE " + exp);
};

// Compile self-evaluating expressions (numbers, strings)
// Original Scheme code:
// (define (compile-self-evaluating exp target linkage)
//   (end-with-linkage linkage
//    (make-instruction-sequence '() (list target)
//     `((assign ,target (const ,exp))))))
const compileSelfEvaluating = (exp: any, target: string, linkage: string): InstructionSequence => {
    return endWithLinkage(linkage, makeInstructionSequence([], [target], [`(assign ${target} (const ${exp}))`]));
};

// Add linkage code to instruction sequence
// Original Scheme code:
// (define (end-with-linkage linkage instruction-sequence)
//   (preserving '(continue)
//    instruction-sequence
//    (compile-linkage linkage)))
const endWithLinkage = (linkage: string, seq: InstructionSequence): InstructionSequence => {
    const linkageSeq = compileLinkage(linkage);
    return appendInstructionSequences(seq, linkageSeq);
};

// Generate linkage code
// Original Scheme code:
// (define (compile-linkage linkage)
//   (cond ((eq? linkage 'return)
//          (make-instruction-sequence '(continue) '()
//           '((goto (reg continue)))))
//         ((eq? linkage 'next)
//          (empty-instruction-sequence))
//         (else
//          (make-instruction-sequence '() '()
//           `((goto (label ,linkage)))))))
const compileLinkage = (linkage: string): InstructionSequence => {
    if (linkage === 'return') return makeInstructionSequence(['continue'], [], ['(goto (reg continue))']);
    if (linkage === 'next') return makeInstructionSequence([], [], []);
    return makeInstructionSequence([], [], [`(goto (label ${linkage}))`]);
};

// Combine instruction sequences with register preservation logic
// Original Scheme code (simplified version - actual implementation handles register preservation):
// (define (append-instruction-sequences . seqs)
//   (define (append-2-sequences seq1 seq2)
//     (make-instruction-sequence
//      (list-union (registers-needed seq1)
//                  (list-difference (registers-needed seq2)
//                                   (registers-modified seq1)))
//      (list-union (registers-modified seq1)
//                  (registers-modified seq2))
//      (append (statements seq1) (statements seq2))))
//   ... )
export const appendInstructionSequences = (...seqs: InstructionSequence[]): InstructionSequence => {
    // Simplified version - actual SICP implementation handles register preservation
    // using list-union and list-difference operations
    return seqs.reduce((acc, curr) => ({
        needs: Array.from(new Set([...acc.needs, ...curr.needs])),
        modifies: Array.from(new Set([...acc.modifies, ...curr.modifies])),
        statements: [...acc.statements, ...curr.statements]
    }));
};
