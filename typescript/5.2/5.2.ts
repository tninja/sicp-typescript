// SICP Section 5.2: A Register-Machine Simulator
// Original Scheme code from scheme/5.2/5.2.scm
// This implements a simulator for register machines as described in SICP

// Register implementation for register machine
// Original Scheme code:
// (define (make-register name)
//   (let ((contents '*unassigned*))
//     (define (dispatch message)
//       (cond ((eq? message 'get) contents)
//             ((eq? message 'set)
//              (lambda (value) (set! contents value)))
//             (else
//               (error "Unknown request -- REGISTER" message))))
//     dispatch))
// (define (get-contents register) (register 'get))
// (define (set-contents! register value) ((register 'set) value))
export class Register {
    private contents: any = '*unassigned*';
    constructor(public name: string) {}
    set(val: any) { this.contents = val; }
    get() { return this.contents; }
}

// Stack implementation for register machine
// Original Scheme code:
// (define (make-stack)
//   (let ((s '()))
//     (define (push x)
//       (set! s (cons x s)))
//     (define (pop)
//       (if (null? s)
//         (error "Empty stack -- POP")
//         (let ((top (car s)))
//           (set! s (cdr s))
//           top)))
//     (define (initialize)
//       (set! s '())
//       'done)
//     (define (dispatch message)
//       (cond ((eq? message 'push) push)
//             ((eq? message 'pop) (pop))
//             ((eq? message 'initialize) (initialize))
//             (else (error "Unknown request -- STACK" message))))
//     dispatch))
// (define (pop stack) (stack 'pop))
// (define (push stack value) ((stack 'push) value))
export class Stack {
    private items: any[] = [];
    push(val: any) { this.items.push(val); }
    pop() {
        if (this.items.length === 0) throw new Error("Empty stack -- POP");
        return this.items.pop();
    }
    initialize() { this.items = []; }
}

// Main register machine simulator
// Original Scheme code:
// (define (make-new-machine)
//   (let ((pc (make-register 'pc))
//         (flag (make-register 'flag))
//         (stack (make-stack))
//         (the-instruction-sequence '()))
//     (let ((the-ops
//             (list (list 'initialize-stack
//                          (lambda () (stack 'initialize)))))
//           (register-table
//             (list (list 'pc pc) (list 'flag flag))))
//       ... ))
export class Machine {
    public pc: Register = new Register('pc');
    public flag: Register = new Register('flag');
    public stack: Stack = new Stack();
    public registers: Map<string, Register> = new Map();
    public ops: Map<string, Function> = new Map();

    constructor() {
        this.registers.set('pc', this.pc);
        this.registers.set('flag', this.flag);
    }

    // Allocate a new register in the machine
    // Original Scheme code:
    // (define (allocate-register name)
    //   (if (assoc name register-table)
    //     (error "Multiply defined register: " name)
    //     (set! register-table
    //       (cons (list name (make-register name))
    //             register-table)))
    //   'register-allocated)
    allocateRegister(name: string) {
        this.registers.set(name, new Register(name));
    }

    // Get register by name
    // Original Scheme code:
    // (define (lookup-register name)
    //   (let ((val (assoc name register-table)))
    //     (if val
    //       (cadr val)
    //       (error "Unknown register: " name))))
    getRegister(name: string): Register {
        const reg = this.registers.get(name);
        if (!reg) throw new Error("Unknown register: " + name);
        return reg;
    }

    // Install primitive operations in the machine
    // Original Scheme code:
    // (define (install-operations)
    //   (lambda (ops) (set! the-ops (append the-ops ops))))
    installOps(ops: [string, Function][]) {
        ops.forEach(([name, func]) => this.ops.set(name, func));
    }

    // Execute instructions in the machine
    // Original Scheme code:
    // (define (execute)
    //   (let ((insts (get-contents pc)))
    //     (if (null? insts)
    //       'done
    //       (begin
    //         ((instruction-execution-proc (car insts)))
    //         (execute)))))
    execute() {
        const insts = this.pc.get();
        if (insts && insts.length > 0) {
            const currentInst = insts[0];
            currentInst.proc();
            this.execute();
        }
    }
}
