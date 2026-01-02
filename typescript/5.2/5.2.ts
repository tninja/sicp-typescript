// Chapter 5.2. Register Machine Simulator

export class Register {
    private contents: any = '*unassigned*';
    constructor(public name: string) {}
    set(val: any) { this.contents = val; }
    get() { return this.contents; }
}

export class Stack {
    private items: any[] = [];
    push(val: any) { this.items.push(val); }
    pop() {
        if (this.items.length === 0) throw new Error("Empty stack -- POP");
        return this.items.pop();
    }
    initialize() { this.items = []; }
}

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

    allocateRegister(name: string) {
        this.registers.set(name, new Register(name));
    }

    getRegister(name: string): Register {
        const reg = this.registers.get(name);
        if (!reg) throw new Error("Unknown register: " + name);
        return reg;
    }

    installOps(ops: [string, Function][]) {
        ops.forEach(([name, func]) => this.ops.set(name, func));
    }

    execute() {
        const insts = this.pc.get();
        if (insts && insts.length > 0) {
            const currentInst = insts[0];
            currentInst.proc();
            this.execute();
        }
    }
}
